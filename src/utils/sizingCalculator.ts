import { SizingInputs, SizingResults } from '../types';

export function calculateLandfillSizing(inputs: SizingInputs): SizingResults {
  const {
    poblacionServida,
    tasaCrecimiento,
    gpc,
    coberturaRecoleccionPct,
    densidadCelda,
    relacionCoberturaPct,
    alturaPromedioCeldaM,
    factorInfraestructuraAux,
    vidaUtilAnios
  } = inputs;

  const r = tasaCrecimiento / 100.0;
  const cobRec = coberturaRecoleccionPct / 100.0;
  const relCob = relacionCoberturaPct / 100.0;

  const proyeccionAnual: SizingResults['proyeccionAnual'] = [];
  let volAcumuladoM3 = 0.0;
  let pobCurrent = poblacionServida;

  for (let anio = 1; anio <= vidaUtilAnios; anio++) {
    pobCurrent = Math.ceil(poblacionServida * Math.pow(1 + r, anio));
    const genDiariaTon = (pobCurrent * gpc * cobRec) / 1000.0;
    const genAnualTon = genDiariaTon * 365.0;
    const volResiduosAnioM3 = genAnualTon / densidadCelda;
    const volCoberturaAnioM3 = volResiduosAnioM3 * relCob;
    const volTotalAnioM3 = volResiduosAnioM3 + volCoberturaAnioM3;

    volAcumuladoM3 += volTotalAnioM3;

    proyeccionAnual.push({
      anio,
      poblacion: pobCurrent,
      genDiariaTon: Math.round(genDiariaTon * 100) / 100,
      volAcumuladoM3: Math.round(volAcumuladoM3)
    });
  }

  const poblacionFutura = pobCurrent;
  const generacionDiariaTon = (poblacionFutura * gpc * cobRec) / 1000.0;
  const generacionAnualTon = generacionDiariaTon * 365.0;
  const volumenResiduosAnualM3 = generacionAnualTon / densidadCelda;
  const volumenCoberturaAnualM3 = volumenResiduosAnualM3 * relCob;
  const volumenTotalAnualM3 = volumenResiduosAnualM3 + volumenCoberturaAnualM3;

  const areaCeldaDisposicionM2 = volAcumuladoM3 / alturaPromedioCeldaM;
  const areaTotalRequeridaM2 = areaCeldaDisposicionM2 * factorInfraestructuraAux;
  const areaTotalRequeridaHa = areaTotalRequeridaM2 / 10000.0;
  const franjaAmortiguamientoHa = areaTotalRequeridaHa * 0.25;

  return {
    poblacionFutura,
    generacionDiariaTon: Math.round(generacionDiariaTon * 100) / 100,
    generacionAnualTon: Math.round(generacionAnualTon * 100) / 100,
    volumenResiduosAnualM3: Math.round(volumenResiduosAnualM3),
    volumenCoberturaAnualM3: Math.round(volumenCoberturaAnualM3),
    volumenTotalAnualM3: Math.round(volumenTotalAnualM3),
    volumenAcumuladoProyectadoM3: Math.round(volAcumuladoM3),
    areaCeldaDisposicionM2: Math.round(areaCeldaDisposicionM2),
    areaTotalRequeridaM2: Math.round(areaTotalRequeridaM2),
    areaTotalRequeridaHa: Math.round(areaTotalRequeridaHa * 100) / 100,
    franjaAmortiguamientoHa: Math.round(franjaAmortiguamientoHa * 100) / 100,
    proyeccionAnual
  };
}
