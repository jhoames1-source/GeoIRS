-- ============================================================================
-- GEOPORTAL DE IDENTIFICACIÓN DE ZONAS PARA INFRAESTRUCTURA DE RESIDUOS SÓLIDOS (IRS)
-- Basado en: Guía para la Identificación de Zonas Potenciales (MINAM, 2021) y D.L. 1278
-- Base de Datos: PostgreSQL + PostGIS (EPSG:4326 WGS84 y EPSG:32718 UTM 18S)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- 1. TABLAS CAPAS BASE DE ENTIDADES PÚBLICAS
-- ----------------------------------------------------------------------------

-- Centros Poblados (COFOPRI / INEI)
CREATE TABLE IF NOT EXISTS centros_poblados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150),
    ubigeo VARCHAR(6),
    poblacion INT,
    geom GEOMETRY(MultiPolygon, 4326)
);
CREATE INDEX IF NOT EXISTS idx_centros_poblados_geom ON centros_poblados USING GIST(geom);

-- Aeropuertos y Aeródromos (MTC)
CREATE TABLE IF NOT EXISTS aeropuertos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150),
    tipo VARCHAR(50),
    geom GEOMETRY(Point, 4326)
);
CREATE INDEX IF NOT EXISTS idx_aeropuertos_geom ON aeropuertos USING GIST(geom);

-- Cuerpos de Agua - Ríos, Lagos, Lagunas (ANA)
CREATE TABLE IF NOT EXISTS cuerpos_agua (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150),
    tipo VARCHAR(50), -- Rio, Lago, Laguna, Humedal
    es_humedal BOOLEAN DEFAULT FALSE,
    geom GEOMETRY(Geometry, 4326)
);
CREATE INDEX IF NOT EXISTS idx_cuerpos_agua_geom ON cuerpos_agua USING GIST(geom);

-- Granjas Porcinas y Avícolas (SENASA/MIDAGRI)
CREATE TABLE IF NOT EXISTS granjas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150),
    tipo VARCHAR(50), -- Porcina, Avicola
    geom GEOMETRY(Point, 4326)
);
CREATE INDEX IF NOT EXISTS idx_granjas_geom ON granjas USING GIST(geom);

-- Fallas Geológicas Activas (INGEMMET)
CREATE TABLE IF NOT EXISTS fallas_geologicas (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50),
    tipo VARCHAR(50),
    activa BOOLEAN DEFAULT TRUE,
    geom GEOMETRY(MultiLineString, 4326)
);
CREATE INDEX IF NOT EXISTS idx_fallas_geologicas_geom ON fallas_geologicas USING GIST(geom);

-- Áreas Naturales Protegidas y Zonas de Amortiguamiento (SERNANP/MINAM)
CREATE TABLE IF NOT EXISTS anp (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200),
    categoria VARCHAR(100), -- ANP Nacional, ACR, ACP, Zona Amortiguamiento
    geom GEOMETRY(MultiPolygon, 4326)
);
CREATE INDEX IF NOT EXISTS idx_anp_geom ON anp USING GIST(geom);

-- Sitios Arqueológicos / CIRA (MINCUL)
CREATE TABLE IF NOT EXISTS sitios_arqueologicos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200),
    codigo_cira VARCHAR(100),
    geom GEOMETRY(MultiPolygon, 4326)
);
CREATE INDEX IF NOT EXISTS idx_sitios_arqueologicos_geom ON sitios_arqueologicos USING GIST(geom);

-- Fajas Marginales (ANA)
CREATE TABLE IF NOT EXISTS fajas_marginales (
    id SERIAL PRIMARY KEY,
    rio_asociado VARCHAR(150),
    ancho_m NUMERIC(10,2),
    geom GEOMETRY(MultiPolygon, 4326)
);
CREATE INDEX IF NOT EXISTS idx_fajas_marginales_geom ON fajas_marginales USING GIST(geom);

-- Comunidades Campesinas y Nativas (MIDAGRI)
CREATE TABLE IF NOT EXISTS comunidades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200),
    tipo VARCHAR(50), -- Campesina, Nativa
    titulado BOOLEAN DEFAULT TRUE,
    geom GEOMETRY(MultiPolygon, 4326)
);
CREATE INDEX IF NOT EXISTS idx_comunidades_geom ON comunidades USING GIST(geom);

