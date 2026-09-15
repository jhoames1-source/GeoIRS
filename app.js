/* ============================================================================
   GEOPORTAL IRS PERÚ - LÓGICA JAVASCRIPT Y CONTROLADOR DE MAPA GIS
   Alineado a Guía MINAM 2021 & D.L. 1278
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INICIALIZACIÓN DEL MAPA LEAFLET
    // ------------------------------------------------------------------------
    const initialLat = -13.531950; // Cusco por defecto
    const initialLng = -71.967463;
    const initialZoom = 12;

    const map = L.map('map', {
        center: [initialLat, initialLng],
        zoom: initialZoom,
        zoomControl: true
    });

    // Capas Base
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors | MINAM - IRS'
    }).addTo(map);

    const esriSatLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    const baseMaps = {
        "Mapa Híbrido / OSM": osmLayer,
        "Satelital Esri": esriSatLayer
    };

    L.control.layers(baseMaps, null, { position: 'topright' }).addTo(map);

    // Grupo de Capas Vectoriales
    const vectorLayersGroup = L.layerGroup().addTo(map);
    const drawnItems = new L.FeatureGroup().addTo(map);

    // Herramienta de Dibujo Leaflet.Draw
    const drawControl = new L.Control.Draw({
        draw: {
            polygon: {
                allowIntersection: false,
                showArea: true,
                drawError: { color: '#e74c3c', timeout: 1000 },
                shapeOptions: { color: '#2ecc71', fillColor: '#2ecc71', fillOpacity: 0.4 }
            },
            polyline: false,
            circle: false,
            rectangle: true,
            marker: true,
            circlemarker: false
        },
        edit: {
            featureGroup: drawnItems
        }
    });
    map.addControl(drawControl);

    // Evento al dibujar un polígono candidato
    map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer;
        drawnItems.clearLayers();
        drawnItems.addLayer(layer);
        
        // Abrir tab de matriz y calcular autómata
        switchTab('tab-matriz');
        ejecutarEvaluacionMatriz();
    });

    // 2. CARGA DE CAPAS GEOSERVICIOS / BUFFERS
    // ------------------------------------------------------------------------
    function cargarCapasRestriccion(lat, lng) {
        vectorLayersGroup.clearLayers();

        fetch(`/api/capas-restriccion?lat=${lat}&lng=${lng}`)
            .then(res => res.json())
            .then(geojson => {
                L.geoJSON(geojson, {
                    style: (feature) => {
                        const color = feature.properties.color || '#3388ff';
                        const isPotencial = feature.properties.tipo === 'ZonaPotencial';
                        return {
                            color: color,
                            weight: isPotencial ? 3 : 1.5,
                            fillColor: color,
                            fillOpacity: isPotencial ? 0.45 : 0.2,
                            dashArray: isPotencial ? '' : '4, 4'
                        };
                    },
                    onEachFeature: (feature, layer) => {
                        layer.bindPopup(`
                            <div style="font-family: sans-serif;">
                                <b style="color: #1b4332;">${feature.properties.capa}</b><br/>
                                <small>Tipo: ${feature.properties.tipo}</small><br/>
                                ${feature.properties.area_ha ? `<b>Superficie:</b> ${feature.properties.area_ha} ha` : ''}
                            </div>
                        `);
                    }
                }).addTo(vectorLayersGroup);
            })
            .catch(err => console.error("Error al cargar capas WMS/Vectoriales:", err));
    }

    cargarCapasRestriccion(initialLat, initialLng);

    // 3. NAVEGACIÓN Y TABS SIDEBAR
    // ------------------------------------------------------------------------
    function switchTab(tabId) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.style.display = (pane.id === tabId) ? 'block' : 'none';
        });
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });

    document.getElementById('btn-open-calculator').addEventListener('click', () => {
        switchTab('tab-calc');
    });

    // 4. BUSCADOR UBIGEO / CIUDAD
    // ------------------------------------------------------------------------
    const searchInput = document.getElementById('search-ubigeo');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (!query) return;

            fetch(`/api/ubigeos?q=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.length > 0) {
                        const target = data[0];
                        map.flyTo([target.lat, target.lng], 12);
                        cargarCapasRestriccion(target.lat, target.lng);
                        
                        // Actualizar campos de calculadora
                        document.getElementById('calc-poblacion').value = target.poblacion;
                        document.getElementById('calc-gpc').value = target.gpc;
                        ejecutarDimensionamiento();
                    } else {
                        alert("No se encontró la ubicación especificada.");
                    }
                });
        }
    });

    // 5. CALCULADORA DE DIMENSIONAMIENTO
    // ------------------------------------------------------------------------
    function ejecutarDimensionamiento() {
        const pob = parseInt(document.getElementById('calc-poblacion').value) || 50000;
        const gpc = parseFloat(document.getElementById('calc-gpc').value) || 0.65;
        const tasa = parseFloat(document.getElementById('calc-tasa').value) || 1.5;

        fetch('/api/dimensionamiento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                poblacion_actual: pob,
                gpc_kg_hab_dia: gpc,
                tasa_crecimiento_pct: tasa,
                vida_util_anios: 10
            })
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('res-pob-futura').innerText = data.poblacion_proyectada_10_anios.toLocaleString();
            document.getElementById('res-gen-diaria').innerText = data.generacion_diaria_futura_ton;
            document.getElementById('res-vol-total').innerText = data.volumen_total_m3.toLocaleString();
            document.getElementById('res-area-m2').innerText = data.area_requerida_m2.toLocaleString();
            document.getElementById('res-area-ha').innerText = data.area_requerida_ha;
        });
    }

    document.getElementById('btn-ejecutar-calc').addEventListener('click', ejecutarDimensionamiento);
    ejecutarDimensionamiento(); // Ejecución inicial

    // 6. MATRIZ DE EVALUACIÓN MULTICRITERIO 100 PTS
    // ------------------------------------------------------------------------
    let ultimaEvaluacionGlobal = null;

    function ejecutarEvaluacionMatriz() {
        const distCP = parseFloat(document.getElementById('mat-dist-cp').value) || 1800;
        const suelo = document.getElementById('mat-suelo').value;
        const pend = parseFloat(document.getElementById('mat-pendiente').value) || 6.5;
        const distVia = parseFloat(document.getElementById('mat-dist-via').value) || 800;
        const napa = parseFloat(document.getElementById('mat-napa').value) || 25;
        const esSBN = document.getElementById('mat-legal').value === 'SBN';

        fetch('/api/evaluar-zona', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                distancia_cp_m: distCP,
                textura_suelo: suelo,
                permeabilidad_k: suelo.includes('Areno-Arcilloso') ? 1e-7 : 1e-5,
                pendiente_pct: pend,
                distancia_via_m: distVia,
                profundidad_napa_m: napa,
                es_predio_sbn: esSBN
            })
        })
        .then(res => res.json())
        .then(data => {
            ultimaEvaluacionGlobal = data;
            mostrarModalResultados(data);
        });
    }

    document.getElementById('btn-calcular-matriz').addEventListener('click', ejecutarEvaluacionMatriz);
    document.getElementById('btn-evaluar-mapa').addEventListener('click', ejecutarEvaluacionMatriz);

    // 7. MODAL Y REPORTE PDF
    // ------------------------------------------------------------------------
    const modal = document.getElementById('modal-evaluacion');

    function mostrarModalResultados(data) {
        document.getElementById('modal-clasificacion').innerText = data.clasificacion;
        document.getElementById('modal-total-score').innerText = data.puntaje_total;
        
        const badgeElem = document.getElementById('modal-score-badge');
        badgeElem.className = `score-badge score-${data.color_badge}`;

        const tbody = document.getElementById('table-score-body');
        tbody.innerHTML = '';

        const desglose = data.desglose_puntajes;
        const titulos = {
            "distancia_centro_poblado": "1. Distancia a Centro Poblado (>= 500m)",
            "geologia_permeabilidad": "2. Geología y Permeabilidad Hidráulica",
            "pendiente_terreno": "3. Pendiente del Terreno (2% - 25%)",
            "accesibilidad_vial": "4. Accesibilidad Vial",
            "riesgo_hidrologico": "5. Riesgo Hidrológico y Napa Freática",
            "saneamiento_legal": "6. Saneamiento Legal y Titulación",
            "uso_suelo_pdu": "7. Uso Actual del Suelo / PDU"
        };

        for (const key in desglose) {
            const item = desglose[key];
            const row = `
                <tr>
                    <td><b>${titulos[key] || key}</b></td>
                    <td>${item.detalle}</td>
                    <td><b>${item.puntaje}</b> / ${item.max}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        }

        modal.classList.add('active');
    }

    function cerrarModal() {
        modal.classList.remove('active');
    }

    document.getElementById('btn-close-modal').addEventListener('click', cerrarModal);
    document.getElementById('btn-close-modal-2').addEventListener('click', cerrarModal);

    // DESCARGAR REPORTE PDF
    function descargarPDF() {
        if (!ultimaEvaluacionGlobal) {
            ejecutarEvaluacionMatriz();
            return;
        }

        const center = map.getCenter();
        const utmStr = `18K ${Math.round((center.lng + 180) * 10000)} E, ${Math.round((center.lat + 90) * 100000)} N`;
        
        const pob = parseInt(document.getElementById('calc-poblacion').value) || 50000;
        const gpc = parseFloat(document.getElementById('calc-gpc').value) || 0.65;
        
        fetch('/api/dimensionamiento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ poblacion_actual: pob, gpc_kg_hab_dia: gpc })
        })
        .then(res => res.json())
        .then(dimData => {
            return fetch('/api/generar-reporte', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ciudad_ubigeo: searchInput.value || "Cusco (Ubigeo 080101)",
                    coordenadas_utm: utmStr,
                    dimensionamiento: dimData,
                    evaluacion: ultimaEvaluacionGlobal,
                    perfil_geologico: document.getElementById('mat-suelo').value,
                    compatibilidad_pdu: "Compatible con Zonificación de Tratamiento Especial (PDU)"
                })
            });
        })
        .then(res => res.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Reporte_Preliminar_IRS.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(err => alert("Error al generar PDF: " + err));
    }

    document.getElementById('btn-export-pdf').addEventListener('click', descargarPDF);
    document.getElementById('btn-modal-export-pdf').addEventListener('click', descargarPDF);
});
