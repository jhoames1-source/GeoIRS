import React, { useState, useRef, useEffect } from 'react';
import { Target, MapPin, CheckCircle2, Search, Compass, Play, Square, MousePointerClick, Minimize2, Maximize2, X, Sliders, FileText, Move, Undo2, Trash2, Navigation, Layers, ChevronDown, ChevronUp, Sparkles, Check } from 'lucide-react';
import { CandidateZone, Jurisdiction } from '../types';
import { PERU_JURISDICTIONS } from '../constants/peruDemographics';
import { latLngToUtm, utmToLatLng } from '../utils/utmUtils';

interface IRSLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  jurisdiction: Jurisdiction;
  candidateZones: CandidateZone[];
  onSelectZone: (zone: CandidateZone) => void;
  onTriangulateDistricts: (districts: Jurisdiction[]) => void;
  onStartPickPoint: () => void;
  onStartDrawPolygon: () => void;
  onSelectJurisdiction?: (j: Jurisdiction) => void;
  onExecuteSearch?: (radiusKm: number, minAreaHa: number) => void;
  searchRadiusKm?: number;
  onSearchRadiusChange?: (radiusKm: number) => void;
  onOpenFichaTecnica?: (zone: CandidateZone) => void;
  onClearTriangulation?: () => void;
}

