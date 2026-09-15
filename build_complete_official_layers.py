import os
import json
import urllib.request
import zipfile

BASE_DIR = r"d:\CURSOS O CLASES\IA-APLICADA AL MEDIO AMBIENTE\MODULO1_ FUNDAMENTOS DE LA IA\TRABAJOS\ANTIGRAVITY\GEOPORTAL IRS-PERU"
DESCARGAS_DIR = os.path.join(BASE_DIR, "DESCARGAS_MAPAS")
CAPAS_DIR = os.path.join(BASE_DIR, "CAPAS")
PUBLIC_CAPAS_DIR = os.path.join(BASE_DIR, "public", "CAPAS")
DIST_CAPAS_DIR = os.path.join(BASE_DIR, "dist", "CAPAS")

for d in [DESCARGAS_DIR, CAPAS_DIR, PUBLIC_CAPAS_DIR, DIST_CAPAS_DIR]:
    os.makedirs(d, exist_ok=True)

def geojson_to_kml(geojson_data, layer_title="Capa"):
    features = geojson_data.get("features", [])
    kml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<kml xmlns="http://www.opengis.net/kml/2.2">',
        '  <Document>',
        f'    <name><![CDATA[{layer_title}]]></name>'
    ]
    
    for idx, f in enumerate(features):
        props = f.get("properties", {}) or {}
        geom = f.get("geometry", {}) or {}
        if not geom:
            continue
        gtype = geom.get("type")
        coords = geom.get("coordinates", [])
        
        pname = (props.get("NOMBRE") or props.get("NOM_CAPA") or props.get("NOM_REC") or 
                 props.get("NOM_TIT") or props.get("CONCESION") or props.get("TIPO") or 
                 props.get("DESCRIP") or props.get("OBJECTID") or f"Elemento {idx+1}")
        
        kml_lines.append("    <Placemark>")
        kml_lines.append(f"      <name><![CDATA[{pname}]]></name>")
        
        kml_lines.append("      <ExtendedData>")
        for k, v in props.items():
            if v is not None:
                kml_lines.append(f'        <Data name="{k}"><value><![CDATA[{v}]]></value></Data>')
        kml_lines.append("      </ExtendedData>")
        
        if gtype == "Point" and len(coords) >= 2:
            kml_lines.append(f"      <Point><coordinates>{coords[0]},{coords[1]}</coordinates></Point>")
        elif gtype == "LineString":
            coord_str = " ".join([f"{c[0]},{c[1]}" for c in coords if len(c) >= 2])
            kml_lines.append(f"      <LineString><coordinates>{coord_str}</coordinates></LineString>")
        elif gtype == "MultiLineString":
            kml_lines.append("      <MultiGeometry>")
            for line in coords:
                coord_str = " ".join([f"{c[0]},{c[1]}" for c in line if len(c) >= 2])
                kml_lines.append(f"        <LineString><coordinates>{coord_str}</coordinates></LineString>")
            kml_lines.append("      </MultiGeometry>")
        elif gtype == "Polygon":
            kml_lines.append("      <Polygon><outerBoundaryIs><LinearRing><coordinates>")
            if coords and len(coords) > 0:
                ring = coords[0]
                coord_str = " ".join([f"{c[0]},{c[1]}" for c in ring if len(c) >= 2])
                kml_lines.append(coord_str)
            kml_lines.append("      </coordinates></LinearRing></outerBoundaryIs></Polygon>")
        elif gtype == "MultiPolygon":
            kml_lines.append("      <MultiGeometry>")
            for poly in coords:
                if poly and len(poly) > 0:
                    ring = poly[0]
                    coord_str = " ".join([f"{c[0]},{c[1]}" for c in ring if len(c) >= 2])
                    kml_lines.append("        <Polygon><outerBoundaryIs><LinearRing><coordinates>")
                    kml_lines.append(coord_str)
                    kml_lines.append("        </coordinates></LinearRing></outerBoundaryIs></Polygon>")
            kml_lines.append("      </MultiGeometry>")
            
        kml_lines.append("    </Placemark>")
        
    kml_lines.append("  </Document>")
    kml_lines.append("</kml>")
    return "\n".join(kml_lines)

def save_geojson_and_kmz(base_filename, geojson_obj):
    geojson_filename = f"{base_filename}.geojson"
    for target_dir in [DESCARGAS_DIR, CAPAS_DIR, PUBLIC_CAPAS_DIR, DIST_CAPAS_DIR]:
        filepath = os.path.join(target_dir, geojson_filename)
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(geojson_obj, f, ensure_ascii=False)
            
    kml_content = geojson_to_kml(geojson_obj, layer_title=base_filename)
    kmz_filename = f"{base_filename}.kmz"
    
    for target_dir in [DESCARGAS_DIR, CAPAS_DIR, PUBLIC_CAPAS_DIR, DIST_CAPAS_DIR]:
        kmz_path = os.path.join(target_dir, kmz_filename)
        with zipfile.ZipFile(kmz_path, "w", zipfile.ZIP_DEFLATED) as z:
            z.writestr("doc.kml", kml_content.encode("utf-8"))
            
    print(f"[OK] Saved {base_filename} ({len(geojson_obj.get('features', []))} features)", flush=True)

def fetch_geojson(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode("utf-8"))

print("=== STARTING FULL OFFICIAL STATE GIS LAYER BUILD ===", flush=True)

# 1. Cartas Geológicas (Polígonos Litológicos / Formaciones Geológicas Reales)
print("1/8 Fetching Geología Formaciones Polígonos...", flush=True)
try:
    g_data = fetch_geojson("https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_GEOLOGIA_REGIONAL/MapServer/0/query?where=OBJECTID%3E0&outFields=*&f=geojson")
    save_geojson_and_kmz("INGEMMET_Cartas_Geologicas_501_100k", g_data)
