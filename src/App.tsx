import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MapView } from './components/MapView';
import { LayerTOC } from './components/LayerTOC';
import { SizingCalculatorPanel } from './components/SizingCalculatorPanel';
import { EvaluationMatrixPanel } from './components/EvaluationMatrixPanel';
import { GeoPeruLiveVisor } from './components/GeoPeruLiveVisor';
import { SpatialScannerModal } from './components/SpatialScannerModal';
import { PythonScriptModal } from './components/PythonScriptModal';
import { MeasurementTools } from './components/MeasurementTools';
import { IRSLocatorModal } from './components/IRSLocatorModal';
import { FichaTecnicaModal } from './components/FichaTecnicaModal';
import { PortadaInicio } from './components/PortadaInicio';

import { Jurisdiction, CandidateZone, WMSLayerConfig, LayerPreset } from './types';
import { PERU_JURISDICTIONS } from './constants/peruDemographics';
import { OFFICIAL_WMS_LAYERS } from './constants/wmsLayers';
import { PERU_CANDIDATE_ZONES } from './constants/candidateZones';

import { calculateLandfillSizing } from './utils/sizingCalculator';
import { evaluateZoneAHP, DEFAULT_AHP_WEIGHTS } from './utils/ahpMatrixEvaluator';
import { generateInstitutionalPDFReport } from './utils/pdfReportGenerator';
import { evaluateSpatialCandidatesMINAM, evaluateIntermunicipalCandidates, calculateDistanceKm } from './utils/spatialUtils';
import { evaluateZEEData, evaluateLandUseData, generateGeoAISustenance } from './utils/geoAIEngine';

