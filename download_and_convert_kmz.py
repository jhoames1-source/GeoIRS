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
        props = feat.get('properties', {})
        geom = feat.get('geometry', {})
        if not geom:
            continue
            
        feat_name = (props.get('name') or props.get('nombre') or props.get('NOMBRE') or 
                     props.get('ANP_NOMB') or props.get('DENOMINACI') or props.get('ubigeo') or layer_name)
        
        kml_body.append('    <Placemark>')
        kml_body.append(f'      <name><![CDATA[{feat_name}]]></name>')
        
        kml_body.append('      <ExtendedData>')
        for k, v in props.items():
            if v is not None:
                kml_body.append(f'        <Data name="{k}"><value><![CDATA[{v}]]></value></Data>')
        kml_body.append('      </ExtendedData>')
        
        gtype = geom.get('type')
        coords = geom.get('coordinates', [])
        
        if gtype == 'Point':
            lng, lat = coords[0], coords[1]
            kml_body.append(f'      <Point><coordinates>{lng},{lat},0</coordinates></Point>')
        elif gtype == 'LineString':
            coord_str = ' '.join([f'{pt[0]},{pt[1]},0' for pt in coords if len(pt) >= 2])
            kml_body.append(f'      <LineString><coordinates>{coord_str}</coordinates></LineString>')
        elif gtype == 'Polygon':
            kml_body.append('      <Polygon><outerBoundaryIs><LinearRing><coordinates>')
            ring_str = ' '.join([f'{pt[0]},{pt[1]},0' for pt in coords[0] if len(pt) >= 2])
            kml_body.append(f'        {ring_str}')
            kml_body.append('      </coordinates></LinearRing></outerBoundaryIs></Polygon>')
        elif gtype == 'MultiPolygon':
            kml_body.append('      <MultiGeometry>')
            for poly in coords:
                kml_body.append('        <Polygon><outerBoundaryIs><LinearRing><coordinates>')
                ring_str = ' '.join([f'{pt[0]},{pt[1]},0' for pt in poly[0] if len(pt) >= 2])
                kml_body.append(f'          {ring_str}')
                kml_body.append('        </coordinates></LinearRing></outerBoundaryIs></Polygon>')
            kml_body.append('      </MultiGeometry>')
            
        kml_body.append('    </Placemark>')
        
    return kml_header + '\n'.join(kml_body) + '\n' + kml_footer

def create_kmz_file(kml_content, kmz_out_path):
    temp_kml = kmz_out_path.replace('.kmz', '_temp.kml')
    with open(temp_kml, 'w', encoding='utf-8') as f:
        f.write(kml_content)
    with zipfile.ZipFile(kmz_out_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipf.write(temp_kml, 'doc.kml')
    os.remove(temp_kml)
    print(f'Exito: Creado KMZ en {kmz_out_path}')

# Capas oficiales del Estado Peruano (GeoPerú 39441, INGEMMET GEOCATMIN, OEFA, SBN, MINCUL, ANA, SERNANP)
sources = [
  {
    'name': 'GeoPeru_39441_Rellenos_Sanitarios',
    'url': 'https://geoservidorperu.minam.gob.pe/geoserver/minam/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=capa_19470_rellenos_sanitarios&outputFormat=application/json',
    'out_raw': 'geoperu_rellenos_sanitarios_39441.json',
    'out_geojson': 'geoperu_rellenos_sanitarios_39441.geojson',
    'out_kmz': 'GeoPeru_Rellenos_Sanitarios_39441.kmz'
  },
  {
    'name': 'INGEMMET_Fallas_Geologicas_Geocatmin',
    'url': 'https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_FALLAS_GEOLOGICAS/MapServer/0/query?where=1%3D1&outFields=*&f=geojson',
    'out_raw': 'ingemmet_fallas_geologicas.json',
    'out_geojson': 'ingemmet_fallas_geologicas.geojson',
    'out_kmz': 'INGEMMET_Fallas_Geologicas.kmz'
  },
  {
    'name': 'OEFA_Botaderos_Areas_Degradadas',
    'url': 'https://geoservidorperu.minam.gob.pe/geoserver/oefa/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=botaderos_inventariados_pifa&outputFormat=application/json',
    'out_raw': 'oefa_botaderos_inventariados.json',
    'out_geojson': 'oefa_botaderos_inventariados.geojson',
    'out_kmz': 'OEFA_Botaderos_Areas_Degradadas.kmz'
  },
  {
    'name': 'SBN_Predios_Estatales_SINABIP',
    'url': 'https://geoservidorperu.minam.gob.pe/geoserver/sbn/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=predios_estatales_disponibles&outputFormat=application/json',
    'out_raw': 'sbn_predios_estatales.json',
    'out_geojson': 'sbn_predios_estatales.geojson',
    'out_kmz': 'SBN_Predios_Estatales_SINABIP.kmz'
  },
  {
    'name': 'MINCUL_Sitios_Arqueologicos_CIRA',
    'url': 'https://geoservidorperu.minam.gob.pe/geoserver/mincul/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=sitios_arqueologicos_cira&outputFormat=application/json',
    'out_raw': 'mincul_cira_arqueologia.json',
    'out_geojson': 'mincul_cira_arqueologia.geojson',
    'out_kmz': 'MINCUL_Sitios_Arqueologicos_CIRA.kmz'
  }
]

print("=== INICIANDO DESCARGA Y CONVERSIÓN DE CAPAS OFICIALES DEL ESTADO PERUANO ===")

for src in sources:
    print(f"\nProcesando: {src['name']} ...")
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
            print(f"Descargado raw dataset en: {raw_path} ({len(data_bytes)} bytes)")
            
            geojson_data = json.loads(data_bytes.decode('utf-8'))
            
            # Guardar GeoJSON estático servible
            with open(pub_geojson, 'w', encoding='utf-8') as f:
                json.dump(geojson_data, f, ensure_ascii=False)
            with open(dist_geojson, 'w', encoding='utf-8') as f:
                json.dump(geojson_data, f, ensure_ascii=False)
                
            # Convertir a KML y empaquetar a KMZ
            kml_str = geojson_to_kml(geojson_data, src['name'])
            create_kmz_file(kml_str, kmz_path)
            
    except Exception as e:
        print(f"Aviso en {src['name']}: {e}")

print("\n=== PROCESO COMPLETADO EXITOSAMENTE ===")
