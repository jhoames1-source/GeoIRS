import React, { useState } from 'react';
import { 
  Layers, Eye, EyeOff, Sliders, Bookmark, Download, Upload, Plus, X, 
  ShieldAlert, CheckCircle2, AlertTriangle, ChevronDown, ChevronRight, ChevronLeft,
  Folder, FolderOpen, Compass, MapPin, Search
} from 'lucide-react';
import { WMSLayerConfig, LayerPreset, CategoryWMS } from '../types';
import { LAYER_PRESETS } from '../constants/wmsLayers';

interface LayerTOCProps {
  layers: WMSLayerConfig[];
  onToggleLayer: (id: string) => void;
  onChangeOpacity: (id: string, opacity: number) => void;
  onApplyPreset: (preset: LayerPreset) => void;
  onExportConfig: () => void;
  onImportConfig: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddCustomLayer: (newLayer: WMSLayerConfig) => void;
  layerStatuses?: Record<string, 'OK' | 'ERROR' | 'LOADING'>;
  onFlyToCoordinates?: (lat: number, lng: number, zoom: number) => void;
}

const REGION_COORDINATES: Record<string, [number, number, number]> = {
  'AMAZONAS': [-6.23, -77.87, 8],
  'AREQUIPA': [-16.40, -71.53, 8],
  'AYACUCHO': [-13.16, -74.22, 8],
  'CAJAMARCA': [-7.16, -78.50, 8],
  'CALLAO': [-12.05, -77.12, 11],
  'CUSCO': [-13.53, -71.97, 8],
  'HUANCAVELICA': [-12.78, -74.97, 8],
  'HUANUCO': [-9.93, -76.24, 8],
  'JUNIN': [-12.06, -75.20, 8],
  'LAMBAYEQUE': [-6.77, -79.84, 9],
  'LORETO_ALTO_AMAZONAS': [-5.89, -76.10, 8],
  'MADRE_DE_DIOS': [-12.59, -69.18, 8],
  'MOQUEGUA': [-17.19, -70.93, 9],
  'PIURA': [-5.19, -80.63, 8],
  'PUNO': [-15.84, -70.02, 8],
  'SAN_MARTIN': [-6.48, -76.36, 8],
  'TACNA': [-18.01, -70.25, 9],
  'TUMBES': [-3.56, -80.45, 9],
  'UCAYALI': [-8.38, -74.55, 8]
};

