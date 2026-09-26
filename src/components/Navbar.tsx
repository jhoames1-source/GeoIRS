import React, { useState, useEffect } from 'react';
import { 
  MapPin, Search, Layers, Calculator, Award, Globe2, 
  Terminal, Ruler, ShieldCheck, Download, ChevronRight, Filter, Sparkles,
  Menu, X, ExternalLink
} from 'lucide-react';
import { Jurisdiction } from '../types';
import { PERU_DEPARTMENTS, PERU_JURISDICTIONS } from '../constants/peruDemographics';

interface NavbarProps {
  currentJurisdiction: Jurisdiction;
  onSelectJurisdiction: (j: Jurisdiction) => void;
  activeTab: 'map' | 'calculator' | 'matrix';
  onTabChange: (tab: 'map' | 'calculator' | 'matrix') => void;
  onOpenScanner?: () => void;
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const isElectron = typeof window !== 'undefined' && !!(window as any).electronAPI;

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sincronización del selector cascada
  const [selectedDeptId, setSelectedDeptId] = useState<string>(() => {
    return PERU_DEPARTMENTS.find(d => d.nombre.toLowerCase() === currentJurisdiction.departamento.toLowerCase())?.id || PERU_DEPARTMENTS[0].id;
  });

  const currentDept = PERU_DEPARTMENTS.find(d => d.id === selectedDeptId) || PERU_DEPARTMENTS[0];

  const [selectedProvId, setSelectedProvId] = useState<string>(() => {
    const prov = currentDept.provincias.find(p => p.nombre.toLowerCase() === currentJurisdiction.provincia.toLowerCase());
    return prov?.id || currentDept.provincias[0]?.id || '';
  });

  const currentProv = currentDept.provincias.find(p => p.id === selectedProvId) || currentDept.provincias[0] || { id: '', nombre: '', distritos: [] };

  // Re-sincronizar cuando cambie la jurisdicción activa desde cualquier origen
  useEffect(() => {
    const dept = PERU_DEPARTMENTS.find(d => d.nombre.toLowerCase() === currentJurisdiction.departamento.toLowerCase());
    if (dept) {
      setSelectedDeptId(dept.id);
      const prov = dept.provincias.find(p => p.nombre.toLowerCase() === currentJurisdiction.provincia.toLowerCase());
      if (prov) {
        setSelectedProvId(prov.id);
      } else if (dept.provincias.length > 0) {
        setSelectedProvId(dept.provincias[0].id);
      }
    }
  }, [currentJurisdiction]);

  const [quickSearchTerm, setQuickSearchTerm] = useState('');

  const filteredQuickList = PERU_JURISDICTIONS.filter(j => 
    j.distrito.toLowerCase().includes(quickSearchTerm.toLowerCase()) ||
    j.provincia.toLowerCase().includes(quickSearchTerm.toLowerCase()) ||
    j.departamento.toLowerCase().includes(quickSearchTerm.toLowerCase()) ||
    j.ubigeo.includes(quickSearchTerm)
  );

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-emerald-500/20 text-slate-100 px-3 sm:px-4 py-2 z-50 shadow-xl select-none relative">
      <div className="flex items-center justify-between gap-2">
        {/* Brand & Title con Logo Oficial GeoIRS */}
        <div 
          onClick={onOpenPortada}
          className="flex items-center space-x-2.5 cursor-pointer group select-none transition-all active:scale-95 shrink-0"
          title="Ver Portada de Presentación GeoIRS"
        >
          <div className="relative p-1 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-lg shadow-emerald-950/80 group-hover:border-emerald-400 group-hover:shadow-emerald-500/40 transition-all">
            <img 
              src="/portada/Logo_Icon.png" 
              alt="Logo GeoIRS" 
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-md group-hover:scale-110 transition-transform" 
            />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="font-black text-base sm:text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-200 to-white bg-clip-text text-transparent">
                GeoIRS
              </h1>
              <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[8px] sm:text-[9px] font-black uppercase px-1.5 sm:px-2 py-0.5 rounded-full shadow-inner">
                Plataforma IRS
              </span>
              {isElectron ? (
                <span className="hidden md:inline-flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-[8.5px] font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40 shadow-inner" title="Versión de Escritorio Windows: 100% de capas locales cargadas">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                  <span>PC Local (100% Capas)</span>
                </span>
              ) : isOnline ? (
                <span className="hidden md:inline-flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-[8.5px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 shadow-inner" title="Conectado a Internet (Vercel & WMS Nacionales)">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>En Línea (Cloud)</span>
                </span>
              ) : (
                <span className="hidden md:inline-flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-[8.5px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/30 shadow-inner" title="Sin conexión a Internet: modo autónomo">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Offline</span>
                </span>
              )}
            </div>
            <p className="text-[9.5px] sm:text-[10.5px] text-slate-400 font-medium hidden sm:block">
              Evaluación Territorial & Selección de Sitios (GeoAI)
            </p>
          </div>
        </div>