export const IRSLocatorModal: React.FC<IRSLocatorModalProps> = ({
  isOpen,
  onClose,
  jurisdiction,
  candidateZones,
  onSelectZone,
  onTriangulateDistricts,
  onStartPickPoint,
  onStartDrawPolygon,
  onSelectJurisdiction,
  onExecuteSearch,
  searchRadiusKm = 8,
  onSearchRadiusChange,
  onOpenFichaTecnica,
  onClearTriangulation
}) => {
  const [activeTab, setActiveTab] = useState<'urban' | 'triangulation'>('urban');
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [minAreaHa, setMinAreaHa] = useState<number>(20);
  const [localRadiusKm, setLocalRadiusKm] = useState<number>(searchRadiusKm);
  const [radiusUnit, setRadiusUnit] = useState<'km' | 'm'>('km');
  const [isTriangulated, setIsTriangulated] = useState<boolean>(false);

  // Dedicated Coordinate Input Panel State
  const [showCoordsPanel, setShowCoordsPanel] = useState<boolean>(false);
  const [coordType, setCoordType] = useState<'UTM' | 'GEOGRAPHIC'>('UTM');
  const [inputEste, setInputEste] = useState<string>('');
  const [inputNorte, setInputNorte] = useState<string>('');
  const [inputZona, setInputZona] = useState<string>('17S');
  const [inputLat, setInputLat] = useState<string>('');
  const [inputLng, setInputLng] = useState<string>('');
  const [coordFeedback, setCoordFeedback] = useState<string | null>(null);

  // Sync inputs with current jurisdiction when it changes
  useEffect(() => {
    if (jurisdiction && !isNaN(jurisdiction.lat) && !isNaN(jurisdiction.lng)) {
      const utm = latLngToUtm(jurisdiction.lat, jurisdiction.lng);
      setInputEste(utm.este.toFixed(1));
      setInputNorte(utm.norte.toFixed(1));
      setInputZona(utm.zona);
      setInputLat(jurisdiction.lat.toFixed(6));
      setInputLng(jurisdiction.lng.toFixed(6));
    }
  }, [jurisdiction.lat, jurisdiction.lng]);

  const handleUtmChange = (esteVal: string, norteVal: string, zonaVal: string) => {
    setInputEste(esteVal);
    setInputNorte(norteVal);
    setInputZona(zonaVal);
    const este = parseFloat(esteVal);
    const norte = parseFloat(norteVal);
    const zoneNum = parseInt(zonaVal.replace(/\D/g, ''), 10) || 17;
    const isSouth = zonaVal.toUpperCase().includes('S') || true;
    if (!isNaN(este) && !isNaN(norte) && este > 100000 && este < 900000 && norte > 0) {
      try {
        const geo = utmToLatLng(este, norte, zoneNum, isSouth);
        setInputLat(geo.lat.toFixed(6));
        setInputLng(geo.lng.toFixed(6));
      } catch (err) {}
    }
  };

  const handleGeoChange = (latVal: string, lngVal: string) => {
    setInputLat(latVal);
    setInputLng(lngVal);
    const lat = parseFloat(latVal);
    const lng = parseFloat(lngVal);
    if (!isNaN(lat) && !isNaN(lng) && lat >= -20 && lat <= 2 && lng >= -85 && lng <= -65) {
      try {
        const utm = latLngToUtm(lat, lng);
        setInputEste(utm.este.toFixed(1));
        setInputNorte(utm.norte.toFixed(1));
        setInputZona(utm.zona);
      } catch (err) {}
    }
  };

  const handleApplyCoords = (executeSearch: boolean = false) => {
    let finalLat: number;
    let finalLng: number;
    let desc = '';

    if (coordType === 'UTM') {
      const este = parseFloat(inputEste);
      const norte = parseFloat(inputNorte);
      const zoneNum = parseInt(inputZona.replace(/\D/g, ''), 10) || 17;
      const isSouth = inputZona.toUpperCase().includes('S') || true;
      if (isNaN(este) || isNaN(norte)) {
        setCoordFeedback('Error: Ingrese valores numéricos válidos en Este y Norte.');
        setTimeout(() => setCoordFeedback(null), 3000);
        return;
      }
      const geo = utmToLatLng(este, norte, zoneNum, isSouth);
      finalLat = geo.lat;
      finalLng = geo.lng;
      desc = `UTM ${inputZona} (${Math.round(este)} E, ${Math.round(norte)} N)`;
    } else {
      finalLat = parseFloat(inputLat);
      finalLng = parseFloat(inputLng);
      if (isNaN(finalLat) || isNaN(finalLng)) {
        setCoordFeedback('Error: Ingrese valores válidos en Latitud y Longitud.');
        setTimeout(() => setCoordFeedback(null), 3000);
        return;
      }
      desc = `WGS84 (${finalLat.toFixed(4)}°, ${finalLng.toFixed(4)}°)`;
    }

    if (onSelectJurisdiction) {
      onSelectJurisdiction({
        ...jurisdiction,
        lat: finalLat,
        lng: finalLng,
        nombre: `Punto Coordenadas: ${desc}`
      });
    }

    if (executeSearch && onExecuteSearch) {
      onExecuteSearch(localRadiusKm, minAreaHa);
      setCoordFeedback(`¡Ubicado en mapa y búsqueda IRS ejecutada en radio de ${localRadiusKm} km!`);
    } else {
      setCoordFeedback(`¡Punto fijado en mapa: ${desc}!`);
    }

    setTimeout(() => setCoordFeedback(null), 3500);
  };

  // Panel Arrastrable (Draggable State)
  const [panelPos, setPanelPos] = useState<{ x: number; y: number }>({ x: 16, y: 80 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number }>({ startX: 0, startY: 0, initialX: 16, initialY: 80 });

  // Multi-District Triangulation Autocomplete Search State
  const [selectedDistricts, setSelectedDistricts] = useState<Jurisdiction[]>([
    PERU_JURISDICTIONS.find(j => j.distrito.toLowerCase() === 'celendín') || PERU_JURISDICTIONS[0],
    PERU_JURISDICTIONS.find(j => j.distrito.toLowerCase() === 'josé gálvez') || PERU_JURISDICTIONS[1] || PERU_JURISDICTIONS[0],
    PERU_JURISDICTIONS.find(j => j.distrito.toLowerCase() === 'sucre') || PERU_JURISDICTIONS[2] || PERU_JURISDICTIONS[0],
    PERU_JURISDICTIONS.find(j => j.distrito.toLowerCase() === 'jorge chávez') || PERU_JURISDICTIONS[3] || PERU_JURISDICTIONS[0]
  ]);
  const [districtSearchTerm, setDistrictSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Dynamic Window Dragging Effect
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input') || (e.target as HTMLElement).closest('select')) return;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: panelPos.x,
      initialY: panelPos.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartRef.current.startX;
      const deltaY = e.clientY - dragStartRef.current.startY;
      setPanelPos({
        x: Math.max(10, Math.min(window.innerWidth - 380, dragStartRef.current.initialX + deltaX)),
        y: Math.max(10, Math.min(window.innerHeight - 120, dragStartRef.current.initialY + deltaY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (searchRadiusKm && searchRadiusKm > 0) {
      setLocalRadiusKm(searchRadiusKm);
    }
  }, [searchRadiusKm]);

  const computedIntermunicipalRadiusKm = React.useMemo(() => {
    if (selectedDistricts.length === 0) return 8;
    let totPop = 0;
    let wLat = 0;
    let wLng = 0;
    selectedDistricts.forEach(d => {
      const pop = d.poblacion || 10000;
      totPop += pop;
      wLat += d.lat * pop;
      wLng += d.lng * pop;
    });
    const bLat = totPop > 0 ? wLat / totPop : selectedDistricts[0].lat;
    const bLng = totPop > 0 ? wLng / totPop : selectedDistricts[0].lng;

    let maxD = 0;
    selectedDistricts.forEach(d => {
      // Cálculo de distancia euclidiana esférica aproximada en km
      const dLat = ((d.lat - bLat) * Math.PI) / 180;
      const dLng = ((d.lng - bLng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((bLat * Math.PI) / 180) * Math.cos((d.lat * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const dist = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      if (dist > maxD) maxD = dist;
    });
    return Math.max(10, Math.ceil(maxD + 3));
  }, [selectedDistricts]);

  const handleRadiusSlider = (newVal: number) => {
    setLocalRadiusKm(newVal);
    if (onSearchRadiusChange) onSearchRadiusChange(newVal);
  };

  const filteredDistricts = PERU_JURISDICTIONS.filter(j => {
    const term = districtSearchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      j.distrito.toLowerCase().includes(term) ||
      j.provincia.toLowerCase().includes(term) ||
      j.departamento.toLowerCase().includes(term) ||
      j.ubigeo.includes(term)
    );
  }).slice(0, 15);

  const handleSelectAutocompleteDistrict = (j: Jurisdiction) => {
    if (!selectedDistricts.some(d => d.ubigeo === j.ubigeo)) {
      setSelectedDistricts([...selectedDistricts, j]);
    }
    setDistrictSearchTerm('');
    setIsDropdownOpen(false);
  };

  const handleRemoveDistrict = (ubigeo: string) => {
    setSelectedDistricts(selectedDistricts.filter(d => d.ubigeo !== ubigeo));
  };

  const handleUndoLastDistrict = () => {
    if (selectedDistricts.length > 0) {
      setSelectedDistricts(selectedDistricts.slice(0, -1));
    }
  };

  const handleClearAllTriangulation = () => {
    setSelectedDistricts([]);
    setIsTriangulated(false);
    if (onClearTriangulation) onClearTriangulation();
  };

  const handleRunTriangulation = () => {
    if (selectedDistricts.length === 0) return;
    setIsTriangulated(true);
    setLocalRadiusKm(computedIntermunicipalRadiusKm);
    if (onSearchRadiusChange) onSearchRadiusChange(computedIntermunicipalRadiusKm);
    onTriangulateDistricts(selectedDistricts);
  };

  // Geodesic WGS84 UTM conversion for current reference point
  const currentUtm = latLngToUtm(jurisdiction.lat, jurisdiction.lng);

  // Evitar violación de reglas de hooks: Retornar null sólo después de que todos los hooks se ejecuten
  if (!isOpen) return null;

  // Estado Minimizado: Barra flotante estilizada, de alto contraste y botones nítidos
  if (isMinimized) {
    return (
      <div
        style={{ position: 'fixed', left: `${panelPos.x}px`, top: `${panelPos.y}px` }}
        className="fixed z-40 bg-slate-950/95 backdrop-blur-xl border border-emerald-500/80 rounded-2xl shadow-2xl flex items-center px-3.5 py-2.5 space-x-3 text-slate-100 select-none cursor-grab active:cursor-grabbing hover:border-emerald-400 transition animate-in fade-in zoom-in-95 duration-150"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-emerald-400 tracking-wide flex items-center gap-1">
              🎯 LOCALIZADOR IRS
            </span>
            <span className="text-[10px] text-slate-400 leading-none">
              {jurisdiction.distrito} • {localRadiusKm} km
            </span>
          </div>
        </div>

        <div className="h-5 w-[1px] bg-slate-800" />

        <div className="flex items-center space-x-2">
          {/* Botón Maximizar de alto contraste */}
          <button
            onClick={() => setIsMinimized(false)}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center space-x-1.5 shadow-lg shadow-emerald-950 transition active:scale-95 cursor-pointer"
            title="Maximizar Localizador de IRS"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Maximizar</span>
          </button>

          {/* Botón Cerrar visible y destacado */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-800 transition active:scale-95 cursor-pointer"
            title="Cerrar Localizador de IRS"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Estado Expandido
  return (
    <div
      style={{ position: 'fixed', left: `${panelPos.x}px`, top: `${panelPos.y}px` }}
      className={`fixed z-40 transition-shadow duration-200 w-[430px] max-h-[88vh] bg-slate-950/95 backdrop-blur-xl border ${
        isDragging ? 'border-emerald-400 ring-2 ring-emerald-500/30' : 'border-slate-800'
      } rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 select-none animate-in fade-in zoom-in-95 duration-150`}
    >
      {/* Header Bar - Draggable Trigger */}
      <div
        onMouseDown={handleMouseDown}
        className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 shrink-0 cursor-grab active:cursor-grabbing hover:bg-slate-900 transition"
      >
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-black text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              Localizador Espacial de IRS (MINAM)
              <Move className="w-3 h-3 text-slate-500 inline-block opacity-60" />
            </h2>
            <span className="text-[10px] text-slate-400 font-medium">Punto / Polígono + Buffer Exhaustivo (Arrastrar)</span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          {/* Botón Minimizar */}
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 flex items-center space-x-1 text-[11px] font-bold transition shadow-sm cursor-pointer"
            title="Minimizar Panel"
          >
            <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Minimizar</span>
          </button>

          {/* Botón Cerrar */}
          <button
            onClick={onClose}
            className="p-1.5 px-2 rounded-xl bg-rose-950/60 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-800/80 flex items-center space-x-1 text-[11px] font-bold transition shadow-sm cursor-pointer"
            title="Cerrar Panel"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cerrar</span>
          </button>
        </div>
      </div>
      {!isMinimized && (
        <>
          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/80 px-3 pt-2 space-x-2 shrink-0">
            <button
              onClick={() => setActiveTab('urban')}
              className={`flex-1 pb-2.5 text-[11px] font-extrabold flex items-center justify-center space-x-1.5 border-b-2 transition ${
                activeTab === 'urban'
                  ? 'border-emerald-400 text-emerald-400 bg-emerald-950/30 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>🔍 Búsqueda con Buffer</span>
            </button>
            <button
              onClick={() => setActiveTab('triangulation')}
              className={`flex-1 pb-2.5 text-[11px] font-extrabold flex items-center justify-center space-x-1.5 border-b-2 transition ${
                activeTab === 'triangulation'
                  ? 'border-emerald-400 text-emerald-400 bg-emerald-950/30 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>🌐 Triangulación</span>
            </button>
          </div>

          {/* Panel Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === 'urban' ? (
              <>
                {/* 1. FIJAR REFERENCIA EN EL MAPA */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    1. FIJAR REFERENCIA EN EL MAPA:
                  </span>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={onStartPickPoint}
                      className="py-2.5 px-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-white font-extrabold text-[11px] flex flex-col items-center justify-center space-y-1 transition shadow-lg group"
                    >
                      <MousePointerClick className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Colocar Punto</span>
                    </button>

                    <button
                      onClick={onStartDrawPolygon}
                      className="py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 text-cyan-300 font-extrabold text-[11px] flex flex-col items-center justify-center space-y-1 transition group"
                    >
                      <Square className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Trazar Polígono</span>
                    </button>

                    <button
                      onClick={() => setShowCoordsPanel(prev => !prev)}
                      className={`py-2.5 px-2 rounded-xl border text-[11px] font-extrabold flex flex-col items-center justify-center space-y-1 transition group shadow-md ${
                        showCoordsPanel
                          ? 'bg-amber-500/30 border-amber-400 text-amber-200 ring-1 ring-amber-400'
                          : 'bg-slate-900 hover:bg-slate-800 border-slate-700 hover:border-amber-500 text-amber-300'
                      }`}
                    >
                      <div className="flex items-center space-x-1">
                        <span className="font-mono text-xs font-black">#</span>
                        {showCoordsPanel ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </div>
                      <span>Coordenadas</span>
                    </button>
                  </div>

                  {/* Panel Interactivo de Coordenadas UTM / Geográficas */}
                  {showCoordsPanel && (
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/50 space-y-3 animate-in fade-in zoom-in-95 duration-150 shadow-2xl">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Ingreso de Coordenadas</span>
                        </span>
                        
                        {/* Selector de Sistema */}
                        <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[10px] font-bold">
                          <button
                            type="button"
                            onClick={() => setCoordType('UTM')}
                            className={`px-2 py-0.5 rounded transition ${
                              coordType === 'UTM' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            UTM WGS84
                          </button>
                          <button
                            type="button"
                            onClick={() => setCoordType('GEOGRAPHIC')}
                            className={`px-2 py-0.5 rounded transition ${
                              coordType === 'GEOGRAPHIC' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Lat / Lng
                          </button>
                        </div>
                      </div>

                      {coordType === 'UTM' ? (
                        <div className="space-y-2.5">
                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1">
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                                Zona UTM:
                              </label>
                              <select
                                value={inputZona}
                                onChange={(e) => handleUtmChange(inputEste, inputNorte, e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 text-amber-300 rounded-lg px-2 py-1.5 text-xs font-bold focus:ring-1 focus:ring-amber-500 outline-none"
                              >
                                <option value="17S">17S (Norte/Oeste)</option>
                                <option value="18S">18S (Centro/Sierra)</option>
                                <option value="19S">19S (Sur/Oriente)</option>
                              </select>
                            </div>

                            <div className="col-span-1">
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                                Este X (m):
                              </label>
                              <input
                                type="number"
                                step="any"
                                placeholder="815462.0"
                                value={inputEste}
                                onChange={(e) => handleUtmChange(e.target.value, inputNorte, inputZona)}
                                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-2 py-1.5 text-xs font-mono font-bold focus:ring-1 focus:ring-amber-500 outline-none"
                              />
                            </div>

                            <div className="col-span-1">
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                                Norte Y (m):
                              </label>
                              <input
                                type="number"
                                step="any"
                                placeholder="9240260.0"
                                value={inputNorte}
                                onChange={(e) => handleUtmChange(inputEste, e.target.value, inputZona)}
                                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-2 py-1.5 text-xs font-mono font-bold focus:ring-1 focus:ring-amber-500 outline-none"
                              />
                            </div>
                          </div>

                          <div className="text-[10px] text-slate-400 flex items-center justify-between bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                            <span>Equivalente Geográfico:</span>
                            <span className="font-mono font-bold text-emerald-400">{inputLat}°, {inputLng}°</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                                Latitud (° WGS84):
                              </label>
                              <input
                                type="number"
                                step="any"
                                placeholder="-6.870120"
                                value={inputLat}
                                onChange={(e) => handleGeoChange(e.target.value, inputLng)}
                                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-2 py-1.5 text-xs font-mono font-bold focus:ring-1 focus:ring-amber-500 outline-none"
                              />
                            </div>

                            <div>
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                                Longitud (° WGS84):
                              </label>
                              <input
                                type="number"
                                step="any"
                                placeholder="-78.152340"
                                value={inputLng}
                                onChange={(e) => handleGeoChange(inputLat, e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-2 py-1.5 text-xs font-mono font-bold focus:ring-1 focus:ring-amber-500 outline-none"
                              />
                            </div>
                          </div>

                          <div className="text-[10px] text-slate-400 flex items-center justify-between bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                            <span>Equivalente UTM:</span>
                            <span className="font-mono font-bold text-amber-300">{inputEste} m E, {inputNorte} m N ({inputZona})</span>
                          </div>
                        </div>
                      )}

                      {/* Botones de Acción de Coordenadas */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleApplyCoords(false)}
                          className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-amber-300 font-extrabold text-[11px] flex items-center justify-center space-x-1.5 transition active:scale-95"
                          title="Fija el punto de referencia y vuela a las coordenadas"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Ubicar en Mapa</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleApplyCoords(true)}
                          className="py-2 px-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white font-black text-[11px] flex items-center justify-center space-x-1.5 transition shadow-lg active:scale-95"
                          title="Ubica las coordenadas, actualiza el buffer y ejecuta la búsqueda de IRS"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Ubicar y Buscar IRS</span>
                        </button>
                      </div>

                      {coordFeedback && (
                        <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-[10px] text-emerald-300 font-bold flex items-center space-x-1.5 animate-in fade-in">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{coordFeedback}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Status Box: Current Point / Center Details con UTM geodésico exacto */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-emerald-400 font-bold">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>Referencia: {jurisdiction.distrito} ({jurisdiction.provincia})</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 font-mono pt-1 border-t border-slate-900">
                    <div>
                      <span className="text-slate-500 block">Lat / Lng (WGS84):</span>
                      <span className="font-bold text-white">{jurisdiction.lat.toFixed(5)}°, {jurisdiction.lng.toFixed(5)}°</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">UTM WGS84 ({currentUtm.zona}):</span>
                      <span className="font-bold text-emerald-300">{Math.round(currentUtm.este).toLocaleString('es-PE')} E, {Math.round(currentUtm.norte).toLocaleString('es-PE')} N</span>
                    </div>
                  </div>
                </div>

                {/* 2. RADIO DE BÚSQUEDA / BUFFER SLIDER (KM O METROS) */}
                <div className="space-y-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-200 flex items-center space-x-1.5">
                      <Sliders className="w-4 h-4 text-emerald-400" />
                      <span>Radio de Búsqueda / Buffer:</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-0.5 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                        <button
                          type="button"
                          onClick={() => setRadiusUnit('km')}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded transition ${radiusUnit === 'km' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
                        >
                          km
                        </button>
                        <button
                          type="button"
                          onClick={() => setRadiusUnit('m')}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded transition ${radiusUnit === 'm' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
                        >
                          m
                        </button>
                      </div>
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs border border-emerald-500/40 font-mono">
                        {radiusUnit === 'km' ? `${localRadiusKm} km` : `${Math.round(localRadiusKm * 1000)} m`}
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={radiusUnit === 'km' ? "5" : "500"}
                    max={radiusUnit === 'km' ? "35" : "35000"}
                    step={radiusUnit === 'km' ? "1" : "500"}
                    value={radiusUnit === 'km' ? localRadiusKm : Math.round(localRadiusKm * 1000)}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const kmVal = radiusUnit === 'km' ? val : val / 1000;
                      handleRadiusSlider(kmVal);
                    }}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold font-mono">
                    <span>{radiusUnit === 'km' ? '5 km (5000m)' : '500 m'}</span>
                    <span>{radiusUnit === 'km' ? '15 km (15000m)' : '15000 m'}</span>
                    <span>{radiusUnit === 'km' ? '35 km (35000m)' : '35000 m'}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Área mínima requerida:</span>
                    <select
                      value={minAreaHa}
                      onChange={(e) => setMinAreaHa(Number(e.target.value))}
                      className="bg-slate-950 border border-slate-700 text-emerald-400 font-bold text-xs rounded-lg px-2 py-1 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value={10}>10 Ha (100,000 m²)</option>
                      <option value={15}>15 Ha (150,000 m²)</option>
                      <option value={20}>20 Ha (200,000 m²)</option>
                      <option value={30}>30 Ha (300,000 m²)</option>
                    </select>
                  </div>
                </div>

                {/* 3. BOTÓN PROMINENTE DE INICIO DE BÚSQUEDA EXHAUSTIVA */}
                <button
                  onClick={() => {
                    if (onExecuteSearch) onExecuteSearch(localRadiusKm, minAreaHa);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-xl transition transform active:scale-95 flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>🚀 BÚSQUEDA EXHAUSTIVA EN BUFFER ({localRadiusKm} KM)</span>
                </button>

                {/* 4. RESULTADOS EXHAUSTIVOS LISTING CARDS */}
                {candidateZones.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-300">Sectores Evaluados ({candidateZones.length}):</span>
                      <span className="text-emerald-400">Guía D.L. 1279 MINAM</span>
                    </div>

                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {candidateZones.map((zone, idx) => (
                        <div
                          key={zone.id}
                          onClick={() => onSelectZone(zone)}
                          className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/60 cursor-pointer transition space-y-1.5 group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-emerald-400 group-hover:text-emerald-300">
                              Alt {idx + 1}: {zone.nombre}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${
                              zone.clasificacion === 'OPTIMA'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                                : zone.clasificacion === 'FAVORABLE'
                                ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                                : 'bg-rose-950 text-rose-300 border-rose-700'
                            }`}>
                              {zone.puntajeAHP} / 100 pts ({zone.clasificacion})
                            </span>
                          </div>

                          <div className="text-[10px] text-slate-300 leading-tight">
                            UTM: {zone.coordenadasUTM[0]?.este || 815509} E, {zone.coordenadasUTM[0]?.norte || 9248227} N | {zone.areaHa} Ha | {zone.texturaSuelo}
                          </div>

                          <div className="pt-1 flex items-center justify-between border-t border-slate-900 text-[9px]">
                            <span className="text-slate-400 font-mono">Distancia: {zone.distanciaCentroideKm} km</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenFichaTecnica) onOpenFichaTecnica(zone);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-black text-[10px] shadow transition flex items-center space-x-1"
                            >
                              <FileText className="w-3 h-3" />
                              <span>Ficha & PDF</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* TAB 2: TRIANGULACIÓN MULTI-DISTRITAL */
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/50 text-xs text-blue-200">
                  <span className="font-bold block mb-1">Triangulación Interdistrital Mancomunada</span>
                  <p className="text-[11px] text-blue-300/80">
                    Añada distritos colindantes para ubicar el centroide ponderado óptimo para un relleno sanitario intermunicipal.
                  </p>
                </div>

                {/* Autocomplete Input */}
                <div className="space-y-2 relative">
                  <label className="text-xs font-bold text-slate-300 block">
                    Buscar Municipio / Centro Poblado (Perú)
                  </label>

                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={districtSearchTerm}
                      onFocus={() => setIsDropdownOpen(true)}
                      onChange={(e) => {
                        setDistrictSearchTerm(e.target.value);
                        setIsDropdownOpen(true);
                      }}
                      placeholder="Escriba el distrito (ej. Celendín, Chumuch, Wanchaq...)"
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {isDropdownOpen && districtSearchTerm.length > 0 && (
                    <div className="absolute top-14 left-0 w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 max-h-48 overflow-y-auto divide-y divide-slate-800">
                      {filteredDistricts.length > 0 ? (
                        filteredDistricts.map(j => (
                          <button
                            key={j.ubigeo}
                            onClick={() => handleSelectAutocompleteDistrict(j)}
                            className="w-full text-left p-2.5 hover:bg-slate-800 flex items-center justify-between text-xs transition"
                          >
                            <div>
                              <span className="font-bold text-white block">{j.distrito}</span>
                              <span className="text-[10px] text-slate-400">{j.provincia}, {j.departamento}</span>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-400">
                              {j.ubigeo}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="p-2.5 text-xs text-slate-400 text-center">No se encontraron distritos</div>
                      )}
                    </div>
                  )}

                  {/* Selected Chips with Action Toolbar */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedDistricts.map((dist) => (
                        <span
                          key={dist.ubigeo}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-[11px] font-semibold flex items-center space-x-1.5"
                        >
                          <span>📍 {dist.distrito}</span>
                          <button
                            onClick={() => handleRemoveDistrict(dist.ubigeo)}
                            className="text-slate-400 hover:text-rose-400 font-bold"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Toolbar de Deshacer y Limpiar Triangulación */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleUndoLastDistrict}
                        disabled={selectedDistricts.length === 0}
                        className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 disabled:opacity-40 text-[10px] font-bold flex items-center justify-center space-x-1 transition"
                      >
                        <Undo2 className="w-3.5 h-3.5" />
                        <span>Deshacer Último</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleClearAllTriangulation}
                        disabled={selectedDistricts.length === 0}
                        className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-700 text-rose-400 disabled:opacity-40 text-[10px] font-bold flex items-center justify-center space-x-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Limpiar Triangulación</span>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleRunTriangulation}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg transition flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>▶ TRIANGULAR ÁREA INTERMUNICIPAL</span>
                </button>

                {/* Si la triangulación se ha ejecutado o hay distritos seleccionados, desplegar control de Buffer de Búsqueda */}
                {(isTriangulated || selectedDistricts.length > 0) && (
                  <div className="space-y-3 pt-3 border-t border-slate-800">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-xs space-y-1">
                      <span className="text-emerald-400 font-extrabold block">Baricentro Intermunicipal Fijo:</span>
                      <span className="text-slate-300 text-[11px] block font-mono">
                        Lat: {jurisdiction.lat.toFixed(5)}°, Lng: {jurisdiction.lng.toFixed(5)}°
                      </span>
                    </div>

                    {/* Radio de Búsqueda Slider */}
                    <div className="space-y-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-slate-200 flex items-center space-x-1.5">
                          <Sliders className="w-4 h-4 text-emerald-400" />
                          <span>Radio en Baricentro:</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs border border-emerald-500/40 font-mono">
                          {localRadiusKm} km
                        </span>
                      </div>

                      <input
                        type="range"
                        min="5"
                        max="35"
                        step="1"
                        value={localRadiusKm}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          handleRadiusSlider(val);
                        }}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (onExecuteSearch) onExecuteSearch(localRadiusKm, minAreaHa);
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-xl transition flex items-center justify-center space-x-2"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>🚀 BÚSQUEDA EXHAUSTIVA EN BARICENTRO ({localRadiusKm} KM)</span>
                    </button>

                    {/* LISTA DE ALTERNATIVAS INTERMUNICIPALES EVALUADAS */}
                    {candidateZones.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-800">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-slate-300">Sectores Evaluados ({candidateZones.length}):</span>
                          <span className="text-cyan-400">Modelo Mancomunado MINAM</span>
                        </div>

                        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                          {candidateZones.map((zone, idx) => (
                            <div
                              key={zone.id}
                              onClick={() => onSelectZone(zone)}
                              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/60 cursor-pointer transition space-y-1.5 group"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-cyan-400 group-hover:text-cyan-300">
                                  Alt {idx + 1}: {zone.nombre}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${
                                  zone.clasificacion === 'OPTIMA'
                                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                                    : zone.clasificacion === 'FAVORABLE'
                                    ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                                    : 'bg-rose-950 text-rose-300 border-rose-700'
                                }`}>
                                  {zone.puntajeAHP} / 100 pts ({zone.clasificacion})
                                </span>
                              </div>

                              <div className="text-[10px] text-slate-300 leading-tight">
                                UTM: {zone.coordenadasUTM[0]?.este || 815509} E, {zone.coordenadasUTM[0]?.norte || 9248227} N | {zone.areaHa} Ha
                              </div>

                              <div className="pt-1 flex items-center justify-between border-t border-slate-900 text-[9px]">
                                <span className="text-slate-400 font-mono">Distancia Baricentro: {zone.distanciaCentroideKm} km</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (onOpenFichaTecnica) onOpenFichaTecnica(zone);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-black text-[10px] shadow transition flex items-center space-x-1"
                                >
                                  <FileText className="w-3 h-3" />
                                  <span>Ficha & PDF</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
