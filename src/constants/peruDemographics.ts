import { Jurisdiction, RegionPeru } from '../types';

export interface PeruDepartment {
  id: string;
  nombre: string;
  region: RegionPeru;
  provincias: PeruProvince[];
}

export interface PeruProvince {
  id: string;
  nombre: string;
  distritos: Jurisdiction[];
}

export const PERU_DEPARTMENTS: PeruDepartment[] = [
  // 1. AMAZONAS
  {
    id: '01',
    nombre: 'AMAZONAS',
    region: 'SELVA',
    provincias: [
      {
        id: '0101',
        nombre: 'CHACHAPOYAS',
        distritos: [
          { ubigeo: '010101', departamento: 'AMAZONAS', provincia: 'CHACHAPOYAS', distrito: 'CHACHAPOYAS', region: 'SELVA', poblacion: 35000, gpc: 0.62, tasaCrecimiento: 1.5, lat: -6.231, lng: -77.869, zoom: 13 },
          { ubigeo: '010102', departamento: 'AMAZONAS', provincia: 'CHACHAPOYAS', distrito: 'ASUNCIÓN', region: 'SELVA', poblacion: 3200, gpc: 0.55, tasaCrecimiento: 1.1, lat: -6.025, lng: -77.712, zoom: 13 },
          { ubigeo: '010103', departamento: 'AMAZONAS', provincia: 'CHACHAPOYAS', distrito: 'BALSAS', region: 'SELVA', poblacion: 1800, gpc: 0.52, tasaCrecimiento: 1.0, lat: -6.835, lng: -78.018, zoom: 13 }
        ]
      },
      {
        id: '0102',
        nombre: 'BAGUA',
        distritos: [
          { ubigeo: '010201', departamento: 'AMAZONAS', provincia: 'BAGUA', distrito: 'BAGUA', region: 'SELVA', poblacion: 48000, gpc: 0.64, tasaCrecimiento: 1.8, lat: -5.639, lng: -78.531, zoom: 13 },
          { ubigeo: '010202', departamento: 'AMAZONAS', provincia: 'BAGUA', distrito: 'ARAMANGO', region: 'SELVA', poblacion: 12500, gpc: 0.58, tasaCrecimiento: 1.4, lat: -5.418, lng: -78.435, zoom: 13 }
        ]
      },
      {
        id: '0107',
        nombre: 'UTCUBAMBA',
        distritos: [
          { ubigeo: '010701', departamento: 'AMAZONAS', provincia: 'UTCUBAMBA', distrito: 'BAGUA GRANDE', region: 'SELVA', poblacion: 55000, gpc: 0.65, tasaCrecimiento: 1.9, lat: -5.755, lng: -78.442, zoom: 13 }
        ]
      }
    ]
  },

  // 2. ANCASH
  {
    id: '02',
    nombre: 'ANCASH',
    region: 'SIERRA',
    provincias: [
      {
        id: '0201',
        nombre: 'HUARAZ',
        distritos: [
          { ubigeo: '020101', departamento: 'ANCASH', provincia: 'HUARAZ', distrito: 'HUARAZ', region: 'SIERRA', poblacion: 130000, gpc: 0.66, tasaCrecimiento: 1.6, lat: -9.526, lng: -77.528, zoom: 13 },
          { ubigeo: '020102', departamento: 'ANCASH', provincia: 'HUARAZ', distrito: 'INDEPENDENCIA', region: 'SIERRA', poblacion: 78000, gpc: 0.64, tasaCrecimiento: 1.7, lat: -9.515, lng: -77.522, zoom: 13 }
        ]
      },
      {
        id: '0218',
        nombre: 'SANTA',
        distritos: [
          { ubigeo: '021801', departamento: 'ANCASH', provincia: 'SANTA', distrito: 'CHIMBOTE', region: 'COSTA', poblacion: 215000, gpc: 0.72, tasaCrecimiento: 1.5, lat: -9.074, lng: -78.593, zoom: 13 },
          { ubigeo: '021809', departamento: 'ANCASH', provincia: 'SANTA', distrito: 'NUEVO CHIMBOTE', region: 'COSTA', poblacion: 165000, gpc: 0.70, tasaCrecimiento: 2.1, lat: -9.122, lng: -78.535, zoom: 13 }
        ]
      }
    ]
  },

  // 3. APURÍMAC
  {
    id: '03',
    nombre: 'APURÍMAC',
    region: 'SIERRA',
    provincias: [
      {
        id: '0301',
        nombre: 'ABANCAY',
        distritos: [
          { ubigeo: '030101', departamento: 'APURÍMAC', provincia: 'ABANCAY', distrito: 'ABANCAY', region: 'SIERRA', poblacion: 72000, gpc: 0.62, tasaCrecimiento: 1.5, lat: -13.636, lng: -72.879, zoom: 13 },
          { ubigeo: '030109', departamento: 'APURÍMAC', provincia: 'ABANCAY', distrito: 'TAMBURCO', region: 'SIERRA', poblacion: 14500, gpc: 0.60, tasaCrecimiento: 1.6, lat: -13.622, lng: -72.871, zoom: 13 }
        ]
      },
      {
        id: '0302',
        nombre: 'ANDAHUAYLAS',
        distritos: [
          { ubigeo: '030201', departamento: 'APURÍMAC', provincia: 'ANDAHUAYLAS', distrito: 'ANDAHUAYLAS', region: 'SIERRA', poblacion: 45000, gpc: 0.60, tasaCrecimiento: 1.4, lat: -13.655, lng: -73.387, zoom: 13 },
          { ubigeo: '030212', departamento: 'APURÍMAC', provincia: 'ANDAHUAYLAS', distrito: 'SAN JERÓNIMO', region: 'SIERRA', poblacion: 22000, gpc: 0.58, tasaCrecimiento: 1.5, lat: -13.648, lng: -73.365, zoom: 13 }
        ]
      }
    ]
  },

  // 4. AREQUIPA
  {
    id: '04',
    nombre: 'AREQUIPA',
    region: 'SIERRA',
    provincias: [
      {
        id: '0401',
        nombre: 'AREQUIPA',
        distritos: [
          { ubigeo: '040101', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'AREQUIPA', region: 'SIERRA', poblacion: 180000, gpc: 0.72, tasaCrecimiento: 1.7, lat: -16.409047, lng: -71.537451, zoom: 13 },
          { ubigeo: '040128', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'YURA', region: 'SIERRA', poblacion: 42000, gpc: 0.65, tasaCrecimiento: 2.2, lat: -16.245, lng: -71.625, zoom: 13 },
          { ubigeo: '040103', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'CERRO COLORADO', region: 'SIERRA', poblacion: 215000, gpc: 0.70, tasaCrecimiento: 2.0, lat: -16.368, lng: -71.565, zoom: 13 },
          { ubigeo: '040104', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'CHARACATO', region: 'SIERRA', poblacion: 16000, gpc: 0.60, tasaCrecimiento: 1.4, lat: -16.475, lng: -71.488, zoom: 13 },
          { ubigeo: '040112', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'PAUCARPATA', region: 'SIERRA', poblacion: 135000, gpc: 0.68, tasaCrecimiento: 1.6, lat: -16.433, lng: -71.505, zoom: 13 }
        ]
      },
      {
        id: '0402',
        nombre: 'CAMANÁ',
        distritos: [
          { ubigeo: '040201', departamento: 'AREQUIPA', provincia: 'CAMANÁ', distrito: 'CAMANÁ', region: 'COSTA', poblacion: 16500, gpc: 0.68, tasaCrecimiento: 1.3, lat: -16.623, lng: -72.711, zoom: 13 }
        ]
      },
      {
        id: '0405',
        nombre: 'CAYLLOMA',
        distritos: [
          { ubigeo: '040501', departamento: 'AREQUIPA', provincia: 'CAYLLOMA', distrito: 'CHIVAY', region: 'SIERRA', poblacion: 8200, gpc: 0.58, tasaCrecimiento: 1.1, lat: -15.638, lng: -71.601, zoom: 13 },
          { ubigeo: '040509', departamento: 'AREQUIPA', provincia: 'CAYLLOMA', distrito: 'MAJES', region: 'SIERRA', poblacion: 72000, gpc: 0.67, tasaCrecimiento: 2.4, lat: -16.322, lng: -72.215, zoom: 13 }
        ]
      },
      {
        id: '0407',
        nombre: 'ISLAY',
        distritos: [
          { ubigeo: '040701', departamento: 'AREQUIPA', provincia: 'ISLAY', distrito: 'MOLLENDO', region: 'COSTA', poblacion: 28500, gpc: 0.70, tasaCrecimiento: 1.2, lat: -17.023, lng: -72.015, zoom: 13 }
        ]
      }
    ]
  },

  // 5. AYACUCHO
  {
    id: '05',
    nombre: 'AYACUCHO',
    region: 'SIERRA',
    provincias: [
      {
        id: '0501',
        nombre: 'HUAMANGA',
        distritos: [
          { ubigeo: '050101', departamento: 'AYACUCHO', provincia: 'HUAMANGA', distrito: 'AYACUCHO', region: 'SIERRA', poblacion: 110000, gpc: 0.62, tasaCrecimiento: 1.6, lat: -13.158, lng: -74.223, zoom: 13 },
          { ubigeo: '050114', departamento: 'AYACUCHO', provincia: 'HUAMANGA', distrito: 'JESÚS NAZARENO', region: 'SIERRA', poblacion: 22000, gpc: 0.60, tasaCrecimiento: 1.7, lat: -13.148, lng: -74.218, zoom: 13 },
          { ubigeo: '050116', departamento: 'AYACUCHO', provincia: 'HUAMANGA', distrito: 'SAN JUAN BAUTISTA', region: 'SIERRA', poblacion: 52000, gpc: 0.61, tasaCrecimiento: 1.8, lat: -13.175, lng: -74.228, zoom: 13 }
        ]
      },
      {
        id: '0504',
        nombre: 'HUANTA',
        distritos: [
          { ubigeo: '050401', departamento: 'AYACUCHO', provincia: 'HUANTA', distrito: 'HUANTA', region: 'SIERRA', poblacion: 38000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -12.942, lng: -74.248, zoom: 13 }
        ]
      }
    ]
  },

  // 6. CAJAMARCA
  {
    id: '06',
    nombre: 'CAJAMARCA',
    region: 'SIERRA',
    provincias: [
      {
        id: '0601',
        nombre: 'CAJAMARCA',
        distritos: [
          { ubigeo: '060101', departamento: 'CAJAMARCA', provincia: 'CAJAMARCA', distrito: 'CAJAMARCA', region: 'SIERRA', poblacion: 160000, gpc: 0.62, tasaCrecimiento: 1.6, lat: -7.16378, lng: -78.50027, zoom: 13 },
          { ubigeo: '060102', departamento: 'CAJAMARCA', provincia: 'CAJAMARCA', distrito: 'BAÑOS DEL INCA', region: 'SIERRA', poblacion: 45000, gpc: 0.60, tasaCrecimiento: 2.0, lat: -7.162, lng: -78.462, zoom: 13 }
        ]
      },
      {
        id: '0603',
        nombre: 'CELENDÍN',
        distritos: [
          { ubigeo: '060301', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'CELENDÍN', region: 'SIERRA', poblacion: 28500, gpc: 0.58, tasaCrecimiento: 1.2, lat: -6.865400, lng: -78.145566, zoom: 13 },
          { ubigeo: '060302', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'CHUMUCH', region: 'SIERRA', poblacion: 3400, gpc: 0.52, tasaCrecimiento: 1.0, lat: -6.602957, lng: -78.200322, zoom: 13 },
          { ubigeo: '060303', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'CORTEGANA (CHIMUCH)', region: 'SIERRA', poblacion: 8900, gpc: 0.54, tasaCrecimiento: 1.1, lat: -6.513257, lng: -78.328988, zoom: 13 },
          { ubigeo: '060304', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'HUASMÍN', region: 'SIERRA', poblacion: 14200, gpc: 0.55, tasaCrecimiento: 1.3, lat: -6.837606, lng: -78.244986, zoom: 13 },
          { ubigeo: '060305', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'JORGE CHÁVEZ', region: 'SIERRA', poblacion: 1800, gpc: 0.50, tasaCrecimiento: 0.9, lat: -6.940869, lng: -78.094042, zoom: 13 },
          { ubigeo: '060306', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'JOSÉ GÁLVEZ', region: 'SIERRA', poblacion: 4200, gpc: 0.53, tasaCrecimiento: 1.0, lat: -6.925724, lng: -78.132779, zoom: 13 },
          { ubigeo: '060307', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'MIGUEL IGLESIAS', region: 'SIERRA', poblacion: 5100, gpc: 0.51, tasaCrecimiento: 1.1, lat: -6.677418, lng: -78.204183, zoom: 13 },
          { ubigeo: '060308', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'OXAMARCA', region: 'SIERRA', poblacion: 6800, gpc: 0.52, tasaCrecimiento: 1.0, lat: -7.041904, lng: -78.068018, zoom: 13 },
          { ubigeo: '060309', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'SOROCHUCO', region: 'SIERRA', poblacion: 10500, gpc: 0.54, tasaCrecimiento: 1.2, lat: -6.911657, lng: -78.255091, zoom: 13 },
          { ubigeo: '060310', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'SUCRE', region: 'SIERRA', poblacion: 6100, gpc: 0.53, tasaCrecimiento: 1.1, lat: -6.942695, lng: -78.135635, zoom: 13 },
          { ubigeo: '060311', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'UTCO', region: 'SIERRA', poblacion: 1500, gpc: 0.49, tasaCrecimiento: 0.8, lat: -6.896404, lng: -78.063355, zoom: 13 },
          { ubigeo: '060312', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'LA LIBERTAD DE PALLÁN', region: 'SIERRA', poblacion: 7800, gpc: 0.53, tasaCrecimiento: 1.1, lat: -6.723492, lng: -78.282341, zoom: 13 },
          { ubigeo: '060301-CP1', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'CP BELLAVISTA (CELENDÍN)', region: 'SIERRA', poblacion: 2100, gpc: 0.52, tasaCrecimiento: 1.0, lat: -6.8850, lng: -78.1440, zoom: 14 },
          { ubigeo: '060301-CP2', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'CP POYUNTO (CELENDÍN)', region: 'SIERRA', poblacion: 1800, gpc: 0.51, tasaCrecimiento: 1.0, lat: -6.8620, lng: -78.1620, zoom: 14 },
          { ubigeo: '060309-CP1', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'CP YERBA BUENA (SOROCHUCO)', region: 'SIERRA', poblacion: 2400, gpc: 0.52, tasaCrecimiento: 1.1, lat: -6.9905, lng: -78.3734, zoom: 14 },
          { ubigeo: '060304-CP1', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'CP LIMÓN (HUASMÍN)', region: 'SIERRA', poblacion: 1900, gpc: 0.50, tasaCrecimiento: 1.0, lat: -6.8710, lng: -78.0900, zoom: 14 },
          { ubigeo: '060310-CP1', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'CP LUCMAPAMPA (SUCRE)', region: 'SIERRA', poblacion: 1600, gpc: 0.49, tasaCrecimiento: 0.9, lat: -6.9720, lng: -78.1250, zoom: 14 },
          { ubigeo: '060304-CP2', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'CP CRUZCONGA (HUASMÍN)', region: 'SIERRA', poblacion: 2800, gpc: 0.53, tasaCrecimiento: 1.1, lat: -6.8680, lng: -78.2650, zoom: 14 }
        ]
      },
      {
        id: '0608',
        nombre: 'JAÉN',
        distritos: [
          { ubigeo: '060801', departamento: 'CAJAMARCA', provincia: 'JAÉN', distrito: 'JAÉN', region: 'SELVA', poblacion: 95000, gpc: 0.63, tasaCrecimiento: 1.8, lat: -5.708, lng: -78.808, zoom: 13 }
        ]
      }
    ]
  },

  // 7. CALLAO
  {
    id: '07',
    nombre: 'CALLAO',
    region: 'COSTA',
    provincias: [
      {
        id: '0701',
        nombre: 'CALLAO',
        distritos: [
          { ubigeo: '070101', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'CALLAO CERCADO', region: 'COSTA', poblacion: 415000, gpc: 0.80, tasaCrecimiento: 1.3, lat: -12.056, lng: -77.118, zoom: 13 },
          { ubigeo: '070106', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'VENTANILLA', region: 'COSTA', poblacion: 380000, gpc: 0.74, tasaCrecimiento: 2.3, lat: -11.878, lng: -77.125, zoom: 13 },
          { ubigeo: '070107', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'MI PERÚ', region: 'COSTA', poblacion: 54000, gpc: 0.70, tasaCrecimiento: 2.1, lat: -11.855, lng: -77.115, zoom: 13 }
        ]
      }
    ]
  },

  // 8. CUSCO
  {
    id: '08',
    nombre: 'CUSCO',
    region: 'SIERRA',
    provincias: [
      {
        id: '0801',
        nombre: 'CUSCO',
        distritos: [
          { ubigeo: '080101', departamento: 'CUSCO', provincia: 'CUSCO', distrito: 'CUSCO', region: 'SIERRA', poblacion: 120000, gpc: 0.68, tasaCrecimiento: 1.6, lat: -13.53195, lng: -71.96746, zoom: 13 },
          { ubigeo: '080108', departamento: 'CUSCO', provincia: 'CUSCO', distrito: 'SAN JERÓNIMO', region: 'SIERRA', poblacion: 52000, gpc: 0.65, tasaCrecimiento: 1.7, lat: -13.5485, lng: -71.895, zoom: 13 },
          { ubigeo: '080106', departamento: 'CUSCO', provincia: 'CUSCO', distrito: 'SAN SEBASTIÁN', region: 'SIERRA', poblacion: 115000, gpc: 0.66, tasaCrecimiento: 1.8, lat: -13.528, lng: -71.925, zoom: 13 },
          { ubigeo: '080105', departamento: 'CUSCO', provincia: 'CUSCO', distrito: 'SANTIAGO', region: 'SIERRA', poblacion: 95000, gpc: 0.64, tasaCrecimiento: 1.5, lat: -13.538, lng: -71.985, zoom: 13 },
          { ubigeo: '080109', departamento: 'CUSCO', provincia: 'CUSCO', distrito: 'WANCHAQ', region: 'SIERRA', poblacion: 65000, gpc: 0.70, tasaCrecimiento: 1.4, lat: -13.523, lng: -71.962, zoom: 14 }
        ]
      },
      {
        id: '0809',
        nombre: 'LA CONVENCIÓN',
        distritos: [
          { ubigeo: '080901', departamento: 'CUSCO', provincia: 'LA CONVENCIÓN', distrito: 'SANTA ANA / QUILLABAMBA', region: 'SELVA', poblacion: 38000, gpc: 0.65, tasaCrecimiento: 1.5, lat: -12.865, lng: -72.695, zoom: 13 },
          { ubigeo: '080907', departamento: 'CUSCO', provincia: 'LA CONVENCIÓN', distrito: 'PICHARI', region: 'SELVA', poblacion: 24000, gpc: 0.62, tasaCrecimiento: 2.1, lat: -12.525, lng: -73.832, zoom: 13 }
        ]
      },
      {
        id: '0812',
        nombre: 'QUISPICANCHI',
        distritos: [
          { ubigeo: '081201', departamento: 'CUSCO', provincia: 'QUISPICANCHI', distrito: 'URCOS', region: 'SIERRA', poblacion: 18000, gpc: 0.58, tasaCrecimiento: 1.2, lat: -13.688, lng: -71.622, zoom: 13 },
          { ubigeo: '081208', departamento: 'CUSCO', provincia: 'QUISPICANCHI', distrito: 'OROPESA', region: 'SIERRA', poblacion: 12500, gpc: 0.60, tasaCrecimiento: 1.3, lat: -13.565, lng: -71.775, zoom: 13 }
        ]
      },
      {
        id: '0813',
        nombre: 'URUBAMBA',
        distritos: [
          { ubigeo: '081301', departamento: 'CUSCO', provincia: 'URUBAMBA', distrito: 'URUBAMBA', region: 'SIERRA', poblacion: 24000, gpc: 0.65, tasaCrecimiento: 1.8, lat: -13.305, lng: -72.115, zoom: 13 },
          { ubigeo: '081306', departamento: 'CUSCO', provincia: 'URUBAMBA', distrito: 'OLLANTAYTAMBO', region: 'SIERRA', poblacion: 14500, gpc: 0.62, tasaCrecimiento: 1.9, lat: -13.258, lng: -72.263, zoom: 13 },
          { ubigeo: '081304', departamento: 'CUSCO', provincia: 'URUBAMBA', distrito: 'MACHUPICCHU', region: 'SIERRA', poblacion: 7800, gpc: 0.85, tasaCrecimiento: 2.1, lat: -13.155, lng: -72.525, zoom: 13 }
        ]
      }
    ]
  },

  // 9. HUANCAVELICA
  {
    id: '09',
    nombre: 'HUANCAVELICA',
    region: 'SIERRA',
    provincias: [
      {
        id: '0901',
        nombre: 'HUANCAVELICA',
        distritos: [
          { ubigeo: '090101', departamento: 'HUANCAVELICA', provincia: 'HUANCAVELICA', distrito: 'HUANCAVELICA', region: 'SIERRA', poblacion: 48000, gpc: 0.58, tasaCrecimiento: 1.3, lat: -12.787, lng: -74.972, zoom: 13 },
          { ubigeo: '090102', departamento: 'HUANCAVELICA', provincia: 'HUANCAVELICA', distrito: 'ACOBAMBILLA', region: 'SIERRA', poblacion: 3500, gpc: 0.52, tasaCrecimiento: 1.0, lat: -12.658, lng: -75.325, zoom: 13 }
        ]
      },
      {
        id: '0907',
        nombre: 'TAYACAJA',
        distritos: [
          { ubigeo: '090701', departamento: 'HUANCAVELICA', provincia: 'TAYACAJA', distrito: 'PAMPAS', region: 'SIERRA', poblacion: 14500, gpc: 0.56, tasaCrecimiento: 1.2, lat: -12.398, lng: -74.862, zoom: 13 }
        ]
      }
    ]
  },

  // 10. HUÁNUCO
  {
    id: '10',
    nombre: 'HUÁNUCO',
    region: 'SIERRA',
    provincias: [
      {
        id: '1001',
        nombre: 'HUÁNUCO',
        distritos: [
          { ubigeo: '100101', departamento: 'HUÁNUCO', provincia: 'HUÁNUCO', distrito: 'HUÁNUCO', region: 'SIERRA', poblacion: 95000, gpc: 0.63, tasaCrecimiento: 1.6, lat: -9.930, lng: -76.242, zoom: 13 },
          { ubigeo: '100102', departamento: 'HUÁNUCO', provincia: 'HUÁNUCO', distrito: 'AMARILIS', region: 'SIERRA', poblacion: 82000, gpc: 0.62, tasaCrecimiento: 1.8, lat: -9.948, lng: -76.232, zoom: 13 },
          { ubigeo: '100111', departamento: 'HUÁNUCO', provincia: 'HUÁNUCO', distrito: 'PILLCO MARCA', region: 'SIERRA', poblacion: 38000, gpc: 0.60, tasaCrecimiento: 2.1, lat: -9.968, lng: -76.248, zoom: 13 }
        ]
      },
      {
        id: '1006',
        nombre: 'LEONCIO PRADO',
        distritos: [
          { ubigeo: '100601', departamento: 'HUÁNUCO', provincia: 'LEONCIO PRADO', distrito: 'RUPA-RUPA / TINGO MARÍA', region: 'SELVA', poblacion: 65000, gpc: 0.64, tasaCrecimiento: 1.7, lat: -9.298, lng: -76.002, zoom: 13 }
        ]
      }
    ]
  },

  // 11. ICA
  {
    id: '11',
    nombre: 'ICA',
    region: 'COSTA',
    provincias: [
      {
        id: '1101',
        nombre: 'ICA',
        distritos: [
          { ubigeo: '110101', departamento: 'ICA', provincia: 'ICA', distrito: 'ICA', region: 'COSTA', poblacion: 165000, gpc: 0.74, tasaCrecimiento: 1.7, lat: -14.067, lng: -75.728, zoom: 13 },
          { ubigeo: '110108', departamento: 'ICA', provincia: 'ICA', distrito: 'SUBTANJALLA', region: 'COSTA', poblacion: 32000, gpc: 0.70, tasaCrecimiento: 2.2, lat: -14.022, lng: -75.758, zoom: 13 }
        ]
      },
      {
        id: '1102',
        nombre: 'CHINCHA',
        distritos: [
          { ubigeo: '110201', departamento: 'ICA', provincia: 'CHINCHA', distrito: 'CHINCHA ALTA', region: 'COSTA', poblacion: 72000, gpc: 0.72, tasaCrecimiento: 1.5, lat: -13.418, lng: -76.132, zoom: 13 }
        ]
      },
      {
        id: '1103',
        nombre: 'NASCA',
        distritos: [
          { ubigeo: '110301', departamento: 'ICA', provincia: 'NASCA', distrito: 'NASCA', region: 'COSTA', poblacion: 28000, gpc: 0.70, tasaCrecimiento: 1.4, lat: -14.831, lng: -74.938, zoom: 13 }
        ]
      },
      {
        id: '1105',
        nombre: 'PISCO',
        distritos: [
          { ubigeo: '110501', departamento: 'ICA', provincia: 'PISCO', distrito: 'PISCO', region: 'COSTA', poblacion: 68000, gpc: 0.73, tasaCrecimiento: 1.6, lat: -13.710, lng: -76.205, zoom: 13 },
          { ubigeo: '110506', departamento: 'ICA', provincia: 'PISCO', distrito: 'PARACAS', region: 'COSTA', poblacion: 9500, gpc: 0.78, tasaCrecimiento: 2.5, lat: -13.835, lng: -76.252, zoom: 13 }
        ]
      }
    ]
  },

  // 12. JUNÍN
  {
    id: '12',
    nombre: 'JUNÍN',
    region: 'SIERRA',
    provincias: [
      {
        id: '1201',
        nombre: 'HUANCAYO',
        distritos: [
          { ubigeo: '120101', departamento: 'JUNÍN', provincia: 'HUANCAYO', distrito: 'HUANCAYO', region: 'SIERRA', poblacion: 125000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -12.06513, lng: -75.20486, zoom: 13 },
          { ubigeo: '120114', departamento: 'JUNÍN', provincia: 'HUANCAYO', distrito: 'EL TAMBO', region: 'SIERRA', poblacion: 165000, gpc: 0.66, tasaCrecimiento: 1.6, lat: -12.052, lng: -75.218, zoom: 13 },
          { ubigeo: '120107', departamento: 'JUNÍN', provincia: 'HUANCAYO', distrito: 'CHILCA', region: 'SIERRA', poblacion: 92000, gpc: 0.62, tasaCrecimiento: 1.5, lat: -12.082, lng: -75.195, zoom: 13 }
        ]
      },
      {
        id: '1203',
        nombre: 'CHANCHAMAYO',
        distritos: [
          { ubigeo: '120301', departamento: 'JUNÍN', provincia: 'CHANCHAMAYO', distrito: 'LA MERCED', region: 'SELVA', poblacion: 32000, gpc: 0.64, tasaCrecimiento: 1.7, lat: -11.055, lng: -75.333, zoom: 13 },
          { ubigeo: '120302', departamento: 'JUNÍN', provincia: 'CHANCHAMAYO', distrito: 'PICHANAQUI', region: 'SELVA', poblacion: 48000, gpc: 0.62, tasaCrecimiento: 2.1, lat: -10.925, lng: -74.865, zoom: 13 }
        ]
      },
      {
        id: '1204',
        nombre: 'JAUJA',
        distritos: [
          { ubigeo: '120401', departamento: 'JUNÍN', provincia: 'JAUJA', distrito: 'JAUJA', region: 'SIERRA', poblacion: 24000, gpc: 0.60, tasaCrecimiento: 1.1, lat: -11.775, lng: -75.498, zoom: 13 }
        ]
      },
      {
        id: '1206',
        nombre: 'SATIPO',
        distritos: [
          { ubigeo: '120601', departamento: 'JUNÍN', provincia: 'SATIPO', distrito: 'SATIPO', region: 'SELVA', poblacion: 42000, gpc: 0.63, tasaCrecimiento: 2.0, lat: -11.252, lng: -74.638, zoom: 13 }
        ]
      },
      {
        id: '1209',
        nombre: 'CHUPACA',
        distritos: [
          { ubigeo: '120901', departamento: 'JUNÍN', provincia: 'CHUPACA', distrito: 'CHUPACA', region: 'SIERRA', poblacion: 22000, gpc: 0.58, tasaCrecimiento: 1.2, lat: -12.063, lng: -75.285, zoom: 13 }
        ]
      }
    ]
  },

  // 13. LA LIBERTAD
  {
    id: '13',
    nombre: 'LA LIBERTAD',
    region: 'COSTA',
    provincias: [
      {
        id: '1301',
        nombre: 'TRUJILLO',
        distritos: [
          { ubigeo: '130101', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'TRUJILLO', region: 'COSTA', poblacion: 315000, gpc: 0.75, tasaCrecimiento: 1.6, lat: -8.11599, lng: -79.02998, zoom: 13 },
          { ubigeo: '130102', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'EL PORVENIR', region: 'COSTA', poblacion: 195000, gpc: 0.70, tasaCrecimiento: 1.9, lat: -8.082, lng: -78.995, zoom: 13 },
          { ubigeo: '130103', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'FLORENCIA DE MORA', region: 'COSTA', poblacion: 45000, gpc: 0.68, tasaCrecimiento: 1.3, lat: -8.088, lng: -79.015, zoom: 13 },
          { ubigeo: '130104', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'HUANCHACO', region: 'COSTA', poblacion: 68000, gpc: 0.74, tasaCrecimiento: 2.4, lat: -8.078, lng: -79.118, zoom: 13 },
          { ubigeo: '130105', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'LA ESPERANZA', region: 'COSTA', poblacion: 185000, gpc: 0.71, tasaCrecimiento: 1.7, lat: -8.065, lng: -79.045, zoom: 13 }
        ]
      },
      {
        id: '1312',
        nombre: 'VIRÚ',
        distritos: [
          { ubigeo: '131201', departamento: 'LA LIBERTAD', provincia: 'VIRÚ', distrito: 'VIRÚ', region: 'COSTA', poblacion: 58000, gpc: 0.72, tasaCrecimiento: 2.2, lat: -8.415, lng: -78.752, zoom: 13 },
          { ubigeo: '131202', departamento: 'LA LIBERTAD', provincia: 'VIRÚ', distrito: 'CHAO', region: 'COSTA', poblacion: 35000, gpc: 0.70, tasaCrecimiento: 2.6, lat: -8.542, lng: -78.680, zoom: 13 }
        ]
      }
    ]
  },

  // 14. LAMBAYEQUE
  {
    id: '14',
    nombre: 'LAMBAYEQUE',
    region: 'COSTA',
    provincias: [
      {
        id: '1401',
        nombre: 'CHICLAYO',
        distritos: [
          { ubigeo: '140101', departamento: 'LAMBAYEQUE', provincia: 'CHICLAYO', distrito: 'CHICLAYO', region: 'COSTA', poblacion: 290000, gpc: 0.73, tasaCrecimiento: 1.5, lat: -6.77137, lng: -79.84088, zoom: 13 },
          { ubigeo: '140105', departamento: 'LAMBAYEQUE', provincia: 'CHICLAYO', distrito: 'JOSÉ LEONARDO ORTIZ', region: 'COSTA', poblacion: 165000, gpc: 0.70, tasaCrecimiento: 1.7, lat: -6.755, lng: -79.848, zoom: 13 },
          { ubigeo: '140112', departamento: 'LAMBAYEQUE', provincia: 'CHICLAYO', distrito: 'VICTOR LARCO / PIMENTEL', region: 'COSTA', poblacion: 48000, gpc: 0.75, tasaCrecimiento: 2.2, lat: -6.838, lng: -79.932, zoom: 13 }
        ]
      },
      {
        id: '1403',
        nombre: 'LAMBAYEQUE',
        distritos: [
          { ubigeo: '140301', departamento: 'LAMBAYEQUE', provincia: 'LAMBAYEQUE', distrito: 'LAMBAYEQUE', region: 'COSTA', poblacion: 78000, gpc: 0.71, tasaCrecimiento: 1.6, lat: -6.702, lng: -79.905, zoom: 13 }
        ]
      }
    ]
  },

  // 15. LIMA
  {
    id: '15',
    nombre: 'LIMA',
    region: 'COSTA',
    provincias: [
      {
        id: '1501',
        nombre: 'LIMA',
        distritos: [
          { ubigeo: '150101', departamento: 'LIMA', provincia: 'LIMA', distrito: 'LIMA CERCADO', region: 'COSTA', poblacion: 268800, gpc: 0.82, tasaCrecimiento: 1.2, lat: -12.046374, lng: -77.042793, zoom: 13 },
          { ubigeo: '150119', departamento: 'LIMA', provincia: 'LIMA', distrito: 'LURÍN', region: 'COSTA', poblacion: 112000, gpc: 0.78, tasaCrecimiento: 2.1, lat: -12.275, lng: -76.868, zoom: 13 },
          { ubigeo: '150132', departamento: 'LIMA', provincia: 'LIMA', distrito: 'SAN JUAN DE LURIGANCHO', region: 'COSTA', poblacion: 1115000, gpc: 0.75, tasaCrecimiento: 1.8, lat: -11.975, lng: -76.995, zoom: 12 },
          { ubigeo: '150103', departamento: 'LIMA', provincia: 'LIMA', distrito: 'ATE', region: 'COSTA', poblacion: 670000, gpc: 0.76, tasaCrecimiento: 1.9, lat: -12.025, lng: -76.915, zoom: 13 },
          { ubigeo: '150108', departamento: 'LIMA', provincia: 'LIMA', distrito: 'CARABAYLLO', region: 'COSTA', poblacion: 390000, gpc: 0.72, tasaCrecimiento: 2.3, lat: -11.855, lng: -77.035, zoom: 12 }
        ]
      },
      {
        id: '1502',
        nombre: 'BARRANCA',
        distritos: [
          { ubigeo: '150201', departamento: 'LIMA', provincia: 'BARRANCA', distrito: 'BARRANCA', region: 'COSTA', poblacion: 68000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -10.752, lng: -77.762, zoom: 13 },
          { ubigeo: '150205', departamento: 'LIMA', provincia: 'BARRANCA', distrito: 'SUPE / CARAL', region: 'COSTA', poblacion: 28000, gpc: 0.68, tasaCrecimiento: 1.3, lat: -10.798, lng: -77.712, zoom: 13 }
        ]
      },
      {
        id: '1505',
        nombre: 'CAÑETE',
        distritos: [
          { ubigeo: '150501', departamento: 'LIMA', provincia: 'CAÑETE', distrito: 'SAN VICENTE DE CAÑETE', region: 'COSTA', poblacion: 58000, gpc: 0.70, tasaCrecimiento: 1.5, lat: -13.076, lng: -76.386, zoom: 13 },
          { ubigeo: '150504', departamento: 'LIMA', provincia: 'CAÑETE', distrito: 'CHILCA', region: 'COSTA', poblacion: 24000, gpc: 0.74, tasaCrecimiento: 2.0, lat: -12.521, lng: -76.738, zoom: 13 }
        ]
      },
      {
        id: '1506',
        nombre: 'HUARAL',
        distritos: [
          { ubigeo: '150601', departamento: 'LIMA', provincia: 'HUARAL', distrito: 'HUARAL', region: 'COSTA', poblacion: 98000, gpc: 0.72, tasaCrecimiento: 1.6, lat: -11.495, lng: -77.208, zoom: 13 },
          { ubigeo: '150605', departamento: 'LIMA', provincia: 'HUARAL', distrito: 'CHANCAY', region: 'COSTA', poblacion: 65000, gpc: 0.75, tasaCrecimiento: 2.5, lat: -11.562, lng: -77.271, zoom: 13 }
        ]
      },
      {
        id: '1508',
        nombre: 'HUAURA',
        distritos: [
          { ubigeo: '150801', departamento: 'LIMA', provincia: 'HUAURA', distrito: 'HUACHO', region: 'COSTA', poblacion: 65000, gpc: 0.74, tasaCrecimiento: 1.5, lat: -11.106, lng: -77.605, zoom: 13 }
        ]
      }
    ]
  },

  // 16. LORETO
  {
    id: '16',
    nombre: 'LORETO',
    region: 'SELVA',
    provincias: [
      {
        id: '1601',
        nombre: 'MAYNAS',
        distritos: [
          { ubigeo: '160101', departamento: 'LORETO', provincia: 'MAYNAS', distrito: 'IQUITOS', region: 'SELVA', poblacion: 160000, gpc: 0.66, tasaCrecimiento: 1.7, lat: -3.74912, lng: -73.25383, zoom: 13 },
          { ubigeo: '160108', departamento: 'LORETO', provincia: 'MAYNAS', distrito: 'PUNCHANA', region: 'SELVA', poblacion: 90000, gpc: 0.64, tasaCrecimiento: 1.8, lat: -3.722, lng: -73.245, zoom: 13 },
          { ubigeo: '160112', departamento: 'LORETO', provincia: 'MAYNAS', distrito: 'BELÉN', region: 'SELVA', poblacion: 75000, gpc: 0.62, tasaCrecimiento: 1.6, lat: -3.768, lng: -73.258, zoom: 13 },
          { ubigeo: '160113', departamento: 'LORETO', provincia: 'MAYNAS', distrito: 'SAN JUAN BAUTISTA', region: 'SELVA', poblacion: 140000, gpc: 0.65, tasaCrecimiento: 2.1, lat: -3.815, lng: -73.285, zoom: 13 }
        ]
      },
      {
        id: '1602',
        nombre: 'ALTO AMAZONAS',
        distritos: [
          { ubigeo: '160201', departamento: 'LORETO', provincia: 'ALTO AMAZONAS', distrito: 'YURIMAGUAS', region: 'SELVA', poblacion: 68000, gpc: 0.63, tasaCrecimiento: 1.9, lat: -5.895, lng: -76.108, zoom: 13 }
        ]
      }
    ]
  },

  // 17. MADRE DE DIOS
  {
    id: '17',
    nombre: 'MADRE DE DIOS',
    region: 'SELVA',
    provincias: [
      {
        id: '1701',
        nombre: 'TAMBOPATA',
        distritos: [
          { ubigeo: '170101', departamento: 'MADRE DE DIOS', provincia: 'TAMBOPATA', distrito: 'PUERTO MALDONADO', region: 'SELVA', poblacion: 85000, gpc: 0.68, tasaCrecimiento: 2.4, lat: -12.593, lng: -69.189, zoom: 13 },
          { ubigeo: '170102', departamento: 'MADRE DE DIOS', provincia: 'TAMBOPATA', distrito: 'INAMBARI / MAZUKO', region: 'SELVA', poblacion: 14500, gpc: 0.65, tasaCrecimiento: 2.8, lat: -13.085, lng: -70.362, zoom: 13 }
        ]
      }
    ]
  },

  // 18. MOQUEGUA
  {
    id: '18',
    nombre: 'MOQUEGUA',
    region: 'COSTA',
    provincias: [
      {
        id: '1801',
        nombre: 'MARISCAL NIETO',
        distritos: [
          { ubigeo: '180101', departamento: 'MOQUEGUA', provincia: 'MARISCAL NIETO', distrito: 'MOQUEGUA', region: 'COSTA', poblacion: 65000, gpc: 0.72, tasaCrecimiento: 1.6, lat: -17.195, lng: -70.935, zoom: 13 },
          { ubigeo: '180106', departamento: 'MOQUEGUA', provincia: 'MARISCAL NIETO', distrito: 'TORATA', region: 'SIERRA', poblacion: 7800, gpc: 0.68, tasaCrecimiento: 1.2, lat: -17.078, lng: -70.842, zoom: 13 }
        ]
      },
      {
        id: '1803',
        nombre: 'ILO',
        distritos: [
          { ubigeo: '180301', departamento: 'MOQUEGUA', provincia: 'ILO', distrito: 'ILO', region: 'COSTA', poblacion: 72000, gpc: 0.75, tasaCrecimiento: 1.5, lat: -17.639, lng: -71.338, zoom: 13 }
        ]
      }
    ]
  },

  // 19. PASCO
  {
    id: '19',
    nombre: 'PASCO',
    region: 'SIERRA',
    provincias: [
      {
        id: '1901',
        nombre: 'PASCO',
        distritos: [
          { ubigeo: '190101', departamento: 'PASCO', provincia: 'PASCO', distrito: 'CHAUPIMARCA / CERRO DE PASCO', region: 'SIERRA', poblacion: 68000, gpc: 0.60, tasaCrecimiento: 1.1, lat: -10.683, lng: -76.256, zoom: 13 },
          { ubigeo: '190113', departamento: 'PASCO', provincia: 'PASCO', distrito: 'YANACANCHA', region: 'SIERRA', poblacion: 28000, gpc: 0.62, tasaCrecimiento: 1.3, lat: -10.662, lng: -76.248, zoom: 13 }
        ]
      },
      {
        id: '1903',
        nombre: 'OXAPAMPA',
        distritos: [
          { ubigeo: '190301', departamento: 'PASCO', provincia: 'OXAPAMPA', distrito: 'OXAPAMPA', region: 'SELVA', poblacion: 18500, gpc: 0.62, tasaCrecimiento: 1.5, lat: -10.578, lng: -75.402, zoom: 13 }
        ]
      }
    ]
  },

  // 20. PIURA
  {
    id: '20',
    nombre: 'PIURA',
    region: 'COSTA',
    provincias: [
      {
        id: '2001',
        nombre: 'PIURA',
        distritos: [
          { ubigeo: '200101', departamento: 'PIURA', provincia: 'PIURA', distrito: 'PIURA', region: 'COSTA', poblacion: 175000, gpc: 0.70, tasaCrecimiento: 1.8, lat: -5.19449, lng: -80.63282, zoom: 13 },
          { ubigeo: '200104', departamento: 'PIURA', provincia: 'PIURA', distrito: 'CASTILLA', region: 'COSTA', poblacion: 160000, gpc: 0.68, tasaCrecimiento: 1.9, lat: -5.198, lng: -80.612, zoom: 13 },
          { ubigeo: '200115', departamento: 'PIURA', provincia: 'PIURA', distrito: 'VEINTISÉIS DE OCTUBRE', region: 'COSTA', poblacion: 150000, gpc: 0.67, tasaCrecimiento: 2.2, lat: -5.182, lng: -80.655, zoom: 13 },
          { ubigeo: '200107', departamento: 'PIURA', provincia: 'PIURA', distrito: 'CATACAOS', region: 'COSTA', poblacion: 78000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -5.267, lng: -80.648, zoom: 13 }
        ]
      },
      {
        id: '2005',
        nombre: 'PAITA',
        distritos: [
          { ubigeo: '200501', departamento: 'PIURA', provincia: 'PAITA', distrito: 'PAITA', region: 'COSTA', poblacion: 92000, gpc: 0.72, tasaCrecimiento: 1.7, lat: -5.089, lng: -81.114, zoom: 13 }
        ]
      },
      {
        id: '2006',
        nombre: 'SULLANA',
        distritos: [
          { ubigeo: '200601', departamento: 'PIURA', provincia: 'SULLANA', distrito: 'SULLANA', region: 'COSTA', poblacion: 162000, gpc: 0.69, tasaCrecimiento: 1.6, lat: -4.893, lng: -80.685, zoom: 13 },
          { ubigeo: '200602', departamento: 'PIURA', provincia: 'SULLANA', distrito: 'BELLAVISTA', region: 'COSTA', poblacion: 38000, gpc: 0.66, tasaCrecimiento: 1.5, lat: -4.888, lng: -80.672, zoom: 13 }
        ]
      },
      {
        id: '2007',
        nombre: 'TALARA',
        distritos: [
          { ubigeo: '200701', departamento: 'PIURA', provincia: 'TALARA', distrito: 'PARIÑAS / TALARA', region: 'COSTA', poblacion: 88000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -4.578, lng: -81.272, zoom: 13 }
        ]
      }
    ]
  },

  // 21. PUNO
  {
    id: '21',
    nombre: 'PUNO',
    region: 'SIERRA',
    provincias: [
      {
        id: '2101',
        nombre: 'PUNO',
        distritos: [
          { ubigeo: '210101', departamento: 'PUNO', provincia: 'PUNO', distrito: 'PUNO', region: 'SIERRA', poblacion: 135000, gpc: 0.58, tasaCrecimiento: 1.3, lat: -15.84022, lng: -70.02188, zoom: 13 }
        ]
      },
      {
        id: '2111',
        nombre: 'SAN ROMÁN',
        distritos: [
          { ubigeo: '211101', departamento: 'PUNO', provincia: 'SAN ROMÁN', distrito: 'JULIACA', region: 'SIERRA', poblacion: 280000, gpc: 0.64, tasaCrecimiento: 2.2, lat: -15.495, lng: -70.133, zoom: 13 }
        ]
      }
    ]
  },

  // 22. SAN MARTÍN
  {
    id: '22',
    nombre: 'SAN MARTÍN',
    region: 'SELVA',
    provincias: [
      {
        id: '2201',
        nombre: 'MOYOBAMBA',
        distritos: [
          { ubigeo: '220101', departamento: 'SAN MARTÍN', provincia: 'MOYOBAMBA', distrito: 'MOYOBAMBA', region: 'SELVA', poblacion: 85000, gpc: 0.60, tasaCrecimiento: 1.8, lat: -6.03417, lng: -76.97111, zoom: 13 }
        ]
      },
      {
        id: '2209',
        nombre: 'SAN MARTÍN',
        distritos: [
          { ubigeo: '220901', departamento: 'SAN MARTÍN', provincia: 'SAN MARTÍN', distrito: 'TARAPOTO', region: 'SELVA', poblacion: 145000, gpc: 0.66, tasaCrecimiento: 2.1, lat: -6.488, lng: -76.365, zoom: 13 },
          { ubigeo: '220909', departamento: 'SAN MARTÍN', provincia: 'SAN MARTÍN', distrito: 'MORALES', region: 'SELVA', poblacion: 32000, gpc: 0.64, tasaCrecimiento: 2.0, lat: -6.475, lng: -76.382, zoom: 13 }
        ]
      }
    ]
  },

  // 23. TACNA
  {
    id: '23',
    nombre: 'TACNA',
    region: 'COSTA',
    provincias: [
      {
        id: '2301',
        nombre: 'TACNA',
        distritos: [
          { ubigeo: '230101', departamento: 'TACNA', provincia: 'TACNA', distrito: 'TACNA', region: 'COSTA', poblacion: 105000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -18.01465, lng: -70.25256, zoom: 13 },
          { ubigeo: '230110', departamento: 'TACNA', provincia: 'TACNA', distrito: 'CORONEL GREGORIO ALBARRACÍN', region: 'COSTA', poblacion: 130000, gpc: 0.66, tasaCrecimiento: 2.2, lat: -18.045, lng: -70.248, zoom: 13 },
          { ubigeo: '230102', departamento: 'TACNA', provincia: 'TACNA', distrito: 'ALTO DE LA ALIANZA', region: 'COSTA', poblacion: 42000, gpc: 0.65, tasaCrecimiento: 1.3, lat: -17.995, lng: -70.255, zoom: 13 }
        ]
      }
    ]
  },

  // 24. TUMBES
  {
    id: '24',
    nombre: 'TUMBES',
    region: 'COSTA',
    provincias: [
      {
        id: '2401',
        nombre: 'TUMBES',
        distritos: [
          { ubigeo: '240101', departamento: 'TUMBES', provincia: 'TUMBES', distrito: 'TUMBES', region: 'COSTA', poblacion: 112000, gpc: 0.70, tasaCrecimiento: 1.6, lat: -3.567, lng: -80.451, zoom: 13 }
        ]
      },
      {
        id: '2403',
        nombre: 'ZARUMILLA',
        distritos: [
          { ubigeo: '240301', departamento: 'TUMBES', provincia: 'ZARUMILLA', distrito: 'ZARUMILLA', region: 'COSTA', poblacion: 24000, gpc: 0.68, tasaCrecimiento: 1.7, lat: -3.502, lng: -80.275, zoom: 13 }
        ]
      }
    ]
  },

  // 25. UCAYALI
  {
    id: '25',
    nombre: 'UCAYALI',
    region: 'SELVA',
    provincias: [
      {
        id: '2501',
        nombre: 'CORONEL PORTILLO',
        distritos: [
          { ubigeo: '250101', departamento: 'UCAYALI', provincia: 'CORONEL PORTILLO', distrito: 'CALLERÍA / PUCALLPA', region: 'SELVA', poblacion: 150000, gpc: 0.64, tasaCrecimiento: 2.0, lat: -8.37915, lng: -74.55387, zoom: 13 },
          { ubigeo: '250107', departamento: 'UCAYALI', provincia: 'CORONEL PORTILLO', distrito: 'MANANTAY', region: 'SELVA', poblacion: 95000, gpc: 0.62, tasaCrecimiento: 2.3, lat: -8.412, lng: -74.538, zoom: 13 },
          { ubigeo: '250105', departamento: 'UCAYALI', provincia: 'CORONEL PORTILLO', distrito: 'YARINACOCHA', region: 'SELVA', poblacion: 105000, gpc: 0.65, tasaCrecimiento: 2.1, lat: -8.345, lng: -74.572, zoom: 13 }
        ]
      },
      {
        id: '2503',
        nombre: 'PADRE ABAD',
        distritos: [
          { ubigeo: '250301', departamento: 'UCAYALI', provincia: 'PADRE ABAD', distrito: 'AGUAYTÍA', region: 'SELVA', poblacion: 28000, gpc: 0.62, tasaCrecimiento: 2.2, lat: -9.038, lng: -75.508, zoom: 13 }
        ]
      }
    ]
  }
];

export function getAllDistricts(): Jurisdiction[] {
  const districts: Jurisdiction[] = [];
  PERU_DEPARTMENTS.forEach(dep => {
    dep.provincias.forEach(prov => {
      districts.push(...prov.distritos);
    });
  });
  return districts;
}

export const PERU_JURISDICTIONS: Jurisdiction[] = getAllDistricts();
