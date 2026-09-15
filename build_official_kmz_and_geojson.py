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
                 props.get("TIPO") or props.get("DESCRIP") or props.get("OBJECTID") or f"Elemento {idx+1}")
        
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
            
    print(f"[OK] Successfully saved {base_filename} ({len(geojson_obj.get('features', []))} features)", flush=True)

LAYERS = [
    {
        "filename": "INGEMMET_Mapa_Hidrogeologico_Peru",
        "url": "https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_HIDROGEOLOGIA_PERU/MapServer/1/query?where=1%3D1&outFields=*&f=geojson"
    },
    {
        "filename": "Inventario_Areas_Degradadas_OEFA",
        "url": "https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_PASIVO_AMBIENTAL/MapServer/0/query?where=1%3D1&outFields=*&f=geojson"
    },
    {
        "filename": "MTC_Red_Vial_Nacional_Departamental",
        "url": "https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_BASE_WGS84/MapServer/2/query?where=1%3D1&outFields=*&f=geojson"
    },
    {
        "filename": "Zona_Amortiguamiento_SERNANP",
        "url": "https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_AREA_RESERVADA/MapServer/11/query?where=1%3D1&outFields=*&f=geojson"
    },
    {
        "filename": "Zonificacion_Ecologica_Economica_ZEE",
        "url": "https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_BASE_WGS84/MapServer/6/query?where=1%3D1&outFields=*&f=geojson"
    },
    {
        "filename": "zee_cajamarca",
        "url": "https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_BASE_WGS84/MapServer/6/query?where=1%3D1&outFields=*&f=geojson"
    }
]

print("Fetching and building KMZ layers...", flush=True)
for layer in LAYERS:
    print(f"Processing {layer['filename']}...", flush=True)
    try:
        req = urllib.request.Request(layer["url"], headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=90) as resp:
            data = resp.read()
            geojson_obj = json.loads(data.decode("utf-8"))
            save_geojson_and_kmz(layer["filename"], geojson_obj)
    except Exception as e:
        print(f"[X] Failed for {layer['filename']}: {e}", flush=True)

print("\nFinished building official state KMZ datasets!", flush=True)
