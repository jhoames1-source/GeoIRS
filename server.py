"""
Geoportal IRS-Peru v3.0 - Servidor API & Proxy Reverso WMS OGC
Basado en: Guía para la Identificación de Zonas Potenciales (MINAM, 2021), D.L. 1278 y D.L. 1279.
Soporta FastAPI/Uvicorn y servidor nativo Python http.server con Proxy WMS anti-CORS.
"""

import json
import sys
import os
import urllib.parse
import urllib.request
from http.server import HTTPServer, SimpleHTTPRequestHandler

from gis_processor import IRSGISProcessor
from pdf_generator import IRSPDFReportGenerator

try:
    from fastapi import FastAPI, HTTPException, Response, Query
    from fastapi.staticfiles import StaticFiles
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
    import uvicorn
    HAS_FASTAPI = True
except ImportError:
    HAS_FASTAPI = False

processor = IRSGISProcessor()

UBIGEOS_PERU = [
    {"ubigeo": "060301", "departamento": "CAJAMARCA", "provincia": "CELENDÍN", "distrito": "CELENDÍN", "lat": -6.865400, "lng": -78.145566, "poblacion": 28500, "gpc": 0.58},
    {"ubigeo": "060101", "departamento": "CAJAMARCA", "provincia": "CAJAMARCA", "distrito": "CAJAMARCA", "lat": -7.163780, "lng": -78.500270, "poblacion": 160000, "gpc": 0.62},
    {"ubigeo": "080101", "departamento": "CUSCO", "provincia": "CUSCO", "distrito": "SAN JERÓNIMO / CUSCO", "lat": -13.531950, "lng": -71.967463, "poblacion": 135000, "gpc": 0.68},
    {"ubigeo": "040101", "departamento": "AREQUIPA", "provincia": "AREQUIPA", "distrito": "AREQUIPA / YURA", "lat": -16.409047, "lng": -71.537451, "poblacion": 410000, "gpc": 0.72},
    {"ubigeo": "120101", "departamento": "JUNIN", "provincia": "HUANCAYO", "distrito": "HUANCAYO / CHUPACA", "lat": -12.065130, "lng": -75.204860, "poblacion": 390000, "gpc": 0.65},
    {"ubigeo": "130101", "departamento": "LA LIBERTAD", "provincia": "TRUJILLO", "distrito": "TRUJILLO / HUANCHACO", "lat": -8.115990, "lng": -79.029980, "poblacion": 620000, "gpc": 0.75},
    {"ubigeo": "200101", "departamento": "PIURA", "provincia": "PIURA", "distrito": "PIURA / CASTILLA", "lat": -5.194490, "lng": -80.632820, "poblacion": 485000, "gpc": 0.70},
    {"ubigeo": "150101", "departamento": "LIMA", "provincia": "LIMA", "distrito": "LIMA METROPOLITANA / LURÍN", "lat": -12.046374, "lng": -77.042793, "poblacion": 980000, "gpc": 0.82}
]

DIST_DIR = "dist" if os.path.exists("dist") else "."

