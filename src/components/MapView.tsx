import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import JSZip from 'jszip';
import { kml } from '@tmcw/togeojson';
import { Jurisdiction, CandidateZone, WMSLayerConfig } from '../types';
import { calculatePolygonAreaHa } from '../utils/spatialUtils';

interface MapViewProps {
  jurisdiction: Jurisdiction;
  candidateZones: CandidateZone[];
  activeWMSLayers: WMSLayerConfig[];
  selectedZone: CandidateZone | null;
  onSelectZone: (zone: CandidateZone) => void;
  isMeasurementActive: boolean;
  onPolygonCreated: (coords: [number, number][], areaHa: number, centroidLat?: number, centroidLng?: number) => void;
  onLayerStatusUpdate?: (layerId: string, status: 'OK' | 'ERROR' | 'LOADING') => void;
  isPickingPoint?: boolean;
  onPointPicked?: (lat: number, lng: number) => void;
  onOpenFichaTecnica?: (zone: CandidateZone) => void;
  searchRadiusKm?: number;
  onCancelPickPoint?: () => void;
  onUndoVertex?: number;
  onClearAllDrawn?: number;
  onCompletePolygonTrigger?: number;
  triangulatedDistricts?: Jurisdiction[];
}

// Función auxiliar de lectura resiliente y directa de capas locales (GeoJSON optimizado / KMZ)
async function fetchLocalLayerData(layerId: string, urlWms: string): Promise<any> {
  // 1. Prioridad: Cargar versión GeoJSON de alta velocidad si está disponible
  const candidateGeoJsonUrls = [
    `/capas/${layerId}.geojson`,
    `/CAPAS/${layerId}.geojson`,
    urlWms ? urlWms.replace(/\.kmz$/i, '.geojson') : '',
    urlWms ? urlWms.replace('/CAPAS/', '/capas/').replace(/\.kmz$/i, '.geojson') : ''
  ].filter(Boolean);

  for (const gjUrl of candidateGeoJsonUrls) {
    try {
      const res = await fetch(encodeURI(gjUrl));
      if (res.ok) {
        const text = await res.text();
        if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
          const data = JSON.parse(text);
          if (data && (data.type === 'FeatureCollection' || Array.isArray(data.features))) {
            return data;
          }
        }
      }
    } catch (_) {}
  }

  // 2. Si no hay GeoJSON disponible, procesar el archivo KMZ local
  const targetUrl = urlWms || `/CAPAS/${layerId}.kmz`;
  let kmzRes = await fetch(encodeURI(targetUrl));
  if (!kmzRes.ok) {
    kmzRes = await fetch(encodeURI(targetUrl.replace('/CAPAS/', '/capas/')));
  }
  if (!kmzRes.ok) {
    kmzRes = await fetch(encodeURI(`/CAPAS/${layerId}.kmz`));
  }
  if (!kmzRes.ok) {
    kmzRes = await fetch(encodeURI(`/capas/${layerId}.kmz`));
  }
  if (!kmzRes.ok) {
    let fallbackGj = await fetch(encodeURI(`/CAPAS/${layerId}.geojson`));
    if (!fallbackGj.ok) {
      fallbackGj = await fetch(encodeURI(`/capas/${layerId}.geojson`));
    }
    if (fallbackGj.ok) {
      return await fallbackGj.json();
    }
    throw new Error(`Archivo local no encontrado para capa ${layerId} en ${targetUrl}`);
  }

  const arrayBuffer = await kmzRes.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  const kmlFileName = Object.keys(zip.files).find(name => name.toLowerCase().endsWith('.kml'));

  if (!kmlFileName) {
    throw new Error(`El archivo KMZ ${targetUrl} no contiene un documento KML válido`);
  }

  const kmlText = await zip.files[kmlFileName].async('text');
  const xmlDoc = new DOMParser().parseFromString(kmlText, 'text/xml');
  return kml(xmlDoc);
}

