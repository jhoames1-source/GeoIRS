import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { kml } from '@tmcw/togeojson';
import { 
  Layers, Eye, EyeOff, Sliders, Bookmark, Download, Upload, Plus, X, 
  ShieldAlert, CheckCircle2, AlertTriangle, ChevronDown, ChevronRight, ChevronLeft,
  Folder, FolderOpen, Trash2, FileUp, Sparkles, Check, Compass, MapPin, Search
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
  onRemoveCustomLayer?: (id: string) => void;
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

  // Custom User File Upload State (KMZ / Shapefile / GeoJSON)
  const [modalMode, setModalMode] = useState<'FILE' | 'WMS'>('FILE');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [userLayerColor, setUserLayerColor] = useState<string>('#8b5cf6');
  const [userLayerName, setUserLayerName] = useState<string>('');

  const handleProcessAndAddFile = async () => {
    if (!selectedFile) {
      setFileError('Por favor selecciona un archivo GIS (.kmz, .kml, .geojson, o .zip con shapefile)');
      return;
    }

    setIsProcessingFile(true);
    setFileError(null);

    try {
      let geojson: any = null;
      const fileName = selectedFile.name.toLowerCase();

      if (fileName.endsWith('.geojson') || fileName.endsWith('.json')) {
        const text = await selectedFile.text();
        geojson = JSON.parse(text);
      } else if (fileName.endsWith('.kml')) {
        const text = await selectedFile.text();
        const xmlDoc = new DOMParser().parseFromString(text, 'text/xml');
        geojson = kml(xmlDoc);
      } else if (fileName.endsWith('.kmz')) {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        const kmlFileName = Object.keys(zip.files).find(name => name.toLowerCase().endsWith('.kml'));
        if (!kmlFileName) throw new Error('No se encontró archivo .kml dentro del .kmz');
        const kmlText = await zip.files[kmlFileName].async('text');
        const xmlDoc = new DOMParser().parseFromString(kmlText, 'text/xml');
        geojson = kml(xmlDoc);
      } else if (fileName.endsWith('.zip')) {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const shp = (await import('shpjs')).default;
        geojson = await shp(arrayBuffer);
      } else {
        throw new Error('Formato no soportado. Usa archivos .kmz, .kml, .geojson, .json o .zip (Shapefile)');
      }

      if (!geojson || !geojson.features || !geojson.features.length) {
        throw new Error('El archivo no contiene geometrías o entidades geográficas válidas.');
      }

      const layerTitle = userLayerName.trim() || selectedFile.name.replace(/\.[^/.]+$/, '');
      const newLayerConfig: WMSLayerConfig = {
        id: `user_layer_${Date.now()}`,
        nombre: layerTitle,
        entidad: 'USUARIO',
        urlWms: '',
        layers: selectedFile.name,
        categoria: 'INFRAESTRUCTURA_TERRITORIAL',
        opacidad: 0.85,
        visible: true,
        descripcion: `Capa de usuario: ${selectedFile.name} (${(selectedFile.size / (1024*1024)).toFixed(2)} MB, ${geojson.features.length} entidades)`,
        preset: ['preset_usuario'],
        grupo: 'usuario',
        isCustomUserLayer: true,
        customGeoJSON: geojson,
        customColor: userLayerColor
      };

      onAddCustomLayer(newLayerConfig);
      setIsAddModalOpen(false);
      setSelectedFile(null);
      setUserLayerName('');
      setFileError(null);
    } catch (err: any) {
      console.error('Error procesando archivo GIS:', err);
      setFileError(err.message || 'Error al procesar el archivo GIS.');
    } finally {
      setIsProcessingFile(false);
    }
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

  // Capas añadidas por el usuario (KMZ / Shapefile / GeoJSON / WMS personalizado)
  const userLayers = layers.filter(l => l.isCustomUserLayer || l.entidad === 'USUARIO');

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
    <div className="absolute sm:relative inset-y-0 left-0 w-[88vw] sm:w-84 max-w-sm bg-slate-900 border-r border-slate-800 flex flex-col h-full z-30 shadow-2xl select-none transition-all duration-300">
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
              <span>+ Capa GIS</span>
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
        {/* ================================================================= */}
        {/* BLOQUE DE CAPAS PERSONALIZADAS DEL USUARIO (KMZ / SHP / GEOJSON) */}
        {/* ================================================================= */}
        {userLayers.length > 0 && (
          <div className="space-y-2.5 pb-2 border-b border-purple-900/50">
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-black text-purple-400 uppercase tracking-wide flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                <span>📂 Capas de Usuario ({userLayers.length})</span>
              </span>
              <span className="text-[10px] bg-purple-950/80 text-purple-300 border border-purple-800 px-2 py-0.5 rounded font-mono">
                {userLayers.filter(l => l.visible).length} activas
              </span>
            </div>

            {userLayers.map(layer => (
              <div 
                key={layer.id} 
                className={`p-2.5 rounded-xl border transition ${
                  layer.visible 
                    ? 'bg-purple-950/20 border-purple-500/40 shadow-sm' 
                    : 'bg-slate-950/40 border-slate-800 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between space-x-2">
                  <label className="flex items-start space-x-2.5 cursor-pointer flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={layer.visible}
                      onChange={() => onToggleLayer(layer.id)}
                      className="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-1.5 flex-wrap">
                        <span 
                          className="w-2.5 h-2.5 rounded-full shrink-0" 
                          style={{ backgroundColor: layer.customColor || '#8b5cf6' }}
                        />
                        <span className="text-xs font-bold text-slate-100 truncate block">
                          {layer.nombre}
                        </span>
                        <span className="text-[9px] bg-purple-900/50 text-purple-300 border border-purple-700/60 px-1.5 py-0.2 rounded font-mono">
                          USUARIO
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                        {layer.descripcion}
                      </p>
                    </div>
                  </label>

                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      onClick={() => onToggleLayer(layer.id)}
                      className="text-slate-400 hover:text-white p-1"
                      title={layer.visible ? "Ocultar capa" : "Mostrar capa"}
                    >
                      {layer.visible ? <Eye className="w-3.5 h-3.5 text-purple-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-600" />}
                    </button>
                    {onRemoveCustomLayer && (
                      <button
                        onClick={() => onRemoveCustomLayer(layer.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="Eliminar capa cargada"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {layer.visible && (
                  <div className="mt-2 pt-2 border-t border-purple-900/40 flex items-center space-x-2">
                    <Sliders className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] text-slate-400 w-12 font-medium">Opacidad:</span>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={layer.opacidad}
                      onChange={(e) => onChangeOpacity(layer.id, parseFloat(e.target.value))}
                      className="w-full accent-purple-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-[10px] text-purple-400 font-bold w-7 text-right">
                      {Math.round(layer.opacidad * 100)}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

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

      {/* Modal Agregar Capa: Archivo Local (KMZ / Shapefile .zip / GeoJSON) o Servidor WMS */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg p-5 space-y-4 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <FileUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">AGREGAR CAPA AL GEOPORTAL</h3>
                  <p className="text-[10.5px] text-slate-400">Archivos locales de tu PC o servidores WMS remotos</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsAddModalOpen(false);
                  setSelectedFile(null);
                  setFileError(null);
                }} 
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setModalMode('FILE')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 transition ${
                  modalMode === 'FILE'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>📁 Subir Archivo de la PC</span>
              </button>

              <button
                type="button"
                onClick={() => setModalMode('WMS')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 transition ${
                  modalMode === 'WMS'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>🌐 Servidor WMS Remoto</span>
              </button>
            </div>

            {/* TAB 1: SUBIR ARCHIVO LOCAL (KMZ / SHAPEFILE .ZIP / GEOJSON) */}
            {modalMode === 'FILE' && (
              <div className="space-y-3.5">
                {/* Drag and Drop / Click to Select Box */}
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                    Seleccionar Archivo GIS de la PC:
                  </label>
                  <label className="relative border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 bg-slate-950/70 hover:bg-slate-950 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition group">
                    <input
                      type="file"
                      accept=".kmz,.kml,.zip,.geojson,.json"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFile(file);
                          setFileError(null);
                          if (!userLayerName) {
                            setUserLayerName(file.name.replace(/\.[^/.]+$/, ''));
                          }
                        }
                      }}
                      className="hidden"
                    />
                    <div className="p-2.5 rounded-full bg-emerald-500/10 text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition mb-2">
                      <FileUp className="w-6 h-6" />
                    </div>
                    {selectedFile ? (
                      <div className="text-center space-y-1">
                        <span className="text-xs font-bold text-emerald-300 block truncate max-w-xs">
                          ✓ {selectedFile.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.name.split('.').pop()?.toUpperCase()}
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-xs font-bold text-slate-200">
                          Haz clic para explorar o arrastra tu archivo aquí
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          Formatos: <span className="text-emerald-400 font-bold">.KMZ</span>, <span className="text-emerald-400 font-bold">.KML</span>, <span className="text-cyan-400 font-bold">Shapefile (.zip)</span>, <span className="text-amber-400 font-bold">.GeoJSON</span>
                        </p>
                      </div>
                    )}
                  </label>
                </div>

                {/* Layer Name Input */}
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">
                    Nombre o Etiqueta de la Capa:
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Mi Polígono Predial / Proyecto IRS"
                    value={userLayerName}
                    onChange={(e) => setUserLayerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Color Selector */}
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                    Color de Visualización en el Mapa:
                  </label>
                  <div className="flex items-center space-x-2.5">
                    {[
                      { hex: '#10b981', label: 'Verde' },
                      { hex: '#06b6d4', label: 'Cian' },
                      { hex: '#8b5cf6', label: 'Violeta' },
                      { hex: '#ec4899', label: 'Rosa' },
                      { hex: '#f59e0b', label: 'Ámbar' },
                      { hex: '#f97316', label: 'Naranja' },
                      { hex: '#3b82f6', label: 'Azul' }
                    ].map((col) => (
                      <button
                        key={col.hex}
                        type="button"
                        onClick={() => setUserLayerColor(col.hex)}
                        className={`w-6 h-6 rounded-full border-2 transition ${
                          userLayerColor === col.hex 
                            ? 'border-white scale-110 shadow-lg' 
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.label}
                      />
                    ))}
                    <span className="text-[11px] font-mono font-bold text-slate-400 ml-2">
                      {userLayerColor}
                    </span>
                  </div>
                </div>

                {/* Error Banner */}
                {fileError && (
                  <div className="p-2.5 bg-rose-950/70 border border-rose-800 rounded-lg text-rose-300 text-xs flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{fileError}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 flex justify-end space-x-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setSelectedFile(null);
                      setFileError(null);
                    }}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    disabled={!selectedFile || isProcessingFile}
                    onClick={handleProcessAndAddFile}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition shadow-lg ${
                      !selectedFile || isProcessingFile
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950'
                    }`}
                  >
                    {isProcessingFile ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Procesando archivo...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Cargar Capa al Mapa</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: SERVIDOR REMOTO WMS */}
            {modalMode === 'WMS' && (
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
                  <label className="text-xs text-slate-300 block mb-1">URL WMS / Servidor Remoto:</label>
                  <input
                    type="text"
                    placeholder="https://geoservicios.ingemmet.gob.pe/.../MapServer/WMSServer"
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

                <div className="pt-2 flex justify-end space-x-2 border-t border-slate-800">
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
                    Registrar Capa WMS
                  </button>
                </div>
              </form>
            )}
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
