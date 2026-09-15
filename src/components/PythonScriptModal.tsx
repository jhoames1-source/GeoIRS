import React, { useState } from 'react';
import { Terminal, X, Copy, Check, Download, Info, Play, FileCode, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { CandidateZone, Jurisdiction } from '../types';
import { generatePythonArcPyScript } from '../utils/pythonScriptGenerator';

interface PythonScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedZone: CandidateZone | null;
  candidateZones?: CandidateZone[];
  jurisdiction?: Jurisdiction;
  onSelectZone?: (zone: CandidateZone) => void;
}

export const PythonScriptModal: React.FC<PythonScriptModalProps> = ({
  isOpen,
  onClose,
  selectedZone,
  candidateZones = [],
  jurisdiction,
  onSelectZone
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'script' | 'manual'>('script');

  if (!isOpen) return null;

  // Si no hay zona seleccionada, tomar la primera de candidateZones o crear una por defecto
  const effectiveZone: CandidateZone = selectedZone || candidateZones[0] || {
    id: 'default-irs-site',
    nombre: `Predio Evaluado (${jurisdiction?.distrito || 'Referencia'})`,
    ubigeo: jurisdiction?.ubigeo || '060301',
    distrito: jurisdiction?.distrito || 'Celendín',
    provincia: jurisdiction?.provincia || 'Celendín',
    departamento: jurisdiction?.departamento || 'Cajamarca',
    areaHa: 25.5,
    coordenadasCentroid: {
      lat: jurisdiction?.lat || -6.87012,
      lng: jurisdiction?.lng || -78.15234
    },
    coordenadasUTM: [
      { vertice: 'V1', este: 815200, norte: 9240500, zona: '17S' },
      { vertice: 'V2', este: 815800, norte: 9240500, zona: '17S' },
      { vertice: 'V3', este: 815800, norte: 9239900, zona: '17S' },
      { vertice: 'V4', este: 815200, norte: 9239900, zona: '17S' }
    ],
    poligonoWGS84: [
      [-6.868, -78.150],
      [-6.868, -78.145],
      [-6.873, -78.145],
      [-6.873, -78.150]
    ],
    distanciaCPm: 1850,
    texturaSuelo: 'Franco Areno-Arcilloso',
    permeabilidadK: 1e-6,
    pendientePct: 6.2,
    distanciaViaM: 450,
    profundidadNapaM: 25,
    esPredioSBN: true,
    clasificacion: 'OPTIMA',
    puntajeAHP: 92.5,
    litologia: 'Depósitos Cuaternarios Compactos',
    distanciaCentroideKm: 3.4
  };

  const scriptCode = generatePythonArcPyScript(effectiveZone);

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `IRS_ArcPy_${effectiveZone.nombre.replace(/\s+/g, '_')}.py`;
    const blob = new Blob([scriptCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl space-y-0">
        {/* Modal Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-cyan-500/20 p-2.5 rounded-xl text-cyan-400 border border-cyan-500/40 shadow-inner">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-sm sm:text-base text-white tracking-wide">
                  INTEGRACIÓN ARCPY & ARCGIS PRO
                </h3>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
                  D.L. 1278 MINAM
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Automatización de Geoprocesamiento Espacial Vectorial & Geodatabase para Infraestructura de Disposición Final
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Selector & Tabs Header */}
        <div className="bg-slate-950/80 px-6 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Selector de zona */}
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-bold text-[11px]">Zona a Procesar:</span>
            {candidateZones.length > 0 ? (
              <select
                value={effectiveZone.id}
                onChange={(e) => {
                  const found = candidateZones.find(z => z.id === e.target.value);
                  if (found && onSelectZone) onSelectZone(found);
                }}
                className="bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-lg px-2.5 py-1 focus:ring-1 focus:ring-cyan-500 outline-none"
              >
                {candidateZones.map(z => (
                  <option key={z.id} value={z.id}>
                    {z.nombre} ({z.areaHa} Ha - {z.clasificacion})
                  </option>
                ))}
              </select>
            ) : (
              <span className="bg-slate-800 text-cyan-300 px-2 py-1 rounded font-bold">
                {effectiveZone.nombre} ({effectiveZone.areaHa} Ha)
              </span>
            )}
          </div>

          {/* Sub-Tabs: Script vs ¿Para qué sirve? */}
          <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('script')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md text-[11px] font-bold transition ${
                activeTab === 'script' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Script Python / ArcPy</span>
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md text-[11px] font-bold transition ${
                activeTab === 'manual' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>¿Para qué sirve ArcPy?</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950/60">
          {activeTab === 'script' ? (
            <div className="space-y-4">
              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <span className="text-emerald-400 font-bold">● Zona UTM:</span>
                  <span className="font-mono font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-white">
                    {effectiveZone.coordenadasUTM[0]?.zona || '17S'} WGS84
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-400">Vértices: {effectiveZone.coordenadasUTM.length}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopy}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition active:scale-95"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '¡Código Copiado!' : 'Copiar Script'}</span>
                  </button>

                  <button
                    onClick={handleDownload}
                    className="bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-black flex items-center space-x-1.5 transition shadow-lg active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar .py</span>
                  </button>
                </div>
              </div>

              {/* Code Pre/Box */}
              <div className="relative">
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-[11px] sm:text-xs overflow-x-auto max-h-[50vh] leading-relaxed shadow-inner selection:bg-cyan-800 selection:text-white">
                  <code>{scriptCode}</code>
                </pre>
              </div>

              {/* Quick instructions bar */}
              <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-xl p-3 flex items-start space-x-3 text-xs text-cyan-200">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-cyan-300">Ejecución en ArcGIS Pro:</span>
                  <p className="text-[11px] text-cyan-100/80 leading-relaxed">
                    Abre la pestaña <strong className="text-white">Analysis</strong> en ArcGIS Pro, haz clic en <strong className="text-white">Python</strong> (o presiona <code className="bg-cyan-950 px-1 py-0.5 rounded text-cyan-300">Ctrl + Alt + P</code>), pega el código o ejecuta el archivo descargado. Creará automáticamente las capas vectoriales y los buffers reglamentarios del MINAM.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Tab: ¿Para qué sirve ArcPy? */
            <div className="space-y-4 text-slate-200 text-xs leading-relaxed">
              {/* Hero explanation */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-400 font-black text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>¿QUÉ ES ARCPY Y CUÁL ES SU IMPORTANCIA EN ESTE GEOPORTAL?</span>
                </div>
                <p className="text-slate-300">
                  <strong className="text-white">ArcPy</strong> es la librería y entorno de programación oficial de <strong className="text-emerald-300">Esri</strong> para automatizar el análisis espacial, la gestión de datos cartográficos y los modelos de geoprocesamiento dentro de <strong className="text-white">ArcGIS Pro</strong>.
                </p>
              </div>

              {/* 3 Pilares */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center space-x-2 text-cyan-400 font-extrabold text-xs">
                    <span className="bg-cyan-500/20 p-1.5 rounded-lg border border-cyan-500/30">1</span>
                    <span>Automatización de Buffers Legales</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Aplica mediante <code className="text-cyan-300">arcpy.analysis.Buffer</code> los radios mínimos obligatorios según el <strong className="text-slate-200">D.L. 1278 (MINAM)</strong>: 500 m a centros poblados, 13 km a aeropuertos (RD 375-2013-MTC) y 1000 m a fallas geológicas.
                  </p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-xs">
                    <span className="bg-emerald-500/20 p-1.5 rounded-lg border border-emerald-500/30">2</span>
                    <span>Intersección con ANP y ZEE</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Usa <code className="text-emerald-300">arcpy.analysis.Intersect</code> para certificar que el predio candidato no invada Áreas Naturales Protegidas (SERNANP) ni zonas de protección de cuencas en la ZEE.
                  </p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-xs">
                    <span className="bg-amber-500/20 p-1.5 rounded-lg border border-amber-500/30">3</span>
                    <span>Exportación a Geodatabase (.gdb)</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Convierte las coordenadas geodésicas y vértices UTM del Geoportal en Feature Classes nativas de ArcGIS, listas para ser incluidas en los expedientes técnicos de proyectos de inversión pública (Invierte.pe).
                  </p>
                </div>
              </div>

              {/* Guía de ejecución en la máquina */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
                <span className="text-xs font-black text-white flex items-center space-x-2">
                  <Play className="w-4 h-4 text-emerald-400" />
                  <span>¿CÓMO EJECUTAR EL SCRIPT EN TU COMPUTADORA?</span>
                </span>

                <ol className="list-decimal list-inside space-y-2 text-[11px] text-slate-300">
                  <li>
                    <strong className="text-white">Opción 1 (Directo en ArcGIS Pro):</strong> Abre tu proyecto en ArcGIS Pro, ve al menú superior <em>Analysis &gt; Python</em>, y pega el script o arrastra el archivo <code className="text-cyan-400">.py</code> generado.
                  </li>
                  <li>
                    <strong className="text-white">Opción 2 (Consola de Windows):</strong> Tu sistema cuenta con el entorno oficial de Python de ArcGIS Pro configurado en:
                    <pre className="bg-slate-950 p-2 rounded-lg text-emerald-400 font-mono text-[10px] mt-1 border border-slate-800 overflow-x-auto">
                      &quot;C:\Program Files\ArcGIS\Pro\bin\Python\envs\arcgispro-py3\python.exe&quot; IRS_ArcPy.py
                    </pre>
                  </li>
                  <li>
                    <strong className="text-white">Opción 3 (ArcGIS Pro Notebooks):</strong> Crea un nuevo Notebook dentro de ArcGIS Pro y ejecuta las celdas paso a paso para visualizar mapas interactivos con <code className="text-cyan-400">arcgis.gis</code>.
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Compatible con ArcGIS Pro 2.8+ / 3.x y Python 3.9+</span>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-1.5 rounded-lg transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