-- Capacidad de Uso Mayor del Suelo y Geología (MIDAGRI / INGEMMET)
CREATE TABLE IF NOT EXISTS geologia_suelos (
    id SERIAL PRIMARY KEY,
    unidad_geol VARCHAR(100),
    textura VARCHAR(100), -- Areno-Arcilloso, Limo-Arenoso, Rocoso
    permeabilidad_k NUMERIC(12,8), -- cm/s e.g. 1e-6
    pendiente_pct NUMERIC(5,2),
    geom GEOMETRY(MultiPolygon, 4326)
);
CREATE INDEX IF NOT EXISTS idx_geologia_suelos_geom ON geologia_suelos USING GIST(geom);

-- Predios del Estado (SBN)
CREATE TABLE IF NOT EXISTS predios_sbn (
    id SERIAL PRIMARY KEY,
    cus_codigo VARCHAR(50),
    titular VARCHAR(150),
    geom GEOMETRY(MultiPolygon, 4326)
);
CREATE INDEX IF NOT EXISTS idx_predios_sbn_geom ON predios_sbn USING GIST(geom);

-- Red Vial (MTC)
CREATE TABLE IF NOT EXISTS red_vial (
    id SERIAL PRIMARY KEY,
    codigo_via VARCHAR(50),
    tipo_superficie VARCHAR(50), -- Asfaltado, Afirmado, Trocha
    geom GEOMETRY(MultiLineString, 4326)
);
CREATE INDEX IF NOT EXISTS idx_red_vial_geom ON red_vial USING GIST(geom);


-- 2. VISTAS Y FUNCIONES DE BUFFER DE RESTRICCIÓN Y EXCLUSIÓN
-- ----------------------------------------------------------------------------

-- Vista: Zonas de Restricción (Buffers)
CREATE OR REPLACE VIEW vista_buffers_restriccion AS
SELECT 
    ST_Union(ARRAY[
        -- Buffer Centros Poblados >= 500m
        (SELECT ST_Buffer(ST_Collect(geom)::geography, 500)::geometry FROM centros_poblados),
        -- Buffer Aeropuertos >= 13,000m (RD 375-2013-MTC)
        (SELECT ST_Buffer(ST_Collect(geom)::geography, 13000)::geometry FROM aeropuertos),
        -- Buffer Cuerpos de Agua >= 500m
        (SELECT ST_Buffer(ST_Collect(geom)::geography, 500)::geometry FROM cuerpos_agua),
        -- Buffer Granjas Porcinas/Avícolas >= 5000m
        (SELECT ST_Buffer(ST_Collect(geom)::geography, 5000)::geometry FROM granjas),
        -- Buffer Fallas Geológicas Activas >= 1000m
        (SELECT ST_Buffer(ST_Collect(geom)::geography, 1000)::geometry FROM fallas_geologicas),
        -- Pendientes mayores al 25%
        (SELECT ST_Collect(geom) FROM geologia_suelos WHERE pendiente_pct > 25.0)
    ]) AS geom;

-- Vista: Zonas de Exclusión Absoluta (Prohibidas por Ley)
CREATE OR REPLACE VIEW vista_zonas_exclusion AS
SELECT 
    ST_Union(ARRAY[
        (SELECT ST_Collect(geom) FROM anp),
        (SELECT ST_Collect(geom) FROM sitios_arqueologicos),
        (SELECT ST_Collect(geom) FROM cuerpos_agua WHERE es_humedal = TRUE),
        (SELECT ST_Collect(geom) FROM fajas_marginales),
        (SELECT ST_Collect(geom) FROM comunidades)
    ]) AS geom;

