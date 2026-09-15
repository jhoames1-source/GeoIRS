import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CandidateZone, SizingResults, AHPResult, Jurisdiction } from '../types';
import { evaluateZEEData, evaluateLandUseData, generateGeoAISustenance } from './geoAIEngine';

export function generateInstitutionalPDFReport(
  zone: CandidateZone,
  jurisdiction: Jurisdiction,
  sizing: SizingResults,
  ahpResult: AHPResult
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor: [number, number, number] = [20, 83, 45]; // Emerald-900
  const secondaryColor: [number, number, number] = [22, 101, 52]; // Emerald-800
  const darkTextColor: [number, number, number] = [30, 41, 59]; // Slate-800

  // ==================== PÁGINA 1 ====================
  // Encabezado Institucional
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('ESTUDIO TÉCNICO DE SELECCIÓN DE SITIO PARA RELLENO SANITARIO', 105, 11, { align: 'center' });
  doc.setFontSize(9);
  doc.setFont('Helvetica', 'normal');
  doc.text('EVALUACIÓN TERRITORIAL, MULTICRITERIO AHP, CUM Y ZEE (D.L. N° 1278 & D.S. N° 014-2017-MINAM)', 105, 17, { align: 'center' });

  let currentY = 32;

  // Section 1: Datos de Ubicación y Georreferenciación
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFontSize(11);
  doc.setFont('Helvetica', 'bold');
  doc.text('1. DATOS DE UBICACIÓN Y GEORREFERENCIACIÓN PREDIAL', 14, currentY);
  currentY += 4;

  const locData = [
    ['Jurisdicción Evaluada:', `${jurisdiction.distrito} - ${jurisdiction.provincia} (${jurisdiction.departamento})`, 'Ubigeo INEI:', jurisdiction.ubigeo],
    ['Zona Candidata:', zone.nombre, 'Superficie Predial:', `${zone.areaHa} ha (${(zone.areaHa * 10000).toLocaleString()} m²)`],
    ['Región Geográfica:', jurisdiction.region, 'Saneamiento Legal:', zone.saneamientoSBN || (zone.esPredioSBN ? 'Predio del Estado (SBN SINABIP)' : 'Predio Privado / Comunal')],
    ['Centroide WGS84:', `Lat: ${zone.coordenadasCentroid.lat.toFixed(6)}, Lng: ${zone.coordenadasCentroid.lng.toFixed(6)}`, 'Dist. Centroide:', `${zone.distanciaCentroideKm} km`]
  ];

  autoTable(doc, {
    startY: currentY,
    body: locData,
    theme: 'grid',
    styles: { fontSize: 8, textColor: darkTextColor, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: [241, 245, 249], cellWidth: 35 },
      1: { cellWidth: 65 },
      2: { fontStyle: 'bold', fillColor: [241, 245, 249], cellWidth: 32 },
      3: { cellWidth: 50 }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 7;

  // Coordenadas de Vértices UTM WGS84
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFontSize(10);
  doc.setFont('Helvetica', 'bold');
  doc.text('Cuadro N° 01: Vértices Perimétricos en Coordenadas UTM WGS84 (Zona 17S / 18S)', 14, currentY);
  currentY += 4;

  const utmRows = zone.coordenadasUTM.map(u => [u.vertice, `${u.este.toLocaleString()} m E`, `${u.norte.toLocaleString()} m N`, `Zona ${u.zona}`, 'WGS84']);

  autoTable(doc, {
    startY: currentY,
    head: [['Vértice', 'Coordenada Este (X)', 'Coordenada Norte (Y)', 'Zona UTM', 'Datum']],
    body: utmRows,
    theme: 'striped',
    headStyles: { fillColor: primaryColor as [number, number, number], fontSize: 8, halign: 'center' },
    styles: { fontSize: 8, halign: 'center', cellPadding: 1.5 }
  });

  currentY = (doc as any).lastAutoTable.finalY + 7;

  // Section 2: Dimensionamiento de la Infraestructura
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFontSize(11);
  doc.setFont('Helvetica', 'bold');
  doc.text(`2. PARÁMETROS DE DISEÑO Y DIMENSIONAMIENTO DE CELDA SANITARIA (${sizing.proyeccionAnual.length} AÑOS)`, 14, currentY);
  currentY += 4;

  const sizingData = [
    ['Población Actual Servida:', `${jurisdiction.poblacion.toLocaleString()} hab.`, 'Población Proyectada:', `${sizing.poblacionFutura.toLocaleString()} hab.`],
    ['Generación Per Cápita (GPC):', `${jurisdiction.gpc} kg/hab/día`, 'Producción Diaria Proyectada:', `${sizing.generacionDiariaTon} t/día`],
    ['Volumen Acumulado Compactado:', `${sizing.volumenAcumuladoProyectadoM3.toLocaleString()} m³`, 'Material Cobertura Diario (20%):', `${(sizing.volumenAcumuladoProyectadoM3 * 0.20).toLocaleString()} m³`],
    ['Superficie Requerida Celda:', `${sizing.areaCeldaDisposicionM2.toLocaleString()} m²`, 'Área Total Proyecto (inc. Buffer):', `${sizing.areaTotalRequeridaHa} ha`]
  ];

  autoTable(doc, {
    startY: currentY,
    body: sizingData,
    theme: 'grid',
    styles: { fontSize: 8, textColor: darkTextColor, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: [241, 245, 249], cellWidth: 42 },
      1: { cellWidth: 55 },
      2: { fontStyle: 'bold', fillColor: [241, 245, 249], cellWidth: 43 },
      3: { cellWidth: 42 }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 7;

  // Section 3: Matriz AHP Multicriterio MINAM
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFontSize(11);
  doc.setFont('Helvetica', 'bold');
  doc.text('3. RESULTADOS DE EVALUACIÓN MULTICRITERIO AHP (GUÍA TÉCNICA MINAM CUADRO N° 06)', 14, currentY);
  currentY += 4;

  const ahpRows = ahpResult.desglose.map(d => [d.criterio, d.subcriterio, `${d.pesoAbsoluto}%`, `${d.puntajeObtenido} / 100`, `${d.puntajePonderado} pts`, d.detalle]);

  autoTable(doc, {
    startY: currentY,
    head: [['Criterio AHP', 'Sub-criterio Evaluado', 'Peso', 'Score', 'Puntaje', 'Detalle Técnico']],
    body: ahpRows,
    theme: 'grid',
    headStyles: { fillColor: primaryColor as [number, number, number], fontSize: 8 },
    styles: { fontSize: 7.5, cellPadding: 1.8 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 32 },
      1: { cellWidth: 32 },
      2: { halign: 'center', cellWidth: 14 },
      3: { halign: 'center', cellWidth: 18 },
      4: { halign: 'center', fontStyle: 'bold', cellWidth: 18 },
      5: { cellWidth: 68 }
    }
  });

  // Pie de página Página 1
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Página 1 de 2 • GeoIRS Perú (D.L. 1278 / MINAM) • Creador: Crhistian Jhoames Paredes García', 105, 287, { align: 'center' });

  // ==================== PÁGINA 2: CUM, ZEE & DICTAMEN GEOAI ====================
  doc.addPage();

  // Encabezado Página 2
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 16, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('ANEXO TÉCNICO: CAPACIDAD DE USO DE SUELO (CUM), ZEE Y DICTAMEN GEOAI (MINAM)', 105, 11, { align: 'center' });

  currentY = 22;

  // Land Use Data
  const landUse = zone.cumClase
    ? {
        cumClase: zone.cumClase,
        cumSubclase: zone.cumSubclase || 'Xse',
        vocacionAgrologica: zone.vocacionAgrologica || 'Tierras de Protección',
        cumAptitudIRS: zone.cumAptitudIRS || 'APTA_PRIORITARIA',
        usoActualSuelo: zone.usoActualSuelo || 'Matorral árido',
        conflictoUsoSuelo: zone.conflictoUsoSuelo || 'Sin conflicto',
        vientosDominantes: zone.vientosDominantes || 'Vientos dominantes Sur-Suroeste',
        disponibilidadMaterialCobertura: zone.disponibilidadMaterialCobertura || 'Excelente disponibilidad in situ',
        pozosMonitoreoRequeridos: zone.pozosMonitoreoRequeridos || 'Mínimo 3 pozos',
        saneamientoSBN: zone.saneamientoSBN || 'Predio Estatal Registrado'
      }
    : evaluateLandUseData(zone, jurisdiction);

  const zee = zone.subzonaZEE 
    ? {
        subzonaZEE: zone.subzonaZEE,
        categoriaZEE: zone.categoriaZEE || 'RECUPERACION',
        compatibilidadZEE: zone.compatibilidadZEE || 'COMPATIBLE_ALTA',
        ordenanzaAprobacionZEE: zone.ordenanzaAprobacionZEE || 'Ordenanza Regional ZEE Aprobada',
        sustentoTecnicoZEE: zone.sustentoTecnicoZEE || ''
      }
    : evaluateZEEData(zone, jurisdiction);

  const geoai = zone.sustentoGeoAI || generateGeoAISustenance(zone, jurisdiction);

  // Section 4: Capacidad de Uso Mayor del Suelo (CUM) y Cobertura
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFontSize(10.5);
  doc.setFont('Helvetica', 'bold');
  doc.text('4. CLASIFICACIÓN DE CAPACIDAD DE USO MAYOR (CUM - D.S. 017-2009-AG / MIDAGRI)', 14, currentY);
  currentY += 4;

  const cumData = [
    ['Clase de Capacidad CUM:', `${landUse.cumClase} (${landUse.vocacionAgrologica})`, 'Subclase / Limitaciones:', landUse.cumSubclase],
    ['Uso de Suelo Actual:', landUse.usoActualSuelo, 'Conflicto de Uso:', landUse.conflictoUsoSuelo],
    ['Aptitud CUM para Relleno:', landUse.cumAptitudIRS === 'APTA_PRIORITARIA' ? 'APTA PRIORITARIA (Protección X)' : 'COMPATIBLE CONDICIONADA', 'Saneamiento Predial:', landUse.saneamientoSBN]
  ];

  autoTable(doc, {
    startY: currentY,
    body: cumData,
    theme: 'grid',
    styles: { fontSize: 7.5, textColor: darkTextColor, cellPadding: 1.8 },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: [241, 245, 249], cellWidth: 42 },
      1: { cellWidth: 55 },
      2: { fontStyle: 'bold', fillColor: [241, 245, 249], cellWidth: 38 },
      3: { cellWidth: 47 }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 6;

  // Section 5: Zonificación Ecológica y Económica
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFontSize(10.5);
  doc.setFont('Helvetica', 'bold');
  doc.text('5. EVALUACIÓN DE COMPATIBILIDAD CON LA ZEE REGIONAL (D.S. N° 087-2004-PCM)', 14, currentY);
  currentY += 4;

  const zeeData = [
    ['Subzona ZEE Identificada:', zee.subzonaZEE, 'Categoría ZEE:', zee.categoriaZEE],
    ['Instrumento Legal ZEE:', zee.ordenanzaAprobacionZEE, 'Compatibilidad IRS:', zee.compatibilidadZEE === 'COMPATIBLE_ALTA' ? 'ALTA COMPATIBILIDAD TERRITORIAL' : 'COMPATIBLE CON CONDICIONES'],
    ['Sustento Territorial ZEE:', { content: zee.sustentoTecnicoZEE, colSpan: 3 }]
  ];

  autoTable(doc, {
    startY: currentY,
    body: zeeData as any,
    theme: 'grid',
    styles: { fontSize: 7.5, textColor: darkTextColor, cellPadding: 1.8 },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: [241, 245, 249], cellWidth: 42 },
      1: { cellWidth: 55 },
      2: { fontStyle: 'bold', fillColor: [241, 245, 249], cellWidth: 38 },
      3: { cellWidth: 47 }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 6;

  // Section 6: Parámetros Críticos de Ingeniería e Hidrogeología
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFontSize(10.5);
  doc.setFont('Helvetica', 'bold');
  doc.text('6. PARÁMETROS CRÍTICOS DE INGENIERÍA SANITARIA, VIENTOS Y MONITOREO', 14, currentY);
  currentY += 4;

  const engData = [
    ['Rosa de Vientos / Sotavento:', landUse.vientosDominantes],
    ['Material de Cobertura In Situ:', landUse.disponibilidadMaterialCobertura],
    ['Red Piezométrica Requerida:', landUse.pozosMonitoreoRequeridos]
  ];

  autoTable(doc, {
    startY: currentY,
    body: engData,
    theme: 'grid',
    styles: { fontSize: 7.5, textColor: darkTextColor, cellPadding: 1.8 },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: [241, 245, 249], cellWidth: 50 },
      1: { cellWidth: 132 }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 6;

  // Section 7: Dictamen Pericial del Especialista IRS (GeoAI)
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFontSize(10.5);
  doc.setFont('Helvetica', 'bold');
  doc.text('7. DICTAMEN PERICIAL DEL ESPECIALISTA EN IRS (MOTOR GEOAI MINAM)', 14, currentY);
  currentY += 4;

  const geoaiData = [
    ['Dictamen Técnico:', geoai.dictamenEspecialista],
    ['Viabilidad Geo-Ambiental:', geoai.viabilidadAmbiental],
    ['Ingeniería Prescrita:', geoai.ingenieriaRecomendada]
  ];

  autoTable(doc, {
    startY: currentY,
    body: geoaiData,
    theme: 'grid',
    styles: { fontSize: 7.2, textColor: darkTextColor, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: [241, 245, 249], cellWidth: 42 },
      1: { cellWidth: 140 }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 6;

  // Dictamen Final Box
  doc.setFillColor(ahpResult.puntajeTotal >= 70 ? 220 : 254, ahpResult.puntajeTotal >= 70 ? 252 : 226, ahpResult.puntajeTotal >= 70 ? 231 : 226);
  doc.rect(14, currentY, 182, 16, 'F');
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(14, currentY, 182, 16, 'S');

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(9.5);
  doc.setFont('Helvetica', 'bold');
  doc.text(`DICTAMEN FINAL: CLASIFICACIÓN "${ahpResult.categoria}" (${ahpResult.puntajeTotal} / 100 PTS)`, 18, currentY + 5.5);
  doc.setFontSize(7.5);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.text('Terreno plenamente sustentado técnica, edafológica (CUM), ambiental y territorialmente bajo el D.L. 1278 y Guía MINAM.', 18, currentY + 11.5);

  // Pie de página Página 2
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Página 2 de 2 • GeoIRS Perú (D.L. 1278 / MINAM) • Creador: Crhistian Jhoames Paredes García • Firma Digital Institucional', 105, 287, { align: 'center' });

  // Guardar archivo PDF
  doc.save(`Estudio_Tecnico_IRS_${zone.nombre.replace(/ /g, '_')}.pdf`);
}
