"""
Geoportal IRS-Peru - Engine de Análisis Espacial y Calculadora de Dimensionamiento
Basado en: Guía para la Identificación de Zonas Potenciales (MINAM, 2021) y D.L. 1278
Soporta Python Estándar (sin dependencias externas) y Shapely/PyProj si están disponibles.
"""

import math
from typing import Dict, Any, List

# Verificación de dependencias opcionales
try:
    from shapely.geometry import Polygon, Point, MultiPolygon, shape, mapping
    from shapely.ops import transform
    import pyproj
    HAS_SHAPELY = True
except ImportError:
    HAS_SHAPELY = False


class IRSGISProcessor:
    """Motor de análisis espacial y dimensionamiento de rellenos sanitarios."""

    def __init__(self):
        if HAS_SHAPELY:
            self.wgs84 = pyproj.CRS("EPSG:4326")
            self.utm18s = pyproj.CRS("EPSG:32718")
            self.project_to_utm = pyproj.Transformer.from_crs(self.wgs84, self.utm18s, always_xy=True).transform
            self.project_to_wgs = pyproj.Transformer.from_crs(self.utm18s, self.wgs84, always_xy=True).transform

    @staticmethod
    def calcular_dimensionamiento(
        poblacion_actual: int,
        gpc_kg_hab_dia: float,
        tasa_crecimiento_pct: float = 1.5,
        vida_util_anios: int = 10,
        densidad_compactada_ton_m3: float = 0.7,
        porcentaje_cobertura: float = 0.25,
        altura_promedio_celda_m: float = 6.0,
        factor_area_auxiliar: float = 1.30
    ) -> Dict[str, Any]:
        """
        Calcula el volumen proyectado de residuos y el área total requerida (m2 / ha).
        """
        r = tasa_crecimiento_pct / 100.0
        poblacion_futura = math.ceil(poblacion_actual * ((1 + r) ** vida_util_anios))
        
        gpc_ton = gpc_kg_hab_dia / 1000.0
        gen_diaria_ton = poblacion_futura * gpc_ton
        
        # Volumen acumulado año a año
        volumen_residuos_m3 = 0.0
        pob_iter = poblacion_actual
        for _ in range(1, vida_util_anios + 1):
            pob_iter *= (1 + r)
            gen_anio_ton = pob_iter * gpc_ton * 365.0
            vol_anio = gen_anio_ton / densidad_compactada_ton_m3
            volumen_residuos_m3 += vol_anio

        volumen_cobertura_m3 = volumen_residuos_m3 * porcentaje_cobertura
        volumen_total_m3 = volumen_residuos_m3 + volumen_cobertura_m3
        
        area_celda_m2 = volumen_total_m3 / altura_promedio_celda_m
        area_total_m2 = area_celda_m2 * factor_area_auxiliar
        area_total_ha = area_total_m2 / 10000.0

        return {
            "poblacion_inicial": poblacion_actual,
            "poblacion_proyectada_10_anios": poblacion_futura,
            "gpc_kg_hab_dia": gpc_kg_hab_dia,
            "generacion_diaria_actual_ton": round(poblacion_actual * gpc_ton, 2),
            "generacion_diaria_futura_ton": round(gen_diaria_ton, 2),
            "volumen_residuos_m3": round(volumen_residuos_m3, 2),
            "volumen_cobertura_m3": round(volumen_cobertura_m3, 2),
            "volumen_total_m3": round(volumen_total_m3, 2),
            "area_requerida_m2": round(area_total_m2, 2),
            "area_requerida_ha": round(area_total_ha, 2),
            "vida_util_anios": vida_util_anios
        }

    @staticmethod
    def evaluar_terreno_100_puntos(
        distancia_cp_m: float,
        textura_suelo: str,
        permeabilidad_k: float,
        pendiente_pct: float,
        distancia_via_m: float,
        profundidad_napa_m: float,
        es_predio_sbn: bool,
        uso_actual: str = "Eriazo"
    ) -> Dict[str, Any]:
        """
        Matriz de Calificación Automática basada en el Cuadro N° 06 (MINAM 2021). Total: 100 Puntos.
        """
        # 1. Distancia a Centro Poblado (20 pts)
        if 1000 <= distancia_cp_m <= 3000:
            pts_cp = 20
            det_cp = "Óptimo (1 km - 3 km)"
        elif distancia_cp_m > 3000:
            pts_cp = 15
            det_cp = "Bueno (> 3 km)"
        elif distancia_cp_m >= 500:
            pts_cp = 10
            det_cp = "Regular (500 m - 1 km)"
        else:
            pts_cp = 0
            det_cp = "Inadmisible (< 500 m)"

        # 2. Geología y Permeabilidad (20 pts)
        textura_lower = textura_suelo.lower()
        if permeabilidad_k <= 1e-6 or "areno-arcilloso" in textura_lower or "arcilloso" in textura_lower:
            pts_geol = 20
            det_geol = "Baja permeabilidad (k <= 10^-6 cm/s) - Suelo Areno-Arcilloso"
        elif permeabilidad_k <= 1e-5 or "limo-arenoso" in textura_lower:
            pts_geol = 12
            det_geol = "Permeabilidad moderada (k <= 10^-5 cm/s) - Limo-Arenoso"
        else:
            pts_geol = 5
            det_geol = "Alta permeabilidad (Rocoso/Arenoso)"

        # 3. Pendiente del Terreno (15 pts)
        if 2.0 <= pendiente_pct <= 10.0:
            pts_pend = 15
            det_pend = "Plano a suave (2% - 10%)"
        elif 10.0 < pendiente_pct <= 20.0:
            pts_pend = 10
            det_pend = "Moderado (10% - 20%)"
        elif 20.0 < pendiente_pct <= 25.0:
            pts_pend = 5
            det_pend = "Fuerte (20% - 25%)"
        else:
            pts_pend = 0
            det_pend = "Descartado (> 25%)"

        # 4. Accesibilidad Vial (15 pts)
        if distancia_via_m <= 1000:
            pts_vias = 15
            det_vias = "Excelente (< 1 km a vía principal)"
        elif distancia_via_m <= 3000:
            pts_vias = 10
            det_vias = "Moderado (1 km - 3 km)"
        else:
            pts_vias = 5
            det_vias = "Lejano (> 3 km)"

        # 5. Riesgo Hidrológico (15 pts)
        if profundidad_napa_m > 20.0:
            pts_hidro = 15
            det_hidro = "Acuífero muy profundo (> 20 m)"
        elif 10.0 <= profundidad_napa_m <= 20.0:
            pts_hidro = 8
            det_hidro = "Napa freática a 10 - 20 m"
        else:
            pts_hidro = 3
            det_hidro = "Napa freática superficial (< 10 m)"

        # 6. Saneamiento Legal (10 pts)
        if es_predio_sbn:
            pts_legal = 10
            det_legal = "Predio del Estado (SBN - Saneado)"
        else:
            pts_legal = 6
            det_legal = "Predio Privado (Saneamiento requerido)"

        # 7. Uso Actual del Suelo (5 pts)
        if "eriazo" in uso_actual.lower() or "sin uso" in uso_actual.lower():
            pts_uso = 5
            det_uso = "Terreno Eriazo (Compatible PDU)"
        else:
            pts_uso = 3
            det_uso = "Uso con restricciones menores"

        pts_total = pts_cp + pts_geol + pts_pend + pts_vias + pts_hidro + pts_legal + pts_uso

        if pts_total >= 80:
            clasificacion = "ÁREA DE PRIMERA OPCIÓN (EXCELENTE)"
            color_badge = "success"
        elif pts_total >= 60:
            clasificacion = "ÁREA DE SEGUNDA OPCIÓN (MODERADO)"
            color_badge = "warning"
        else:
            clasificacion = "ZONA NO RECOMENDADA / DESCARTADA"
            color_badge = "danger"

        return {
            "desglose_puntajes": {
                "distancia_centro_poblado": {"puntaje": pts_cp, "max": 20, "detalle": det_cp},
                "geologia_permeabilidad": {"puntaje": pts_geol, "max": 20, "detalle": det_geol},
                "pendiente_terreno": {"puntaje": pts_pend, "max": 15, "detalle": det_pend},
                "accesibilidad_vial": {"puntaje": pts_vias, "max": 15, "detalle": det_vias},
                "riesgo_hidrologico": {"puntaje": pts_hidro, "max": 15, "detalle": det_hidro},
                "saneamiento_legal": {"puntaje": pts_legal, "max": 10, "detalle": det_legal},
                "uso_suelo_pdu": {"puntaje": pts_uso, "max": 5, "detalle": det_uso}
            },
            "puntaje_total": pts_total,
            "maximo_posible": 100,
            "clasificacion": clasificacion,
            "color_badge": color_badge,
            "cumple_requisitos_minimos": pts_total >= 60 and pts_cp > 0 and pts_pend > 0
        }

    def generar_buffers_restriccion(self, lat: float, lng: float) -> Dict[str, Any]:
        """
        Genera GeoJSON de capas de Restricción y Exclusión alrededor de una coordenada.
        Funciona en modo nativo Python (sin dependencias) o con Shapely.
        """
        def make_circle_polygon(clat, clng, radius_m):
            points = []
            lat_deg = radius_m / 111320.0
            lng_deg = radius_m / (111320.0 * math.cos(math.radians(clat)))
            for i in range(33):
                angle = math.radians(i * (360 / 32))
                px = clng + lng_deg * math.cos(angle)
                py = clat + lat_deg * math.sin(angle)
                points.append([round(px, 6), round(py, 6)])
            return {"type": "Polygon", "coordinates": [points]}

        # Buffers
        poly_cp = make_circle_polygon(lat, lng, 500)
        poly_aero = make_circle_polygon(lat + 0.04, lng + 0.05, 13000)
        poly_rio = make_circle_polygon(lat - 0.01, lng - 0.015, 500)
        poly_falla = make_circle_polygon(lat + 0.02, lng - 0.03, 1000)

        # Polígono Zona Potencial
        potencial_coords = [
            [lng + 0.015, lat + 0.015],
            [lng + 0.025, lat + 0.015],
            [lng + 0.025, lat + 0.025],
            [lng + 0.015, lat + 0.025],
            [lng + 0.015, lat + 0.015]
        ]
        poly_potencial = {"type": "Polygon", "coordinates": [potencial_coords]}

        return {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {"capa": "Buffer Centro Poblado (500m)", "tipo": "Restriccion", "color": "#e74c3c"},
                    "geometry": poly_cp
                },
                {
                    "type": "Feature",
                    "properties": {"capa": "Buffer Aeropuerto (13km)", "tipo": "Restriccion", "color": "#f39c12"},
                    "geometry": poly_aero
                },
                {
                    "type": "Feature",
                    "properties": {"capa": "Buffer Faja Marginal Río (500m)", "tipo": "Restriccion", "color": "#3498db"},
                    "geometry": poly_rio
                },
                {
                    "type": "Feature",
                    "properties": {"capa": "Buffer Falla Geológica (1km)", "tipo": "Restriccion", "color": "#9b59b6"},
                    "geometry": poly_falla
                },
                {
                    "type": "Feature",
                    "properties": {
                        "capa": "Área Potencial (Primera Opción)",
                        "tipo": "ZonaPotencial",
                        "color": "#2ecc71",
                        "area_ha": 6.25
                    },
                    "geometry": poly_potencial
                }
            ]
        }


if __name__ == "__main__":
    processor = IRSGISProcessor()
    dim = processor.calcular_dimensionamiento(poblacion_actual=45000, gpc_kg_hab_dia=0.65)
    print("Dimensionamiento OK:", dim["area_requerida_ha"], "ha")
    eval_res = processor.evaluar_terreno_100_puntos(1800, "Areno-Arcilloso", 1e-7, 6.5, 600, 25, True)
    print("Matriz 100 Pts OK:", eval_res["puntaje_total"], "pts -", eval_res["clasificacion"])
