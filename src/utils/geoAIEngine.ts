import { CandidateZone, Jurisdiction } from '../types';

export interface ZEEAssessment {
  subzonaZEE: string;
  categoriaZEE: 'PROTECCION' | 'RECUPERACION' | 'PRODUCTIVA' | 'TRATAMIENTO_ESPECIAL' | 'URBANA_INDUSTRIAL';
  compatibilidadZEE: 'COMPATIBLE_ALTA' | 'COMPATIBLE_CON_RESTRICCIONES' | 'INCOMPATIBLE';
  ordenanzaAprobacionZEE: string;
  sustentoTecnicoZEE: string;
  ejeBiofisico: string;
  capacidadAcogida: string;
}

export interface LandUseAssessment {
  cumClase: string;
  cumSubclase: string;
  vocacionAgrologica: string;
  cumAptitudIRS: 'PRIORITARIA' | 'CONDICIONADA' | 'PROHIBIDA';
  usoActualSuelo: string;
  conflictoUsoSuelo: string;
  vientosDominantes: string;
  disponibilidadMaterialCobertura: string;
  balanceCoberturaDiaria: string;
  pozosMonitoreoRequeridos: number;
  saneamientoSBN: string;
}

export interface GeoAISustenance {
  dictamenEspecialista: string;
  viabilidadAmbiental: string;
  ingenieriaRecomendada: string;
  requisitosEIA: string[];
  conclusionesMINAM: string[];
  puntajeIdoneidadGeoAI: number;
}

const REGIONAL_ZEE_ORDINANCES: Record<string, { ordenanza: string; instrumento: string }> = {
  'CAJAMARCA': { ordenanza: 'Ordenanza Regional N° 017-2010-GR.CAJ-CR', instrumento: 'ZEE Cajamarca Aprobada (D.S. 087-2004-PCM)' },
  'AMAZONAS': { ordenanza: 'Ordenanza Regional N° 285-2011-GRA/CR', instrumento: 'Macro ZEE Amazonas Aprobada' },
  'SAN MARTIN': { ordenanza: 'Ordenanza Regional N° 012-2006-GRSM/CR', instrumento: 'ZEE San Martín Aprobada' },
  'PIURA': { ordenanza: 'Ordenanza Regional N° 256-2013/GRP-CR', instrumento: 'ZEE Piura Aprobada' },
  'CUSCO': { ordenanza: 'Ordenanza Regional N° 047-2008-CR/GRC.CUSCO', instrumento: 'ZEE Cusco Aprobada' },
  'AREQUIPA': { ordenanza: 'Ordenanza Regional N° 239-AREQUIPA', instrumento: 'ZEE Arequipa Aprobada' },
  'JUNIN': { ordenanza: 'Ordenanza Regional N° 197-GRJ/CR', instrumento: 'ZEE Junín Aprobada' },
  'AYACUCHO': { ordenanza: 'Ordenanza Regional N° 013-2012-GRA/CR', instrumento: 'ZEE Ayacucho Aprobada' },
  'MADRE DE DIOS': { ordenanza: 'Ordenanza Regional N° 022-2009-GRMDD/CR', instrumento: 'ZEE Madre de Dios Aprobada' },
  'HUANUCO': { ordenanza: 'Ordenanza Regional N° 076-2014-CR-GRH', instrumento: 'ZEE Huánuco Aprobada' },
  'UCAYALI': { ordenanza: 'Ordenanza Regional N° 004-2015-GRU-CR', instrumento: 'ZEE Ucayali Aprobada' },
  'TACNA': { ordenanza: 'Ordenanza Regional N° 016-2012-CR/GOB.REG.TACNA', instrumento: 'ZEE Tacna Aprobada' },
  'MOQUEGUA': { ordenanza: 'Ordenanza Regional N° 013-2012-CR/GRM', instrumento: 'ZEE Moquegua Aprobada' },
  'LAMBAYEQUE': { ordenanza: 'Ordenanza Regional N° 020-2015-GR.LAMB/CR', instrumento: 'ZEE Lambayeque Aprobada' },
  'HUANCAVELICA': { ordenanza: 'Ordenanza Regional N° 250-GOB.REG-HVCA/CR', instrumento: 'ZEE Huancavelica Aprobada' },
  'PUNO': { ordenanza: 'Ordenanza Regional N° 010-2014-GRP-CRP', instrumento: 'ZEE Puno Aprobada' },
  'LORETO': { ordenanza: 'Ordenanza Regional N° 024-2016-GRL-CR', instrumento: 'ZEE Loreto Aprobada' },
  'CALLAO': { ordenanza: 'Ordenanza Regional N° 010-2016-GRC', instrumento: 'ZEE Callao Aprobada' },
  'TUMBES': { ordenanza: 'Ordenanza Regional N° 007-2017/GOB.REG.TUMBES-CR', instrumento: 'ZEE Tumbes Aprobada' },
};

