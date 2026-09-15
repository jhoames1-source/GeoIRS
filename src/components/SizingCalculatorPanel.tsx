import React, { useState } from 'react';
import { Calculator, TrendingUp, Layers, Info, CheckCircle, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { SizingInputs, Jurisdiction } from '../types';
import { calculateLandfillSizing } from '../utils/sizingCalculator';

interface SizingCalculatorPanelProps {
  jurisdiction: Jurisdiction;
}

export const SizingCalculatorPanel: React.FC<SizingCalculatorPanelProps> = ({ jurisdiction }) => {
  const [inputs, setInputs] = useState<SizingInputs>({
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

  const results = calculateLandfillSizing(inputs);

  const handleInputChange = (field: keyof SizingInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex-1 bg-slate-950 p-6 overflow-y-auto space-y-6 text-slate-100">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <Calculator className="w-6 h-6 text-emerald-400" />
            <span>CALCULADORA DE DIMENSIONAMIENTO Y VIDA ÚTIL (MINAM D.L. 1278)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Proyección demográfica y cálculo volumétrico de celdas sanitarias para {jurisdiction.distrito} - {jurisdiction.provincia}
          </p>
        </div>
        <div className="flex space-x-2">
          {[10, 15, 20].map(years => (
            <button
              key={years}
              onClick={() => handleInputChange('vidaUtilAnios', years)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                inputs.vidaUtilAnios === years
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {years} Años
            </button>
          ))}
        </div>
      </div>

      {/* Grid Controls & Results */}
      <div className="grid grid-cols-12 gap-6">
        {/* Controls Column (5 cols) */}
        <div className="col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl">
          <h3 className="font-extrabold text-sm text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
            <Info className="w-4 h-4" />
            <span>Parámetros de Diseño</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Población Servida (hab):</label>
              <input
                type="number"
                value={inputs.poblacionServida}
                onChange={(e) => handleInputChange('poblacionServida', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tasa Crecimiento (%/año):</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.tasaCrecimiento}
                  onChange={(e) => handleInputChange('tasaCrecimiento', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">GPC (kg/hab/día):</label>
                <input
                  type="number"
                  step="0.01"
                  value={inputs.gpc}
                  onChange={(e) => handleInputChange('gpc', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cobertura Recolección (%):</label>
                <input
                  type="number"
                  value={inputs.coberturaRecoleccionPct}
                  onChange={(e) => handleInputChange('coberturaRecoleccionPct', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Densidad Celda (t/m³):</label>
                <input
                  type="number"
                  step="0.05"
                  value={inputs.densidadCelda}
                  onChange={(e) => handleInputChange('densidadCelda', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Material Cobertura (%):</label>
                <input
                  type="number"
                  value={inputs.relacionCoberturaPct}
                  onChange={(e) => handleInputChange('relacionCoberturaPct', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Altura Celda (m):</label>
                <input
                  type="number"
                  value={inputs.alturaPromedioCeldaM}
                  onChange={(e) => handleInputChange('alturaPromedioCeldaM', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Cards & Charts (7 cols) */}
        <div className="col-span-7 space-y-6">
          {/* Key Output Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-emerald-950/40 border border-emerald-800/60 p-4 rounded-2xl">
              <span className="text-xs text-emerald-400 font-bold block">SUPERFICIE REQUERIDA</span>
              <span className="text-2xl font-black text-white">{results.areaTotalRequeridaHa} ha</span>
              <span className="text-[10px] text-slate-400 block mt-1">({results.areaTotalRequeridaM2.toLocaleString()} m²)</span>
            </div>

            <div className="bg-cyan-950/40 border border-cyan-800/60 p-4 rounded-2xl">
              <span className="text-xs text-cyan-400 font-bold block">VOLUMEN ACUMULADO</span>
              <span className="text-2xl font-black text-white">{results.volumenAcumuladoProyectadoM3.toLocaleString()} m³</span>
              <span className="text-[10px] text-slate-400 block mt-1">Proyección {inputs.vidaUtilAnios} Años</span>
            </div>

            <div className="bg-amber-950/40 border border-amber-800/60 p-4 rounded-2xl">
              <span className="text-xs text-amber-400 font-bold block">PRODUCCIÓN DIARIA</span>
              <span className="text-2xl font-black text-white">{results.generacionDiariaTon} t/día</span>
              <span className="text-[10px] text-slate-400 block mt-1">Pob. Futura: {results.poblacionFutura.toLocaleString()} hab</span>
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
            <h4 className="font-bold text-xs text-slate-200 uppercase mb-4 flex items-center justify-between">
              <span>Curva de Acumulación Volumétrica y Crecimiento Demográfico</span>
              <span className="text-[10px] text-emerald-400 font-mono">r = {inputs.tasaCrecimiento}% / año</span>
            </h4>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.proyeccionAnual}>
                  <defs>
                    <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="anio" stroke="#94a3b8" fontSize={11} label={{ value: 'Año de Operación', position: 'insideBottom', offset: -5, fill: '#94a3b8' }} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '12px' }}
                    formatter={(val: any) => [`${Number(val).toLocaleString()} m³`, 'Volumen Acumulado']}
                  />
                  <Area type="monotone" dataKey="volAcumuladoM3" stroke="#10b981" fillOpacity={1} fill="url(#volGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