export const MapView: React.FC<MapViewProps> = ({
  jurisdiction,
  candidateZones,
  activeWMSLayers,
  selectedZone,
  onSelectZone,
  isMeasurementActive,
  onPolygonCreated,
  onLayerStatusUpdate,
  isPickingPoint = false,
  onPointPicked,
  onOpenFichaTecnica,
  searchRadiusKm = 8,
  onCancelPickPoint,
  onUndoVertex,
  onClearAllDrawn,
  onCompletePolygonTrigger,
  triangulatedDistricts
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const localVectorLayersRef = useRef<Map<string, L.GeoJSON>>(new Map());
  const activeWMSLayersRef = useRef<WMSLayerConfig[]>(activeWMSLayers);

  useEffect(() => {
    activeWMSLayersRef.current = activeWMSLayers;
  }, [activeWMSLayers]);

  const localLayersGroupRef = useRef<L.LayerGroup>(L.layerGroup());
  const polygonLayersGroupRef = useRef<L.LayerGroup>(L.layerGroup());
  const bufferRingsGroupRef = useRef<L.LayerGroup>(L.layerGroup());
  const radialLinesGroupRef = useRef<L.LayerGroup>(L.layerGroup());
  const triangulationGroupRef = useRef<L.LayerGroup>(L.layerGroup());
  const drawnItemsRef = useRef<L.FeatureGroup>(new L.FeatureGroup());
  const activeDrawHandlerRef = useRef<any>(null);

  const geojsonCacheRef = useRef<Record<string, any>>({});
  const pendingFetchesRef = useRef<Set<string>>(new Set());

  // 1. Inicializar Mapa Leaflet con EPSG:3857 (Web Mercator) y Mapas Base
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [jurisdiction.lat, jurisdiction.lng],
      zoom: jurisdiction.zoom,
      crs: L.CRS.EPSG3857,
      preferCanvas: true,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap | GeoIRS Perú • Creador: Crhistian Jhoames Paredes García'
    });

    const esriSatLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, USGS, IGN Perú'
    });

    const cartoPositron = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    });

    const googleSat = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      attribution: '&copy; Google Satellite Híbrido'
    });

    osmLayer.addTo(map);

    const baseMaps = {
      "OpenStreetMap (Estándar Celendín)": osmLayer,
      "Esri World Imagery (Satelital Alta Res.)": esriSatLayer,
      "Carto Voyager (Claro)": cartoPositron,
      "Google Satellite Híbrido": googleSat
    };

    L.control.layers(baseMaps, undefined, { position: 'topright' }).addTo(map);

    localLayersGroupRef.current.addTo(map);
    polygonLayersGroupRef.current.addTo(map);
    bufferRingsGroupRef.current.addTo(map);
    radialLinesGroupRef.current.addTo(map);
    triangulationGroupRef.current.addTo(map);
    drawnItemsRef.current.addTo(map);

    // Leaflet Draw event listener
    map.on((L as any).Draw.Event.CREATED, (event: any) => {
      const layer = event.layer;
      drawnItemsRef.current.clearLayers();
      drawnItemsRef.current.addLayer(layer);

      let rawLatLngs = layer.getLatLngs();
      while (Array.isArray(rawLatLngs) && rawLatLngs.length > 0 && Array.isArray(rawLatLngs[0])) {
        rawLatLngs = rawLatLngs[0];
      }

      const latlngs = rawLatLngs as L.LatLng[];
      if (latlngs && latlngs.length >= 3) {
        const coords: [number, number][] = latlngs.map((pt: any) => [pt.lat, pt.lng]);
        const areaHa = calculatePolygonAreaHa(coords);
        let sumLat = 0;
        let sumLng = 0;
        coords.forEach(c => {
          sumLat += c[0];
          sumLng += c[1];
        });
        const cLat = sumLat / coords.length;
        const cLng = sumLng / coords.length;

        if (activeDrawHandlerRef.current) {
          try { activeDrawHandlerRef.current.disable(); } catch (e) {}
          activeDrawHandlerRef.current = null;
        }

        onPolygonCreated(coords, areaHa, cLat, cLng);
      }
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Handler para deshacer vértice o limpiar polígonos
  useEffect(() => {
    if (onUndoVertex) {
      if (activeDrawHandlerRef.current && typeof activeDrawHandlerRef.current.deleteLastVertex === 'function') {
        try { activeDrawHandlerRef.current.deleteLastVertex(); } catch (e) {}
      } else if (drawnItemsRef.current) {
        const layers = drawnItemsRef.current.getLayers();
        if (layers.length > 0) {
          drawnItemsRef.current.removeLayer(layers[layers.length - 1]);
        }
      }
    }
  }, [onUndoVertex]);

  useEffect(() => {
    if (onClearAllDrawn) {
      if (drawnItemsRef.current) {
        drawnItemsRef.current.clearLayers();
      }
      if (polygonLayersGroupRef.current) {
        polygonLayersGroupRef.current.clearLayers();
      }
      if (bufferRingsGroupRef.current) {
        bufferRingsGroupRef.current.clearLayers();
      }
      if (radialLinesGroupRef.current) {
        radialLinesGroupRef.current.clearLayers();
      }
      if (triangulationGroupRef.current) {
        triangulationGroupRef.current.clearLayers();
      }
    }
  }, [onClearAllDrawn]);

  // Modo Medición / Trazado Activo (con Cierre de Polígono por Doble Clic)
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (isMeasurementActive) {
      map.doubleClickZoom.disable();
      try {
        const polygonDrawHandler = new (L.Draw as any).Polygon(map, {
          allowIntersection: true,
          showArea: true,
          shapeOptions: { color: '#10b981', fillColor: '#10b981', fillOpacity: 0.35, weight: 2.5 }
        });
        activeDrawHandlerRef.current = polygonDrawHandler;
        polygonDrawHandler.enable();

        // Manejador de Doble Clic para cerrar y finalizar el polígono instantáneamente
        const handleDblClick = () => {
          try {
            if (polygonDrawHandler && typeof polygonDrawHandler.completeShape === 'function') {
              if (typeof polygonDrawHandler.deleteLastVertex === 'function') {
                polygonDrawHandler.deleteLastVertex();
              }
              polygonDrawHandler.completeShape();
            }
          } catch (err) {
            console.warn("Complete shape on double click:", err);
          }
        };

        map.on('dblclick', handleDblClick);

        return () => {
          map.off('dblclick', handleDblClick);
          map.doubleClickZoom.enable();
          try { polygonDrawHandler.disable(); } catch (e) {}
          activeDrawHandlerRef.current = null;
        };
      } catch (e) {
        console.warn("Leaflet Draw Polygon error:", e);
      }
    } else {
      map.doubleClickZoom.enable();
    }
  }, [isMeasurementActive]);

  // Trigger para completar polígono desde la UI (Botón "Cerrar Polígono y Buscar" o "Búsqueda Exhaustiva")
  useEffect(() => {
    if (!onCompletePolygonTrigger) return;
    if (activeDrawHandlerRef.current) {
      const handler = activeDrawHandlerRef.current;
      try {
        if (typeof handler.completeShape === 'function') {
          handler.completeShape();
        }
      } catch (err) {
        console.warn("completeShape error:", err);
      }

      // Extracción directa de coordenadas si completeShape no emitió evento
      try {
        let pts: L.LatLng[] = [];
        if (handler._poly && typeof handler._poly.getLatLngs === 'function') {
          let raw = handler._poly.getLatLngs();
          while (Array.isArray(raw) && raw.length > 0 && Array.isArray(raw[0])) {
            raw = raw[0];
          }
          pts = raw as L.LatLng[];
        } else if (handler._markers && Array.isArray(handler._markers)) {
          pts = handler._markers.map((m: any) => m.getLatLng ? m.getLatLng() : m._latlng).filter(Boolean);
        }

        if (pts.length >= 3) {
          const coords: [number, number][] = pts.map((pt: any) => [pt.lat, pt.lng]);
          const areaHa = calculatePolygonAreaHa(coords);
          let sumLat = 0;
          let sumLng = 0;
          coords.forEach(c => {
            sumLat += c[0];
            sumLng += c[1];
          });
          const cLat = sumLat / coords.length;
          const cLng = sumLng / coords.length;

          try { handler.disable(); } catch (e) {}
          activeDrawHandlerRef.current = null;
          onPolygonCreated(coords, areaHa, cLat, cLng);
        }
      } catch (e2) {
        console.warn("Manual polygon finish error:", e2);
      }
    }
  }, [onCompletePolygonTrigger]);

  // 2. Volar a Celendín o departamento seleccionado
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo([jurisdiction.lat, jurisdiction.lng], jurisdiction.zoom, { duration: 1.5 });
    }
  }, [jurisdiction]);

  // 3. Simbología Cartográfica D.L. 1279 para las 15 Capas Locales Normalizadas
  // 3. Simbología Cartográfica D.L. 1278 / MINAM, CUM Suelos, CIRA y ZEE
  const getStyleForLayer = (layerId: string, opacity: number, feature?: any) => {
    // A) Zonificación Ecológica y Económica (ZEE) por Regiones
    if (layerId.startsWith('zee_')) {
      const p = feature?.properties || {};
      const txt = `${p.Name || ''} ${p.ZEE_ZONAS || ''} ${p.ZEE_GRANDE || ''} ${p.description || ''}`.toLowerCase();
      if (txt.includes('protecc') || txt.includes('conservac') || txt.includes('reserva') || txt.includes('anp') || txt.includes('b.')) {
        return { color: '#047857', weight: 1.5, fillColor: '#10b981', fillOpacity: opacity * 0.45 };
      }
      if (txt.includes('recuperac') || txt.includes('degrad') || txt.includes('sobreuso') || txt.includes('d.')) {
        return { color: '#b91c1c', weight: 1.5, fillColor: '#ef4444', fillOpacity: opacity * 0.45 };
      }
      if (txt.includes('urban') || txt.includes('industr') || txt.includes('e.')) {
        return { color: '#1d4ed8', weight: 1.5, fillColor: '#3b82f6', fillOpacity: opacity * 0.45 };
      }
      if (txt.includes('hidric') || txt.includes('agua') || txt.includes('acuic') || txt.includes('cuenca')) {
        return { color: '#0369a1', weight: 1.5, fillColor: '#06b6d4', fillOpacity: opacity * 0.5 };
      }
      return { color: '#b45309', weight: 1.5, fillColor: '#f59e0b', fillOpacity: opacity * 0.4 };
    }

    // B) Capacidad de Uso Mayor del Suelo (CUM - MINAM / MIDAGRI)
    if (layerId === 'capacidad_uso_suelo') {
      const p = feature?.properties || {};
      const desc = `${p.description || ''} ${p.Asociacion || ''} ${p.FIRST_ASOC || ''}`.toUpperCase();
      if (desc.includes('X') || desc.includes('PROTECCIÓN') || desc.includes('PROTECCION')) {
        return { color: '#047857', weight: 1.8, fillColor: '#10b981', fillOpacity: opacity * 0.45 };
      }
      if (desc.includes('P') || desc.includes('PASTOREO')) {
        return { color: '#65a30d', weight: 1.5, fillColor: '#84cc16', fillOpacity: opacity * 0.4 };
      }
      if (desc.includes('F') || desc.includes('FORESTAL')) {
        return { color: '#0f766e', weight: 1.5, fillColor: '#14b8a6', fillOpacity: opacity * 0.4 };
      }
      if (desc.includes('A') || desc.includes('C') || desc.includes('CULTIVO')) {
        return { color: '#dc2626', weight: 2, fillColor: '#ef4444', fillOpacity: opacity * 0.45 };
      }
      return { color: '#84cc16', weight: 1.5, fillColor: '#bef264', fillOpacity: opacity * 0.35 };
    }

    switch (layerId) {
      // Bloque 1: Exclusiones Legales
      case 'anp_definitivas':
        return { color: '#059669', weight: 2, fillColor: '#10b981', fillOpacity: opacity * 0.4 };
      case 'catastro_monumentos':
        return { color: '#7e22ce', weight: 2, fillColor: '#c084fc', fillOpacity: opacity * 0.6 };
      case 'rios_lagos_ana':
      case 'lagos_lagunas':
      case 'lago_titicaca':
        return { color: '#0284c7', weight: 2, fillColor: '#38bdf8', fillOpacity: opacity * 0.6 };
      case 'rios_lineal':
        return { color: '#0284c7', weight: 2, opacity: opacity };
      case 'ecosistemas_fragiles':
        return { color: '#0891b2', weight: 2, fillColor: '#22d3ee', fillOpacity: opacity * 0.45 };
      case 'mapa_hidrogeologico':
        return { color: '#0284c7', weight: 1.5, fillColor: '#38bdf8', fillOpacity: opacity * 0.35 };
      case 'zona_amortiguamiento':
        return { color: '#16a34a', weight: 2, fillColor: '#4ade80', fillOpacity: opacity * 0.35, dashArray: '4, 4' };

      // Bloque 2: Restricciones Técnicas
      case 'catastro_urbano_buffer':
        return { color: '#2563eb', weight: 1.8, fillColor: '#60a5fa', fillOpacity: opacity * 0.35, dashArray: '4, 4' };
      case 'radio_seguridad_aviaria':
        return { color: '#dc2626', weight: 2, fillColor: '#ef4444', fillOpacity: opacity * 0.2, dashArray: '8, 8' };
      case 'granjas_zoosanitarias':
        return { color: '#d97706', weight: 2, fillColor: '#f59e0b', fillOpacity: opacity * 0.35, dashArray: '6, 6' };
      case 'fallas_geologicas':
        return { color: '#dc2626', weight: 2.5, dashArray: '5, 5' };
      case 'zonas_criticas_pendientes':
        return { color: '#b91c1c', weight: 1.8, fillColor: '#ef4444', fillOpacity: opacity * 0.4 };
      case 'peligros_geologicos':
        return { color: '#c2410c', weight: 1.5, fillColor: '#fb923c', fillOpacity: opacity * 0.35 };
      case 'areas_degradadas':
        return { color: '#ea580c', weight: 2.5, fillColor: '#f97316', fillOpacity: opacity * 0.8 };

      // Bloque 3: Red Vial y Planificación
      case 'red_vial_nacional':
        return { color: '#ef4444', weight: 3.5, opacity: opacity };
      case 'red_vial_departamental':
        return { color: '#f97316', weight: 2.5, opacity: opacity };
      case 'red_vial_vecinal':
        return { color: '#eab308', weight: 2.0, opacity: opacity, dashArray: '5, 5' };
      case 'red_vial_trochas':
        return { color: '#854d0e', weight: 1.8, opacity: opacity, dashArray: '2, 5' };
      case 'catastro_urbano':
        return { color: '#2563eb', weight: 1.5, fillColor: '#60a5fa', fillOpacity: opacity * 0.4 };
      case 'predios_estado_sinabip':
        return { color: '#7c3aed', weight: 2, fillColor: '#a78bfa', fillOpacity: opacity * 0.45 };
      case 'catastro_minero':
        return { color: '#d97706', weight: 1.5, fillColor: '#fbbf24', fillOpacity: opacity * 0.35 };
      case 'cartas_geologicas_100k':
        return { color: '#64748b', weight: 1.5, fillColor: '#94a3b8', fillOpacity: opacity * 0.3 };
      case 'infraestructura_disposicion':
        return { color: '#047857', weight: 2.5, fillColor: '#34d399', fillOpacity: opacity * 0.9 };
      default:
        return { color: '#10b981', weight: 2, opacity: opacity };
    }
  };
  // 4. Gestión Atómica y Reactiva de Activación / Desactivación de Capas
  useEffect(() => {
    if (!mapRef.current) return;

    localVectorLayersRef.current.forEach((layerInstance, layerId) => {
      const isStillVisible = activeWMSLayers.some(l => l.id === layerId && l.visible);
      if (!isStillVisible) {
        if (localLayersGroupRef.current.hasLayer(layerInstance)) {
          localLayersGroupRef.current.removeLayer(layerInstance);
        }
      }
    });

    activeWMSLayers.forEach((layerConfig) => {
      const layerId = layerConfig.id;
      const isVisible = layerConfig.visible;
      const opacity = layerConfig.opacidad;

      let existingLayer = localVectorLayersRef.current.get(layerId);

      if (isVisible) {
        if (!geojsonCacheRef.current[layerId]) {
          if (!pendingFetchesRef.current.has(layerId)) {
            pendingFetchesRef.current.add(layerId);
            if (onLayerStatusUpdate) onLayerStatusUpdate(layerId, 'LOADING');

            fetchLocalLayerData(layerId, layerConfig.urlWms)
              .then(data => {
                geojsonCacheRef.current[layerId] = data;
                pendingFetchesRef.current.delete(layerId);
                const currentActiveState = activeWMSLayersRef.current.find(l => l.id === layerId);
                if (currentActiveState && currentActiveState.visible) {
                  createAndAddLocalLayer(layerId, data, currentActiveState.opacidad, layerConfig);
                }
                if (onLayerStatusUpdate) onLayerStatusUpdate(layerId, 'OK');
              })
              .catch(err => {
                console.warn(`[GEOPORTAL CAPAS WARNING] Error al cargar capa local ${layerId} desde /CAPAS/:`, err);
                pendingFetchesRef.current.delete(layerId);
                if (onLayerStatusUpdate) onLayerStatusUpdate(layerId, 'ERROR');
              });
          }
        } else {
          if (!existingLayer) {
            createAndAddLocalLayer(layerId, geojsonCacheRef.current[layerId], opacity, layerConfig);
          } else {
            existingLayer.setStyle(feat => getStyleForLayer(layerId, opacity, feat));
            if (!localLayersGroupRef.current.hasLayer(existingLayer)) {
              localLayersGroupRef.current.addLayer(existingLayer);
            }
          }
        }
      }
    });

    function createAndAddLocalLayer(layerId: string, geojsonData: any, op: number, layerConfig: WMSLayerConfig) {
      try {
        const oldLayer = localVectorLayersRef.current.get(layerId);
        if (oldLayer && localLayersGroupRef.current.hasLayer(oldLayer)) {
          localLayersGroupRef.current.removeLayer(oldLayer);
        }

        const vectorLayer = L.geoJSON(geojsonData, {
          style: (feature) => getStyleForLayer(layerId, op, feature),
          pointToLayer: (feature, latlng) => {
            const style = getStyleForLayer(layerId, op, feature);
            return L.circleMarker(latlng, {
              radius: 6,
              color: style.color,
              fillColor: style.fillColor || style.color,
              fillOpacity: style.fillOpacity || op,
              weight: 1.5
            });
          },
          onEachFeature: (feature, layer) => {
            const props = feature.properties || {};
            const name = props.Name || props.NAME || props.name || props.nombre || props.NOMBRE || props.UNIDAD || props.ZONA_CRIT || layerConfig.nombre;
            const desc = props.description || props.DESCRIPCIO || '';
            
            let popupContent = `
              <div class="p-2.5 font-sans bg-slate-900 text-slate-100 text-xs rounded border border-emerald-600 max-w-sm max-h-64 overflow-y-auto">
                <b class="text-emerald-400 font-extrabold text-sm block mb-1">${name}</b>
                <div class="flex items-center space-x-1.5 mb-1.5">
                  <span class="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300 border border-slate-700">${layerConfig.entidad}</span>
                  <span class="text-[10px] text-slate-400 font-medium">${layerConfig.nombre}</span>
                </div>
            `;
            
            if (desc && desc.includes('<table')) {
              popupContent += `<div class="mt-1 text-[11px] text-slate-300">${desc}</div>`;
            } else if (desc) {
              popupContent += `<p class="mt-1 text-[11px] text-slate-300">${desc}</p>`;
            } else {
              popupContent += `<span class="text-[10px] text-amber-300 font-semibold">${layerConfig.descripcion}</span>`;
            }
            
            popupContent += `</div>`;
            layer.bindPopup(popupContent, { maxWidth: 360 });
          }
        });

        localVectorLayersRef.current.set(layerId, vectorLayer);

        const isNowVisible = activeWMSLayersRef.current.some(l => l.id === layerId && l.visible);
        if (isNowVisible) {
          localLayersGroupRef.current.addLayer(vectorLayer);
        }
      } catch (err) {
        console.warn(`[GEOPORTAL CAPAS EXCEPTION] Fallo al renderizar capa vector ${layerId}:`, err);
      }
    }
  }, [activeWMSLayers, onLayerStatusUpdate]);

  // 5. Renderizar Centro de Referencia / Baricentro, Buffer Dinámico, Radiales e Insignias de Zonas Candidatas
  useEffect(() => {
    if (!mapRef.current) return;
    polygonLayersGroupRef.current.clearLayers();
    bufferRingsGroupRef.current.clearLayers();
    radialLinesGroupRef.current.clearLayers();

    if (isMeasurementActive && candidateZones.length === 0) return;

    // Determinar si el contexto actual es Triangulación Intermunicipal o Búsqueda Monodistrital
    const isIntermunicipal = triangulatedDistricts && triangulatedDistricts.length > 1;
    let centerLat = jurisdiction.lat;
    let centerLng = jurisdiction.lng;
    let totalIntermunicipalTon = 0;

    if (isIntermunicipal) {
      let sumLat = 0;
      let sumLng = 0;
      triangulatedDistricts.forEach(d => {
        const ton = (d.poblacion * (d.gpc || 0.65) * 365) / 1000;
        totalIntermunicipalTon += ton;
        sumLat += d.lat * ton;
        sumLng += d.lng * ton;
      });
      if (totalIntermunicipalTon > 0) {
        centerLat = sumLat / totalIntermunicipalTon;
        centerLng = sumLng / totalIntermunicipalTon;
      }
    }

    // A) Marcador del Punto de Referencia o Baricentro Gravitacional Intermunicipal
    if (isIntermunicipal) {
      const baryIcon = L.divIcon({
        className: 'custom-barycenter-pin',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-10 h-10 rounded-full bg-cyan-400/30 animate-ping absolute"></div>
            <div class="w-8 h-8 rounded-full bg-cyan-600 border-2 border-white flex items-center justify-center shadow-2xl text-white font-black text-sm">
              🎯
            </div>
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/95 text-cyan-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-cyan-500/60 shadow-2xl">
              Baricentro Ponderado (${triangulatedDistricts.length} Distritos)
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const baryMarker = L.marker([centerLat, centerLng], { icon: baryIcon });
      baryMarker.bindPopup(`
        <div class="p-3 font-sans text-xs bg-slate-950 text-slate-100 rounded-xl border border-cyan-500 max-w-xs shadow-2xl">
          <div class="flex items-center space-x-1 text-cyan-400 font-extrabold text-sm mb-1">
            <span>🎯 Baricentro Gravitacional Intermunicipal</span>
          </div>
          <div class="text-[11px] text-slate-300 mb-2">
            Centro óptimo de equilibrio logístico para disposición final mancomunada.
          </div>
          <div class="space-y-1 text-[11px] text-slate-200 border-t border-slate-800 pt-2 mb-2">
            <div><b>Generación Conjunta:</b> <span class="text-emerald-400 font-bold">${totalIntermunicipalTon.toLocaleString('es-PE', { maximumFractionDigits: 1 })} t/año</span></div>
            <div><b>Coordenadas WGS84:</b> <span class="font-mono text-cyan-300">${centerLat.toFixed(5)}°, ${centerLng.toFixed(5)}°</span></div>
            <div><b>Distritos Integrados:</b> ${triangulatedDistricts.map(d => d.distrito).join(', ')}</div>
          </div>
          <div class="text-[10px] text-cyan-400/80 italic">
            El buffer y las distancias de transporte se calculan desde este punto nodal.
          </div>
        </div>
      `);
      bufferRingsGroupRef.current.addLayer(baryMarker);

      // Dibujar líneas de acarreo logístico desde cada distrito hacia el Baricentro
      triangulatedDistricts.forEach(dist => {
        const haulLine = L.polyline([
          [dist.lat, dist.lng],
          [centerLat, centerLng]
        ], {
          color: '#06b6d4',
          weight: 1.5,
          dashArray: '3, 6',
          opacity: 0.75
        });
        bufferRingsGroupRef.current.addLayer(haulLine);
      });
    } else {
      const centerIcon = L.divIcon({
        className: 'custom-center-pin',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-8 h-8 rounded-full bg-emerald-500/30 animate-ping absolute"></div>
            <div class="w-7 h-7 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center shadow-2xl text-white font-black text-xs">
              📍
            </div>
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/90 text-emerald-400 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-500/40 shadow-xl">
              Punto de Referencia (Centro)
            </div>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const centerMarker = L.marker([centerLat, centerLng], { icon: centerIcon });
      centerMarker.bindPopup(`
        <div class="p-2 font-sans text-xs bg-slate-950 text-slate-100 rounded border border-emerald-500">
          <b class="text-emerald-400 block">${jurisdiction.distrito} - Centro Urbano</b>
          <span class="text-[10px] text-slate-300">Coordenadas: ${centerLat.toFixed(5)}°, ${centerLng.toFixed(5)}°</span>
        </div>
      `);
      bufferRingsGroupRef.current.addLayer(centerMarker);
    }

    // B) Anillo de Buffer Dinámico (Radio seleccionado en km)
    if (searchRadiusKm && searchRadiusKm > 0) {
      const bufferCircle = L.circle([centerLat, centerLng], {
        radius: searchRadiusKm * 1000,
        color: isIntermunicipal ? '#06b6d4' : '#10b981',
        weight: 2,
        dashArray: '8, 8',
        fillColor: isIntermunicipal ? '#06b6d4' : '#10b981',
        fillOpacity: 0.05
      });
      bufferRingsGroupRef.current.addLayer(bufferCircle);
    }

    // C) Renderizar Zonas Candidatas, Líneas Radiales y Badges
    candidateZones.forEach((zone) => {
      const isSelected = selectedZone?.id === zone.id;
      const isRejected = zone.clasificacion === 'INVIABLE';
      const color = isRejected
        ? '#ef4444'
        : zone.clasificacion === 'OPTIMA'
        ? '#10b981'
        : zone.clasificacion === 'FAVORABLE'
        ? '#06b6d4'
        : '#f59e0b';
      const centroidLat = zone.coordenadasCentroid.lat;
      const centroidLng = zone.coordenadasCentroid.lng;

      // Render Polígono WGS84 (si existe)
      if (zone.poligonoWGS84 && zone.poligonoWGS84.length > 0) {
        const polyLayer = L.polygon(zone.poligonoWGS84, {
          color: color,
          weight: isSelected ? 4 : 2.5,
          fillColor: color,
          fillOpacity: isSelected ? 0.7 : isRejected ? 0.45 : 0.35,
          dashArray: isSelected ? '' : isRejected ? '6, 6' : '4, 4'
        });

        polyLayer.on('click', () => {
          onSelectZone(zone);
        });

        const complianceBadge = isRejected
          ? `<div class="text-[10px] text-rose-200 font-black bg-rose-950 px-2 py-1 rounded border border-rose-700 leading-tight">❌ DESCALIFICADO (Guía MINAM): ${zone.litologia}</div>`
          : `<div class="text-[10px] text-emerald-300 font-bold bg-emerald-950 px-2 py-1 rounded border border-emerald-700">✅ Cumple Exclusiones D.L. 1278 y Guía MINAM</div>`;

        const popupContent = `
          <div class="p-2.5 font-sans bg-slate-900 text-slate-100 rounded-xl shadow-2xl text-xs border border-slate-700 max-w-xs">
            <div class="font-extrabold text-sm mb-1 ${isRejected ? 'text-rose-400' : 'text-emerald-400'}">${zone.nombre}</div>
            <div class="space-y-1 mb-2 text-slate-300">
              <div><b>Superficie:</b> ${zone.areaHa} ha (${(zone.areaHa * 10000).toLocaleString()} m²)</div>
              <div><b>Calificación AHP:</b> <span class="font-bold text-white ${isRejected ? 'bg-rose-700' : 'bg-emerald-600'} px-1.5 py-0.5 rounded">${zone.puntajeAHP} / 100 pts (${zone.clasificacion})</span></div>
              ${complianceBadge}
              <div><b>Litología / Suelo:</b> ${zone.texturaSuelo}</div>
              <div><b>Pendiente:</b> ${zone.pendientePct}% | <b>Permeabilidad k:</b> ${zone.permeabilidadK.toExponential(1)} cm/s</div>
              <div><b>Dist. Centro Poblado:</b> ${zone.distanciaCPm} m</div>
            </div>
            <div class="text-[10px] text-slate-400 border-t border-slate-800 pt-1.5 flex flex-col space-y-2">
              <span>UTM 17S: ${zone.coordenadasUTM[0]?.este || 815509} E, ${zone.coordenadasUTM[0]?.norte || 9248227} N</span>
              <button id="btn-ficha-${zone.id}" class="w-full py-1.5 px-3 ${isRejected ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-emerald-600 hover:bg-emerald-500 text-white'} font-black text-xs rounded-lg shadow-md transition text-center cursor-pointer">
                📄 Ficha Técnica Detallada
              </button>
            </div>
          </div>
        `;

        polyLayer.bindPopup(popupContent, { className: 'custom-leaflet-popup' });

        polyLayer.on('popupopen', () => {
          setTimeout(() => {
            const btn = document.getElementById(`btn-ficha-${zone.id}`);
            if (btn && onOpenFichaTecnica) {
              btn.onclick = () => onOpenFichaTecnica(zone);
            }
          }, 50);
        });

        polygonLayersGroupRef.current.addLayer(polyLayer);
      }

      // Línea Radial desde el Centro de Referencia / Baricentro hasta la Zona Candidata
      const radialLine = L.polyline([
        [centerLat, centerLng],
        [centroidLat, centroidLng]
      ], {
        color: isRejected ? '#ef4444' : (isIntermunicipal ? '#06b6d4' : '#10b981'),
        weight: isRejected ? 1.4 : 1.8,
        dashArray: '4, 4',
        opacity: isRejected ? 0.5 : 0.85
      });

      radialLinesGroupRef.current.addLayer(radialLine);

      // Badge Flotante sobre el Terreno Candidato
      const distKm = zone.distanciaCentroideKm || 8;
      const badgeIcon = L.divIcon({
        className: 'custom-zone-badge',
        html: `
          <div class="cursor-pointer group flex flex-col items-center">
            <div class="bg-slate-950/95 text-slate-100 border ${
              isRejected ? 'border-rose-500 hover:border-rose-400' : 'border-emerald-500 hover:border-emerald-400'
            } px-2.5 py-1 rounded-full shadow-2xl text-[10px] font-extrabold flex items-center space-x-1.5 transition transform hover:scale-110">
              <span class="${isRejected ? 'text-rose-400' : (isIntermunicipal ? 'text-cyan-300' : 'text-emerald-400')} font-mono">${distKm} km</span>
              <span class="px-1.5 py-0.2 ${isRejected ? 'bg-rose-600' : 'bg-emerald-600'} text-white rounded-full font-black text-[9px]">
                ${isRejected ? 'INVIABLE' : `${zone.puntajeAHP} pts`}
              </span>
            </div>
          </div>
        `,
        iconSize: [88, 24],
        iconAnchor: [44, 12]
      });

      const badgeMarker = L.marker([centroidLat, centroidLng], { icon: badgeIcon });
      badgeMarker.on('click', () => {
        onSelectZone(zone);
        if (onOpenFichaTecnica) onOpenFichaTecnica(zone);
      });

      radialLinesGroupRef.current.addLayer(badgeMarker);
    });

    // Auto-ajustar cámara Leaflet si se generan candidatos o se ajusta el buffer
    if (searchRadiusKm && searchRadiusKm > 0 && candidateZones.length > 0) {
      try {
        const radiusMeters = searchRadiusKm * 1000;
        const circleBounds = L.latLng(centerLat, centerLng).toBounds(radiusMeters * 2);
        mapRef.current.fitBounds(circleBounds, { padding: [40, 40], maxZoom: 13, animate: true });
      } catch (err) {
        console.warn('fitBounds buffer error:', err);
      }
    }
  }, [candidateZones, jurisdiction, selectedZone, searchRadiusKm, isMeasurementActive, onSelectZone, onOpenFichaTecnica, triangulatedDistricts]);

  // 6. Listener Interactivo para Capturar Punto de Ubicación Urbana
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (isPickingPoint) {
      map.getContainer().style.cursor = 'crosshair';
      const handleMapClick = (e: L.LeafletMouseEvent) => {
        if (onPointPicked) {
          onPointPicked(e.latlng.lat, e.latlng.lng);
        }
        map.getContainer().style.cursor = '';
      };

      map.once('click', handleMapClick);
      return () => {
        map.off('click', handleMapClick);
        map.getContainer().style.cursor = '';
      };
    } else {
      map.getContainer().style.cursor = '';
    }
  }, [isPickingPoint, onPointPicked]);

  // 7. Renderizar Marcadores y Polígonos de Triangulación Multidistrital
  useEffect(() => {
    if (!mapRef.current) return;
    triangulationGroupRef.current.clearLayers();

    if (triangulatedDistricts && triangulatedDistricts.length > 0) {
      const coords: [number, number][] = [];

      triangulatedDistricts.forEach(dist => {
        coords.push([dist.lat, dist.lng]);

        const distPinIcon = L.divIcon({
          className: 'custom-dist-pin',
          html: `
            <div class="relative flex flex-col items-center">
              <div class="w-6 h-6 rounded-full bg-cyan-500/40 animate-ping absolute"></div>
              <div class="w-6 h-6 rounded-full bg-cyan-600 border-2 border-white flex items-center justify-center shadow-lg text-white font-black text-[10px]">
                📍
              </div>
              <div class="whitespace-nowrap bg-slate-950/90 text-cyan-300 text-[10px] font-black px-2 py-0.5 rounded border border-cyan-500/50 shadow-xl mt-1">
                ${dist.distrito}
              </div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker([dist.lat, dist.lng], { icon: distPinIcon });
        marker.bindPopup(`
          <div class="p-2 font-sans bg-slate-900 text-slate-100 text-xs rounded border border-cyan-500">
            <b class="text-cyan-400 font-extrabold text-sm block">📍 ${dist.distrito}</b>
            <span class="text-[10px] text-slate-300">Provincia: ${dist.provincia} | Depto: ${dist.departamento}</span><br/>
            <span class="text-[10px] text-emerald-400 font-bold">Población: ${dist.poblacion.toLocaleString()} hab. (GPC: ${dist.gpc} kg/hab/día)</span>
          </div>
        `);
        triangulationGroupRef.current.addLayer(marker);
      });

      if (coords.length >= 2) {
        const polyline = L.polygon(coords, {
          color: '#06b6d4',
          fillColor: '#06b6d4',
          fillOpacity: 0.15,
          weight: 2,
          dashArray: '6, 6'
        });
        triangulationGroupRef.current.addLayer(polyline);
      }
    }
  }, [triangulatedDistricts]);

  useEffect(() => {
    if (onUndoVertex && onUndoVertex > 0 && activeDrawHandlerRef.current) {
      try {
        if (typeof activeDrawHandlerRef.current.deleteLastVertex === 'function') {
          activeDrawHandlerRef.current.deleteLastVertex();
        }
      } catch (e) {
        console.warn('Fallo al deshacer vértice:', e);
      }
    }
  }, [onUndoVertex]);

  useEffect(() => {
    if (onClearAllDrawn && onClearAllDrawn > 0 && drawnItemsRef.current) {
      drawnItemsRef.current.clearLayers();
    }
  }, [onClearAllDrawn]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full z-0" />

      {/* Banner Flotante Superior de Modo Captura Activo (Diseño exacto MINAM) */}
      {isPickingPoint && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-950/90 text-white font-extrabold px-5 py-2 rounded-full shadow-2xl border border-emerald-500/60 text-xs flex items-center space-x-3 animate-in fade-in slide-in-from-top-4">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span>🎯 Modo Punto: Haz clic en el mapa para fijar el centroide</span>
          <button
            onClick={onCancelPickPoint}
            className="px-2.5 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-[10px] border border-slate-700 transition"
          >
            Salir
          </button>
        </div>
      )}

      {/* Crédito sutil del creador en la esquina inferior izquierda del visor */}
      <div className="absolute bottom-1.5 left-2 z-[400] pointer-events-none select-none">
        <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-sm border border-slate-800/80 text-[10px] text-slate-400/90 shadow-sm">
          <span className="font-semibold text-emerald-400/90">GeoIRS</span>
          <span className="text-slate-600">•</span>
          <span>Creador: <strong className="text-slate-300 font-medium">Crhistian Jhoames Paredes García</strong></span>
        </div>
      </div>
    </div>
  );
};
