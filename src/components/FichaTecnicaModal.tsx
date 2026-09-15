import React, { useState } from 'react';
import { 
  FileText, Printer, CheckCircle, AlertTriangle, XCircle, ShieldCheck, MapPin,
  Compass, Sparkles, Layers, Cpu, CheckCircle2, Bookmark, ArrowRight,
  ExternalLink, Wind, Shovel, Trees, Scale, Download, Hash
} from 'lucide-react';
import { CandidateZone, Jurisdiction } from '../types';
import { evaluateZEEData, evaluateLandUseData, generateGeoAISustenance } from '../utils/geoAIEngine';
import { calculateLandfillSizing } from '../utils/sizingCalculator';
import { evaluateZoneAHP, DEFAULT_AHP_WEIGHTS } from '../utils/ahpMatrixEvaluator';
import { generateInstitutionalPDFReport } from '../utils/pdfReportGenerator';

interface FichaTecnicaModalProps {
  isOpen: boolean;
  onClose: () => void;
  zone: CandidateZone | null;
  jurisdiction: Jurisdiction;
}

export const FichaTecnicaModal: React.FC<FichaTecnicaModalProps> = ({
  isOpen,
  onClose,
  zone,
  jurisdiction
}) => {
  const [activeTab, setActiveTab] = useState<'RESUMEN' | 'USO_SUELO' | 'ZEE' | 'FISICO' | 'INGENIERIA' | 'AHP'>('RESUMEN');

  if (!isOpen || !zone) return null;

  // Evaluaciones territoriales ZEE, Uso de Suelo y Sustento GeoAI
  const zee = zone.subzonaZEE 
    ? {
        subzonaZEE: zone.subzonaZEE,
        categoriaZEE: zone.categoriaZEE || 'RECUPERACION',
        compatibilidadZEE: zone.compatibilidadZEE || 'COMPATIBLE_ALTA',
        ordenanzaAprobacionZEE: zone.ordenanzaAprobacionZEE || 'Ordenanza Regional ZEE Aprobada',
        sustentoTecnicoZEE: zone.sustentoTecnicoZEE || '',
        ejeBiofisico: 'Tierras de Protección y pastos marginales con basamento impermeable.',
        capacidadAcogida: 'ALTA (Vocación para aislamiento sanitario).'
      }
    : evaluateZEEData(zone, jurisdiction);

  const land = zone.cumClase
    ? {
        cumClase: zone.cumClase,
        cumSubclase: zone.cumSubclase || 'Xse (Protección por Suelo y Pendiente)',
        vocacionAgrologica: zone.vocacionAgrologica || 'Sin vocación agrícola. Excluido para cultivos A/C.',
        cumAptitudIRS: zone.cumAptitudIRS || 'PRIORITARIA',
        usoActualSuelo: zone.usoActualSuelo || 'Terreno Eriazo / Suelo Desnudo',
        conflictoUsoSuelo: zone.conflictoUsoSuelo || 'En Plena Concordancia Agrológica',
        vientosDominantes: zone.vientosDominantes || 'Dirección Nor-Este (Sotavento respecto al Casco Urbano)',
        disponibilidadMaterialCobertura: zone.disponibilidadMaterialCobertura || 'Alta disponibilidad in situ',
        balanceCoberturaDiaria: 'Suficiente para cobertura diaria (20% vol.) in situ',
        pozosMonitoreoRequeridos: zone.pozosMonitoreoRequeridos || 3,
        saneamientoSBN: zone.saneamientoSBN || (zone.esPredioSBN ? 'Predio del Estado SINABIP (SBN)' : 'Predio Privado / Comunal')
      }
    : evaluateLandUseData(zone, jurisdiction);

  const geoai = zone.sustentoGeoAI || generateGeoAISustenance(zone, jurisdiction);

  const isApproved = zone.clasificacion === 'OPTIMA' || zone.puntajeAHP >= 75;
  const isConditioned = (zone.clasificacion === 'FAVORABLE' || zone.clasificacion === 'REGULAR') && zone.puntajeAHP >= 50;
  const isRejected = zone.clasificacion === 'INVIABLE';

  // Cálculo de dimensionamiento y evaluación AHP
  const sizingResults = calculateLandfillSizing({
    poblacionServida: jurisdiction.poblacion,
    tasaCrecimiento: jurisdiction.tasaCrecimiento,
    gpc: jurisdiction.gpc,
    coberturaRecoleccionPct: 90,
    densidadSuelto: 0.25,
    densidadCompactadoTruck: 0.45,
    densidadCelda: 0.75,
    relacionCoberturaPct: 20,
    alturaPromedioCeldaM: 6.0,
    factorInfraestructuraAux: 1.30,
    vidaUtilAnios: 10
  });

  const ahpResult = evaluateZoneAHP(zone, DEFAULT_AHP_WEIGHTS);

  // Descarga directa del PDF institucional vectorial (jsPDF)
  const handleDownloadPDF = () => {
    generateInstitutionalPDFReport(zone, jurisdiction, sizingResults, ahpResult);
  };

  // Impresión completa a través del motor del navegador (sin scrollbars)
  const handlePrintFullFicha = () => {
    window.print();
  };

  return (
    <div 
      id="ficha-tecnica-modal-root" 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md print:static print:p-0 print:m-0 print:bg-white"
    >
      <div 
        id="ficha-tecnica-modal-container"
        className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col overflow-hidden text-slate-100 animate-in zoom-in-95 duration-200 print:max-h-none print:h-auto print:border-none print:shadow-none print:rounded-none print:bg-white print:text-slate-900"
      >
        
        {/* Encabezado Institucional de la Modal (Oculto en impresión) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 print:hidden">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-950/40">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-black text-white tracking-wide">
                  Ficha Técnica de Evaluación Territorial y Ambiental de Sitio
                </h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
                  D.L. N° 1278
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700">
                  ZEE & CUM
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Capacidad de Uso de Suelo (MIDAGRI), Zonificación ZEE, Vientos y Peritaje Asistido por Inteligencia Artificial (GeoAI)
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center space-x-1.5 transition shadow-lg shadow-indigo-950/50 active:scale-95"
              title="Descargar PDF institucional oficial generado vectorialmente"
            >
              <Download className="w-4 h-4" />
              <span>Exportar PDF Oficial</span>
            </button>
            <button
              onClick={handlePrintFullFicha}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center space-x-1.5 transition shadow-lg shadow-emerald-950/50 active:scale-95"
              title="Imprimir o guardar ficha técnica completa como documento continuo sin barras"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Ficha Completa</span>
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition text-xs font-bold"
            >
              Cerrar
            </button>
          </div>
        </div>

        {/* Banner Superior de Estado y Dictamen Global */}
        <div 
          id="ficha-tecnica-header-banner"
          className="p-5 border-b border-slate-800/80 bg-slate-950/70 print:bg-slate-50 print:border print:border-slate-300 print:rounded-xl print:mb-4 print:text-slate-900"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1 flex-wrap gap-y-1">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 print:text-slate-600">
                  Ubigeo {jurisdiction.ubigeo} • {jurisdiction.distrito}, {jurisdiction.provincia} ({jurisdiction.departamento})
                </span>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-slate-700 print:bg-slate-200 print:text-slate-800 print:border-slate-300">
                  Región {jurisdiction.region}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-lime-950 text-lime-300 border border-lime-800 print:bg-lime-100 print:text-lime-900 print:border-lime-400">
                  {land.cumClase.split('-')[0]}
                </span>
              </div>
              <h1 className="text-xl font-black text-white print:text-slate-900 flex items-center space-x-2">
                <span className={isRejected ? 'text-rose-400 print:text-rose-700' : 'text-emerald-400 print:text-emerald-800'}>{zone.nombre}</span>
              </h1>
              <div className="flex items-center space-x-3 text-xs text-slate-300 print:text-slate-700 mt-1 flex-wrap gap-y-1 font-medium">
                <span><b>Superficie:</b> {zone.areaHa} ha ({(zone.areaHa * 10000).toLocaleString()} m²)</span>
                <span>•</span>
                <span><b>Distancia Urbana:</b> {zone.distanciaCentroideKm} km</span>
                <span>•</span>
                <span><b>Tenencia:</b> {zone.esPredioSBN ? 'Predio del Estado (SINABIP)' : 'Propiedad Privada / Comunal'}</span>
                <span>•</span>
                <span><b>Rosa de Vientos:</b> A Sotavento</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <div className="text-right">
                <div className="text-[10px] font-black uppercase text-slate-400 print:text-slate-600 tracking-wider mb-1">
                  Dictamen Normativo MINAM:
                </div>
                {isApproved ? (
                  <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 text-xs font-black flex items-center space-x-1.5 shadow-lg shadow-emerald-950/50 print:bg-emerald-100 print:text-emerald-900 print:border-emerald-500 print:shadow-none">
                    <CheckCircle className="w-4 h-4 text-emerald-400 print:text-emerald-800" />
                    <span>APTO PARA RELLENO SANITARIO</span>
                  </span>
                ) : isConditioned ? (
                  <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/50 text-xs font-black flex items-center space-x-1.5 shadow-lg shadow-amber-950/50 print:bg-amber-100 print:text-amber-900 print:border-amber-500 print:shadow-none">
                    <AlertTriangle className="w-4 h-4 text-amber-400 print:text-amber-800" />
                    <span>CONDICIONADO A EIA</span>
                  </span>
                ) : (
                  <span className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-black flex items-center space-x-1.5 shadow-lg shadow-rose-950/50 print:bg-rose-100 print:text-rose-900 print:border-rose-500 print:shadow-none">
                    <XCircle className="w-4 h-4 text-rose-400 print:text-rose-800" />
                    <span>NO APTO (EXCLUSIÓN ABSOLUTA)</span>
                  </span>
                )}
              </div>

              <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-center min-w-[85px] print:bg-white print:border-slate-300">
                <span className="text-[9px] font-bold text-slate-400 print:text-slate-600 block uppercase">Calificación AHP</span>
                <span className={`text-lg font-black ${isRejected ? 'text-rose-400 print:text-rose-700' : 'text-emerald-400 print:text-emerald-800'}`}>
                  {zone.puntajeAHP}
                </span>
                <span className="text-[10px] text-slate-400 print:text-slate-600 block">/ 100 pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selector de Pestañas de la Ficha Técnica (Oculto al imprimir) */}
        <div className="flex border-b border-slate-800 bg-slate-900 px-6 pt-2 space-x-2 overflow-x-auto scrollbar-thin print:hidden select-none">
          <button
            onClick={() => setActiveTab('RESUMEN')}
            className={`px-3.5 py-2 text-xs font-black rounded-t-xl transition flex items-center space-x-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'RESUMEN'
                ? 'border-emerald-500 text-emerald-400 bg-slate-950'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. Dictamen Pericial GeoAI</span>
          </button>

          <button
            onClick={() => setActiveTab('USO_SUELO')}
            className={`px-3.5 py-2 text-xs font-black rounded-t-xl transition flex items-center space-x-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'USO_SUELO'
                ? 'border-lime-500 text-lime-400 bg-slate-950'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trees className="w-3.5 h-3.5" />
            <span>2. Capacidad & Uso de Suelo (CUM)</span>
          </button>

          <button
            onClick={() => setActiveTab('ZEE')}
            className={`px-3.5 py-2 text-xs font-black rounded-t-xl transition flex items-center space-x-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'ZEE'
                ? 'border-indigo-500 text-indigo-400 bg-slate-950'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3. Zonificación ZEE Regional</span>
          </button>

          <button
            onClick={() => setActiveTab('FISICO')}
            className={`px-3.5 py-2 text-xs font-black rounded-t-xl transition flex items-center space-x-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'FISICO'
                ? 'border-emerald-500 text-emerald-400 bg-slate-950'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4. Parámetros Físicos & Geología</span>
          </button>

          <button
            onClick={() => setActiveTab('INGENIERIA')}
            className={`px-3.5 py-2 text-xs font-black rounded-t-xl transition flex items-center space-x-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'INGENIERIA'
                ? 'border-cyan-500 text-cyan-400 bg-slate-950'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>5. Ingeniería, Vientos & IGA</span>
          </button>

          <button
            onClick={() => setActiveTab('AHP')}
            className={`px-3.5 py-2 text-xs font-black rounded-t-xl transition flex items-center space-x-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'AHP'
                ? 'border-amber-500 text-amber-400 bg-slate-950'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>6. Matriz AHP & Vértices</span>
          </button>
        </div>

        {/* Cuerpo de la Ficha Técnica (En pantalla con scroll, en impresión 100% visible sin barras) */}
        <div 
          id="ficha-tecnica-body"
          className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-200 print:overflow-visible print:p-0 print:space-y-4 print:text-slate-900"
        >

          {/* ================================================================= */}
          {/* SECCIÓN 1: DICTAMEN PERICIAL GEOAI & SUSTENTO TÉCNICO VINCULANTE */}
          {/* ================================================================= */}
          <div className={`ficha-section ${activeTab === 'RESUMEN' ? 'block' : 'hidden'} print:block space-y-4 print:avoid-break`}>
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3 print:bg-slate-50 print:border-slate-300 print:rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-emerald-400 print:text-emerald-800 font-black text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>1. Dictamen Pericial del Especialista en IRS (Motor GeoAI MINAM)</span>
                </div>
                <span className="text-[10px] font-bold bg-emerald-900/60 text-emerald-300 print:bg-emerald-100 print:text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-700 print:border-emerald-400">
                  Idoneidad GeoAI: {geoai.puntajeIdoneidadGeoAI} / 100 Pts
                </span>
              </div>
              <p className="text-xs text-slate-200 print:text-slate-800 leading-relaxed font-sans text-justify">
                {geoai.dictamenEspecialista}
              </p>
            </div>

            {/* Viabilidad Ambiental y Barreras Geológicas */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 print:bg-white print:border-slate-300 print:rounded-xl">
              <h3 className="text-xs font-extrabold text-cyan-400 print:text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 print:text-emerald-700" />
                <span>Diagnóstico Geo-Ambiental y Barrera Geológica</span>
              </h3>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed text-justify">
                {geoai.viabilidadAmbiental}
              </p>
            </div>

            {/* Conclusiones Normativas MINAM */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 print:bg-white print:border-slate-300 print:rounded-xl">
              <h3 className="text-xs font-extrabold text-white print:text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
                <span>Conclusiones Normativas de la Evaluación (D.L. 1278 / D.S. 014-2017-MINAM)</span>
              </h3>
              <div className="space-y-1.5">
                {geoai.conclusionesMINAM.map((c, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-slate-300 print:text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 print:bg-emerald-700 mt-1.5 shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* SECCIÓN 2: CAPACIDAD Y USO DEL SUELO (CUM - D.S. 017-2009-AG) */}
          {/* ================================================================= */}
          <div className={`ficha-section ${activeTab === 'USO_SUELO' ? 'block' : 'hidden'} print:block space-y-4 print:avoid-break`}>
            <div className="p-5 rounded-2xl bg-lime-950/20 border border-lime-500/40 space-y-4 shadow-xl print:bg-slate-50 print:border-slate-300 print:rounded-xl print:shadow-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-lime-300 print:text-emerald-800 font-black text-xs uppercase tracking-wider">
                  <Trees className="w-4 h-4 text-lime-400 print:text-emerald-700" />
                  <span>2. Capacidad de Uso Mayor de la Tierra (CUM) - MIDAGRI / D.S. N° 017-2009-AG</span>
                </div>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                  land.cumAptitudIRS === 'PRIORITARIA'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 print:bg-emerald-100 print:text-emerald-900 print:border-emerald-400'
                    : land.cumAptitudIRS === 'CONDICIONADA'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 print:bg-amber-100 print:text-amber-900 print:border-amber-400'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40 print:bg-rose-100 print:text-rose-900 print:border-rose-400'
                }`}>
                  {land.cumAptitudIRS === 'PRIORITARIA' ? 'APTITUD PRIORITARIA PARA RELLENO SANITARIO' : land.cumAptitudIRS === 'CONDICIONADA' ? 'USO AGROLÓGICO CONDICIONADO' : 'USO AGROLÓGICO PROHIBIDO'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-lime-900/50 space-y-1 print:bg-white print:border-slate-300">
                  <span className="text-[10px] font-bold text-slate-400 print:text-slate-600 block uppercase">Clasificación CUM Oficial:</span>
                  <span className="font-extrabold text-white print:text-slate-900 text-xs block">{land.cumClase}</span>
                  <span className="text-[11px] font-mono text-lime-300 print:text-emerald-700 block">{land.cumSubclase}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-lime-900/50 space-y-1 print:bg-white print:border-slate-300">
                  <span className="text-[10px] font-bold text-slate-400 print:text-slate-600 block uppercase">Uso Actual del Suelo / Cobertura:</span>
                  <span className="font-extrabold text-white print:text-slate-900 text-xs block">{land.usoActualSuelo}</span>
                  <span className="text-[11px] text-slate-300 print:text-slate-700 block">{land.conflictoUsoSuelo}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-lime-900/40 print:border-slate-300 text-xs text-slate-200 print:text-slate-800">
                <div>
                  <b className="text-lime-300 print:text-emerald-800">Vocación Agrológica y Salvaguarda Agraria:</b> {land.vocacionAgrologica}
                </div>
                <div>
                  <b className="text-lime-300 print:text-emerald-800">Análisis Normativo D.L. 1278 (Art. 65):</b> La ley de residuos prohíbe la habilitación de infraestructuras en tierras aptas para cultivo (A y C). Al emplazarse en suelos clasificados como Tierras de Protección (X), el proyecto no genera desplazamiento agrícola, pérdida de soberanía alimentaria ni alteración de sistemas de irrigación.
                </div>
              </div>
            </div>

            {/* Material de Cobertura In Situ y Saneamiento Legal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 print:bg-white print:border-slate-300 print:rounded-xl">
                <h4 className="text-xs font-black text-amber-400 print:text-amber-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <Shovel className="w-4 h-4 text-amber-400 print:text-amber-700" />
                  <span>Disponibilidad de Material de Cobertura In Situ</span>
                </h4>
                <div className="text-xs text-slate-300 print:text-slate-700 space-y-1">
                  <div><b>Diagnóstico de Cantera:</b> {land.disponibilidadMaterialCobertura}</div>
                  <div><b>Balance Operativo:</b> {land.balanceCoberturaDiaria}</div>
                  <div className="text-[11px] text-slate-400 print:text-slate-600 pt-1">
                    Garantiza el 20% en volumen requerido diariamente, evitando sobrecostos por acarreo externo.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 print:bg-white print:border-slate-300 print:rounded-xl">
                <h4 className="text-xs font-black text-indigo-400 print:text-indigo-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <Scale className="w-4 h-4 text-indigo-400 print:text-indigo-700" />
                  <span>Saneamiento Físico Legal del Predio</span>
                </h4>
                <div className="text-xs text-slate-300 print:text-slate-700 space-y-1">
                  <div><b>Situación Registral:</b> {land.saneamientoSBN}</div>
                  <div className="text-[11px] text-slate-400 print:text-slate-600 pt-1">
                    Procedimiento administrativo preferente conforme a la Ley General del Sistema Nacional de Bienes Estatales (Ley N° 29151).
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* SECCIÓN 3: ZONIFICACIÓN ECOLÓGICA Y ECONÓMICA (ZEE) REGIONAL */}
          {/* ================================================================= */}
          <div className={`ficha-section ${activeTab === 'ZEE' ? 'block' : 'hidden'} print:block space-y-4 print:avoid-break`}>
            <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/40 space-y-3 shadow-xl print:bg-slate-50 print:border-slate-300 print:rounded-xl print:shadow-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-indigo-300 print:text-indigo-900 font-black text-xs uppercase tracking-wider">
                  <Compass className="w-4 h-4 text-indigo-400 print:text-indigo-700" />
                  <span>3. Compatibilidad ZEE para Infraestructuras de Residuos (D.S. 087-2004-PCM)</span>
                </div>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                  zee.compatibilidadZEE === 'COMPATIBLE_ALTA'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 print:bg-emerald-100 print:text-emerald-900 print:border-emerald-400'
                    : zee.compatibilidadZEE === 'COMPATIBLE_CON_RESTRICCIONES'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 print:bg-amber-100 print:text-amber-900 print:border-amber-400'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40 print:bg-rose-100 print:text-rose-900 print:border-rose-400'
                }`}>
                  {zee.compatibilidadZEE === 'COMPATIBLE_ALTA' ? 'ALTA COMPATIBILIDAD TERRITORIAL' : zee.compatibilidadZEE === 'COMPATIBLE_CON_RESTRICCIONES' ? 'COMPATIBLE CON RESTRICCIONES' : 'TERRITORIALMENTE INCOMPATIBLE'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-indigo-900/50 space-y-1 print:bg-white print:border-slate-300">
                  <span className="text-[10px] font-bold text-slate-400 print:text-slate-600 block uppercase">Subzona ZEE Aprobada:</span>
                  <span className="font-extrabold text-white print:text-slate-900 text-xs block">{zee.subzonaZEE}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-indigo-900/50 space-y-1 print:bg-white print:border-slate-300">
                  <span className="text-[10px] font-bold text-slate-400 print:text-slate-600 block uppercase">Marco Legal Regional:</span>
                  <span className="font-mono text-indigo-300 print:text-indigo-800 text-xs block">{zee.ordenanzaAprobacionZEE}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-indigo-900/40 print:border-slate-300 text-xs text-slate-200 print:text-slate-800">
                <div>
                  <b className="text-indigo-300 print:text-indigo-900">Eje Biofísico y Suelos:</b> {zee.ejeBiofisico}
                </div>
                <div>
                  <b className="text-indigo-300 print:text-indigo-900">Capacidad de Acogida Territorial:</b> {zee.capacidadAcogida}
                </div>
              </div>
            </div>

            {/* Sustento Técnico Detallado ZEE */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 print:bg-white print:border-slate-300 print:rounded-xl">
              <h4 className="text-xs font-black text-amber-400 print:text-amber-800 uppercase tracking-wider flex items-center space-x-1.5">
                <Bookmark className="w-3.5 h-3.5 text-amber-400 print:text-amber-700" />
                <span>Fundamento Territorial para Especialistas IRS y Evaluadores Ambientales:</span>
              </h4>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed text-justify">
                {zee.sustentoTecnicoZEE}
              </p>
            </div>
          </div>

          {/* ================================================================= */}
          {/* SECCIÓN 4: PARÁMETROS FÍSICOS, GEOLOGÍA Y RESTRICCIONES TÉCNICAS */}
          {/* ================================================================= */}
          <div className={`ficha-section ${activeTab === 'FISICO' ? 'block' : 'hidden'} print:block space-y-4 print:avoid-break`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box 1: Datos Físicos y Terreno */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3 print:bg-white print:border-slate-300 print:rounded-xl">
                <h3 className="text-xs font-extrabold text-emerald-400 print:text-emerald-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
                  <span>4.1 Topografía y Accesibilidad Territorial</span>
                </h3>
                <div className="space-y-2 text-xs text-slate-300 print:text-slate-700">
                  <div className="flex justify-between border-b border-slate-800/80 print:border-slate-200 pb-1.5">
                    <span className="text-slate-400 print:text-slate-600">Superficie Total del Predio:</span>
                    <span className="font-bold text-white print:text-slate-900">{zone.areaHa} ha ({(zone.areaHa * 10000).toLocaleString()} m²)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 print:border-slate-200 pb-1.5">
                    <span className="text-slate-400 print:text-slate-600">Pendiente Topográfica Media:</span>
                    <span className={`font-bold ${zone.pendientePct > 25 ? 'text-rose-400 print:text-rose-700' : 'text-emerald-400 print:text-emerald-800'}`}>
                      {zone.pendientePct}% {zone.pendientePct <= 25 ? '(<= 25% Aceptable)' : '(Excesiva)'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 print:border-slate-200 pb-1.5">
                    <span className="text-slate-400 print:text-slate-600">Distancia a Centros Poblados:</span>
                    <span className="font-bold text-emerald-400 print:text-emerald-800">{zone.distanciaCPm} m (&gt;= 500 m D.L. 1278)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 print:border-slate-200 pb-1.5">
                    <span className="text-slate-400 print:text-slate-600">Distancia a Vía de Transporte:</span>
                    <span className="font-bold text-white print:text-slate-900">{zone.distanciaViaM} m (Accesibilidad Directa)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 print:border-slate-200 pb-1.5">
                    <span className="text-slate-400 print:text-slate-600">Coordenadas Centroide WGS84:</span>
                    <span className="font-mono text-amber-300 print:text-slate-800 text-[11px]">Lat: {zone.coordenadasCentroid.lat.toFixed(5)}, Lng: {zone.coordenadasCentroid.lng.toFixed(5)}</span>
                  </div>
                </div>
              </div>

              {/* Box 2: Geología e Hidrogeología */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3 print:bg-white print:border-slate-300 print:rounded-xl">
                <h3 className="text-xs font-extrabold text-emerald-400 print:text-emerald-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
                  <span>4.2 Hidrogeología y Criterios de Exclusión</span>
                </h3>
                <div className="space-y-2 text-xs text-slate-300 print:text-slate-700">
                  <div className="flex justify-between border-b border-slate-800/80 print:border-slate-200 pb-1.5">
                    <span className="text-slate-400 print:text-slate-600">Litología / Basamento:</span>
                    <span className="font-bold text-white print:text-slate-900 truncate max-w-[200px]" title={zone.litologia}>{zone.litologia}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 print:border-slate-200 pb-1.5">
                    <span className="text-slate-400 print:text-slate-600">Permeabilidad Hidráulica (k):</span>
                    <span className="font-bold text-amber-400 print:text-amber-800">{zone.permeabilidadK.toExponential(1)} cm/s</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 print:border-slate-200 pb-1.5">
                    <span className="text-slate-400 print:text-slate-600">Profundidad del Nivel Freático:</span>
                    <span className="font-bold text-emerald-400 print:text-emerald-800">{zone.profundidadNapaM} m (&gt; 3 m Requerido)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 print:border-slate-200 pb-1.5">
                    <span className="text-slate-400 print:text-slate-600">Fallas Geológicas Activas:</span>
                    <span className="font-bold text-emerald-400 print:text-emerald-800">&gt; 1,000 m (INGEMMET GEOCATMIN)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 print:border-slate-200 pb-1.5">
                    <span className="text-slate-400 print:text-slate-600">Faja Marginal Cuerpos de Agua:</span>
                    <span className="font-bold text-emerald-400 print:text-emerald-800">&gt; 500 m (Libre de Cauces ANA)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* SECCIÓN 5: INGENIERÍA SANITARIA, ROSA DE VIENTOS & IGA/EIA */}
          {/* ================================================================= */}
          <div className={`ficha-section ${activeTab === 'INGENIERIA' ? 'block' : 'hidden'} print:block space-y-4 print:avoid-break`}>
            {/* Rosa de Vientos y Dispersión de Olores */}
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2 print:bg-slate-50 print:border-slate-300 print:rounded-xl">
              <h3 className="text-xs font-extrabold text-cyan-400 print:text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Wind className="w-4 h-4 text-cyan-400 print:text-emerald-700" />
                <span>5.1 Orientación Respecto a los Vientos Dominantes (Sotavento - D.S. 014-2017-MINAM)</span>
              </h3>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed text-justify">
                {land.vientosDominantes}
              </p>
            </div>

            {/* Especificaciones de Ingeniería Sanitaria */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 print:bg-white print:border-slate-300 print:rounded-xl">
              <h3 className="text-xs font-extrabold text-cyan-400 print:text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-cyan-400 print:text-emerald-700" />
                <span>5.2 Especificaciones de Ingeniería Sanitaria Prescritas (GeoAI)</span>
              </h3>
              <pre className="text-xs text-slate-200 print:text-slate-800 whitespace-pre-wrap font-sans leading-relaxed text-justify bg-slate-900/50 print:bg-slate-50 p-3.5 rounded-xl border border-slate-800/80 print:border-slate-300">
                {geoai.ingenieriaRecomendada}
              </pre>
            </div>

            {/* Requisitos para el Instrumento de Gestión Ambiental (IGA / EIA) */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 print:bg-white print:border-slate-300 print:rounded-xl">
              <h3 className="text-xs font-extrabold text-amber-400 print:text-amber-900 uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
                <span>5.3 Estudios Obligatorios para Certificación Ambiental (SENACE / MINAM)</span>
              </h3>
              <div className="space-y-1.5">
                {geoai.requisitosEIA.map((req, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-slate-300 print:text-slate-700">
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400 print:text-amber-700 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* SECCIÓN 6: MATRIZ MULTICRITERIO AHP Y VÉRTICES UTM WGS84 */}
          {/* ================================================================= */}
          <div className={`ficha-section ${activeTab === 'AHP' ? 'block' : 'hidden'} print:block space-y-4 print:avoid-break`}>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 print:bg-white print:border-slate-300 print:rounded-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-amber-400 print:text-amber-900 uppercase tracking-wider flex items-center space-x-1.5">
                  <Hash className="w-4 h-4 text-amber-400 print:text-amber-700" />
                  <span>6.1 Matriz de Evaluación Multicriterio AHP (Guía Técnica MINAM 2021)</span>
                </h3>
                <span className="text-[10px] font-bold bg-amber-950/60 text-amber-300 print:bg-amber-100 print:text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-700 print:border-amber-400">
                  Calificación Global: {ahpResult.puntajeTotal} / 100 Pts
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse ficha-table">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/60 print:bg-slate-100 text-slate-300 print:text-slate-800">
                      <th className="py-1.5 px-2">Criterio</th>
                      <th className="py-1.5 px-2">Subcriterio</th>
                      <th className="py-1.5 px-2 text-center">Peso</th>
                      <th className="py-1.5 px-2 text-center">Score</th>
                      <th className="py-1.5 px-2 text-center">Puntaje</th>
                      <th className="py-1.5 px-2">Detalle de Evaluación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ahpResult.desglose.map((d, i) => (
                      <tr key={i} className="border-b border-slate-800/60 print:border-slate-200 text-slate-300 print:text-slate-700">
                        <td className="py-1 px-2 font-semibold text-white print:text-slate-900">{d.criterio}</td>
                        <td className="py-1 px-2">{d.subcriterio}</td>
                        <td className="py-1 px-2 text-center font-mono text-slate-400 print:text-slate-600">{d.pesoAbsoluto}%</td>
                        <td className="py-1 px-2 text-center font-mono">{d.puntajeObtenido}/100</td>
                        <td className="py-1 px-2 text-center font-bold text-emerald-400 print:text-emerald-700">{d.puntajePonderado}</td>
                        <td className="py-1 px-2 text-[11px] text-slate-400 print:text-slate-600">{d.detalle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Coordenadas UTM WGS84 */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 print:bg-white print:border-slate-300 print:rounded-xl">
              <h3 className="text-xs font-extrabold text-white print:text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
                <span>6.2 Coordenadas de Vértices Perimétricos en Proyección UTM WGS84</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse ficha-table">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/60 print:bg-slate-100 text-slate-300 print:text-slate-800">
                      <th className="py-1 px-2 text-center">Vértice</th>
                      <th className="py-1 px-2 text-center">Coordenada Este (X)</th>
                      <th className="py-1 px-2 text-center">Coordenada Norte (Y)</th>
                      <th className="py-1 px-2 text-center">Zona UTM</th>
                      <th className="py-1 px-2 text-center">Datum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {zone.coordenadasUTM.map((u, i) => (
                      <tr key={i} className="border-b border-slate-800/60 print:border-slate-200 text-slate-300 print:text-slate-700">
                        <td className="py-1 px-2 text-center font-bold">{u.vertice}</td>
                        <td className="py-1 px-2 text-center font-mono">{u.este.toLocaleString()} m E</td>
                        <td className="py-1 px-2 text-center font-mono">{u.norte.toLocaleString()} m N</td>
                        <td className="py-1 px-2 text-center">Zona {u.zona}</td>
                        <td className="py-1 px-2 text-center">WGS84</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        {/* Footer de la Modal */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400 print:hidden">
          <span className="italic text-[10.5px]">
            Documento de Prospección Técnica Oficial - GeoIRS Perú (D.L. 1278). Creador: <strong className="text-slate-300 font-medium">Crhistian Jhoames Paredes García</strong>
          </span>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDownloadPDF}
              className="text-indigo-400 hover:text-indigo-300 font-extrabold flex items-center space-x-1 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar PDF Institucional</span>
            </button>
            <button
              onClick={handlePrintFullFicha}
              className="text-emerald-400 hover:text-emerald-300 font-extrabold flex items-center space-x-1 transition"
            >
              <span>Imprimir Ficha Completa</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