        {/* Cascading Territorial Selector (Departamento -> Provincia -> Distrito) */}
        <div className="relative flex items-center shrink-0">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex items-center space-x-1.5 sm:space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition text-slate-200 shadow-md max-w-[180px] sm:max-w-none"
            title="Cambiar Departamento / Provincia / Distrito"
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            <div className="flex items-center space-x-1 truncate text-[11px] sm:text-xs">
              <span className="font-extrabold text-white hidden md:inline">{currentJurisdiction.departamento}</span>
              <ChevronRight className="w-3 h-3 text-slate-500 hidden md:inline shrink-0" />
              <span className="text-emerald-300 font-bold hidden sm:inline">{currentJurisdiction.provincia}</span>
              <ChevronRight className="w-3 h-3 text-slate-500 hidden sm:inline shrink-0" />
              <span className="text-slate-100 font-bold truncate">{currentJurisdiction.distrito}</span>
            </div>
            <Filter className="w-3 h-3 text-slate-400 shrink-0 ml-0.5" />
          </button>

          {/* Dropdown Modal Selector con soporte completo Mobile & Desktop */}
          {isSearchOpen && (
            <div className="fixed inset-x-2 top-14 sm:absolute sm:top-11 sm:left-0 sm:inset-x-auto w-auto sm:w-[480px] max-w-[calc(100vw-1rem)] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-3.5 sm:p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3.5 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                    Selección Territorial Cascada
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                    25 Regiones • 196 Provincias
                  </span>
                </div>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Filter Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filtro rápido por nombre o ubigeo (ej. Cajamarca, Cutervo, Celendín...)"
                  value={quickSearchTerm}
                  onChange={(e) => setQuickSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {quickSearchTerm ? (
                /* Filtered Search Results List */
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {filteredQuickList.slice(0, 50).map(j => (
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
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900/50">
                        Ubigeo {j.ubigeo}
                      </span>
                    </button>
                  ))}
                  {filteredQuickList.length === 0 && (
                    <p className="text-center text-xs text-slate-500 py-3">No se encontraron jurisdicciones con "{quickSearchTerm}"</p>
                  )}
                </div>
              ) : (
                /* Cascading Dropdowns: Dept -> Prov -> Dist */
                <div className="space-y-3">
                  {/* 1. Departamento / Región */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      1. Seleccionar Departamento / Región ({PERU_DEPARTMENTS.length} departamentos):
                    </label>
                    <select
                      value={selectedDeptId}
                      onChange={(e) => {
                        const deptId = e.target.value;
                        setSelectedDeptId(deptId);
                        const dept = PERU_DEPARTMENTS.find(d => d.id === deptId);
                        if (dept && dept.provincias.length > 0) {
                          setSelectedProvId(dept.provincias[0].id);
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none"
                    >
                      {PERU_DEPARTMENTS.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.nombre} ({d.provincias.length} provincias)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Provincia */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      2. Seleccionar Provincia de {currentDept.nombre} ({currentDept.provincias.length} provincias):
                    </label>
                    <select
                      value={selectedProvId}
                      onChange={(e) => setSelectedProvId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none"
                    >
                      {currentDept.provincias.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.nombre} ({p.distritos.length} distritos evaluados)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 3. Distrito */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      3. Seleccionar Distrito ({currentProv.distritos.length} disponibles en {currentProv.nombre}):
                    </label>
                    <div className="max-h-48 overflow-y-auto space-y-1 bg-slate-950 p-2 rounded-lg border border-slate-800">
                      {currentProv.distritos.map(dist => (
                        <button
                          key={dist.ubigeo}
                          onClick={() => {
                            onSelectJurisdiction(dist);
                            setIsSearchOpen(false);
                          }}
                          className={`w-full text-left p-1.5 px-2.5 rounded-lg flex items-center justify-between text-xs transition ${
                            dist.ubigeo === currentJurisdiction.ubigeo
                              ? 'bg-emerald-600/30 text-emerald-400 font-bold border border-emerald-500/40'
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="font-medium">{dist.distrito}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {dist.ubigeo} | {dist.poblacion ? dist.poblacion.toLocaleString() : 'N/D'} hab
                          </span>
                        </button>
                      ))}
                      {currentProv.distritos.length === 0 && (
                        <p className="text-center text-xs text-slate-500 py-2">No hay distritos registrados en esta provincia.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main Tab Switcher - Visible en pantallas medianas y grandes */}
        <div className="hidden lg:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 space-x-1 shrink-0">
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

        {/* Action Tools - Desktop (>= xl) */}
        <div className="hidden xl:flex items-center space-x-1.5 shrink-0">
          {onOpenPortada && (
            <button
              onClick={onOpenPortada}
              className="bg-emerald-800/50 hover:bg-emerald-700/60 text-emerald-200 border border-emerald-500/40 px-2.5 py-1.5 rounded-lg text-xs font-black flex items-center space-x-1.5 transition shadow-sm hover:shadow-emerald-950/50 active:scale-95"
              title="Abrir Portada de Presentación GeoIRS"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Portada</span>
            </button>
          )}

          <button
            onClick={onOpenIRSLocator}
            className="bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/40 px-2.5 py-1.5 rounded-lg text-xs font-extrabold flex items-center space-x-1.5 transition shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Localizador IRS</span>
          </button>

          <button
            onClick={onOpenFichaTecnica}
            className="bg-cyan-600/30 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/40 px-2.5 py-1.5 rounded-lg text-xs font-extrabold flex items-center space-x-1.5 transition shadow-sm"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Ficha D.L. 1279</span>
          </button>

          <a
            href="https://geoperu.gob.pe"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-500/40 px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition shadow-sm"
            title="Abrir Plataforma Oficial GeoPerú (PCM) en pestaña externa"
          >
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
            <span>GeoPerú</span>
          </a>

          <button
            onClick={onToggleMeasurement}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition border ${
              isMeasurementActive 
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Medir</span>
          </button>

          <button
            onClick={onOpenPythonModal}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>ArcPy</span>
          </button>

          <button
            onClick={onExportPDF}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition shadow-md shadow-emerald-950"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>
        </div>

        {/* Botón de Menú Móvil / Tablet (< xl) */}
        <div className="flex xl:hidden items-center space-x-1.5">
          <button
            onClick={onOpenIRSLocator}
            className="bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 p-1.5 rounded-lg text-xs font-bold flex items-center"
            title="Localizador IRS"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            aria-label="Abrir menú de herramientas"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Drawer / Desplegable Móvil (< xl) */}
      {isMobileMenuOpen && (
        <div className="xl:hidden mt-2 pt-2 border-t border-slate-800 space-y-2.5 animate-in fade-in duration-150">
          {/* Tabs Selector Móvil */}
          <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => { onTabChange('map'); setIsMobileMenuOpen(false); }}
              className={`py-1.5 text-center text-xs font-bold rounded-lg flex items-center justify-center space-x-1 ${
                activeTab === 'map' ? 'bg-emerald-600 text-white' : 'text-slate-400'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Visor GIS</span>
            </button>
            <button
              onClick={() => { onTabChange('calculator'); setIsMobileMenuOpen(false); }}
              className={`py-1.5 text-center text-xs font-bold rounded-lg flex items-center justify-center space-x-1 ${
                activeTab === 'calculator' ? 'bg-emerald-600 text-white' : 'text-slate-400'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Cálculo</span>
            </button>
            <button
              onClick={() => { onTabChange('matrix'); setIsMobileMenuOpen(false); }}
              className={`py-1.5 text-center text-xs font-bold rounded-lg flex items-center justify-center space-x-1 ${
                activeTab === 'matrix' ? 'bg-emerald-600 text-white' : 'text-slate-400'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Matriz AHP</span>
            </button>
          </div>

          {/* Herramientas Móvil */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {onOpenPortada && (
              <button
                onClick={() => { onOpenPortada(); setIsMobileMenuOpen(false); }}
                className="bg-emerald-800/40 text-emerald-300 border border-emerald-500/30 p-2 rounded-lg text-xs font-bold flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Portada</span>
              </button>
            )}

            <button
              onClick={() => { onOpenIRSLocator(); setIsMobileMenuOpen(false); }}
              className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 p-2 rounded-lg text-xs font-bold flex items-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Localizador IRS</span>
            </button>

            <button
              onClick={() => { onOpenFichaTecnica(); setIsMobileMenuOpen(false); }}
              className="bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 p-2 rounded-lg text-xs font-bold flex items-center space-x-2"
            >
              <Globe2 className="w-4 h-4" />
              <span>Ficha Técnica</span>
            </button>

            <a
              href="https://geoperu.gob.pe"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-indigo-950/60 text-indigo-300 border border-indigo-500/40 p-2 rounded-lg text-xs font-bold flex items-center space-x-2"
            >
              <ExternalLink className="w-4 h-4 text-indigo-400" />
              <span>GeoPerú Oficial ↗</span>
            </a>

            <button
              onClick={() => { onToggleMeasurement(); setIsMobileMenuOpen(false); }}
              className={`p-2 rounded-lg text-xs font-bold flex items-center space-x-2 border ${
                isMeasurementActive ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              <Ruler className="w-4 h-4" />
              <span>Medición</span>
            </button>

            <button
              onClick={() => { onOpenPythonModal(); setIsMobileMenuOpen(false); }}
              className="bg-slate-800 text-slate-300 border border-slate-700 p-2 rounded-lg text-xs font-bold flex items-center space-x-2"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>ArcPy Script</span>
            </button>

            <button
              onClick={() => { onExportPDF(); setIsMobileMenuOpen(false); }}
              className="col-span-2 sm:col-span-3 bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 shadow"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Reporte Oficial PDF</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