export const App: React.FC = () => {
  // Navigation & View State
  const [showPortada, setShowPortada] = useState(true);
  const [activeTab, setActiveTab] = useState<'map' | 'calculator' | 'matrix' | 'geoperu'>('map');
  const [currentJurisdiction, setCurrentJurisdiction] = useState<Jurisdiction>(PERU_JURISDICTIONS[0]); // Celendín, Cajamarca por defecto
  const [candidateZones, setCandidateZones] = useState<CandidateZone[]>(PERU_CANDIDATE_ZONES);
  const [selectedZone, setSelectedZone] = useState<CandidateZone | null>(null);
  const [searchRadiusKm, setSearchRadiusKm] = useState<number>(8);

  // WMS Layer Management & LocalStorage Persistence
  const [wmsLayers, setWmsLayers] = useState<WMSLayerConfig[]>(() => {
    const saved = localStorage.getItem('geoportal_irs_wms_layers_v4');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return OFFICIAL_WMS_LAYERS;
  });

  const [layerStatuses, setLayerStatuses] = useState<Record<string, 'OK' | 'ERROR' | 'LOADING'>>({});

  useEffect(() => {
    localStorage.setItem('geoportal_irs_wms_layers_v4', JSON.stringify(wmsLayers));
  }, [wmsLayers]);

  // Modals & Tools State
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isPythonModalOpen, setIsPythonModalOpen] = useState(false);
  const [isMeasurementActive, setIsMeasurementActive] = useState(false);
  const [isIRSLocatorOpen, setIsIRSLocatorOpen] = useState(false);
  const [isFichaTecnicaOpen, setIsFichaTecnicaOpen] = useState(false);
  const [isPickingPoint, setIsPickingPoint] = useState(false);
  const [undoTrigger, setUndoTrigger] = useState(0);
  const [clearAllTrigger, setClearAllTrigger] = useState(0);
  const [completePolygonTrigger, setCompletePolygonTrigger] = useState(0);
  const [triangulatedDistricts, setTriangulatedDistricts] = useState<Jurisdiction[]>([]);

  const handlePointPicked = (lat: number, lng: number) => {
    setIsPickingPoint(false);
    setCurrentJurisdiction(prev => ({
      ...prev,
      nombre: `Punto Fijado (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      lat,
      lng
    }));
  };

  // Handlers for Layers & Presets
  const handleToggleLayer = (id: string) => {
    setWmsLayers(prev => prev.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  };

  const handleChangeOpacity = (id: string, opacity: number) => {
    setWmsLayers(prev => prev.map(l => l.id === id ? { ...l, opacidad: opacity } : l));
  };

  const handleApplyPreset = (preset: LayerPreset) => {
    setWmsLayers(prev => prev.map(l => ({
      ...l,
      visible: preset.layerIds.includes(l.id)
    })));
  };

  const handleAddCustomLayer = (newLayer: WMSLayerConfig) => {
    setWmsLayers(prev => [newLayer, ...prev]);
  };

  const handleLayerStatusUpdate = React.useCallback((layerId: string, status: 'OK' | 'ERROR' | 'LOADING') => {
    setLayerStatuses(prev => {
      if (prev[layerId] === status) return prev;
      return { ...prev, [layerId]: status };
    });
  }, []);

  const handleExportConfig = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(wmsLayers, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "geoportal_irs_wms_config_v3.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          setWmsLayers(parsed);
        } catch (err) {
          alert("Error al cargar archivo JSON.");
        }
      };
    }
  };

  // Handlers for Drawn Polygons
  const handlePolygonCreated = (coords: [number, number][], areaHa: number, centroidLat?: number, centroidLng?: number) => {
    setIsMeasurementActive(false);

    const cLat = centroidLat || coords[0][0];
    const cLng = centroidLng || coords[0][1];

    const updatedJurisdiction = {
      ...currentJurisdiction,
      lat: cLat,
      lng: cLng,
      nombre: `Área Digitalizada (${areaHa.toFixed(1)} Ha)`
    };
    setCurrentJurisdiction(updatedJurisdiction);
    setTriangulatedDistricts([]); // Reiniciar triangulación para enfocar en polígono trazado

    const approxUtmEste = Math.round(815462 + (cLng - (-78.15234)) * 111000);
    const approxUtmNorte = Math.round(9240260 + (cLat - (-6.87012)) * 111000);

    const customZoneBase: CandidateZone = {
      id: `zone_custom_${Date.now()}`,
      nombre: `Polígono Digitalizado (${areaHa.toFixed(1)} ha)`,
      ubigeo: currentJurisdiction.ubigeo,
      distrito: currentJurisdiction.distrito,
      provincia: currentJurisdiction.provincia,
      departamento: currentJurisdiction.departamento,
      areaHa,
      coordenadasCentroid: { lat: cLat, lng: cLng },
      coordenadasUTM: [
        { vertice: 'V1', este: approxUtmEste, norte: approxUtmNorte, zona: '17S' }
      ],
      poligonoWGS84: coords,
      distanciaCPm: 1800,
      texturaSuelo: 'Areno-Arcilloso Impermeable',
      permeabilidadK: 1e-7,
      pendientePct: 4.8,
      distanciaViaM: 450,
      profundidadNapaM: 35,
      esPredioSBN: true,
      clasificacion: 'OPTIMA',
      puntajeAHP: 95,
      litologia: 'Formación Geológica Predial (D.L. 1278)',
      distanciaCentroideKm: 1.8
    };

    const zee = evaluateZEEData(customZoneBase, updatedJurisdiction);
    const land = evaluateLandUseData(customZoneBase, updatedJurisdiction);
    const geoai = generateGeoAISustenance(customZoneBase, updatedJurisdiction);

    const customZone: CandidateZone = {
      ...customZoneBase,
      subzonaZEE: zee.subzonaZEE,
      categoriaZEE: zee.categoriaZEE,
      compatibilidadZEE: zee.compatibilidadZEE,
      ordenanzaAprobacionZEE: zee.ordenanzaAprobacionZEE,
      sustentoTecnicoZEE: zee.sustentoTecnicoZEE,
      sustentoGeoAI: geoai,
      cumClase: land.cumClase,
      cumSubclase: land.cumSubclase,
      vocacionAgrologica: land.vocacionAgrologica,
      cumAptitudIRS: land.cumAptitudIRS,
      usoActualSuelo: land.usoActualSuelo,
      conflictoUsoSuelo: land.conflictoUsoSuelo,
      vientosDominantes: land.vientosDominantes,
      disponibilidadMaterialCobertura: land.disponibilidadMaterialCobertura,
      pozosMonitoreoRequeridos: land.pozosMonitoreoRequeridos,
      saneamientoSBN: land.saneamientoSBN
    };

    const rKm = searchRadiusKm > 0 ? searchRadiusKm : 8;
    setSearchRadiusKm(rKm);

    // Búsqueda exhaustiva en buffer alrededor del polígono digitalizado bajo normativa MINAM
    const evaluatedSites = evaluateSpatialCandidatesMINAM(cLat, cLng, updatedJurisdiction, rKm, areaHa);
    const allCandidates = [customZone, ...evaluatedSites.filter(z => z.id !== customZone.id)];

    setCandidateZones(allCandidates);
    setSelectedZone(customZone);
    setIsIRSLocatorOpen(true);
    setActiveTab('map');
  };

  // Export PDF Report
  const handleExportPDF = () => {
    const activeZone: CandidateZone = selectedZone || candidateZones[0] || {
      id: `zone_default_${Date.now()}`,
      nombre: `Área Evaluada ${currentJurisdiction.distrito}`,
      ubigeo: currentJurisdiction.ubigeo,
      distrito: currentJurisdiction.distrito,
      provincia: currentJurisdiction.provincia,
      departamento: currentJurisdiction.departamento,
      areaHa: 18.5,
      coordenadasCentroid: { lat: currentJurisdiction.lat, lng: currentJurisdiction.lng },
      coordenadasUTM: [{ vertice: 'V1', este: 815200, norte: 9240100, zona: '17S' }],
      poligonoWGS84: [],
      distanciaCPm: 2400,
      texturaSuelo: 'Lutitas impermeables',
      permeabilidadK: 1e-7,
      pendientePct: 4.8,
      distanciaViaM: 650,
      profundidadNapaM: 35,
      esPredioSBN: true,
      clasificacion: 'OPTIMA',
      puntajeAHP: 94,
      litologia: 'Formación Celendín',
      distanciaCentroideKm: 2.4
    };

    const sizingResults = calculateLandfillSizing({
      poblacionServida: currentJurisdiction.poblacion,
      tasaCrecimiento: currentJurisdiction.tasaCrecimiento,
      gpc: currentJurisdiction.gpc,
      coberturaRecoleccionPct: 90,
      densidadSuelto: 0.25,
      densidadCompactadoTruck: 0.45,
      densidadCelda: 0.75,
      relacionCoberturaPct: 20,
      alturaPromedioCeldaM: 6.0,
      factorInfraestructuraAux: 1.30,
      vidaUtilAnios: 10
    });

    const ahpResult = evaluateZoneAHP(activeZone, DEFAULT_AHP_WEIGHTS);
    generateInstitutionalPDFReport(activeZone, currentJurisdiction, sizingResults, ahpResult);
  };

  const handleTriangulateDistricts = (districts: Jurisdiction[]) => {
    if (!districts || districts.length === 0) return;
    setTriangulatedDistricts(districts);

    let totalPop = 0;
    let weightedLat = 0;
    let weightedLng = 0;

    districts.forEach(d => {
      const pop = d.poblacion || 10000;
      totalPop += pop;
      weightedLat += d.lat * pop;
      weightedLng += d.lng * pop;
    });

    const bLat = totalPop > 0 ? weightedLat / totalPop : districts[0].lat;
    const bLng = totalPop > 0 ? weightedLng / totalPop : districts[0].lng;

    // Calcular el radio mínimo que abarca a todos los distritos participantes
    let maxDistToDistrict = 0;
    districts.forEach(d => {
      const dist = calculateDistanceKm(bLat, bLng, d.lat, d.lng);
      if (dist > maxDistToDistrict) maxDistToDistrict = dist;
    });

    const intermunicipalRadius = Math.max(10, Math.ceil(maxDistToDistrict + 2.5));
    setSearchRadiusKm(intermunicipalRadius);

    const names = districts.map(d => d.distrito).join(' - ');
    const mancomunidadJurisdiction: Jurisdiction = {
      ubigeo: districts[0].ubigeo,
      departamento: districts[0].departamento,
      provincia: districts[0].provincia,
      distrito: `Mancomunidad (${names})`,
      region: districts[0].region,
      poblacion: totalPop,
      gpc: districts[0].gpc,
      tasaCrecimiento: districts[0].tasaCrecimiento,
      lat: bLat,
      lng: bLng,
      zoom: 12
    };

    setCurrentJurisdiction(mancomunidadJurisdiction);

    const evaluatedSites = evaluateIntermunicipalCandidates(districts, bLat, bLng, intermunicipalRadius, 25);
    setCandidateZones(evaluatedSites);
    if (evaluatedSites.length > 0) {
      setSelectedZone(evaluatedSites[0]);
    }
    setActiveTab('map');
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950">
      {/* Top Navbar */}
      <Navbar
        currentJurisdiction={currentJurisdiction}
        onSelectJurisdiction={(j) => {
          setCurrentJurisdiction(j);
          const zoneInJ = candidateZones.find(z => z.ubigeo === j.ubigeo);
          if (zoneInJ) setSelectedZone(zoneInJ);
        }}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenPythonModal={() => setIsPythonModalOpen(true)}
        isMeasurementActive={isMeasurementActive}
        onToggleMeasurement={() => setIsMeasurementActive(!isMeasurementActive)}
        onExportPDF={handleExportPDF}
        onOpenIRSLocator={() => setIsIRSLocatorOpen(true)}
        onOpenFichaTecnica={() => setIsFichaTecnicaOpen(true)}
        onOpenPortada={() => setShowPortada(true)}
      />

      {/* Main View Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {activeTab === 'map' && (
          <>
            <LayerTOC
              layers={wmsLayers}
              onToggleLayer={handleToggleLayer}
              onChangeOpacity={handleChangeOpacity}
              onApplyPreset={handleApplyPreset}
              onExportConfig={handleExportConfig}
              onImportConfig={handleImportConfig}
              onAddCustomLayer={handleAddCustomLayer}
              layerStatuses={layerStatuses}
              onFlyToCoordinates={(lat, lng, zoom) => {
                setCurrentJurisdiction(prev => ({
                  ...prev,
                  lat,
                  lng,
                  zoom
                }));
              }}
            />

            <MapView
              jurisdiction={currentJurisdiction}
              candidateZones={candidateZones}
              activeWMSLayers={wmsLayers}
              selectedZone={selectedZone}
              onSelectZone={setSelectedZone}
              isMeasurementActive={isMeasurementActive}
              onPolygonCreated={handlePolygonCreated}
              onLayerStatusUpdate={handleLayerStatusUpdate}
              isPickingPoint={isPickingPoint}
              onPointPicked={handlePointPicked}
              onCancelPickPoint={() => setIsPickingPoint(false)}
              onOpenFichaTecnica={(zone) => {
                setSelectedZone(zone);
                setIsFichaTecnicaOpen(true);
              }}
              searchRadiusKm={searchRadiusKm}
              onUndoVertex={undoTrigger}
              onClearAllDrawn={clearAllTrigger}
              onCompletePolygonTrigger={completePolygonTrigger}
              triangulatedDistricts={triangulatedDistricts}
            />

            <IRSLocatorModal
              isOpen={isIRSLocatorOpen}
              onClose={() => setIsIRSLocatorOpen(false)}
              jurisdiction={currentJurisdiction}
              candidateZones={candidateZones}
              onSelectZone={(z) => {
                setSelectedZone(z);
                setActiveTab('map');
              }}
              onTriangulateDistricts={handleTriangulateDistricts}
              onStartPickPoint={() => {
                setActiveTab('map');
                setIsPickingPoint(true);
              }}
              onStartDrawPolygon={() => {
                setActiveTab('map');
                setIsMeasurementActive(true);
              }}
              onSelectJurisdiction={(j) => setCurrentJurisdiction(j)}
              searchRadiusKm={searchRadiusKm}
              onSearchRadiusChange={setSearchRadiusKm}
              onOpenFichaTecnica={(zone) => {
                setSelectedZone(zone);
                setIsFichaTecnicaOpen(true);
              }}
              onClearTriangulation={() => {
                setTriangulatedDistricts([]);
                setCandidateZones([]);
                setSelectedZone(null);
              }}
              onExecuteSearch={(radiusKm, minAreaHa) => {
                setActiveTab('map');
                const rKm = Number(radiusKm) || 8;
                const reqArea = Number(minAreaHa) || 20;
                setSearchRadiusKm(rKm);

                if (isMeasurementActive) {
                  setCompletePolygonTrigger(Date.now());
                  setIsMeasurementActive(false);
                }

                const lat = currentJurisdiction.lat;
                const lng = currentJurisdiction.lng;

                let evaluatedSites: CandidateZone[] = [];
                if (triangulatedDistricts.length > 1) {
                  evaluatedSites = evaluateIntermunicipalCandidates(triangulatedDistricts, lat, lng, rKm, reqArea);
                } else {
                  evaluatedSites = evaluateSpatialCandidatesMINAM(lat, lng, currentJurisdiction, rKm, reqArea);
                }

                // Preservar polígono trazado por el usuario al tope de alternativas
                if (selectedZone && selectedZone.poligonoWGS84 && selectedZone.poligonoWGS84.length > 0) {
                  const combined = [selectedZone, ...evaluatedSites.filter(z => z.id !== selectedZone.id)];
                  setCandidateZones(combined);
                } else {
                  setCandidateZones(evaluatedSites);
                  if (evaluatedSites.length > 0) {
                    setSelectedZone(evaluatedSites[0]);
                  }
                }
              }}
            />

            <MeasurementTools
              isActive={isMeasurementActive}
              onToggle={() => setIsMeasurementActive(false)}
              onCompletePolygon={() => setCompletePolygonTrigger(Date.now())}
              onUndoVertex={() => {
                setUndoTrigger(Date.now());
                if (!isMeasurementActive) {
                  if (triangulatedDistricts.length > 0) {
                    setTriangulatedDistricts(prev => prev.slice(0, -1));
                  } else if (candidateZones.length > 0) {
                    setCandidateZones(prev => prev.slice(0, -1));
                  }
                }
              }}
              onClearAll={() => {
                setClearAllTrigger(Date.now());
                setCandidateZones([]);
                setSelectedZone(null);
                setTriangulatedDistricts([]);
                setCurrentJurisdiction(PERU_JURISDICTIONS[0]);
                setSearchRadiusKm(8);
                setIsMeasurementActive(false);
                setIsPickingPoint(false);
              }}
              hasActiveFeatures={candidateZones.length > 0 || triangulatedDistricts.length > 0 || searchRadiusKm > 0}
              onCenterMap={() => {
                setCurrentJurisdiction(prev => ({ ...prev }));
              }}
            />
          </>
        )}

        {activeTab === 'calculator' && (
          <SizingCalculatorPanel jurisdiction={currentJurisdiction} />
        )}

        {activeTab === 'matrix' && (
          <EvaluationMatrixPanel
            jurisdiction={currentJurisdiction}
            candidateZones={candidateZones}
            selectedZone={selectedZone}
            onSelectZone={setSelectedZone}
            sizingResults={calculateLandfillSizing({
              poblacionServida: currentJurisdiction.poblacion,
              tasaCrecimiento: currentJurisdiction.tasaCrecimiento,
              gpc: currentJurisdiction.gpc,
              coberturaRecoleccionPct: 90,
              densidadSuelto: 0.25,
              densidadCompactadoTruck: 0.45,
              densidadCelda: 0.75,
              relacionCoberturaPct: 20,
              alturaPromedioCeldaM: 6.0,
              factorInfraestructuraAux: 1.30,
              vidaUtilAnios: 10
            })}
            onExportPDF={handleExportPDF}
          />
        )}

        {activeTab === 'geoperu' && (
          <GeoPeruLiveVisor />
        )}
      </div>

      {/* Modals */}
      <FichaTecnicaModal
        isOpen={isFichaTecnicaOpen}
        onClose={() => setIsFichaTecnicaOpen(false)}
        zone={selectedZone}
        jurisdiction={currentJurisdiction}
      />

      <SpatialScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        jurisdiction={currentJurisdiction}
        candidateZones={candidateZones}
        onSelectZone={(z) => {
          setSelectedZone(z);
          setActiveTab('map');
        }}
      />

      <PythonScriptModal
        isOpen={isPythonModalOpen}
        onClose={() => setIsPythonModalOpen(false)}
        selectedZone={selectedZone}
        candidateZones={candidateZones}
        jurisdiction={currentJurisdiction}
        onSelectZone={setSelectedZone}
      />

      {/* Portada de Inicio Cinematográfica */}
      {showPortada && (
        <PortadaInicio onEnterPortal={() => setShowPortada(false)} />
      )}
    </div>
  );
};
export default App;