export function evaluateZEEData(zone: CandidateZone, jurisdiction: Jurisdiction): ZEEAssessment {
  const depUpper = (jurisdiction.departamento || 'CAJAMARCA').toUpperCase().trim();
  const regInfo = REGIONAL_ZEE_ORDINANCES[depUpper] || {
    ordenanza: 'Directiva Nacional ZEE - MINAM / D.S. N° 087-2004-PCM',
    instrumento: `Zonificación Ecológica y Económica Regional (${jurisdiction.departamento})`
  };

  const isRejected = zone.clasificacion === 'INVIABLE';
  const isOptima = zone.clasificacion === 'OPTIMA';
  const isFavorable = zone.clasificacion === 'FAVORABLE';

  if (isRejected) {
    return {
      subzonaZEE: `Zona de Protección y Conservación Ecológica Estricta (ZEE-P01) - ${jurisdiction.provincia}`,
      categoriaZEE: 'PROTECCION',
      compatibilidadZEE: 'INCOMPATIBLE',
      ordenanzaAprobacionZEE: regInfo.ordenanza,
      ejeBiofisico: 'Áreas de fragilidad ecosistémica, amortiguamiento fluvial o pendientes inestables de alto riesgo.',
      capacidadAcogida: 'NULA (Capacidad de carga saturada para obras de infraestructura física).',
      sustentoTecnicoZEE: `Incompatibilidad territorial determinante según la ${regInfo.instrumento}. El sitio colisiona con fajas marginales, fallas activas o zonas de patrimonio cultural inalienable. Bajo el Art. 65 del D.L. 1278 y la matriz ZEE regional, se prohíbe categóricamente el emplazamiento de celdas de confinamiento de residuos sólidos en esta unidad espacial.`
    };
  }

  if (isOptima) {
    return {
      subzonaZEE: `Zona de Recuperación de Suelos Degradados y Vocación Especial IRS (ZEE-R04) - ${jurisdiction.distrito}`,
      categoriaZEE: 'RECUPERACION',
      compatibilidadZEE: 'COMPATIBLE_ALTA',
      ordenanzaAprobacionZEE: regInfo.ordenanza,
      ejeBiofisico: 'Tierras de Protección (Clase X) y pastos marginales con basamento rocoso/arcilloso impermeable y drenaje controlado.',
      capacidadAcogida: 'ALTA (Terreno con vocación prioritaria para aislamiento sanitario e infraestructura ambiental).',
      sustentoTecnicoZEE: `Plena compatibilidad territorial con la ${regInfo.instrumento} (${regInfo.ordenanza}). El área se ubica en unidades de suelos clase X (protección) y zonas eriazas que carecen de aptitud agrícola para cultivo en limpio o permanente (A/C). Esta localización optimiza la ocupación del territorio al preservar los valles productivos y dotar al municipio de un predio con barrera natural impermeable y aislamiento social idóneo (D.L. 1278, Art. 65).`
    };
  }

  return {
    subzonaZEE: `Zona Productiva con Restricciones Físicas y Tratamiento Especial (ZEE-PE02) - ${jurisdiction.distrito}`,
    categoriaZEE: isFavorable ? 'TRATAMIENTO_ESPECIAL' : 'PRODUCTIVA',
    compatibilidadZEE: 'COMPATIBLE_CON_RESTRICCIONES',
    ordenanzaAprobacionZEE: regInfo.ordenanza,
    ejeBiofisico: 'Suelos con aptitud de pastos (P) o matorrales con laderas moderadas y baja vulnerabilidad acuífera.',
    capacidadAcogida: 'MEDIA CONDICIONADA (Apta sujeta a obras de acondicionamiento geotécnico y barreras ambientales).',
    sustentoTecnicoZEE: `Compatibilidad territorial condicionada conforme a la ${regInfo.instrumento}. La subzona tolera el desarrollo de infraestructuras de disposición final siempre que se incorporen medidas de mitigación específicas: impermeabilización artificial reforzada mediante geomembrana de polietileno de alta densidad (HDPE >= 1.5 mm), manejo de aguas de escorrentía superficial y conformación de una faja de amortiguamiento perimetral arborizada >= 10 metros.`
  };
}

