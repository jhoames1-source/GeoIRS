import { CandidateZone } from '../types';

export function generatePythonArcPyScript(zone: CandidateZone): string {
  return `# ==============================================================================
# SCRIPT AUTOMATIZADO DE ANÁLISIS ESPACIAL Y GEOPROCESAMIENTO IRS (MINAM / ARCPY)
# Proyecto: Selección de Sitio Relleno Sanitario - ${zone.nombre}
# Decreto Legislativo N° 1278 - Ley de Gestión Integral de Residuos Sólidos
# ==============================================================================

import arcpy
import os

# Configuración del entorno de trabajo en ArcGIS Pro
arcpy.env.overwriteOutput = True
arcpy.env.workspace = r"C:\\GIS_Projects\\IRS_Peru\\GDB_IRS.gdb"

# 1. Definición de Parámetros de Entrada
ubigeo = "${zone.ubigeo}"
zona_utm = "${zone.coordenadasUTM[0]?.zona || '18S'}"
coordenadas_vertices = [
${zone.coordenadasUTM.map(u => `    ("${u.vertice}", ${u.este}, ${u.norte})`).join(',\n')}
]

print(f"[+] Procesando polígono para {zone.nombre} en UTM Zona {zona_utm}...")

# 2. Creación de Feature Class Vectorial del Terreno Candidate
out_gdb = arcpy.env.workspace
fc_name = "Poligono_Candidato_IRS"
spatial_ref = arcpy.SpatialReference(32718 if zona_utm == "18S" else 32719)

if arcpy.Exists(fc_name):
    arcpy.Delete_management(fc_name)

arcpy.CreateFeatureclass_management(out_gdb, fc_name, "POLYGON", spatial_reference=spatial_ref)
arcpy.AddField_management(fc_name, "Nombre_Zona", "TEXT", field_length=100)
arcpy.AddField_management(fc_name, "Area_Ha", "DOUBLE")

# Insertar Geometría del Polígono
array = arcpy.Array()
for v_name, este, norte in coordenadas_vertices:
    point = arcpy.Point(este, norte)
    array.add(point)

polygon = arcpy.Polygon(array, spatial_ref)
cursor = arcpy.da.InsertCursor(fc_name, ["SHAPE@", "Nombre_Zona", "Area_Ha"])
cursor.insertRow([polygon, "${zone.nombre}", ${zone.areaHa}])
del cursor

print("[+] Polígono vectorial creado exitosamente.")

# 3. Geoprocesamiento de Buffers de Exclusión (D.L. 1278)
print("[+] Generando Buffers de Exclusión Legal...")

# Buffer Centros Poblados >= 500m
arcpy.analysis.Buffer("Centros_Poblados_INEI", "Buffer_CP_500m", "500 Meters")

# Buffer Aeropuertos >= 13km (RD 375-2013-MTC)
arcpy.analysis.Buffer("Aeropuertos_MTC", "Buffer_Aeropuertos_13km", "13 Kilometers")

# Buffer Fallas Geológicas >= 1km
arcpy.analysis.Buffer("Fallas_Geologicas_INGEMMET", "Buffer_Fallas_1km", "1000 Meters")

# 4. Intersección y Verificación de Superposición
arcpy.analysis.Intersect([fc_name, "ANP_SERNANP"], "Interseccion_ANP")
count_anp = int(arcpy.GetCount_management("Interseccion_ANP")[0])

if count_anp > 0:
    print("[CRÍTICO] El predio se superpone con Áreas Naturales Protegidas. Terreno INVIABLE.")
else:
    print("[ÉXITO] El predio NO presenta superposición con ANP. Cumple filtro de exclusión legal.")

print("[+] Análisis Espacial en Python/ArcPy completado con éxito.")
`;
}