export const LayerTOC: React.FC<LayerTOCProps> = ({
  layers,
  onToggleLayer,
  onChangeOpacity,
  onApplyPreset,
  onExportConfig,
  onImportConfig,
  onAddCustomLayer,
  layerStatuses = {},
  onFlyToCoordinates
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'EXCLUSIONES' | 'RESTRICCIONES' | 'INFRAESTRUCTURA' | 'ZEE'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Selected ZEE region in dropdown
  const [selectedZEERegion, setSelectedZEERegion] = useState<string>('CAJAMARCA');

  // Collapsible groups
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    hidrografia: true,
    red_vial: true,
    zee: false,
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  // Custom Layer Form state
  const [nombre, setNombre] = useState('');
  const [entidad, setEntidad] = useState<'MINAM' | 'INGEMMET' | 'ANA' | 'SERNANP' | 'MTC' | 'OEFA' | 'SBN' | 'MINCUL' | 'GEOPERU' | 'GORE' | 'SENASA'>('MINAM');
  const [urlWms, setUrlWms] = useState('');
  const [wmsLayerName, setWmsLayerName] = useState('');
  const [categoria, setCategoria] = useState<CategoryWMS>('EXCLUSION_LEGAL');

  const getEntityBadgeColor = (entidadStr: string) => {
    switch (entidadStr) {
      case 'SERNANP': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'MINCUL': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'ANA': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'INGEMMET': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'MTC': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'OEFA': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'COFOPRI': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'SENASA': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'SBN': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'GORE': return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
      default: return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !urlWms || !wmsLayerName) {
      alert("Por favor completa el nombre, URL WMS y nombre de capa WMS.");
      return;
    }

    const newLayerConfig: WMSLayerConfig = {
      id: `custom_${Date.now()}`,
      nombre,
      entidad,
      urlWms,
      layers: wmsLayerName,
      categoria,
      opacidad: 0.8,
      visible: true,
      descripcion: `Capa personalizada de ${entidad}`,
      preset: ['preset_minam']
    };

    onAddCustomLayer(newLayerConfig);
    setNombre('');
    setUrlWms('');
    setWmsLayerName('');
    setIsAddModalOpen(false);
  };

  // Filtrado de capas según tab maestro activo y búsqueda
  const matchesSearch = (layer: WMSLayerConfig) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return layer.nombre.toLowerCase().includes(term) ||
           (layer.subNombre && layer.subNombre.toLowerCase().includes(term)) ||
           layer.entidad.toLowerCase().includes(term) ||
           (layer.descripcion && layer.descripcion.toLowerCase().includes(term)) ||
           (layer.departamento && layer.departamento.toLowerCase().includes(term));
  };

  // Capas del Bloque 1: Exclusiones Legales y Ambientales (Modelo R1/R2)
  const block1Layers = layers.filter(l => l.categoria === 'EXCLUSION_LEGAL' && matchesSearch(l));
  
  // Capas del Bloque 2: Restricciones Técnicas (Modelo R3)
  const block2Layers = layers.filter(l => l.categoria === 'RESTRICCION_TECNICA' && matchesSearch(l));

  // Capas del Bloque 3: Infraestructura y Planificación Territorial
  const block3Layers = layers.filter(l => l.categoria === 'INFRAESTRUCTURA_TERRITORIAL' && matchesSearch(l));

  // Capas ZEE (19 regiones)
  const zeeLayers = layers.filter(l => l.categoria === 'ZEE_REGIONAL');
  const currentZEELayer = zeeLayers.find(l => {
    const depKey = l.id.replace('zee_', '').toUpperCase();
    return depKey === selectedZEERegion || (l.departamento && l.departamento.toUpperCase().includes(selectedZEERegion));
  }) || zeeLayers[0];

  const handleSelectZEERegion = (regionKey: string) => {
    setSelectedZEERegion(regionKey);
    const coords = REGION_COORDINATES[regionKey];
    if (coords && onFlyToCoordinates) {
      onFlyToCoordinates(coords[0], coords[1], coords[2]);
    }
  };

  // Total de capas activas por bloque
  const activeB1 = block1Layers.filter(l => l.visible).length;
  const activeB2 = block2Layers.filter(l => l.visible).length;
  const activeB3 = block3Layers.filter(l => l.visible).length;
  const activeZEE = zeeLayers.filter(l => l.visible).length;

  // Total general de capas visibles
  const totalActive = activeB1 + activeB2 + activeB3 + (currentZEELayer?.visible ? 1 : 0);

  // Vista colapsada: botón flotante elegante en la esquina superior izquierda del mapa
  if (isCollapsed) {
    return (
      <div className="absolute top-3 left-3 z-30 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center space-x-2.5 bg-slate-900/95 hover:bg-slate-850 text-slate-100 border border-emerald-500/50 hover:border-emerald-400 px-3.5 py-2 rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-200 group active:scale-95"
          title="Desplegar Tabla de Contenidos (Capas TOC)"
        >
          <div className="p-1.5 rounded-xl bg-emerald-600/30 text-emerald-400 group-hover:bg-emerald-500/30">
            <Layers className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-black text-white leading-tight">Capas TOC</span>
            <span className="text-[10px] text-emerald-400 font-bold">
              {totalActive} activas
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform ml-1" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-84 bg-slate-900 border-r border-slate-800 flex flex-col h-full z-10 shadow-2xl select-none transition-all duration-300">
      {/* Pestaña flotante en el borde derecho para colapsar con un solo clic */}
      <button
        onClick={() => setIsCollapsed(true)}
        className="absolute -right-3.5 top-16 z-30 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 border border-slate-700 rounded-r-md py-3 px-0.5 shadow-xl transition flex items-center justify-center group"
        title="Ocultar Tabla de Contenidos (TOC)"
      >
        <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Header & Presets */}
      <div className="p-3 border-b border-slate-800 space-y-2.5 bg-slate-900/90 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <div>
              <h2 className="font-extrabold text-xs text-white uppercase tracking-wider">Tabla de Contenidos TOC</h2>
              <span className="text-[10px] text-slate-400 block -mt-0.5">D.L. 1278 & D.S. 014-2017-MINAM</span>
            </div>
          </div>
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center space-x-1 shadow transition"
              title="Añadir Capa Externa WMS"
            >
              <Plus className="w-3 h-3" />
              <span>+ WMS</span>
            </button>
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition shadow-sm border border-slate-700"
              title="Ocultar Tabla de Contenidos (TOC)"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Buscador Rápido de Capas */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar capas por nombre, entidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-2.5 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Presets Selection */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-slate-400 flex items-center space-x-1">
            <Bookmark className="w-3 h-3 text-amber-400" />
            <span>Perfiles Multicriterio MINAM (Presets):</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {LAYER_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onApplyPreset(preset)}
                className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-[10px] font-semibold text-slate-300 p-1.5 rounded-lg text-left truncate transition"
                title={preset.descripcion}
              >
                {preset.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Bloques Maestros Normalizados (MINAM) Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 space-x-1 overflow-x-auto scrollbar-thin">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-2 py-1 text-[10px] font-bold rounded-lg whitespace-nowrap transition ${activeTab === 'ALL' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Todas ({layers.filter(l => l.visible).length})
          </button>
          <button
            onClick={() => setActiveTab('EXCLUSIONES')}
            className={`px-2 py-1 text-[10px] font-bold rounded-lg whitespace-nowrap transition ${activeTab === 'EXCLUSIONES' ? 'bg-rose-600 text-white shadow' : 'text-rose-400 hover:text-white'}`}
            title="Bloque 1: Exclusiones Legales y Ambientales (Modelo R1/R2)"
          >
            1. Exclusiones ({activeB1})
          </button>
          <button
            onClick={() => setActiveTab('RESTRICCIONES')}
            className={`px-2 py-1 text-[10px] font-bold rounded-lg whitespace-nowrap transition ${activeTab === 'RESTRICCIONES' ? 'bg-amber-600 text-white shadow' : 'text-amber-400 hover:text-white'}`}
            title="Bloque 2: Restricciones Técnicas (Modelo R3)"
          >
            2. Restricciones ({activeB2})
          </button>
          <button
            onClick={() => setActiveTab('INFRAESTRUCTURA')}
            className={`px-2 py-1 text-[10px] font-bold rounded-lg whitespace-nowrap transition ${activeTab === 'INFRAESTRUCTURA' ? 'bg-cyan-600 text-white shadow' : 'text-cyan-400 hover:text-white'}`}
            title="Bloque 3: Infraestructura, Vías y Uso del Suelo"
          >
            3. Vías & Suelos ({activeB3})
          </button>
          <button
            onClick={() => setActiveTab('ZEE')}
            className={`px-2 py-1 text-[10px] font-bold rounded-lg whitespace-nowrap transition ${activeTab === 'ZEE' ? 'bg-indigo-600 text-white shadow' : 'text-indigo-400 hover:text-white'}`}
            title="Zonificación Ecológica y Económica Regional"
          >
            ZEE ({activeZEE})
          </button>
        </div>
      </div>

      {/* Body: Lista de Capas organizada en los 3 Bloques Maestros */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        
        {/* ================================================================= */}
        {/* BLOQUE 1: EXCLUSIONES LEGALES Y AMBIENTALES (MODELO R1/R2) */}
        {/* ================================================================= */}
        {(activeTab === 'ALL' || activeTab === 'EXCLUSIONES') && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-rose-950/60">
              <span className="text-[11px] font-extrabold text-rose-400 uppercase tracking-wide flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span>1. Exclusiones Legales y Ambientales (R1/R2)</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                {activeB1}/{block1Layers.length} activas
              </span>
            </div>

            {/* Capas Individuales de Exclusión: ANP y CIRA Monumentos */}
            {block1Layers.filter(l => !l.grupo).map(layer => renderLayerCard(layer))}

            {/* Acordeón Fajas Marginales e Hidrografía (ANA) */}
            {renderHidrografiaAccordion()}

            {/* Componente Dropdown Selector ZEE Regional */}
            {renderZEEDropdownSelector()}
          </div>
        )}

        {/* ================================================================= */}
        {/* BLOQUE 2: RESTRICCIONES TÉCNICAS (MODELO R3) */}
        {/* ================================================================= */}
        {(activeTab === 'ALL' || activeTab === 'RESTRICCIONES') && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-amber-950/60">
              <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wide flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>2. Restricciones Técnicas (Modelo R3)</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                {activeB2}/{block2Layers.length} activas
              </span>
            </div>

            {block2Layers.map(layer => renderLayerCard(layer))}
          </div>
        )}

        {/* ================================================================= */}
        {/* BLOQUE 3: INFRAESTRUCTURA Y PLANIFICACIÓN TERRITORIAL */}
        {/* ================================================================= */}
        {(activeTab === 'ALL' || activeTab === 'INFRAESTRUCTURA') && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-cyan-950/60">
              <span className="text-[11px] font-extrabold text-cyan-400 uppercase tracking-wide flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                <span>3. Infraestructura y Planificación Territorial</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                {activeB3}/{block3Layers.length} activas
              </span>
            </div>

            {/* Elemento Colapsable Unificado: Red Vial y Accesibilidad */}
            {renderRedVialAccordion()}

            {/* Capas Individuales: Uso de Suelo CUM, Catastro Urbano, Predios SBN, etc. */}
            {block3Layers.filter(l => !l.grupo).map(layer => renderLayerCard(layer))}
          </div>
        )}

        {/* Tab dedicado ZEE Regional si se selecciona directamente */}
        {activeTab === 'ZEE' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-indigo-950/60">
              <span className="text-[11px] font-extrabold text-indigo-400 uppercase tracking-wide flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>Zonificación Ecológica y Económica (ZEE)</span>
              </span>
            </div>
            {renderZEEDropdownSelector(true)}
          </div>
        )}
      </div>

      {/* Persistence Controls Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-[11px]">
        <button
          onClick={onExportConfig}
          className="flex items-center space-x-1 text-slate-400 hover:text-emerald-400 transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exportar Config</span>
        </button>

        <label className="flex items-center space-x-1 text-slate-400 hover:text-emerald-400 cursor-pointer transition">
          <Upload className="w-3.5 h-3.5" />
          <span>Importar Config</span>
          <input type="file" accept=".json" onChange={onImportConfig} className="hidden" />
        </label>
      </div>

      {/* Modal Agregar Capa WMS Personalizada */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-extrabold text-sm text-emerald-400">AÑADIR CAPA WMS (INGEMMET / SERNANP / ANA)</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Nombre de la Capa:</label>
                <input
                  type="text"
                  placeholder="Ej. Concesiones Forestales SERFOR"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Entidad Emisora:</label>
                <select
                  value={entidad}
                  onChange={(e) => setEntidad(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="MINAM">MINAM</option>
                  <option value="SERNANP">SERNANP</option>
                  <option value="MINCUL">MINCUL</option>
                  <option value="ANA">ANA</option>
                  <option value="INGEMMET">INGEMMET</option>
                  <option value="MTC">MTC</option>
                  <option value="SENASA">SENASA</option>
                  <option value="OEFA">OEFA</option>
                  <option value="SBN">SBN</option>
                  <option value="COFOPRI">COFOPRI</option>
                  <option value="GORE">GORE</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Bloque Multicriterio MINAM:</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value as CategoryWMS)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="EXCLUSION_LEGAL">Bloque 1: Exclusiones Legales y Ambientales (R1/R2)</option>
                  <option value="RESTRICCION_TECNICA">Bloque 2: Restricciones Técnicas (Modelo R3)</option>
                  <option value="INFRAESTRUCTURA_TERRITORIAL">Bloque 3: Infraestructura y Planificación Territorial</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">URL WMS / Archivo KMZ:</label>
                <input
                  type="text"
                  placeholder="https://... o /CAPAS/mi_capa.kmz"
                  value={urlWms}
                  onChange={(e) => setUrlWms(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Nombre Técnico de la Capa (LAYER):</label>
                <input
                  type="text"
                  placeholder="Ej. cira_monumentos_nacional"
                  value={wmsLayerName}
                  onChange={(e) => setWmsLayerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded shadow"
                >
                  Registrar Capa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  // Helper: Renderiza tarjeta individual de capa
  function renderLayerCard(layer: WMSLayerConfig) {
    const status = layerStatuses[layer.id];
    return (
      <div
        key={layer.id}
        className={`p-2.5 rounded-xl border transition ${
          layer.visible 
            ? 'bg-slate-950 border-slate-700 shadow-md' 
            : 'bg-slate-900/50 border-slate-800/80 opacity-70'
        }`}
      >
        <div className="flex items-start justify-between space-x-2">
          <label className="flex items-start space-x-2 cursor-pointer flex-1">
            <input
              type="checkbox"
              checked={layer.visible}
              onChange={() => onToggleLayer(layer.id)}
              className="mt-0.5 rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
            />
            <div>
              <span className="text-xs font-semibold text-slate-200 block leading-tight">
                {layer.nombre}
              </span>
              <div className="flex items-center space-x-1.5 mt-1 flex-wrap gap-y-1">
                <span className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded border ${getEntityBadgeColor(layer.entidad)}`}>
                  {layer.entidad}
                </span>
                {layer.id === 'catastro_monumentos' && (
                  <span className="text-[9px] bg-purple-950 text-purple-300 px-1.5 py-0.2 rounded border border-purple-800 font-bold">
                    CIRA 2.57 MB
                  </span>
                )}
                {layer.id === 'capacidad_uso_suelo' && (
                  <span className="text-[9px] bg-lime-950 text-lime-300 px-1.5 py-0.2 rounded border border-lime-800 font-bold">
                    CUM 10.6 MB
                  </span>
                )}
                {layer.id === 'catastro_urbano' && (
                  <span className="text-[9px] bg-blue-950 text-blue-300 px-1.5 py-0.2 rounded border border-blue-800 font-bold">
                    MANZANAS COFOPRI 14.1 MB
                  </span>
                )}
                {layer.id === 'predios_estado_sinabip' && (
                  <span className="text-[9px] bg-indigo-950 text-indigo-300 px-1.5 py-0.2 rounded border border-indigo-800 font-bold">
                    CATASTRO PREDIAL SBN
                  </span>
                )}
                {layer.visible && (
                  <span className="text-[9px] text-slate-400 flex items-center space-x-1">
                    {status === 'ERROR' ? (
                      <span className="text-amber-400 flex items-center space-x-0.5" title="Error de lectura">
                        <AlertTriangle className="w-2.5 h-2.5 inline" />
                        <span>Error</span>
                      </span>
                    ) : status === 'LOADING' ? (
                      <span className="text-cyan-400 flex items-center space-x-0.5 animate-pulse">
                        <span>Cargando KMZ...</span>
                      </span>
                    ) : (
                      <span className="text-emerald-400 flex items-center space-x-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5 inline" />
                        <span>Activo</span>
                      </span>
                    )}
                  </span>
                )}
              </div>
              {layer.descripcion && (
                <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                  {layer.descripcion}
                </p>
              )}
            </div>
          </label>

          <button
            onClick={() => onToggleLayer(layer.id)}
            className="text-slate-400 hover:text-white p-1 shrink-0"
          >
            {layer.visible ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-600" />}
          </button>
        </div>

        {/* Opacity Slider */}
        {layer.visible && (
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center space-x-2">
            <Sliders className="w-3 h-3 text-slate-500" />
            <span className="text-[10px] text-slate-400 w-12 font-medium">Opacidad:</span>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={layer.opacidad}
              onChange={(e) => onChangeOpacity(layer.id, parseFloat(e.target.value))}
              className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-[10px] text-emerald-400 font-bold w-7 text-right">
              {Math.round(layer.opacidad * 100)}%
            </span>
          </div>
        )}
      </div>
    );
  }

  // Helper: Acordeón Fajas Marginales e Hidrografía (ANA)
  function renderHidrografiaAccordion() {
    const hidroLayers = layers.filter(l => l.grupo === 'hidrografia' && matchesSearch(l));
    if (hidroLayers.length === 0) return null;

    const isExpanded = expandedGroups['hidrografia'] || false;
    const activeCount = hidroLayers.filter(l => l.visible).length;

    return (
      <div className={`rounded-xl border transition overflow-hidden ${
        activeCount > 0 ? 'border-cyan-500/40 bg-slate-950/80 shadow-md' : 'border-slate-800 bg-slate-900/60'
      }`}>
        <div 
          onClick={() => toggleGroup('hidrografia')}
          className="p-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/60 transition"
        >
          <div className="flex items-center space-x-2 flex-1 pr-2">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-cyan-400 shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            )}
            <div>
              <span className="text-xs font-bold text-white block leading-tight">
                Fajas Marginales e Hidrografía (ANA / SNIRH)
              </span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded border ${getEntityBadgeColor('ANA')}`}>
                  ANA
                </span>
                <span className={`text-[10px] font-semibold ${activeCount > 0 ? 'text-cyan-400' : 'text-slate-400'}`}>
                  {activeCount > 0 ? `${activeCount} de ${hidroLayers.length} activas` : `${hidroLayers.length} sub-capas`}
                </span>
              </div>
            </div>
          </div>
          <span className="text-[10px] bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-full border border-slate-700 shrink-0">
            {isExpanded ? 'Ocultar' : 'Desplegar'}
          </span>
        </div>

        {isExpanded && (
          <div className="p-2.5 pt-1 space-y-2 border-t border-slate-800/80 bg-slate-900/40">
            {hidroLayers.map(l => renderSubLayerItem(l))}
          </div>
        )}
      </div>
    );
  }

  // Helper: Acordeón Jerárquico "Red Vial y Accesibilidad"
  function renderRedVialAccordion() {
    const roadLayers = layers.filter(l => l.grupo === 'red_vial' && matchesSearch(l));
    if (roadLayers.length === 0) return null;

    const isExpanded = expandedGroups['red_vial'] || false;
    const activeCount = roadLayers.filter(l => l.visible).length;

    return (
      <div className={`rounded-xl border transition overflow-hidden ${
        activeCount > 0 ? 'border-amber-500/40 bg-slate-950/80 shadow-md' : 'border-slate-800 bg-slate-900/60'
      }`}>
        <div 
          onClick={() => toggleGroup('red_vial')}
          className="p-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/60 transition"
        >
          <div className="flex items-center space-x-2 flex-1 pr-2">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            )}
            <div>
              <span className="text-xs font-bold text-white block leading-tight">
                Red Vial y Accesibilidad
              </span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded border ${getEntityBadgeColor('MTC')}`}>
                  MTC
                </span>
                <span className={`text-[10px] font-semibold ${activeCount > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                  {activeCount > 0 ? `${activeCount} de ${roadLayers.length} activas` : `${roadLayers.length} niveles viales`}
                </span>
              </div>
            </div>
          </div>
          <span className="text-[10px] bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-full border border-slate-700 shrink-0">
            {isExpanded ? 'Ocultar' : 'Desplegar'}
          </span>
        </div>

        {isExpanded && (
          <div className="p-2.5 pt-1 space-y-2 border-t border-slate-800/80 bg-slate-900/40">
            <p className="text-[10px] text-slate-400 italic px-1">
              Capas viales jerárquicas para análisis de distancias logísticas y transporte de residuos:
            </p>
            {roadLayers.map(l => renderSubLayerItem(l))}
          </div>
        )}
      </div>
    );
  }

  // Helper: Sub-capa dentro de un acordeón
  function renderSubLayerItem(layer: WMSLayerConfig) {
    const status = layerStatuses[layer.id];
    return (
      <div
        key={layer.id}
        className={`p-2 rounded-lg border transition ${
          layer.visible 
            ? 'bg-slate-950 border-emerald-500/30' 
            : 'bg-slate-900/80 border-slate-800/60'
        }`}
      >
        <div className="flex items-start justify-between space-x-2">
          <label className="flex items-start space-x-2 cursor-pointer flex-1">
            <input
              type="checkbox"
              checked={layer.visible}
              onChange={() => onToggleLayer(layer.id)}
              className="mt-0.5 rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
            />
            <div>
              <span className="text-[11px] font-medium text-slate-200 block leading-tight">
                {layer.subNombre || layer.nombre}
              </span>
              {layer.visible && (
                <div className="flex items-center space-x-1.5 mt-0.5">
                  {status === 'ERROR' ? (
                    <span className="text-[9px] text-amber-400 flex items-center space-x-0.5">
                      <AlertTriangle className="w-2.5 h-2.5 inline" />
                      <span>Error</span>
                    </span>
                  ) : status === 'LOADING' ? (
                    <span className="text-[9px] text-cyan-400 flex items-center space-x-0.5 animate-pulse">
                      <span>Cargando KMZ...</span>
                    </span>
                  ) : (
                    <span className="text-[9px] text-emerald-400 flex items-center space-x-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5 inline" />
                      <span>Cargado</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </label>

          <button
            onClick={() => onToggleLayer(layer.id)}
            className="text-slate-400 hover:text-white p-0.5 shrink-0"
          >
            {layer.visible ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-600" />}
          </button>
        </div>

        {layer.visible && (
          <div className="mt-1.5 pt-1.5 border-t border-slate-800/60 flex items-center space-x-2">
            <Sliders className="w-2.5 h-2.5 text-slate-500" />
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={layer.opacidad}
              onChange={(e) => onChangeOpacity(layer.id, parseFloat(e.target.value))}
              className="w-full accent-emerald-500 h-1 bg-slate-800 rounded appearance-none cursor-pointer"
            />
            <span className="text-[9px] text-emerald-400 font-bold w-6 text-right">
              {Math.round(layer.opacidad * 100)}%
            </span>
          </div>
        )}
      </div>
    );
  }

  // Helper: Menú Desplegable Regional para Zonificación Ecológica y Económica (ZEE)
  function renderZEEDropdownSelector(standaloneView = false) {
    const status = currentZEELayer ? layerStatuses[currentZEELayer.id] : undefined;

    return (
      <div className="rounded-xl border border-indigo-500/40 bg-slate-950 p-3 space-y-2.5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Compass className="w-4 h-4 text-indigo-400" />
            <div>
              <span className="text-xs font-bold text-indigo-300 block leading-tight">
                Zonificación Ecológica y Económica (ZEE)
              </span>
              <span className="text-[10px] text-slate-400">19 Regiones Aprobadas por MINAM</span>
            </div>
          </div>
          <span className="text-[9px] bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-800 font-bold">
            GORE / MINAM
          </span>
        </div>

        {/* Dropdown Selector */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-slate-300 flex items-center justify-between">
            <span>Seleccionar Región ZEE:</span>
            {currentZEELayer && (
              <span className={`text-[9px] font-bold ${currentZEELayer.visible ? 'text-emerald-400' : 'text-slate-500'}`}>
                {currentZEELayer.visible ? '● Activa en mapa' : '○ Inactiva'}
              </span>
            )}
          </label>
          <select
            value={selectedZEERegion}
            onChange={(e) => handleSelectZEERegion(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-indigo-200 font-semibold focus:outline-none focus:border-indigo-500"
          >
            {Object.keys(REGION_COORDINATES).map(regKey => {
              const regLabel = regKey.replace(/_/g, ' ');
              const matchLayer = zeeLayers.find(l => l.id.replace('zee_', '').toUpperCase() === regKey);
              return (
                <option key={regKey} value={regKey}>
                  {regLabel} {matchLayer?.visible ? '✓ [Activa]' : ''}
                </option>
              );
            })}
          </select>
        </div>

        {/* Tarjeta de Control de la ZEE Seleccionada */}
        {currentZEELayer && (
          <div className={`p-2.5 rounded-lg border transition ${
            currentZEELayer.visible 
              ? 'bg-indigo-950/40 border-indigo-500/50' 
              : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex items-start justify-between space-x-2">
              <label className="flex items-start space-x-2 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={currentZEELayer.visible}
                  onChange={() => onToggleLayer(currentZEELayer.id)}
                  className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-100 block">
                    {currentZEELayer.nombre}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {currentZEELayer.descripcion}
                  </p>
                  {currentZEELayer.visible && (
                    <div className="mt-1 flex items-center space-x-1.5">
                      {status === 'LOADING' ? (
                        <span className="text-[9px] text-cyan-400 font-bold animate-pulse">
                          Cargando capa KMZ de {selectedZEERegion}...
                        </span>
                      ) : (
                        <span className="text-[9px] text-emerald-400 font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-2.5 h-2.5 inline" />
                          <span>KMZ Local en Visor</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </label>

              <button
                onClick={() => onToggleLayer(currentZEELayer.id)}
                className="text-slate-400 hover:text-white p-1 shrink-0"
              >
                {currentZEELayer.visible ? <Eye className="w-3.5 h-3.5 text-indigo-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-600" />}
              </button>
            </div>

            {/* Slider de Opacidad para la ZEE */}
            {currentZEELayer.visible && (
              <div className="mt-2 pt-2 border-t border-indigo-900/60 flex items-center space-x-2">
                <Sliders className="w-3 h-3 text-slate-500" />
                <span className="text-[10px] text-slate-400 w-12 font-medium">Opacidad:</span>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={currentZEELayer.opacidad}
                  onChange={(e) => onChangeOpacity(currentZEELayer.id, parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] text-indigo-400 font-bold w-7 text-right">
                  {Math.round(currentZEELayer.opacidad * 100)}%
                </span>
              </div>
            )}

            {/* Leyenda Técnica Rápida de ZEE */}
            <div className="mt-2 pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-1 text-[9px]">
              <div className="flex items-center space-x-1 text-emerald-400">
                <span className="w-2 h-2 rounded-sm bg-emerald-500"></span>
                <span>Protección Ecológica</span>
              </div>
              <div className="flex items-center space-x-1 text-amber-400">
                <span className="w-2 h-2 rounded-sm bg-amber-500"></span>
                <span>Zonas Productivas</span>
              </div>
              <div className="flex items-center space-x-1 text-rose-400">
                <span className="w-2 h-2 rounded-sm bg-rose-500"></span>
                <span>Zonas de Recuperación</span>
              </div>
              <div className="flex items-center space-x-1 text-blue-400">
                <span className="w-2 h-2 rounded-sm bg-blue-500"></span>
                <span>Urbano / Industrial</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};