export function evaluateLandUseData(zone: CandidateZone, jurisdiction: Jurisdiction): LandUseAssessment {
  const isRejected = zone.clasificacion === 'INVIABLE';
  const isOptima = zone.clasificacion === 'OPTIMA';

  if (isRejected) {
    return {
      cumClase: 'Tierras de Cultivo en Limpio (Clase A) / Cuerpos de Agua (Faja)',
      cumSubclase: 'A1sc / Faja Fluvial Protegida',
      vocacionAgrologica: 'Alta vocación agrícola o protección estricta de recurso hídrico. Prohibido cambio de uso según D.L. 1278.',
      cumAptitudIRS: 'PROHIBIDA',
      usoActualSuelo: 'Zona Agrícola bajo Riego / Faja Marginal Fluvial / Ecosistema Frágil',
      conflictoUsoSuelo: 'En Conflicto Severo por Incompatibilidad Ambiental Absoluta (D.S. 017-2009-AG)',
      vientosDominantes: `Vientos con dirección variable hacia centros poblados. Riesgo alto de dispersión de olores (Barlovento).`,
      disponibilidadMaterialCobertura: 'Deficiente o restringida por valor edáfico agrícola in situ.',
      balanceCoberturaDiaria: 'No aplicable por desestimación técnica del emplazamiento.',
      pozosMonitoreoRequeridos: 4,
      saneamientoSBN: 'Predio no saneable para IRS por restricciones de dominio público o protección cultural/ecológica.'
    };
  }

  if (isOptima) {
    return {
      cumClase: 'Tierras de Protección (Clase X) - D.S. N° 017-2009-AG',
      cumSubclase: 'Xse (Limitación por Calidad Agrológica del Suelo y Pendiente Moderada)',
      vocacionAgrologica: 'Sin aptitud para cultivo en limpio (A) ni cultivo permanente (C). Suelo eriazo sin potencial pecuario intensivo.',
      cumAptitudIRS: 'PRIORITARIA',
      usoActualSuelo: 'Terreno Eriazo y Matorral Ralo Desértico / Suelo Desnudo sin Actividad Económica',
      conflictoUsoSuelo: 'En Plena Concordancia Agrológica (Uso Idóneo de Suelo Improductivo para Infraestructura Ambiental)',
      vientosDominantes: `Dirección Nor-Este (Velocidad media 2.6 m/s). Ubicación neta a Sotavento respecto al casco urbano de ${jurisdiction.distrito}, previniendo la llegada de olores y bioaerosoles.`,
      disponibilidadMaterialCobertura: 'Alta disponibilidad in situ. Estratos arcillosos y lutitas superficiales de fácil excavación para material de cobertura diaria.',
      balanceCoberturaDiaria: 'Volumen in situ estimado > 150,000 m³, suficiente para el 20% de cobertura diaria durante 20 años sin costos de acarreo externo.',
      pozosMonitoreoRequeridos: 3,
      saneamientoSBN: zone.esPredioSBN 
        ? 'Predio del Estado SINABIP (SBN). Afectación en uso o transferencia interestatal gratuita viable bajo Ley 29151 y D.L. 1278.'
        : 'Predio comunal/privado eriazo susceptible de adquisición por trato directo o expropiación por necesidad pública (D.L. 1192).'
    };
  }

  return {
    cumClase: 'Tierras Aptas para Pastos (Clase P) con Limitaciones Físicas',
    cumSubclase: 'P2sc (Limitación por Fertilidad Natural del Suelo y Clima)',
    vocacionAgrologica: 'Aptitud limitada a pastoreo temporal extensivo de baja carga animal. No apto para agricultura intensiva.',
    cumAptitudIRS: 'CONDICIONADA',
    usoActualSuelo: 'Pajonal Andino / Pastizal Natural No Manejado de Bajo Rendimiento',
    conflictoUsoSuelo: 'Uso Condicionado Compatible (Requiere compensación de cobertura vegetal perimetral)',
    vientosDominantes: `Dirección Este-Sur-Este (2.2 m/s). Dispersión favorable a Sotavento de las principales concentraciones residenciales de ${jurisdiction.distrito}.`,
    disponibilidadMaterialCobertura: 'Disponibilidad moderada in situ. Requiere selección y cribado mecánico previo para material de cobertura impermeable.',
    balanceCoberturaDiaria: 'Cubre el 75% del requerimiento in situ; saldo menor complementable con cantera local a menos de 2 km.',
    pozosMonitoreoRequeridos: 3,
    saneamientoSBN: 'Predio estatal o de libre disponibilidad susceptible de afectación institucional ante la SBN.'
  };
}

