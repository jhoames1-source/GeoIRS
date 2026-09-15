import { CandidateZone, EvaluationCriteriaWeights, AHPResult, AHPScoreBreakdown } from '../types';

export const DEFAULT_AHP_WEIGHTS: EvaluationCriteriaWeights = {
  fisicoAmbientalPct: 35,
  operativoEconomicoPct: 30,
  socialTerritorialPct: 20,
  climaticoGeologicoPct: 15
};

export function evaluateZoneAHP(
  zone: CandidateZone,
  weights: EvaluationCriteriaWeights = DEFAULT_AHP_WEIGHTS
): AHPResult {
  const desglose: AHPScoreBreakdown[] = [];

  // Exclusiones Legales Absolutas
  const cumpleExclusiones = zone.distanciaCPm >= 500 && zone.pendientePct <= 25.0;

  // 1. Distancia a Centros Poblados (Social/Territorial)
  let ptsCP = 0;
  let detCP = '';
  if (zone.distanciaCPm >= 1000 && zone.distanciaCPm <= 3000) {
    ptsCP = 100;
    detCP = `Distancia óptima de ${zone.distanciaCPm} m a zona urbana (1-3 km).`;
  } else if (zone.distanciaCPm > 3000) {
    ptsCP = 80;
    detCP = `Distancia amplia de ${zone.distanciaCPm} m (> 3 km). Mayor flete.`;
  } else if (zone.distanciaCPm >= 500) {
    ptsCP = 50;
    detCP = `Distancia mínima de ${zone.distanciaCPm} m (500m - 1km). Requere franja densa.`;
  } else {
    ptsCP = 0;
    detCP = `Inadmisible: ${zone.distanciaCPm} m (< 500m prohibido por D.L. 1278).`;
  }

  // 2. Geología y Permeabilidad (Físico-Ambiental)
  let ptsGeol = 0;
  let detGeol = '';
  if (zone.permeabilidadK <= 1e-6) {
    ptsGeol = 100;
    detGeol = `Impermeable (k = ${zone.permeabilidadK.toExponential(1)} cm/s). ${zone.texturaSuelo}.`;
  } else if (zone.permeabilidadK <= 1e-5) {
    ptsGeol = 60;
    detGeol = `Permeabilidad moderada (k = ${zone.permeabilidadK.toExponential(1)} cm/s). Requiere geomembrana HDPE 2mm.`;
  } else {
    ptsGeol = 25;
    detGeol = `Alta permeabilidad. Terreno permeable descartado.`;
  }

  // 3. Pendiente del Terreno (Climático/Geológico)
  let ptsPend = 0;
  let detPend = '';
  if (zone.pendientePct >= 2.0 && zone.pendientePct <= 10.0) {
    ptsPend = 100;
    detPend = `Pendiente plana a suave (${zone.pendientePct}%). Mínimo movimiento de tierras.`;
  } else if (zone.pendientePct > 10.0 && zone.pendientePct <= 20.0) {
    ptsPend = 70;
    detPend = `Pendiente moderada (${zone.pendientePct}%). Requiere terraceo.`;
  } else if (zone.pendientePct > 20.0 && zone.pendientePct <= 25.0) {
    ptsPend = 35;
    detPend = `Pendiente fuerte (${zone.pendientePct}%). Riesgo de estabilidad de taludes.`;
  } else {
    ptsPend = 0;
    detPend = `Inviable: Pendiente > 25% (${zone.pendientePct}%).`;
  }

  // 4. Vías de Acceso (Operativo/Económico)
  let ptsVias = 0;
  let detVias = '';
  if (zone.distanciaViaM <= 1000) {
    ptsVias = 100;
    detVias = `Excelente conectividad (< 1 km a vía principal: ${zone.distanciaViaM}m).`;
  } else if (zone.distanciaViaM <= 3000) {
    ptsVias = 70;
    detVias = `Acceso cercano (${zone.distanciaViaM}m). Requiere afirmado menor.`;
  } else {
    ptsVias = 40;
    detVias = `Acceso distante (${zone.distanciaViaM}m). Alto costo de apertura de trocha.`;
  }

  // 5. Napa Freática (Físico-Ambiental)
  let ptsNapa = 0;
  let detNapa = '';
  if (zone.profundidadNapaM > 20) {
    ptsNapa = 100;
    detNapa = `Acuífero profundo (${zone.profundidadNapaM}m). Sin riesgo de contaminación subsuperficial.`;
  } else if (zone.profundidadNapaM >= 10) {
    ptsNapa = 60;
    detNapa = `Napa freática a ${zone.profundidadNapaM}m. Requiere subdrenaje de lixiviados.`;
  } else {
    ptsNapa = 20;
    detNapa = `Napa freática superficial (< 10m). Riesgo hidrológico alto.`;
  }

  // 6. Propiedad del Predio (Social/Territorial)
  let ptsLegal = zone.esPredioSBN ? 100 : 60;
  let detLegal = zone.esPredioSBN
    ? 'Predio del Estado registrado en SBN (SINABIP). Afectación en uso municipal directa.'
    : 'Predio de propiedad privada o comunal. Requiere saneamiento o expropiación.';

  // Cálculo AHP Ponderado
  const wFA = weights.fisicoAmbientalPct / 100.0;
  const wOE = weights.operativoEconomicoPct / 100.0;
  const wST = weights.socialTerritorialPct / 100.0;
  const wCG = weights.climaticoGeologicoPct / 100.0;

  const scoreFA = (ptsGeol * 0.6) + (ptsNapa * 0.4);
  const scoreOE = (ptsVias * 0.7) + ((100 - (zone.distanciaCentroideKm * 2)) * 0.3);
  const scoreST = (ptsCP * 0.6) + (ptsLegal * 0.4);
  const scoreCG = ptsPend;

  desglose.push(
    { criterio: 'Físico-Ambiental', subcriterio: 'Geología y Napa Freática', pesoAbsoluto: weights.fisicoAmbientalPct, puntajeObtenido: Math.round(scoreFA), puntajePonderado: Math.round(scoreFA * wFA), detalle: `${detGeol} | ${detNapa}` },
    { criterio: 'Operativo-Económico', subcriterio: 'Vías y Flete', pesoAbsoluto: weights.operativoEconomicoPct, puntajeObtenido: Math.round(scoreOE), puntajePonderado: Math.round(scoreOE * wOE), detalle: `${detVias} | Distancia a centroide: ${zone.distanciaCentroideKm} km.` },
    { criterio: 'Social-Territorial', subcriterio: 'Buffer Urbano y SBN', pesoAbsoluto: weights.socialTerritorialPct, puntajeObtenido: Math.round(scoreST), puntajePonderado: Math.round(scoreST * wST), detalle: `${detCP} | ${detLegal}` },
    { criterio: 'Climático-Geológico', subcriterio: 'Pendiente y Estabilidad', pesoAbsoluto: weights.climaticoGeologicoPct, puntajeObtenido: Math.round(scoreCG), puntajePonderado: Math.round(scoreCG * wCG), detalle: detPend }
  );

  const puntajeTotal = Math.round((scoreFA * wFA) + (scoreOE * wOE) + (scoreST * wST) + (scoreCG * wCG));

  let categoria: AHPResult['categoria'] = 'INVIABLE';
  let colorBadge = 'danger';

  if (cumpleExclusiones && puntajeTotal >= 85) {
    categoria = 'OPTIMA';
    colorBadge = 'emerald';
  } else if (cumpleExclusiones && puntajeTotal >= 65) {
    categoria = 'FAVORABLE';
    colorBadge = 'cyan';
  } else if (cumpleExclusiones && puntajeTotal >= 50) {
    categoria = 'REGULAR';
    colorBadge = 'amber';
  } else {
    categoria = 'INVIABLE';
    colorBadge = 'rose';
  }

  return {
    puntajeTotal,
    categoria,
    colorBadge,
    desglose,
    cumpleExclusionesLegales: cumpleExclusiones
  };
}
