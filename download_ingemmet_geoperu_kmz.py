import os
import json
import zipfile
import urllib.request
import urllib.parse

root_dir = r'd:\CURSOS O CLASES\IA-APLICADA AL MEDIO AMBIENTE\MODULO1_ FUNDAMENTOS DE LA IA\TRABAJOS\ANTIGRAVITY\GEOPORTAL IRS-PERU'
descargas_dir = os.path.join(root_dir, 'DESCARGAS_MAPAS')
capas_dir = os.path.join(root_dir, 'CAPAS')
public_capas_dir = os.path.join(root_dir, 'public', 'CAPAS')
dist_capas_dir = os.path.join(root_dir, 'dist', 'CAPAS')

os.makedirs(descargas_dir, exist_ok=True)
os.makedirs(capas_dir, exist_ok=True)
os.makedirs(public_capas_dir, exist_ok=True)
os.makedirs(dist_capas_dir, exist_ok=True)

def geojson_to_kml(geojson_data, layer_name):
    kml_header = f'''<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>{layer_name}</name>
'''
    kml_footer = '''  </Document>
</kml>'''
    
    kml_body = []
    features = geojson_data.get('features', [])
    for feat in features:
        try:
            props = feat.get('properties', {})
            geom = feat.get('geometry', {})
            if not geom:
                continue
                
            feat_name = (props.get('NAME') or props.get('name') or props.get('nombre') or 
                         props.get('NOMBRE') or props.get('UNIDAD') or props.get('SIMBOLO') or 
                         props.get('TIPO') or props.get('CODIGO') or props.get('ZONA_CRIT') or layer_name)
            
            kml_body.append('    <Placemark>')
            kml_body.append(f'      <name><![CDATA[{feat_name}]]></name>')
            
            kml_body.append('      <ExtendedData>')
            for k, v in props.items():
                if v is not None:
                    kml_body.append(f'        <Data name="{k}"><value><![CDATA[{v}]]></value></Data>')
            kml_body.append('      </ExtendedData>')
            
            gtype = geom.get('type')
            coords = geom.get('coordinates', [])
            
            if gtype == 'Point' and len(coords) >= 2:
                lng, lat = coords[0], coords[1]
                kml_body.append(f'      <Point><coordinates>{lng},{lat},0</coordinates></Point>')
            elif gtype == 'LineString' and len(coords) > 0:
                coord_str = ' '.join([f'{pt[0]},{pt[1]},0' for pt in coords if len(pt) >= 2])
                if coord_str:
                    kml_body.append(f'      <LineString><coordinates>{coord_str}</coordinates></LineString>')
            elif gtype == 'MultiLineString' and len(coords) > 0:
                kml_body.append('      <MultiGeometry>')
                for line in coords:
                    coord_str = ' '.join([f'{pt[0]},{pt[1]},0' for pt in line if len(pt) >= 2])
                    if coord_str:
                        kml_body.append(f'        <LineString><coordinates>{coord_str}</coordinates></LineString>')
                kml_body.append('      </MultiGeometry>')
            elif gtype == 'Polygon' and len(coords) > 0:
                kml_body.append('      <Polygon><outerBoundaryIs><LinearRing><coordinates>')
                ring_str = ' '.join([f'{pt[0]},{pt[1]},0' for pt in coords[0] if len(pt) >= 2])
                kml_body.append(f'        {ring_str}')
                kml_body.append('      </coordinates></LinearRing></outerBoundaryIs></Polygon>')
            elif gtype == 'MultiPolygon' and len(coords) > 0:
                kml_body.append('      <MultiGeometry>')
                for poly in coords:
                    if len(poly) > 0:
                        ring_str = ' '.join([f'{pt[0]},{pt[1]},0' for pt in poly[0] if len(pt) >= 2])
                        kml_body.append('        <Polygon><outerBoundaryIs><LinearRing><coordinates>')
                        kml_body.append(f'          {ring_str}')
                        kml_body.append('        </coordinates></LinearRing></outerBoundaryIs></Polygon>')
                kml_body.append('      </MultiGeometry>')
                
            kml_body.append('    </Placemark>')
        except Exception as err:
            continue
        
    return kml_header + '\n'.join(kml_body) + '\n' + kml_footer