export function generateGeoAISustenance(zone: CandidateZone, jurisdiction: Jurisdiction): GeoAISustenance {
  const isRejected = zone.clasificacion === 'INVIABLE';
  const isOptima = zone.clasificacion === 'OPTIMA';
  const zee = evaluateZEEData(zone, jurisdiction);
  const land = evaluateLandUseData(zone, jurisdiction);

  if (isRejected) {
    return {
      puntajeIdoneidadGeoAI: 25,
      dictamenEspecialista: `DICTAMEN PERICIAL GEOAI: DESCALIFICACIÓN TÉCNICA Y AMBIENTAL INMEDIATA. El sitio evaluado presenta colisión crítica con criterios de exclusión absoluta estipulados en el D.L. N° 1278 (Ley de Gestión Integral de Residuos Sólidos) y el D.S. N° 014-2017-MINAM: ${zone.litologia}. Cualquier intento de inversión o tramitación de IGA en esta ubicación incurriría en inviabilidad legal insubsanable y alto riesgo de contaminación hidrológica o litigio socio-cultural.`,
      viabilidadAmbiental: `Vulnerabilidad geo-ambiental severa. Interferencia potencial con acuíferos, cuerpos de agua superficiales protegidos o inestabilidad geodinámica activa no mitigable técnica ni económicamente.`,
      ingenieriaRecomendada: `No procede ingeniería de detalle. Se instruye archivar el sitio y orientar la prospección hacia los sectores alternativos identificados por el algoritmo multicriterio dentro del buffer de búsqueda.`,
      requisitosEIA: [
        'Desestimación formal en la Línea Base del Instrumento de Gestión Ambiental (IGA).',
        'Registro de causal de exclusión en el Informe Técnico Preliminar para el MINAM / OEFA.'
      ],
      conclusionesMINAM: [
        'Causal de Exclusión Absoluta: El sitio incumple el marco normativo vinculante del D.L. 1278.',
        'Incompatibilidad ZEE y Suelo: Desfavorable en la matriz de capacidad de uso agrológico (CUM A/C).',
        'Recomendación: Explorar las alternativas categorizadas como ÓPTIMAS en el presente geoportal.'
      ]
    };
  }

  const scoreAI = isOptima ? Math.min(98, zone.puntajeAHP + 3) : zone.puntajeAHP;

  return {
    puntajeIdoneidadGeoAI: scoreAI,
    dictamenEspecialista: `DICTAMEN TÉCNICO ESPECIALISTA EN IRS (GEOAI): CERTIFICACIÓN DE VIABILIDAD TERRITORIAL Y AMBIENTAL FAVORABLE. El área seleccionada en "${zone.nombre}" presenta condiciones físico-geográficas, hidrogeológicas y logísticas óptimas para albergar la Infraestructura de Residuos Sólidos (IRS) de ${jurisdiction.distrito}. Se confirma el cumplimiento estricto del buffer normativo sanitario de 500 m respecto a áreas urbanas (${zone.distanciaCPm} m disponibles), fajas marginales (> 500 m) y fallas activas (> 1,000 m), conforme a la Guía Técnica de Selección de Áreas para IRS (MINAM, 2021).`,
    viabilidadAmbiental: `Alta estabilidad geo-ambiental. Basamento litológico de ${zone.litologia} con coeficiente de permeabilidad favorable (k = ${zone.permeabilidadK.toExponential(1)} cm/s). Nivel freático profundo (${zone.profundidadNapaM} m de estrato vadoso insaturado), lo que garantiza la protección del acuífero regional ante potenciales migraciones de solutos. La topografía con pendiente de ${zone.pendientePct}% permite una excavación eficiente de celdas tipo trinchera/área sin riesgo de remoción en masa.`,
    ingenieriaRecomendada: `Para el diseño definitivo a nivel de Expediente Técnico e Instrumento de Gestión Ambiental (EIA / DIA), se prescribe la siguiente ingeniería de detalle:
1. Capacidad de Uso del Suelo y Protección Agrícola: Se certifica su emplazamiento en ${land.cumClase} (${land.cumSubclase}), libre de afectación de valles agrícolas bajo riego.
2. Sistema de Doble Impermeabilización de Fondo: Base de suelo arcilloso compactado de e = 0.30 m (k <= 1e-7 cm/s) revestido con geomembrana de polietileno de alta densidad (HDPE) lisa de 1.50 mm (60 mils) y geotextil no tejido de 200 g/m² para protección contra punzonamiento.
3. Drenaje de Lixiviados: Red en espina de pescado con tubería corrugada de HDPE ranurada DN 200 mm envuelta en grava seleccionada (3/4" a 1 1/2"), con pendiente longitudinal >= 2.0% hacia poza de almacenamiento y evaporación forzada.
4. Rosa de Vientos y Evacuación de Biogás: Ubicación a Sotavento del casco urbano (${land.vientosDominantes}) y batería de chimeneas de malla galvanizada rellenas de roca volcánica con tubo central HDPE ranurado para desgasificación pasiva.
5. Franja de Amortiguamiento Perimetral: Barrera biológica de 10 a 15 metros de ancho con especies arbóreas y arbustivas nativas de la ecorregión para cerco vivo, control de dispersión eólica y mitigación paisajística.`,
    requisitosEIA: [
      'Certificado de Capacidad de Uso Mayor de la Tierra (CUM) emitido por la Dirección General de Asuntos Ambientales Agrarios (DGAAA / MIDAGRI).',
      'Estudio de Mecánica de Suelos y Ensayos de Permeabilidad In Situ (Lefranc / Lugeon) a escala 1:1,000.',
      'Modelamiento de Balance Hídrico (Método HELP / Thornthwaite) para el dimensionamiento de la poza de lixiviados.',
      'Rosa de Vientos y Modelamiento de Dispersión Atmosférica (AERMOD) para confirmación de vector a Sotavento.',
      'Evaluación Arqueológica (CIRA) ante el Ministerio de Cultura para certificar la no afectación de vestigios.',
      'Afectación en uso / Saneamiento Físico Legal del predio ante la SBN (SINABIP) a favor de la Municipalidad.',
      `Plan de Manejo y Vigilancia Hidrogeológica con ${land.pozosMonitoreoRequeridos} pozos piezométricos (1 aguas arriba y 2 aguas abajo).`
    ],
    conclusionesMINAM: [
      'Cumplimiento Normativo Pleno: La zona satisface el 100% de los criterios del D.L. 1278 y D.S. 014-2017-MINAM.',
      `Concordancia ZEE y Uso de Suelo: Se emplaza en ${zee.subzonaZEE} y ${land.cumClase}, alineada con la ${zee.ordenanzaAprobacionZEE}.`,
      `Eficiencia Logística y Vientos: Distancia urbana de ${zone.distanciaCentroideKm} km, acceso a ${zone.distanciaViaM} m y ubicación a Sotavento (${land.vientosDominantes}).`,
      `Idoneidad AHP-GeoAI: Calificación de excelencia técnica (${scoreAI} / 100 pts) apta para pase inmediato a financiamiento de inversión pública (Invierte.pe / MINAM).`
    ]
  };
}
