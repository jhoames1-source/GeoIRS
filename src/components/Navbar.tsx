import React, { useState } from 'react';
import { 
  Recycle, MapPin, Search, Layers, Calculator, Award, Globe2, 
  Terminal, Ruler, ShieldCheck, Download, ChevronRight, Filter, Sparkles
} from 'lucide-react';
import { Jurisdiction } from '../types';
import { PERU_DEPARTMENTS, PERU_JURISDICTIONS } from '../constants/peruDemographics';

interface NavbarProps {
  currentJurisdiction: Jurisdiction;
  onSelectJurisdiction: (j: Jurisdiction) => void;
  activeTab: 'map' | 'calculator' | 'matrix' | 'geoperu';
  onTabChange: (tab: 'map' | 'calculator' | 'matrix' | 'geoperu') => void;
  onOpenScanner: () => void;
  onOpenPythonModal: () => void;
  isMeasurementActive: boolean;
  onToggleMeasurement: () => void;
  onExportPDF: () => void;
  onOpenIRSLocator: () => void;
  onOpenFichaTecnica: () => void;
  onOpenPortada?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentJurisdiction,
  onSelectJurisdiction,
  activeTab,
  onTabChange,
  onOpenScanner,
  onOpenPythonModal,
  isMeasurementActive,
  onToggleMeasurement,
  onExportPDF,
  onOpenIRSLocator,
  onOpenFichaTecnica,
  onOpenPortada
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState<string>(
    PERU_DEPARTMENTS.find(d => d.nombre.toLowerCase() === currentJurisdiction.departamento.toLowerCase())?.id || PERU_DEPARTMENTS[0].id
  );
  
  const currentDept = PERU_DEPARTMENTS.find(d => d.id === selectedDeptId) || PERU_DEPARTMENTS[0];
  const [selectedProvId, setSelectedProvId] = useState<string>(currentDept.provincias[0]?.id || '');
  
  const currentProv = currentDept.provincias.find(p => p.id === selectedProvId) || currentDept.provincias[0];

  const [quickSearchTerm, setQuickSearchTerm] = useState('');

  const filteredQuickList = PERU_JURISDICTIONS.filter(j => 
    j.distrito.toLowerCase().includes(quickSearchTerm.toLowerCase()) ||
    j.provincia.toLowerCase().includes(quickSearchTerm.toLowerCase()) ||
    j.departamento.toLowerCase().includes(quickSearchTerm.toLowerCase()) ||
    j.ubigeo.includes(quickSearchTerm)
  );

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-emerald-500/20 text-slate-100 px-4 py-2 flex items-center justify-between z-50 shadow-xl select-none">
      {/* Brand & Title con Logo Oficial GeoIRS */}
      <div 
        onClick={onOpenPortada}
        className="flex items-center space-x-3 cursor-pointer group select-none transition-all active:scale-95"
        title="Ver Portada de Presentación GeoIRS"
      >
        <div className="relative p-1 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-lg shadow-emerald-950/80 group-hover:border-emerald-400 group-hover:shadow-emerald-500/40 transition-all">
          <img 
            src="/portada/Logo_Icon.png" 
            alt="Logo GeoIRS" 
            className="w-8 h-8 object-contain drop-shadow-md group-hover:scale-110 transition-transform" 
          />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-black text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-200 to-white bg-clip-text text-transparent">
              GeoIRS
            </h1>
            <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-inner">
              Plataforma Espacial IRS
            </span>
            <span className="hidden xl:inline bg-slate-800 text-slate-400 border border-slate-700 text-[9px] font-bold px-1.5 py-0.5 rounded">
              D.L. 1278
            </span>
          </div>
          <p className="text-[10.5px] text-slate-400 font-medium group-hover:text-emerald-300/90 transition-colors">
            Evaluación Territorial & Selección de Sitios (GeoAI)
          </p>
        </div>
      </div>

      {/* Cascading Territorial Selector (Departamento -> Provincia -> Distrito) */}
      <div className="relative flex items-center space-x-2">
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition text-slate-200 shadow-md"
        >
          <MapPin className="w-4 h-4 text-emerald-400" />
          <div className="flex items-center space-x-1">
            <span className="font-extrabold text-white">{currentJurisdiction.departamento}</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-emerald-300 font-bold">{currentJurisdiction.provincia}</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-slate-200">{currentJurisdiction.distrito} ({currentJurisdiction.ubigeo})</span>
          </div>
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-1" />
        </button>

