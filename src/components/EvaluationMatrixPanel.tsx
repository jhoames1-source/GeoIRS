import React, { useState } from 'react';
import { Award, Sliders, CheckCircle2, AlertTriangle, FileText, Download, ShieldCheck } from 'lucide-react';
import { CandidateZone, EvaluationCriteriaWeights, Jurisdiction, SizingResults } from '../types';
import { evaluateZoneAHP, DEFAULT_AHP_WEIGHTS } from '../utils/ahpMatrixEvaluator';

interface EvaluationMatrixPanelProps {
  jurisdiction: Jurisdiction;
  candidateZones: CandidateZone[];
  selectedZone: CandidateZone | null;
  onSelectZone: (zone: CandidateZone) => void;
  sizingResults: SizingResults;
  onExportPDF: () => void;
}

export const EvaluationMatrixPanel: React.FC<EvaluationMatrixPanelProps> = ({
  jurisdiction,
  candidateZones,
  selectedZone,
  onSelectZone,
  sizingResults,
  onExportPDF
}) => {
  const [weights, setWeights] = useState<EvaluationCriteriaWeights>(DEFAULT_AHP_WEIGHTS);

  const handleWeightChange = (field: keyof EvaluationCriteriaWeights, val: number) => {
    setWeights(prev => ({ ...prev, [field]: val }));
  };

  const currentZoneList = candidateZones.filter(z => z.ubigeo === jurisdiction.ubigeo || z.provincia === jurisdiction.provincia);
  const activeZone = selectedZone || currentZoneList[0] || candidateZones[0];

  const ahpEvaluation = activeZone ? evaluateZoneAHP(activeZone, weights) : null;

  return (
    <div className="flex-1 bg-slate-950 p-6 overflow-y-auto space-y-6 text-slate-100">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <Award className="w-6 h-6 text-emerald-400" />
            <span>MATRIZ DE EVALUACIÓN MULTICRITERIO AHP (MINAM CUADRO N° 06)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ponderación técnica de criterios Ambientales, Operativos, Sociales y Geológicos según Decreto Legislativo N° 1278
          </p>
        </div>

        <button
          onClick={onExportPDF}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-emerald-950 transition"
        >
          <Download className="w-4 h-4" />
          <span>Generar Informe Técnico PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* AHP Weight Customizer (4 cols) */}
        <div className="col-span-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl">
          <h3 className="font-extrabold text-sm text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
            <Sliders className="w-4 h-4" />
            <span>Ponderación AHP (%)</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1 text-slate-300">
                <span>1. Criterios Físico-Ambientales:</span>
                <span className="text-emerald-400">{weights.fisicoAmbientalPct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={weights.fisicoAmbientalPct}
                onChange={(e) => handleWeightChange('fisicoAmbientalPct', parseInt(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-950 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1 text-slate-300">
                <span>2. Criterios Operativo-Económicos:</span>
                <span className="text-cyan-400">{weights.operativoEconomicoPct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={weights.operativoEconomicoPct}
                onChange={(e) => handleWeightChange('operativoEconomicoPct', parseInt(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-950 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1 text-slate-300">
                <span>3. Criterios Social-Territoriales:</span>
                <span className="text-amber-400">{weights.socialTerritorialPct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                value={weights.socialTerritorialPct}
                onChange={(e) => handleWeightChange('socialTerritorialPct', parseInt(e.target.value))}
                className="w-full accent-amber-500 bg-slate-950 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1 text-slate-300">
                <span>4. Criterios Climático-Geológicos:</span>
                <span className="text-purple-400">{weights.climaticoGeologicoPct}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={weights.climaticoGeologicoPct}
                onChange={(e) => handleWeightChange('climaticoGeologicoPct', parseInt(e.target.value))}
                className="w-full accent-purple-500 bg-slate-950 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Selected Zone AHP Evaluation Card (8 cols) */}
        <div className="col-span-8 space-y-6">
          {activeZone && ahpEvaluation && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-white">{activeZone.nombre}</h3>
                  <p className="text-xs text-slate-400">
                    Superficie: {activeZone.areaHa} ha | Distancia a Centro Poblado: {activeZone.distanciaCPm} m
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-${ahpEvaluation.colorBadge}-500/20 text-${ahpEvaluation.colorBadge}-400 border border-${ahpEvaluation.colorBadge}-500/30`}>
                    {ahpEvaluation.categoria} ({ahpEvaluation.puntajeTotal} / 100 PTS)
                  </span>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="overflow-hidden rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Criterio AHP</th>
                      <th className="p-3">Sub-criterio Evaluado</th>
                      <th className="p-3 text-center">Peso</th>
                      <th className="p-3 text-center">Puntaje</th>
                      <th className="p-3">Detalle Técnico</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200">
                    {ahpEvaluation.desglose.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-950/50 transition">
                        <td className="p-3 font-semibold text-white">{item.criterio}</td>
                        <td className="p-3 text-slate-400">{item.subcriterio}</td>
                        <td className="p-3 text-center font-bold text-slate-300">{item.pesoAbsoluto}%</td>
                        <td className="p-3 text-center font-extrabold text-emerald-400">{item.puntajePonderado} pts</td>
                        <td className="p-3 text-slate-300 text-[11px] leading-tight">{item.detalle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Candidate Zone Selection List */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
            <h4 className="font-extrabold text-xs text-slate-300 uppercase mb-3">
              Seleccionar Zona Candidata para Calificación:
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {currentZoneList.map((z) => (
                <button
                  key={z.id}
                  onClick={() => onSelectZone(z)}
                  className={`p-3 rounded-xl text-left border transition ${
                    activeZone?.id === z.id
                      ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs truncate">{z.nombre}</div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Superficie: {z.areaHa} ha | AHP Score: {z.puntajeAHP} pts
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
