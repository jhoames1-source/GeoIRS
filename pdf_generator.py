"""
Geoportal IRS-Peru - Módulo de Generación de Reportes Técnicos PDF / HTML
Genera la Ficha Técnica de Evaluación Preliminar para Terrenos IRS según Guía MINAM (2021)
Soporta ReportLab si está instalado, con fallback a Reporte HTML Imprimible.
"""

import io

try:
    from reportlab.lib.pagesizes import letter
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib import colors
    HAS_REPORTLAB = True
except ImportError:
    HAS_REPORTLAB = False


class IRSPDFReportGenerator:
    """Generador de Fichas Técnicas PDF / HTML para Selección de Sitio IRS."""

    @staticmethod
    def generar_pdf_reporte(
        ciudad_ubigeo: str,
        coordenadas_utm: str,
        dimensionamiento: dict,
        evaluacion_100_pts: dict,
        perfil_geologico: str = "Areno-Arcilloso (k <= 1x10^-6 cm/s)",
        compatibilidad_pdu: str = "Compatible con Zonificación de Tratamiento Especial / Eriazo"
    ) -> bytes:
        if HAS_REPORTLAB:
            return IRSPDFReportGenerator._generar_reportlab_pdf(
                ciudad_ubigeo, coordenadas_utm, dimensionamiento, evaluacion_100_pts, perfil_geologico, compatibilidad_pdu
            )
        else:
            return IRSPDFReportGenerator._generar_html_printable(
                ciudad_ubigeo, coordenadas_utm, dimensionamiento, evaluacion_100_pts, perfil_geologico, compatibilidad_pdu
            )

    @staticmethod
    def _generar_reportlab_pdf(
        ciudad_ubigeo, coordenadas_utm, dimensionamiento, evaluacion_100_pts, perfil_geologico, compatibilidad_pdu
    ) -> bytes:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36
        )

        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'TitleStyle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=16, leading=20, textColor=colors.HexColor('#1b4332'), alignment=1
        )
        subtitle_style = ParagraphStyle(
            'SubtitleStyle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=colors.HexColor('#2d6a4f'), alignment=1
        )
        heading2_style = ParagraphStyle(
            'Heading2Style', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=colors.HexColor('#2d6a4f'), spaceBefore=10, spaceAfter=4
        )
        body_style = ParagraphStyle(
            'BodyStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=9, leading=12, textColor=colors.HexColor('#212529')
        )

        story = []
        story.append(Paragraph("GEOPORTAL DE IDENTIFICACIÓN DE ZONAS POTENCIALES PARA IRS", title_style))
        story.append(Spacer(1, 4))
        story.append(Paragraph("FICHA TÉCNICA DE EVALUACIÓN PRELIMINAR DE SITIO (MINAM 2021 / D.L. 1278)", subtitle_style))
        story.append(Spacer(1, 10))
        story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#1b4332'), spaceAfter=10))

        # Ubicación
        story.append(Paragraph("1. Ubicación y Georreferenciación", heading2_style))
        info_ubicacion = [
            [Paragraph("<b>Ciudad / Ubigeo:</b>", body_style), Paragraph(ciudad_ubigeo, body_style)],
            [Paragraph("<b>Coordenadas UTM WGS84:</b>", body_style), Paragraph(coordenadas_utm, body_style)],
            [Paragraph("<b>Compatibilidad PDU:</b>", body_style), Paragraph(compatibilidad_pdu, body_style)],
            [Paragraph("<b>Perfil Geológico Sugerido:</b>", body_style), Paragraph(perfil_geologico, body_style)]
        ]
        t_ubicacion = Table(info_ubicacion, colWidths=[180, 360])
        t_ubicacion.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8f9fa')),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#dee2e6')),
            ('PADDING', (0,0), (-1,-1), 4),
        ]))
        story.append(t_ubicacion)
        story.append(Spacer(1, 10))

        # Dimensionamiento
        story.append(Paragraph("2. Dimensionamiento del Relleno Sanitario (10 Años)", heading2_style))
        data_dim = [
            ["Parámetro de Diseño", "Valor Estimado", "Unidad"],
            ["Población Actual / Futura (10a)", f"{dimensionamiento['poblacion_inicial']:,} / {dimensionamiento['poblacion_proyectada_10_anios']:,}", "habitantes"],
            ["Generación Per Cápita (GPC)", f"{dimensionamiento['gpc_kg_hab_dia']}", "kg/hab/día"],
            ["Generación Diaria Proyectada", f"{dimensionamiento['generacion_diaria_futura_ton']}", "ton/día"],
            ["Volumen Acumulado de Residuos", f"{dimensionamiento['volumen_residuos_m3']:,}", "m³"],
            ["Volumen Material Cobertura (25%)", f"{dimensionamiento['volumen_cobertura_m3']:,}", "m³"],
            ["Volumen Total Requerido", f"{dimensionamiento['volumen_total_m3']:,}", "m³"],
            ["Área Mínima Requerida", f"{dimensionamiento['area_requerida_m2']:,} m²", f"({dimensionamiento['area_requerida_ha']} ha)"]
        ]
        t_dim = Table(data_dim, colWidths=[230, 210, 100])
        t_dim.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#2d6a4f')),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#c3e6cb')),
            ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f4f6f8')]),
            ('PADDING', (0,0), (-1,-1), 4),
        ]))
        story.append(t_dim)
        story.append(Spacer(1, 10))

        # Matriz 100 Pts
        story.append(Paragraph("3. Matriz de Calificación Automática (100 Puntos - Cuadro N° 06 MINAM)", heading2_style))
        desglose = evaluacion_100_pts["desglose_puntajes"]
        data_matriz = [["Criterio de Evaluación", "Detalle Encontrado", "Puntos", "Máx"]]
        
        nombres = {
            "distancia_centro_poblado": "1. Distancia a Centros Poblados (>= 500m)",
            "geologia_permeabilidad": "2. Geología y Permeabilidad (k <= 1e-6)",
            "pendiente_terreno": "3. Pendiente del Terreno (2% - 25%)",
            "accesibilidad_vial": "4. Accesibilidad Vial",
            "riesgo_hidrologico": "5. Riesgo Hidrológico / Napa Freática",
            "saneamiento_legal": "6. Saneamiento Legal y Titulación",
            "uso_suelo_pdu": "7. Uso Actual del Suelo / PDU"
        }

        for k, v in desglose.items():
            data_matriz.append([nombres.get(k, k), v["detalle"], str(v["puntaje"]), str(v["max"])])

        data_matriz.append(["PUNTAJE TOTAL OBTENIDO", f"CLASIFICACIÓN: {evaluacion_100_pts['clasificacion']}", str(evaluacion_100_pts['puntaje_total']), "100"])

        t_matriz = Table(data_matriz, colWidths=[200, 220, 60, 60])
        t_matriz.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1b4332')),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#b7e4c7')),
            ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor('#d8f3dc')),
            ('FONTNAME', (0,-1), (-1,-1), 'Helvetica-Bold'),
            ('PADDING', (0,0), (-1,-1), 4),
        ]))
        story.append(t_matriz)
        story.append(Spacer(1, 10))

        # Dictamen
        story.append(Paragraph("4. Dictamen de Idoneidad Territorial", heading2_style))
        eval_text = f"<b>Puntaje Final:</b> {evaluacion_100_pts['puntaje_total']} / 100 pts<br/>" \
                    f"<b>Resultado:</b> {evaluacion_100_pts['clasificacion']}<br/>" \
                    f"<b>Recomendación:</b> Terreno apto para continuar a la Fase de Estudio Geotécnico de detalle (D.L. 1278)."
        
        dictamen_table = Table([[Paragraph(eval_text, body_style)]], colWidths=[540])
        dictamen_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#e8f5e9') if evaluacion_100_pts['puntaje_total'] >= 60 else colors.HexColor('#ffebee')),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#2e7d32') if evaluacion_100_pts['puntaje_total'] >= 60 else colors.HexColor('#c62828')),
            ('PADDING', (0,0), (-1,-1), 8),
        ]))
        story.append(dictamen_table)

        doc.build(story)
        buffer.seek(0)
        return buffer.getvalue()

    @staticmethod
    def _generar_html_printable(
        ciudad_ubigeo, coordenadas_utm, dimensionamiento, evaluacion_100_pts, perfil_geologico, compatibilidad_pdu
    ) -> bytes:
        html_str = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reporte Preliminar IRS - {ciudad_ubigeo}</title>
    <style>
        body {{ font-family: sans-serif; margin: 30px; color: #212529; font-size: 13px; }}
        h1 {{ color: #1b4332; text-align: center; font-size: 20px; margin-bottom: 4px; }}
        h2 {{ color: #2d6a4f; text-align: center; font-size: 14px; margin-top: 0; }}
        h3 {{ color: #1b4332; border-bottom: 2px solid #1b4332; padding-bottom: 4px; margin-top: 20px; font-size: 15px; }}
        table {{ width: 100%; border-collapse: collapse; margin-top: 10px; }}
        th, td {{ border: 1px solid #ced4da; padding: 8px 12px; text-align: left; }}
        th {{ background-color: #1b4332; color: white; }}
        .badge {{ display: inline-block; padding: 6px 12px; border-radius: 4px; font-weight: bold; background: #d4edda; color: #155724; }}
    </style>
</head>
<body onload="window.print()">
    <h1>GEOPORTAL DE IDENTIFICACIÓN DE ZONAS POTENCIALES PARA IRS</h1>
    <h2>FICHA TÉCNICA DE EVALUACIÓN PRELIMINAR DE SITIO (MINAM 2021 / D.L. 1278)</h2>
    <hr style="border: 1px solid #1b4332;">

    <h3>1. Ubicación y Georreferenciación</h3>
    <table>
        <tr><th>Ciudad / Ubigeo</th><td>{ciudad_ubigeo}</td></tr>
        <tr><th>Coordenadas UTM WGS84</th><td>{coordenadas_utm}</td></tr>
        <tr><th>Compatibilidad PDU</th><td>{compatibilidad_pdu}</td></tr>
        <tr><th>Perfil Geológico Sugerido</th><td>{perfil_geologico}</td></tr>
    </table>

    <h3>2. Dimensionamiento del Relleno Sanitario (10 Años)</h3>
    <table>
        <tr><th>Población Actual / Futura (10a)</th><td>{dimensionamiento['poblacion_inicial']:,} / {dimensionamiento['poblacion_proyectada_10_anios']:,} hab</td></tr>
        <tr><th>Generación Per Cápita (GPC)</th><td>{dimensionamiento['gpc_kg_hab_dia']} kg/hab/día</td></tr>
        <tr><th>Generación Diaria Proyectada</th><td>{dimensionamiento['generacion_diaria_futura_ton']} ton/día</td></tr>
        <tr><th>Volumen Total Requerido</th><td>{dimensionamiento['volumen_total_m3']:,} m³</td></tr>
        <tr><th>Área Mínima Requerida</th><td><b>{dimensionamiento['area_requerida_ha']} ha</b> ({dimensionamiento['area_requerida_m2']:,} m²)</td></tr>
    </table>

    <h3>3. Matriz de Calificación Automática (100 Puntos)</h3>
    <table>
        <thead>
            <tr><th>Criterio</th><th>Detalle</th><th>Puntaje</th></tr>
        </thead>
        <tbody>
"""
        for k, v in evaluacion_100_pts["desglose_puntajes"].items():
            html_str += f"<tr><td><b>{k.replace('_', ' ').title()}</b></td><td>{v['detalle']}</td><td><b>{v['puntaje']}</b> / {v['max']}</td></tr>"

        html_str += f"""
            <tr style="background: #e8f5e9;">
                <td colspan="2"><b>PUNTAJE TOTAL OBTENIDO</b></td>
                <td><b>{evaluacion_100_pts['puntaje_total']} / 100 Pts</b></td>
            </tr>
        </tbody>
    </table>

    <h3>4. Dictamen de Idoneidad Territorial</h3>
    <div style="background: #e8f5e9; border: 1px solid #2e7d32; padding: 15px; border-radius: 6px; margin-top: 10px;">
        <span class="badge">{evaluacion_100_pts['clasificacion']}</span>
        <p style="margin-top: 10px;"><b>Recomendación:</b> Terreno apto para continuar a la Fase de Inspección y Estudio Geotécnico de detalle (D.L. 1278).</p>
    </div>
</body>
</html>
"""
        return html_str.encode('utf-8')


if __name__ == "__main__":
    from gis_processor import IRSGISProcessor
    proc = IRSGISProcessor()
    dim = proc.calcular_dimensionamiento(50000, 0.65)
    ev = proc.evaluar_terreno_100_puntos(2000, "Areno-Arcilloso", 1e-7, 5.0, 500, 25.0, True)
    res_bytes = IRSPDFReportGenerator.generar_pdf_reporte("Cusco (Ubigeo 080101)", "19K 178234 E, 8493120 N", dim, ev)
    print("Generación de Reporte completada. Tamaño:", len(res_bytes), "bytes")