def create_kmz_file(kml_content, kmz_out_path):
    temp_kml = kmz_out_path.replace('.kmz', '_temp.kml')
    with open(temp_kml, 'w', encoding='utf-8') as f:
        f.write(kml_content)
    with zipfile.ZipFile(kmz_out_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipf.write(temp_kml, 'doc.kml')
    os.remove(temp_kml)
    print(f'-> Éxito: Creado archivo KMZ oficial en: {kmz_out_path}')

# Endpoints oficiales del Estado Peruano (INGEMMET GEOCATMIN / GeoPerú)
sources = [
  {
    'name': 'INGEMMET_Cartas_Geologicas_Celendin_100k',
    'url': 'https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_GEOLOGIA_100K_INTEGRADA/MapServer/0/query?where=1%3D1&outFields=*&f=geojson&resultRecordCount=100',
    'out_raw': 'ingemmet_geologia_celendin_100k.json',
    'out_geojson': 'ingemmet_geologia_celendin_100k.geojson',
    'out_kmz': 'INGEMMET_Cartas_Geologicas_Celendin_100k.kmz'
  },
  {
    'name': 'INGEMMET_Fallas_Geologicas_100k',
    'url': 'https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_GEOLOGIA_FALLAS/MapServer/1/query?where=1%3D1&outFields=*&f=geojson&resultRecordCount=500',
    'out_raw': 'ingemmet_fallas_100k.json',
    'out_geojson': 'ingemmet_fallas_100k.geojson',
    'out_kmz': 'INGEMMET_Fallas_Geologicas_100k.kmz'
  },
  {
    'name': 'INGEMMET_Peligros_Geologicos_Zonas_Criticas',
    'url': 'https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_PELIGROS_GEOLOGICOS/MapServer/2/query?where=1%3D1&outFields=*&f=geojson&resultRecordCount=2000',
    'out_raw': 'ingemmet_peligros_zonas_criticas.json',
    'out_geojson': 'ingemmet_peligros_zonas_criticas.geojson',
    'out_kmz': 'INGEMMET_Peligros_Geologicos_Zonas_Criticas.kmz'
  },
  {
    'name': 'INGEMMET_Mapa_Hidrogeologico_Peru',
    'url': 'https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_HIDROGEOLOGIA_PERU/MapServer/0/query?where=1%3D1&outFields=*&f=geojson&resultRecordCount=500',
    'out_raw': 'ingemmet_hidrogeologia_celendin.json',
    'out_geojson': 'ingemmet_hidrogeologia_celendin.geojson',
    'out_kmz': 'INGEMMET_Mapa_Hidrogeologico_Peru.kmz'
  },
  {
    'name': 'INGEMMET_Catastro_Minero_Vigente',
    'url': 'https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CATASTRO_MINERO/MapServer/0/query?where=1%3D1&outFields=*&f=geojson&resultRecordCount=1000',
    'out_raw': 'ingemmet_catastro_minero_celendin.json',
    'out_geojson': 'ingemmet_catastro_minero_celendin.geojson',
    'out_kmz': 'INGEMMET_Catastro_Minero_Vigente.kmz'
  }
]

print("=== DESCARGANDO MAPAS Y CAPAS DE FUENTES OFICIALES DEL ESTADO PERUANO (INGEMMET GEOCATMIN) ===")

for src in sources:
    print(f"\nObteniendo datos de: {src['name']} ...")
    raw_path = os.path.join(descargas_dir, src['out_raw'])
    kmz_path = os.path.join(capas_dir, src['out_kmz'])
    pub_geojson = os.path.join(public_capas_dir, src['out_geojson'])
    dist_geojson = os.path.join(dist_capas_dir, src['out_geojson'])
    
    try:
        req = urllib.request.Request(src['url'], headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data_bytes = resp.read()
            with open(raw_path, 'wb') as f:
                f.write(data_bytes)
            print(f"Descargado raw dataset en DESCARGAS_MAPAS/: {raw_path} ({len(data_bytes)} bytes)")
            
            geojson_data = json.loads(data_bytes.decode('utf-8'))
            num_feat = len(geojson_data.get('features', []))
            print(f"  Geometrias extraidas de la API oficial del estado: {num_feat}")
            
            # Guardar GeoJSON estático servible
            with open(pub_geojson, 'w', encoding='utf-8') as f:
                json.dump(geojson_data, f, ensure_ascii=False)
            with open(dist_geojson, 'w', encoding='utf-8') as f:
                json.dump(geojson_data, f, ensure_ascii=False)
                
            # Convertir a KML y empaquetar a KMZ
            kml_str = geojson_to_kml(geojson_data, src['name'])
            create_kmz_file(kml_str, kmz_path)
            
    except Exception as e:
        print(f"Error procesando {src['name']}: {e}")

print("\n=== DESCARGA Y CONVERSIÓN COMPLETA DE CAPAS OFICIALES A KMZ FINALIZADA ===")