-- 3. FUNCIÓN DE MATRIZ DE EVALUACIÓN MULTICRITERIO (100 PUNTOS - CUADRO N° 06 MINAM)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION evaluar_terreno_irs(
    p_geom GEOMETRY(Polygon, 4326),
    p_textura_suelo VARCHAR,
    p_permeabilidad_k NUMERIC,
    p_pendiente_pct NUMERIC,
    p_distancia_cp_m NUMERIC,
    p_distancia_via_m NUMERIC,
    p_profundidad_napa_m NUMERIC,
    p_es_predio_sbn BOOLEAN
)
RETURNS TABLE (
    puntaje_cp INT,
    puntaje_geol_perm INT,
    puntaje_pendiente INT,
    puntaje_vias INT,
    puntaje_hidro INT,
    puntaje_legal INT,
    puntaje_uso INT,
    puntaje_total INT,
    clasificacion VARCHAR,
    es_apto BOOLEAN
) 
LANGUAGE plpgsql AS $$
DECLARE
    v_cp INT := 0;
    v_geol INT := 0;
    v_pend INT := 0;
    v_vias INT := 0;
    v_hidro INT := 0;
    v_legal INT := 0;
    v_uso INT := 0;
    v_total INT := 0;
    v_clasif VARCHAR(50);
BEGIN
    -- 1. Distancia a Centro Poblado (Máx 20 pts)
    IF p_distancia_cp_m > 3000 THEN v_cp := 15;
    ELSIF p_distancia_cp_m BETWEEN 1000 AND 3000 THEN v_cp := 20; -- Optimo
    ELSIF p_distancia_cp_m BETWEEN 500 AND 1000 THEN v_cp := 10;
    ELSE v_cp := 0; -- Inadmisible < 500m
    END IF;

    -- 2. Geología y Permeabilidad (k <= 1e-6 cm/s) (Máx 20 pts)
    IF p_permeabilidad_k <= 0.000001 OR LOWER(p_textura_suelo) LIKE '%areno-arcilloso%' OR LOWER(p_textura_suelo) LIKE '%arcilloso%' THEN 
        v_geol := 20;
    ELSIF p_permeabilidad_k <= 0.00001 OR LOWER(p_textura_suelo) LIKE '%limo-arenoso%' THEN 
        v_geol := 12;
    ELSE 
        v_geol := 5;
    END IF;

    -- 3. Pendiente del Terreno (Máx 15 pts)
    IF p_pendiente_pct BETWEEN 2.0 AND 10.0 THEN v_pend := 15;
    ELSIF p_pendiente_pct BETWEEN 10.0 AND 20.0 THEN v_pend := 10;
    ELSIF p_pendiente_pct BETWEEN 20.0 AND 25.0 THEN v_pend := 5;
    ELSE v_pend := 0; -- Pendiente > 25% descartada
    END IF;

    -- 4. Accesibilidad Vial (Máx 15 pts)
    IF p_distancia_via_m < 1000 THEN v_vias := 15;
    ELSIF p_distancia_via_m BETWEEN 1000 AND 3000 THEN v_vias := 10;
    ELSE v_vias := 5;
    END IF;

    -- 5. Riesgo Hidrológico / Napa Freática (Máx 15 pts)
    IF p_profundidad_napa_m > 20 THEN v_hidro := 15;
    ELSIF p_profundidad_napa_m BETWEEN 10 AND 20 THEN v_hidro := 8;
    ELSE v_hidro := 3;
    END IF;

    -- 6. Propiedad y Saneamiento Legal (Máx 10 pts)
    IF p_es_predio_sbn THEN v_legal := 10;
    ELSE v_legal := 6;
    END IF;

    -- 7. Uso Actual del Suelo / Compatibilidad PDU (Máx 5 pts)
    v_uso := 5; -- Suelo Eriazo / Incompatible con agricultura

    v_total := v_cp + v_geol + v_pend + v_vias + v_hidro + v_legal + v_uso;

    IF v_total >= 80 THEN 
        v_clasif := 'Área de Primera Opción (Excelente)';
    ELSIF v_total >= 60 THEN 
        v_clasif := 'Área de Segunda Opción (Moderado)';
    ELSE 
        v_clasif := 'No Recomendada / Descartada';
    END IF;

    RETURN QUERY SELECT 
        v_cp, v_geol, v_pend, v_vias, v_hidro, v_legal, v_uso, v_total, v_clasif, (v_total >= 60);
END;
$$;