def proxy_wms_request(url: str) -> tuple[bytes, str]:
    """Proxy reverso ligero para resolver bloqueos de CORS en WMS del Estado Peruano."""
    try:
        req = urllib.request.Request(
            url,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) GeoportalIRS/3.0',
                'Accept': 'image/webp,image/apng,image/png,image/*,*/*;q=0.8'
            }
        )
        with urllib.request.urlopen(req, timeout=12) as response:
            content_type = response.info().get_content_type()
            return response.read(), content_type
    except Exception as e:
        # Fallback a transparente PNG de 1x1 en caso de falla de red del servidor remoto
        transparent_png = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4\x00\x00\x00\rIDATx\x9cc\xf8\xff\xff?\x03\x00\x05\xfe\x02\xfe\xa7\x35\x81\x84\x00\x00\x00\x00IEND\xaeB`\x82'
        return transparent_png, 'image/png'

# ----------------------------------------------------------------------------
# SERVIDOR NATIVO PYTHON (FALLBACK SIN FASTAPI)
# ----------------------------------------------------------------------------
class NativeRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        params = urllib.parse.parse_qs(parsed.query)

        if parsed.path == "/api/proxy":
            target_url = params.get("url", [""])[0]
            if not target_url:
                self.send_error(400, "Falta el parámetro 'url'")
                return
            content, content_type = proxy_wms_request(target_url)
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Cache-Control', 'public, max-age=86400')
            self.end_headers()
            self.wfile.write(content)
            return

        elif parsed.path == "/api/ubigeos":
            q = params.get("q", [""])[0].lower()
            res = UBIGEOS_PERU if not q else [
                u for u in UBIGEOS_PERU if q in u["distrito"].lower() or q in u["provincia"].lower() or q in u["ubigeo"]
            ]
            self._send_json(res)
            return

        elif parsed.path == "/api/capas-restriccion":
            lat = float(params.get("lat", [-6.87012])[0])
            lng = float(params.get("lng", [-78.15234])[0])
            geojson_data = processor.generar_buffers_restriccion(lat, lng)
            self._send_json(geojson_data)
            return

        return super().do_GET()

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = json.loads(self.rfile.read(content_length).decode('utf-8')) if content_length > 0 else {}

        if self.path == "/api/dimensionamiento":
            res = processor.calcular_dimensionamiento(
                poblacion_actual=post_data.get("poblacion_actual", 28500),
                gpc_kg_hab_dia=post_data.get("gpc_kg_hab_dia", 0.58),
                tasa_crecimiento_pct=post_data.get("tasa_crecimiento_pct", 1.5),
                vida_util_anios=post_data.get("vida_util_anios", 10)
            )
            self._send_json(res)
            return

        elif self.path == "/api/evaluar-zona":
            res = processor.evaluar_terreno_100_puntos(
                distancia_cp_m=post_data.get("distancia_cp_m", 1800),
                textura_suelo=post_data.get("textura_suelo", "Areno-Arcilloso"),
                permeabilidad_k=post_data.get("permeabilidad_k", 1e-7),
                pendiente_pct=post_data.get("pendiente_pct", 6.5),
                distancia_via_m=post_data.get("distancia_via_m", 800),
                profundidad_napa_m=post_data.get("profundidad_napa_m", 25),
                es_predio_sbn=post_data.get("es_predio_sbn", True)
            )
            self._send_json(res)
            return

        elif self.path == "/api/generar-reporte":
            pdf_bytes = IRSPDFReportGenerator.generar_pdf_reporte(
                ciudad_ubigeo=post_data.get("ciudad_ubigeo", "Celendín - Cajamarca"),
                coordenadas_utm=post_data.get("coordenadas_utm", "17K 815240 E, 9240120 N"),
                dimensionamiento=post_data.get("dimensionamiento", processor.calcular_dimensionamiento(28500, 0.58)),
                evaluacion_100_pts=post_data.get("evaluacion", processor.evaluar_terreno_100_puntos(1800, "Areno-Arcilloso", 1e-7, 6.5, 800, 25, True))
            )
            self.send_response(200)
            self.send_header('Content-Type', 'application/pdf')
            self.send_header('Content-Disposition', 'attachment; filename=Reporte_Preliminar_IRS_Celendin.pdf')
            self.end_headers()
            self.wfile.write(pdf_bytes)
            return

        self.send_error(404, "Endpoint no encontrado")

    def _send_json(self, data):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))


# ----------------------------------------------------------------------------
# SERVIDOR FASTAPI (SI FASTAPI ESTÁ INSTALADO)
# ----------------------------------------------------------------------------
if HAS_FASTAPI:
    app = FastAPI(title="Geoportal IRS Perú API", version="3.0.0")
    app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

    class DimensionamientoReq(BaseModel):
        poblacion_actual: int
        gpc_kg_hab_dia: float
        tasa_crecimiento_pct: float = 1.5
        vida_util_anios: int = 10

    class EvaluacionReq(BaseModel):
        distancia_cp_m: float
        textura_suelo: str
        permeabilidad_k: float
        pendiente_pct: float
        distancia_via_m: float
        profundidad_napa_m: float
        es_predio_sbn: bool
        uso_actual: str = "Eriazo"

    class ReporteReq(BaseModel):
        ciudad_ubigeo: str
        coordenadas_utm: str
        dimensionamiento: dict
        evaluacion: dict
        perfil_geologico: str = "Areno-Arcilloso (k <= 1x10^-6 cm/s)"
        compatibilidad_pdu: str = "Compatible con Zonificación de Tratamiento Especial / Eriazo"

    @app.get("/api/proxy")
    def proxy_endpoint(url: str = Query(..., description="URL WMS de servicio remoto")):
        content, content_type = proxy_wms_request(url)
        return Response(content=content, media_type=content_type)

    @app.get("/api/ubigeos")
    def buscar_ubigeo(q: str = ""):
        query = q.lower().strip()
        return UBIGEOS_PERU if not query else [
            u for u in UBIGEOS_PERU if query in u["distrito"].lower() or query in u["provincia"].lower() or query in u["ubigeo"]
        ]

    @app.post("/api/dimensionamiento")
    def calcular_dimensionamiento(req: DimensionamientoReq):
        return processor.calcular_dimensionamiento(req.poblacion_actual, req.gpc_kg_hab_dia, req.tasa_crecimiento_pct, req.vida_util_anios)

    @app.post("/api/evaluar-zona")
    def evaluar_zona(req: EvaluacionReq):
        return processor.evaluar_terreno_100_puntos(
            req.distancia_cp_m, req.textura_suelo, req.permeabilidad_k, req.pendiente_pct,
            req.distancia_via_m, req.profundidad_napa_m, req.es_predio_sbn, req.uso_actual
        )

    @app.get("/api/capas-restriccion")
    def obtener_capas_restriccion(lat: float = -6.87012, lng: float = -78.15234):
        return processor.generar_buffers_restriccion(lat, lng)

    @app.post("/api/generar-reporte")
    def generar_reporte_pdf(req: ReporteReq):
        pdf_bytes = IRSPDFReportGenerator.generar_pdf_reporte(
            req.ciudad_ubigeo, req.coordenadas_utm, req.dimensionamiento, req.evaluacion, req.perfil_geologico, req.compatibilidad_pdu
        )
        return Response(content=pdf_bytes, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=Reporte_Preliminar_IRS_Celendin.pdf"})

    if os.path.exists("CAPAS"):
        app.mount("/CAPAS", StaticFiles(directory="CAPAS"), name="capas")
        app.mount("/capas", StaticFiles(directory="CAPAS"), name="capas_lower")

    app.mount("/", StaticFiles(directory=DIST_DIR, html=True), name="static")


def run_server():
    port = 8000
    print(f"===========================================================")
    print(f"GEOPORTAL IRS PERÚ v3.0 - SERVIDOR GIS PROXY INICIADO EN PUERTO {port}")
    print(f"Directorio Estático: {DIST_DIR}")
    print(f"Accede desde tu navegador en: http://localhost:{port}")
    print(f"===========================================================")
    
    if HAS_FASTAPI:
        uvicorn.run("server:app", host="0.0.0.0", port=port, reload=True)
    else:
        server_address = ('', port)
        httpd = HTTPServer(server_address, NativeRequestHandler)
        httpd.serve_forever()


if __name__ == "__main__":
    run_server()