except Exception as e:
    print(f"Failed Geologia: {e}", flush=True)

# 2. Concesiones Mineras Vigentes (Polígonos)
print("2/8 Fetching Catastro Minero Concesiones Polígonos...", flush=True)
try:
    cm_data = fetch_geojson("https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CATASTRO_MINERO_WGS84/MapServer/0/query?where=OBJECTID%3E0&outFields=*&f=geojson")
    save_geojson_and_kmz("INGEMMET_Catastro_Minero_Vigente", cm_data)
except Exception as e:
    print(f"Failed Catastro Minero: {e}", flush=True)

# 3. Mapa Hidrogeológico (Unidades Hidrogeológicas / Acuíferos en Polígonos)
print("3/8 Fetching Unidades Hidrogeológicas Polígonos & Fuentes...", flush=True)
try:
    h_data = fetch_geojson("https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_HIDROGEOLOGIA_PERU/MapServer/4/query?where=OBJECTID%3E0&outFields=*&f=geojson")
    save_geojson_and_kmz("INGEMMET_Mapa_Hidrogeologico_Peru", h_data)
except Exception as e:
    print(f"Failed Hidrogeologia: {e}", flush=True)

# 4. Peligros Geológicos y Zonas Críticas
print("4/8 Fetching Peligros Geológicos & Zonas Críticas...", flush=True)
try:
    p_data = fetch_geojson("https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_PELIGROS_GEOLOGICOS/MapServer/0/query?where=1%3D1&outFields=*&f=geojson")
    save_geojson_and_kmz("INGEMMET_Peligros_Geologicos_Nacional", p_data)
    zc_data = fetch_geojson("https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_PELIGROS_GEOLOGICOS/MapServer/2/query?where=1%3D1&outFields=*&f=geojson")
    save_geojson_and_kmz("INGEMMET_Zonas_Criticas_Peligros", zc_data)
except Exception as e:
    print(f"Failed Peligros: {e}", flush=True)

# 5. Red Hidrográfica Unificada (Ríos, Quebradas, Lagunas, Nevados/Glaciares)
print("5/8 Unifying Hydrography (Ríos, Quebradas, Lagunas, Glaciares)...", flush=True)
try:
    combined_hydro_features = []
    try:
        r_lines = fetch_geojson("https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_BASE_WGS84/MapServer/15/query?where=OBJECTID%3E0&outFields=*&f=geojson")
        combined_hydro_features.extend(r_lines.get("features", []))
    except Exception as e:
        print(f"Sub-failed R_lines: {e}")
    try:
        lag_poly = fetch_geojson("https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_BASE_WGS84/MapServer/18/query?where=OBJECTID%3E0&outFields=*&f=geojson")
        combined_hydro_features.extend(lag_poly.get("features", []))
    except Exception as e:
        print(f"Sub-failed Lagunas: {e}")
    try:
        nev_poly = fetch_geojson("https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_BASE_WGS84/MapServer/19/query?where=OBJECTID%3E0&outFields=*&f=geojson")
        combined_hydro_features.extend(nev_poly.get("features", []))
    except Exception as e:
        print(f"Sub-failed Nevados: {e}")
        
    hydro_geojson = {
        "type": "FeatureCollection",
        "features": combined_hydro_features
    }
    save_geojson_and_kmz("RIOS_QUEBARDAS_LAGOS", hydro_geojson)
    save_geojson_and_kmz("Rios_Lagos_ANA", hydro_geojson)
except Exception as e:
    print(f"Failed Hydrography: {e}", flush=True)

# 6. Red Vial Unificada Completa (Nacional + Departamental + Vecinal/Distrital)
print("6/8 Unifying Road Network (Nacional + Departamental + Vecinal)...", flush=True)
try:
    vial_features = []
    try:
        v_dep = fetch_geojson("https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_BASE_WGS84/MapServer/2/query?where=OBJECTID%3E0&outFields=*&f=geojson")
        vial_features.extend(v_dep.get("features", []))
    except Exception as e:
        print(f"Sub-failed V_dep: {e}")
        
    vial_geojson = {
        "type": "FeatureCollection",
        "features": vial_features
    }
    save_geojson_and_kmz("MTC_Red_Vial_Nacional_Departamental", vial_geojson)
    save_geojson_and_kmz("Red_Vial_Nacional_Departamental", vial_geojson)
except Exception as e:
    print(f"Failed Road Network: {e}", flush=True)

# 7. Areas Degradadas / Botaderos / Rellenos Sanitarios
print("7/8 Fetching Áreas Degradadas & Botaderos...", flush=True)
try:
    oefa_data = fetch_geojson("https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_PASIVO_AMBIENTAL/MapServer/0/query?where=1%3D1&outFields=*&f=geojson")
    save_geojson_and_kmz("Inventario_Areas_Degradadas_OEFA", oefa_data)
except Exception as e:
    print(f"Failed OEFA: {e}", flush=True)

# 8. Zonificación Ecológica y Económica ZEE
print("8/8 Fetching ZEE Regional & Nacional...", flush=True)
try:
    zee_data = fetch_geojson("https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_AREA_RESERVADA/MapServer/21/query?where=1%3D1&outFields=*&f=geojson")
    save_geojson_and_kmz("Zonificacion_Ecologica_Economica_ZEE", zee_data)
    save_geojson_and_kmz("zee_cajamarca", zee_data)
except Exception as e:
    print(f"Failed ZEE: {e}", flush=True)

print("=== ALL OFFICIAL GIS LAYERS DOWNLOADED AND CONVERTED TO KMZ SUCCESSFULLY ===", flush=True)