        {/* Dropdown Modal Selector */}
        {isSearchOpen && (
          <div className="absolute top-11 left-0 w-[480px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                Selección Territorial Cascada (Perú)
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">INEI Ubigeo</span>
            </div>

            {/* Quick Filter Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filtro rápido por nombre o ubigeo (ej. Cusco, Yura, Piura...)"
                value={quickSearchTerm}
                onChange={(e) => setQuickSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {quickSearchTerm ? (
              /* Filtered Search Results List */
              <div className="max-h-60 overflow-y-auto space-y-1">
                {filteredQuickList.map(j => (
                  <button
                    key={j.ubigeo}
                    onClick={() => {
                      onSelectJurisdiction(j);
                      setIsSearchOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800/60 flex items-center justify-between transition"
                  >
                    <div>
                      <div className="font-bold text-xs text-white">{j.distrito}</div>
                      <div className="text-[10px] text-slate-400">{j.provincia}, {j.departamento} ({j.region})</div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                      Ubigeo {j.ubigeo}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              /* Cascading Dropdowns: Dept -> Prov -> Dist */
              <div className="space-y-3">
                {/* 1. Departamento / Región */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    1. Seleccionar Departamento / Región:
                  </label>
                  <select
                    value={selectedDeptId}
                    onChange={(e) => {
                      const deptId = e.target.value;
                      setSelectedDeptId(deptId);
                      const dept = PERU_DEPARTMENTS.find(d => d.id === deptId);
                      if (dept && dept.provincias[0]) {
                        setSelectedProvId(dept.provincias[0].id);
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none"
                  >
                    {PERU_DEPARTMENTS.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.nombre} ({d.region})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Provincia */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    2. Seleccionar Provincia:
                  </label>
                  <select
                    value={selectedProvId}
                    onChange={(e) => setSelectedProvId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none"
                  >
                    {currentDept.provincias.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.nombre} ({p.distritos.length} distritos)
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Distrito */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    3. Seleccionar Distrito Evaluado:
                  </label>
                  <div className="max-h-40 overflow-y-auto space-y-1 bg-slate-950 p-2 rounded-lg border border-slate-800">
                    {currentProv.distritos.map(dist => (
                      <button
                        key={dist.ubigeo}
                        onClick={() => {
                          onSelectJurisdiction(dist);
                          setIsSearchOpen(false);
                        }}
                        className={`w-full text-left p-1.5 px-2 rounded flex items-center justify-between text-xs transition ${
                          dist.ubigeo === currentJurisdiction.ubigeo
                            ? 'bg-emerald-600/30 text-emerald-400 font-bold border border-emerald-500/40'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{dist.distrito}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {dist.ubigeo} | {dist.poblacion.toLocaleString()} hab
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Tab Switcher */}
      <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 space-x-1">
        <button
          onClick={() => onTabChange('map')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            activeTab === 'map' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Visor GIS</span>
        </button>

        <button
          onClick={() => onTabChange('calculator')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            activeTab === 'calculator' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Dimensionamiento</span>
        </button>

        <button
          onClick={() => onTabChange('matrix')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            activeTab === 'matrix' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Matriz AHP</span>
        </button>
      </div>

      {/* Action Tools */}
      <div className="flex items-center space-x-2">
        {onOpenPortada && (
          <button
            onClick={onOpenPortada}
            className="bg-emerald-800/50 hover:bg-emerald-700/60 text-emerald-200 border border-emerald-500/40 px-3 py-1.5 rounded-lg text-xs font-black flex items-center space-x-1.5 transition shadow-sm hover:shadow-emerald-950/50 active:scale-95"
            title="Abrir Portada de Presentación GeoIRS"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Portada</span>
          </button>
        )}

        <button
          onClick={onOpenIRSLocator}
          className="bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/40 px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center space-x-1.5 transition shadow-sm"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Localizador IRS (Sitio Relleno)</span>
        </button>

        <button
          onClick={onOpenFichaTecnica}
          className="bg-cyan-600/30 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/40 px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center space-x-1.5 transition shadow-sm"
        >
          <Globe2 className="w-3.5 h-3.5" />
          <span>Ficha Técnica D.L. 1279</span>
        </button>

        <button
          onClick={onOpenScanner}
          className="bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Escáner Exclusión</span>
        </button>

        <button
          onClick={onToggleMeasurement}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition border ${
            isMeasurementActive 
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-950' 
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
          }`}
        >
          <Ruler className="w-3.5 h-3.5" />
          <span>Medición</span>
        </button>

        <button
          onClick={onOpenPythonModal}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition"
        >
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>ArcPy</span>
        </button>

        <button
          onClick={onExportPDF}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition shadow-md shadow-emerald-950"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Reporte PDF</span>
        </button>
      </div>
    </header>
  );
};
