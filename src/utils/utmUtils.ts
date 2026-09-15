/**
 * Utilidades de Conversión Geodésica UTM WGS84 <-> Geográficas (Lat/Lng)
 * Implementación de fórmulas de Transverse Mercator para el elipsoide WGS84
 * Zonas UTM del Perú: 17S, 18S, 19S (EPSG: 32717, 32718, 32719)
 */

const a = 6378137.0; // Semieje mayor WGS84 (metros)
const f = 1 / 298.257223563; // Achatamiento
const b = a * (1 - f); // Semieje menor (6356752.3142 m)
const e2 = (a * a - b * b) / (a * a); // Primera excentricidad al cuadrado (~0.00669437999)
const ep2 = (a * a - b * b) / (b * b); // Segunda excentricidad al cuadrado (~0.00673949674)
const k0 = 0.9996; // Factor de escala en meridiano central

export interface UTMResult {
  este: number;
  norte: number;
  zonaNumero: number;
  hemisferio: 'S' | 'N';
  zona: string; // e.g. "17S", "18S", "19S"
  epsg: number;
}

export interface LatLngResult {
  lat: number;
  lng: number;
}

/**
 * Determina la zona UTM natural a partir de la longitud
 */
export function getUtmZoneNumber(lng: number): number {
  return Math.floor((lng + 180) / 6) + 1;
}

/**
 * Convierte Coordenadas Geográficas (Latitud, Longitud) a UTM WGS84
 */
export function latLngToUtm(lat: number, lng: number, forcedZoneNumber?: number): UTMResult {
  const zoneNumber = forcedZoneNumber || getUtmZoneNumber(lng);
  const isSouth = lat < 0;
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  // Meridiano central de la zona UTM
  const lambda0 = ((zoneNumber - 1) * 6 - 180 + 3) * (Math.PI / 180);
  const deltaLambda = lngRad - lambda0;

  const N = a / Math.sqrt(1 - e2 * Math.sin(latRad) * Math.sin(latRad));
  const T = Math.tan(latRad) * Math.tan(latRad);
  const C = ep2 * Math.cos(latRad) * Math.cos(latRad);
  const A = Math.cos(latRad) * deltaLambda;

  // Distancia del arco de meridiano M
  const M = a * (
    (1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256) * latRad
    - (3 * e2 / 8 + 3 * e2 * e2 / 32 + 45 * e2 * e2 * e2 / 1024) * Math.sin(2 * latRad)
    + (15 * e2 * e2 / 256 + 45 * e2 * e2 * e2 / 1024) * Math.sin(4 * latRad)
    - (35 * e2 * e2 * e2 / 3072) * Math.sin(6 * latRad)
  );

  const este = 500000 + k0 * N * (
    A + (1 - T + C) * Math.pow(A, 3) / 6
    + (5 - 18 * T + T * T + 72 * C - 58 * ep2) * Math.pow(A, 5) / 120
  );

  let norte = k0 * (
    M + N * Math.tan(latRad) * (
      Math.pow(A, 2) / 2
      + (5 - T + 9 * C + 4 * C * C) * Math.pow(A, 4) / 24
      + (61 - 58 * T + T * T + 600 * C - 330 * ep2) * Math.pow(A, 6) / 720
    )
  );

  if (isSouth) {
    norte += 10000000; // Falso Norte para hemisferio sur
  }

  const epsg = isSouth ? 32700 + zoneNumber : 32600 + zoneNumber;

  return {
    este: Math.round(este * 100) / 100,
    norte: Math.round(norte * 100) / 100,
    zonaNumero: zoneNumber,
    hemisferio: isSouth ? 'S' : 'N',
    zona: `${zoneNumber}${isSouth ? 'S' : 'N'}`,
    epsg
  };
}

/**
 * Convierte Coordenadas UTM WGS84 a Geográficas (Latitud, Longitud)
 */
export function utmToLatLng(
  este: number,
  norte: number,
  zoneNumber: number,
  isSouth: boolean = true
): LatLngResult {
  const e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));
  const x = este - 500000;
  let y = norte;
  if (isSouth) {
    y -= 10000000;
  }

  const M = y / k0;
  const mu = M / (a * (1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256));

  const phi1Rad = mu
    + (3 * e1 / 2 - 27 * Math.pow(e1, 3) / 32) * Math.sin(2 * mu)
    + (21 * Math.pow(e1, 2) / 16 - 55 * Math.pow(e1, 4) / 32) * Math.sin(4 * mu)
    + (151 * Math.pow(e1, 3) / 96) * Math.sin(6 * mu)
    + (1097 * Math.pow(e1, 4) / 512) * Math.sin(8 * mu);

  const N1 = a / Math.sqrt(1 - e2 * Math.sin(phi1Rad) * Math.sin(phi1Rad));
  const T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
  const C1 = ep2 * Math.cos(phi1Rad) * Math.cos(phi1Rad);
  const R1 = a * (1 - e2) / Math.pow(1 - e2 * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
  const D = x / (N1 * k0);

  const latRad = phi1Rad - (N1 * Math.tan(phi1Rad) / R1) * (
    Math.pow(D, 2) / 2
    - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * ep2) * Math.pow(D, 4) / 24
    + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * ep2 - 3 * C1 * C1) * Math.pow(D, 6) / 720
  );

  const lambda0 = ((zoneNumber - 1) * 6 - 180 + 3) * (Math.PI / 180);
  const lngRad = lambda0 + (
    D
    - (1 + 2 * T1 + C1) * Math.pow(D, 3) / 6
    + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * ep2 + 24 * T1 * T1) * Math.pow(D, 5) / 120
  ) / Math.cos(phi1Rad);

  return {
    lat: Math.round((latRad * 180 / Math.PI) * 1000000) / 1000000,
    lng: Math.round((lngRad * 180 / Math.PI) * 1000000) / 1000000
  };
}
