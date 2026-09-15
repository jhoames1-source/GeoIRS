export type RegionPeru = 'COSTA' | 'SIERRA' | 'SELVA';

export interface Jurisdiction {
  ubigeo: string;
  departamento: string;
  provincia: string;
  distrito: string;
  region: RegionPeru;
  poblacion: number;
  gpc: number; // kg/hab/dia
  tasaCrecimiento: number; // %
  lat: number;
  lng: number;
  zoom: number;
  nombre?: string;
}

export interface UTMCoordinate {
  vertice: string;
  este: number;
  norte: number;
  zona: string; // e.g. "18S"
}

export interface CandidateZone {
  id: string;
  nombre: string;
  ubigeo: string;
  distrito: string;
  provincia: string;
  departamento: string;
  areaHa: number;
  coordenadasCentroid: { lat: number; lng: number };
  coordenadasUTM: UTMCoordinate[];
  poligonoWGS84: [number, number][]; // [lat, lng][]
  distanciaCPm: number;
  texturaSuelo: string;
  permeabilidadK: number; // cm/s
  pendientePct: number;
  distanciaViaM: number;
  profundidadNapaM: number;
  esPredioSBN: boolean;
  clasificacion: 'OPTIMA' | 'FAVORABLE' | 'REGULAR' | 'INVIABLE';
  puntajeAHP: number; // 0 a 100
  litologia: string;
  distanciaCentroideKm: number;
  // Zonificación Ecológica y Económica (ZEE) & Sustento GeoAI
  subzonaZEE?: string;
  categoriaZEE?: 'PROTECCION' | 'RECUPERACION' | 'PRODUCTIVA' | 'TRATAMIENTO_ESPECIAL' | 'URBANA_INDUSTRIAL';
  compatibilidadZEE?: 'COMPATIBLE_ALTA' | 'COMPATIBLE_CON_RESTRICCIONES' | 'INCOMPATIBLE';
  ordenanzaAprobacionZEE?: string;
  sustentoTecnicoZEE?: string;
  sustentoGeoAI?: {
    dictamenEspecialista: string;
    viabilidadAmbiental: string;
    ingenieriaRecomendada: string;
    requisitosEIA: string[];
    conclusionesMINAM: string[];
    puntajeIdoneidadGeoAI: number;
  };
  // Capacidad y Uso del Suelo (D.S. 017-2009-AG / MIDAGRI & MINAM)
  cumClase?: string;
  cumSubclase?: string;
  vocacionAgrologica?: string;
  cumAptitudIRS?: 'PRIORITARIA' | 'CONDICIONADA' | 'PROHIBIDA';
  usoActualSuelo?: string;
  conflictoUsoSuelo?: string;
  vientosDominantes?: string;
  disponibilidadMaterialCobertura?: string;
  pozosMonitoreoRequeridos?: number;
  saneamientoSBN?: string;
}

export type CategoryWMS = 'EXCLUSION_LEGAL' | 'RESTRICCION_TECNICA' | 'INFRAESTRUCTURA_TERRITORIAL' | 'ZEE_REGIONAL';

export interface WMSLayerConfig {
  id: string;
  nombre: string;
  entidad: 'MINAM' | 'INGEMMET' | 'ANA' | 'SERNANP' | 'MTC' | 'OEFA' | 'SBN' | 'MINCUL' | 'GEOPERU' | 'COFOPRI' | 'GORE' | 'SENASA';
  urlWms: string;
  layers: string;
  categoria: CategoryWMS;
  opacidad: number; // 0.1 a 1.0
  visible: boolean;
  descripcion: string;
  preset: string[]; // Presets donde esta capa se activa por defecto
  grupo?: string; // e.g. 'red_vial', 'hidrografia', 'zee'
  groupNombre?: string; // e.g. 'Red Vial y Accesibilidad'
  subNombre?: string; // e.g. 'Red Vial Nacional (MTC)'
  departamento?: string;
}

export interface LayerPreset {
  id: string;
  nombre: string;
  descripcion: string;
  layerIds: string[];
}

export interface SizingInputs {
  poblacionServida: number;
  tasaCrecimiento: number; // %
  gpc: number; // kg/hab/dia
  coberturaRecoleccionPct: number; // %
  densidadSuelto: number; // t/m3
  densidadCompactadoTruck: number; // t/m3
  densidadCelda: number; // t/m3
  relacionCoberturaPct: number; // % (default 20%)
  alturaPromedioCeldaM: number; // m
  factorInfraestructuraAux: number; // 1.30
  vidaUtilAnios: number; // 10, 15, 20
}

export interface SizingResults {
  poblacionFutura: number;
  generacionDiariaTon: number;
  generacionAnualTon: number;
  volumenResiduosAnualM3: number;
  volumenCoberturaAnualM3: number;
  volumenTotalAnualM3: number;
  volumenAcumuladoProyectadoM3: number;
  areaCeldaDisposicionM2: number;
  areaTotalRequeridaM2: number;
  areaTotalRequeridaHa: number;
  franjaAmortiguamientoHa: number;
  proyeccionAnual: Array<{
    anio: number;
    poblacion: number;
    genDiariaTon: number;
    volAcumuladoM3: number;
  }>;
}

export interface EvaluationCriteriaWeights {
  fisicoAmbientalPct: number; // 35%
  operativoEconomicoPct: number; // 30%
  socialTerritorialPct: number; // 20%
  climaticoGeologicoPct: number; // 15%
}

export interface AHPScoreBreakdown {
  criterio: string;
  subcriterio: string;
  pesoAbsoluto: number;
  puntajeObtenido: number;
  puntajePonderado: number;
  detalle: string;
}

export interface AHPResult {
  puntajeTotal: number;
  categoria: 'OPTIMA' | 'FAVORABLE' | 'REGULAR' | 'INVIABLE';
  colorBadge: string;
  desglose: AHPScoreBreakdown[];
  cumpleExclusionesLegales: boolean;
}
