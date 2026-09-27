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
  {
    id: '01',
    nombre: 'AMAZONAS',
    region: 'SELVA',
    provincias: [
      {
        id: '0101',
        nombre: 'CHACHAPOYAS',
        distritos: [
          { ubigeo: '010101', departamento: 'AMAZONAS', provincia: 'CHACHAPOYAS', distrito: 'CHACHAPOYAS', region: 'SELVA', poblacion: 35000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -6.2317, lng: -77.869, zoom: 13 },
          { ubigeo: '010102', departamento: 'AMAZONAS', provincia: 'CHACHAPOYAS', distrito: 'ASUNCIÓN', region: 'SELVA', poblacion: 3200, gpc: 0.52, tasaCrecimiento: 1.4, lat: -6.0319, lng: -77.7128, zoom: 13 },
          { ubigeo: '010103', departamento: 'AMAZONAS', provincia: 'CHACHAPOYAS', distrito: 'BALSAS', region: 'SELVA', poblacion: 1800, gpc: 0.5, tasaCrecimiento: 1.4, lat: -6.8356, lng: -78.0189, zoom: 13 },
          { ubigeo: '010108', departamento: 'AMAZONAS', provincia: 'CHACHAPOYAS', distrito: 'HUANCAS', region: 'SELVA', poblacion: 1400, gpc: 0.5, tasaCrecimiento: 1.4, lat: -6.1739, lng: -77.8631, zoom: 13 },
          { ubigeo: '010111', departamento: 'AMAZONAS', provincia: 'CHACHAPOYAS', distrito: 'LEIMEBAMBA', region: 'SELVA', poblacion: 4200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -6.7022, lng: -77.8042, zoom: 13 },
        ]
      },
      {
        id: '0102',
        nombre: 'BAGUA',
        distritos: [
          { ubigeo: '010201', departamento: 'AMAZONAS', provincia: 'BAGUA', distrito: 'BAGUA', region: 'SELVA', poblacion: 32000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -5.6397, lng: -78.5311, zoom: 13 },
          { ubigeo: '010202', departamento: 'AMAZONAS', provincia: 'BAGUA', distrito: 'ARAMANGO', region: 'SELVA', poblacion: 12500, gpc: 0.56, tasaCrecimiento: 1.4, lat: -5.4189, lng: -78.4358, zoom: 13 },
          { ubigeo: '010205', departamento: 'AMAZONAS', provincia: 'BAGUA', distrito: 'IMAZA', region: 'SELVA', poblacion: 25000, gpc: 0.53, tasaCrecimiento: 1.4, lat: -5.1583, lng: -78.3094, zoom: 13 },
          { ubigeo: '010206', departamento: 'AMAZONAS', provincia: 'BAGUA', distrito: 'LA PECA', region: 'SELVA', poblacion: 8200, gpc: 0.58, tasaCrecimiento: 1.4, lat: -5.6111, lng: -78.435, zoom: 13 },
        ]
      },
      {
        id: '0103',
        nombre: 'BONGARÁ',
        distritos: [
          { ubigeo: '010301', departamento: 'AMAZONAS', provincia: 'BONGARÁ', distrito: 'JUMBILLA', region: 'SELVA', poblacion: 2100, gpc: 0.52, tasaCrecimiento: 1.4, lat: -5.9039, lng: -77.7972, zoom: 13 },
          { ubigeo: '010306', departamento: 'AMAZONAS', provincia: 'BONGARÁ', distrito: 'FLORIDA (POMACOCHAS)', region: 'SELVA', poblacion: 6800, gpc: 0.56, tasaCrecimiento: 1.4, lat: -5.8239, lng: -77.9733, zoom: 13 },
          { ubigeo: '010308', departamento: 'AMAZONAS', provincia: 'BONGARÁ', distrito: 'RECTA', region: 'SELVA', poblacion: 1100, gpc: 0.48, tasaCrecimiento: 1.4, lat: -5.9983, lng: -77.7967, zoom: 13 },
        ]
      },
      {
        id: '0104',
        nombre: 'CONDORCANQUI',
        distritos: [
          { ubigeo: '010401', departamento: 'AMAZONAS', provincia: 'CONDORCANQUI', distrito: 'NIEVA (SANTA MARÍA DE NIEVA)', region: 'SELVA', poblacion: 26000, gpc: 0.52, tasaCrecimiento: 1.4, lat: -4.5889, lng: -77.8683, zoom: 13 },
          { ubigeo: '010402', departamento: 'AMAZONAS', provincia: 'CONDORCANQUI', distrito: 'EL CENEPA', region: 'SELVA', poblacion: 11000, gpc: 0.48, tasaCrecimiento: 1.4, lat: -3.9856, lng: -78.2917, zoom: 13 },
          { ubigeo: '010403', departamento: 'AMAZONAS', provincia: 'CONDORCANQUI', distrito: 'RÍO SANTIAGO', region: 'SELVA', poblacion: 17000, gpc: 0.49, tasaCrecimiento: 1.4, lat: -4.1039, lng: -77.6472, zoom: 13 },
        ]
      },
      {
        id: '0105',
        nombre: 'LUYA',
        distritos: [
          { ubigeo: '010501', departamento: 'AMAZONAS', provincia: 'LUYA', distrito: 'LÁMUD', region: 'SELVA', poblacion: 3100, gpc: 0.54, tasaCrecimiento: 1.4, lat: -6.1639, lng: -77.9439, zoom: 13 },
          { ubigeo: '010502', departamento: 'AMAZONAS', provincia: 'LUYA', distrito: 'CAMPORREDONDO', region: 'SELVA', poblacion: 6200, gpc: 0.52, tasaCrecimiento: 1.4, lat: -6.1611, lng: -78.3361, zoom: 13 },
          { ubigeo: '010512', departamento: 'AMAZONAS', provincia: 'LUYA', distrito: 'LUYA', region: 'SELVA', poblacion: 4500, gpc: 0.53, tasaCrecimiento: 1.4, lat: -6.1722, lng: -77.915, zoom: 13 },
          { ubigeo: '010520', departamento: 'AMAZONAS', provincia: 'LUYA', distrito: 'TINGO (KUÉLAP)', region: 'SELVA', poblacion: 1600, gpc: 0.56, tasaCrecimiento: 1.4, lat: -6.3789, lng: -77.9056, zoom: 13 },
        ]
      },
      {
        id: '0106',
        nombre: 'RODRÍGUEZ DE MENDOZA',
        distritos: [
          { ubigeo: '010601', departamento: 'AMAZONAS', provincia: 'RODRÍGUEZ DE MENDOZA', distrito: 'SAN NICOLÁS (MENDOZA)', region: 'SELVA', poblacion: 6500, gpc: 0.58, tasaCrecimiento: 1.4, lat: -6.3989, lng: -77.4878, zoom: 13 },
          { ubigeo: '010607', departamento: 'AMAZONAS', provincia: 'RODRÍGUEZ DE MENDOZA', distrito: 'OMIA', region: 'SELVA', poblacion: 8800, gpc: 0.54, tasaCrecimiento: 1.4, lat: -6.4719, lng: -77.4111, zoom: 13 },
        ]
      },
      {
        id: '0107',
        nombre: 'UTCUBAMBA',
        distritos: [
          { ubigeo: '010701', departamento: 'AMAZONAS', provincia: 'UTCUBAMBA', distrito: 'BAGUA GRANDE', region: 'SELVA', poblacion: 58000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -5.7556, lng: -78.4428, zoom: 13 },
          { ubigeo: '010702', departamento: 'AMAZONAS', provincia: 'UTCUBAMBA', distrito: 'CAJARURO', region: 'SELVA', poblacion: 26000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -5.7361, lng: -78.4239, zoom: 13 },
          { ubigeo: '010703', departamento: 'AMAZONAS', provincia: 'UTCUBAMBA', distrito: 'CUMBA', region: 'SELVA', poblacion: 9800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -5.9389, lng: -78.6583, zoom: 13 },
          { ubigeo: '010705', departamento: 'AMAZONAS', provincia: 'UTCUBAMBA', distrito: 'JAMALCA', region: 'SELVA', poblacion: 7800, gpc: 0.53, tasaCrecimiento: 1.4, lat: -5.8756, lng: -78.3417, zoom: 13 },
          { ubigeo: '010706', departamento: 'AMAZONAS', provincia: 'UTCUBAMBA', distrito: 'LONYA GRANDE', region: 'SELVA', poblacion: 11500, gpc: 0.55, tasaCrecimiento: 1.4, lat: -6.0967, lng: -78.5239, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '02',
    nombre: 'ANCASH',
    region: 'SIERRA',
    provincias: [
      {
        id: '0201',
        nombre: 'HUARAZ',
        distritos: [
          { ubigeo: '020101', departamento: 'ANCASH', provincia: 'HUARAZ', distrito: 'HUARAZ', region: 'SIERRA', poblacion: 130000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -9.5261, lng: -77.5289, zoom: 13 },
          { ubigeo: '020102', departamento: 'ANCASH', provincia: 'HUARAZ', distrito: 'INDEPENDENCIA', region: 'SIERRA', poblacion: 78000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -9.5153, lng: -77.5228, zoom: 13 },
          { ubigeo: '020107', departamento: 'ANCASH', provincia: 'HUARAZ', distrito: 'JANGAS', region: 'SIERRA', poblacion: 5200, gpc: 0.55, tasaCrecimiento: 1.4, lat: -9.4189, lng: -77.5769, zoom: 13 },
          { ubigeo: '020110', departamento: 'ANCASH', provincia: 'HUARAZ', distrito: 'OLLEROS', region: 'SIERRA', poblacion: 3400, gpc: 0.52, tasaCrecimiento: 1.4, lat: -9.6589, lng: -77.4189, zoom: 13 },
          { ubigeo: '020111', departamento: 'ANCASH', provincia: 'HUARAZ', distrito: 'TARICA', region: 'SIERRA', poblacion: 6800, gpc: 0.56, tasaCrecimiento: 1.4, lat: -9.3981, lng: -77.5819, zoom: 13 },
        ]
      },
      {
        id: '0218',
        nombre: 'SANTA',
        distritos: [
          { ubigeo: '021801', departamento: 'ANCASH', provincia: 'SANTA', distrito: 'CHIMBOTE', region: 'SIERRA', poblacion: 215000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -9.0744, lng: -78.5936, zoom: 13 },
          { ubigeo: '021809', departamento: 'ANCASH', provincia: 'SANTA', distrito: 'NUEVO CHIMBOTE', region: 'SIERRA', poblacion: 165000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -9.1228, lng: -78.5358, zoom: 13 },
          { ubigeo: '021803', departamento: 'ANCASH', provincia: 'SANTA', distrito: 'CÁCERES DEL PERÚ', region: 'SIERRA', poblacion: 5400, gpc: 0.54, tasaCrecimiento: 1.4, lat: -9.0069, lng: -78.2194, zoom: 13 },
          { ubigeo: '021804', departamento: 'ANCASH', provincia: 'SANTA', distrito: 'COISHCO', region: 'SIERRA', poblacion: 16500, gpc: 0.66, tasaCrecimiento: 1.4, lat: -9.0228, lng: -78.6189, zoom: 13 },
          { ubigeo: '021806', departamento: 'ANCASH', provincia: 'SANTA', distrito: 'NEPEÑA', region: 'SIERRA', poblacion: 15800, gpc: 0.62, tasaCrecimiento: 1.4, lat: -9.1769, lng: -78.3847, zoom: 13 },
          { ubigeo: '021808', departamento: 'ANCASH', provincia: 'SANTA', distrito: 'SANTA', region: 'SIERRA', poblacion: 22000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -8.995, lng: -78.6472, zoom: 13 },
        ]
      },
      {
        id: '0205',
        nombre: 'BOLOGNESI',
        distritos: [
          { ubigeo: '020501', departamento: 'ANCASH', provincia: 'BOLOGNESI', distrito: 'CHIQUIÁN', region: 'SIERRA', poblacion: 4800, gpc: 0.56, tasaCrecimiento: 1.4, lat: -10.1539, lng: -77.1589, zoom: 13 },
        ]
      },
      {
        id: '0206',
        nombre: 'CARHUAZ',
        distritos: [
          { ubigeo: '020601', departamento: 'ANCASH', provincia: 'CARHUAZ', distrito: 'CARHUAZ', region: 'SIERRA', poblacion: 15200, gpc: 0.58, tasaCrecimiento: 1.4, lat: -9.2819, lng: -77.645, zoom: 13 },
          { ubigeo: '020605', departamento: 'ANCASH', provincia: 'CARHUAZ', distrito: 'MARCARÁ', region: 'SIERRA', poblacion: 11000, gpc: 0.55, tasaCrecimiento: 1.4, lat: -9.3178, lng: -77.6047, zoom: 13 },
        ]
      },
      {
        id: '0208',
        nombre: 'CASMA',
        distritos: [
          { ubigeo: '020801', departamento: 'ANCASH', provincia: 'CASMA', distrito: 'CASMA', region: 'SIERRA', poblacion: 34000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -9.4739, lng: -78.3039, zoom: 13 },
          { ubigeo: '020803', departamento: 'ANCASH', provincia: 'CASMA', distrito: 'COMANDANTE NOEL', region: 'SIERRA', poblacion: 2400, gpc: 0.55, tasaCrecimiento: 1.4, lat: -9.4589, lng: -78.3972, zoom: 13 },
        ]
      },
      {
        id: '0210',
        nombre: 'HUARI',
        distritos: [
          { ubigeo: '021001', departamento: 'ANCASH', provincia: 'HUARI', distrito: 'HUARI', region: 'SIERRA', poblacion: 10500, gpc: 0.58, tasaCrecimiento: 1.4, lat: -9.3361, lng: -77.1689, zoom: 13 },
          { ubigeo: '021004', departamento: 'ANCASH', provincia: 'HUARI', distrito: 'CHAVÍN DE HUÁNTAR', region: 'SIERRA', poblacion: 10200, gpc: 0.59, tasaCrecimiento: 1.4, lat: -9.5889, lng: -77.1778, zoom: 13 },
          { ubigeo: '021014', departamento: 'ANCASH', provincia: 'HUARI', distrito: 'SAN MARCOS', region: 'SIERRA', poblacion: 15800, gpc: 0.64, tasaCrecimiento: 1.4, lat: -9.525, lng: -77.1539, zoom: 13 },
        ]
      },
      {
        id: '0211',
        nombre: 'HUARMEY',
        distritos: [
          { ubigeo: '021101', departamento: 'ANCASH', provincia: 'HUARMEY', distrito: 'HUARMEY', region: 'SIERRA', poblacion: 24000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -10.0689, lng: -78.1528, zoom: 13 },
        ]
      },
      {
        id: '0212',
        nombre: 'HUAYLAS',
        distritos: [
          { ubigeo: '021201', departamento: 'ANCASH', provincia: 'HUAYLAS', distrito: 'CARAZ', region: 'SIERRA', poblacion: 28000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -9.0489, lng: -77.8119, zoom: 13 },
        ]
      },
      {
        id: '0214',
        nombre: 'PALLASCA',
        distritos: [
          { ubigeo: '021403', departamento: 'ANCASH', provincia: 'PALLASCA', distrito: 'CABANA', region: 'SIERRA', poblacion: 3200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -8.3956, lng: -78.0167, zoom: 13 },
        ]
      },
      {
        id: '0215',
        nombre: 'POMABAMBA',
        distritos: [
          { ubigeo: '021501', departamento: 'ANCASH', provincia: 'POMABAMBA', distrito: 'POMABAMBA', region: 'SIERRA', poblacion: 16500, gpc: 0.56, tasaCrecimiento: 1.4, lat: -8.8206, lng: -77.4619, zoom: 13 },
        ]
      },
      {
        id: '0216',
        nombre: 'RECUAY',
        distritos: [
          { ubigeo: '021601', departamento: 'ANCASH', provincia: 'RECUAY', distrito: 'RECUAY', region: 'SIERRA', poblacion: 5200, gpc: 0.58, tasaCrecimiento: 1.4, lat: -9.7239, lng: -77.4569, zoom: 13 },
        ]
      },
      {
        id: '0219',
        nombre: 'SIHUAS',
        distritos: [
          { ubigeo: '021901', departamento: 'ANCASH', provincia: 'SIHUAS', distrito: 'SIHUAS', region: 'SIERRA', poblacion: 6100, gpc: 0.54, tasaCrecimiento: 1.4, lat: -8.5589, lng: -77.625, zoom: 13 },
        ]
      },
      {
        id: '0220',
        nombre: 'YUNGAY',
        distritos: [
          { ubigeo: '022001', departamento: 'ANCASH', provincia: 'YUNGAY', distrito: 'YUNGAY', region: 'SIERRA', poblacion: 21000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -9.1389, lng: -77.7439, zoom: 13 },
        ]
      },
      {
        id: '0202',
        nombre: 'AIJA',
        distritos: [
          { ubigeo: '020201', departamento: 'ANCASH', provincia: 'AIJA', distrito: 'AIJA', region: 'SIERRA', poblacion: 2200, gpc: 0.52, tasaCrecimiento: 1.4, lat: -9.7839, lng: -77.6119, zoom: 13 },
        ]
      },
      {
        id: '0203',
        nombre: 'ANTONIO RAYMONDI',
        distritos: [
          { ubigeo: '020301', departamento: 'ANCASH', provincia: 'ANTONIO RAYMONDI', distrito: 'LLAMELLÍN', region: 'SIERRA', poblacion: 2100, gpc: 0.5, tasaCrecimiento: 1.4, lat: -9.0989, lng: -77.0169, zoom: 13 },
        ]
      },
      {
        id: '0204',
        nombre: 'ASUNCIÓN',
        distritos: [
          { ubigeo: '020401', departamento: 'ANCASH', provincia: 'ASUNCIÓN', distrito: 'CHACAS', region: 'SIERRA', poblacion: 5600, gpc: 0.54, tasaCrecimiento: 1.4, lat: -9.1639, lng: -77.365, zoom: 13 },
        ]
      },
      {
        id: '0207',
        nombre: 'CARLOS FERMÍN FITZCARRALD',
        distritos: [
          { ubigeo: '020701', departamento: 'ANCASH', provincia: 'CARLOS FERMÍN FITZCARRALD', distrito: 'SAN LUIS', region: 'SIERRA', poblacion: 4300, gpc: 0.52, tasaCrecimiento: 1.4, lat: -9.095, lng: -77.3289, zoom: 13 },
        ]
      },
      {
        id: '0209',
        nombre: 'CORONGO',
        distritos: [
          { ubigeo: '020901', departamento: 'ANCASH', provincia: 'CORONGO', distrito: 'CORONGO', region: 'SIERRA', poblacion: 1900, gpc: 0.5, tasaCrecimiento: 1.4, lat: -8.5728, lng: -77.8967, zoom: 13 },
        ]
      },
      {
        id: '0213',
        nombre: 'MARISCAL LUZURIAGA',
        distritos: [
          { ubigeo: '021301', departamento: 'ANCASH', provincia: 'MARISCAL LUZURIAGA', distrito: 'PISCOBAMBA', region: 'SIERRA', poblacion: 3800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -8.8719, lng: -77.3589, zoom: 13 },
        ]
      },
      {
        id: '0217',
        nombre: 'OCROS',
        distritos: [
          { ubigeo: '021701', departamento: 'ANCASH', provincia: 'OCROS', distrito: 'OCROS', region: 'SIERRA', poblacion: 1600, gpc: 0.5, tasaCrecimiento: 1.4, lat: -10.4039, lng: -77.3972, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '03',
    nombre: 'APURÍMAC',
    region: 'SIERRA',
    provincias: [
      {
        id: '0301',
        nombre: 'ABANCAY',
        distritos: [
          { ubigeo: '030101', departamento: 'APURÍMAC', provincia: 'ABANCAY', distrito: 'ABANCAY', region: 'SIERRA', poblacion: 72000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -13.6361, lng: -72.8794, zoom: 13 },
          { ubigeo: '030109', departamento: 'APURÍMAC', provincia: 'ABANCAY', distrito: 'TAMBURCO', region: 'SIERRA', poblacion: 14500, gpc: 0.62, tasaCrecimiento: 1.4, lat: -13.6228, lng: -72.8719, zoom: 13 },
        ]
      },
      {
        id: '0302',
        nombre: 'ANDAHUAYLAS',
        distritos: [
          { ubigeo: '030201', departamento: 'APURÍMAC', provincia: 'ANDAHUAYLAS', distrito: 'ANDAHUAYLAS', region: 'SIERRA', poblacion: 45000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -13.6556, lng: -73.3872, zoom: 13 },
          { ubigeo: '030212', departamento: 'APURÍMAC', provincia: 'ANDAHUAYLAS', distrito: 'SAN JERÓNIMO', region: 'SIERRA', poblacion: 22000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -13.6489, lng: -73.365, zoom: 13 },
          { ubigeo: '030213', departamento: 'APURÍMAC', provincia: 'ANDAHUAYLAS', distrito: 'TALAVERA', region: 'SIERRA', poblacion: 18500, gpc: 0.61, tasaCrecimiento: 1.4, lat: -13.6539, lng: -73.4319, zoom: 13 },
        ]
      },
      {
        id: '0303',
        nombre: 'ANTABAMBA',
        distritos: [
          { ubigeo: '030301', departamento: 'APURÍMAC', provincia: 'ANTABAMBA', distrito: 'ANTABAMBA', region: 'SIERRA', poblacion: 3400, gpc: 0.5, tasaCrecimiento: 1.4, lat: -14.3689, lng: -72.8789, zoom: 13 },
        ]
      },
      {
        id: '0304',
        nombre: 'AYMARAES',
        distritos: [
          { ubigeo: '030401', departamento: 'APURÍMAC', provincia: 'AYMARAES', distrito: 'CHALHUANCA', region: 'SIERRA', poblacion: 5200, gpc: 0.55, tasaCrecimiento: 1.4, lat: -14.2961, lng: -73.2439, zoom: 13 },
        ]
      },
      {
        id: '0305',
        nombre: 'COTABAMBAS',
        distritos: [
          { ubigeo: '030501', departamento: 'APURÍMAC', provincia: 'COTABAMBAS', distrito: 'TAMBOBAMBA', region: 'SIERRA', poblacion: 11500, gpc: 0.58, tasaCrecimiento: 1.4, lat: -13.9439, lng: -72.1769, zoom: 13 },
          { ubigeo: '030504', departamento: 'APURÍMAC', provincia: 'COTABAMBAS', distrito: 'CHALLHUAHUACHO (LAS BAMBAS)', region: 'SIERRA', poblacion: 19000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -14.1167, lng: -72.2333, zoom: 13 },
        ]
      },
      {
        id: '0306',
        nombre: 'CHINCHEROS',
        distritos: [
          { ubigeo: '030601', departamento: 'APURÍMAC', provincia: 'CHINCHEROS', distrito: 'CHINCHEROS', region: 'SIERRA', poblacion: 6100, gpc: 0.55, tasaCrecimiento: 1.4, lat: -13.5189, lng: -73.725, zoom: 13 },
        ]
      },
      {
        id: '0307',
        nombre: 'GRAU',
        distritos: [
          { ubigeo: '030701', departamento: 'APURÍMAC', provincia: 'GRAU', distrito: 'CHUQUIBAMBILLA', region: 'SIERRA', poblacion: 5800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -14.1089, lng: -72.7119, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '04',
    nombre: 'AREQUIPA',
    region: 'SIERRA',
    provincias: [
      {
        id: '0401',
        nombre: 'AREQUIPA',
        distritos: [
          { ubigeo: '040101', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'AREQUIPA', region: 'SIERRA', poblacion: 180000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -16.409, lng: -71.5375, zoom: 13 },
          { ubigeo: '040128', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'YURA', region: 'SIERRA', poblacion: 42000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -16.245, lng: -71.625, zoom: 13 },
          { ubigeo: '040103', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'CERRO COLORADO', region: 'SIERRA', poblacion: 215000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -16.368, lng: -71.565, zoom: 13 },
          { ubigeo: '040104', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'CHARACATO', region: 'SIERRA', poblacion: 16000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -16.475, lng: -71.488, zoom: 13 },
          { ubigeo: '040112', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'PAUCARPATA', region: 'SIERRA', poblacion: 135000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -16.433, lng: -71.505, zoom: 13 },
          { ubigeo: '040119', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'SOCABAYA', region: 'SIERRA', poblacion: 88000, gpc: 0.69, tasaCrecimiento: 1.4, lat: -16.4689, lng: -71.5319, zoom: 13 },
        ]
      },
      {
        id: '0402',
        nombre: 'CAMANÁ',
        distritos: [
          { ubigeo: '040201', departamento: 'AREQUIPA', provincia: 'CAMANÁ', distrito: 'CAMANÁ', region: 'SIERRA', poblacion: 16500, gpc: 0.7, tasaCrecimiento: 1.4, lat: -16.6239, lng: -72.7119, zoom: 13 },
        ]
      },
      {
        id: '0403',
        nombre: 'CARAVELÍ',
        distritos: [
          { ubigeo: '040301', departamento: 'AREQUIPA', provincia: 'CARAVELÍ', distrito: 'CARAVELÍ', region: 'SIERRA', poblacion: 4200, gpc: 0.6, tasaCrecimiento: 1.4, lat: -15.7739, lng: -73.365, zoom: 13 },
          { ubigeo: '040307', departamento: 'AREQUIPA', provincia: 'CARAVELÍ', distrito: 'CHALA', region: 'SIERRA', poblacion: 10500, gpc: 0.68, tasaCrecimiento: 1.4, lat: -15.8619, lng: -74.2469, zoom: 13 },
        ]
      },
      {
        id: '0404',
        nombre: 'CASTILLA',
        distritos: [
          { ubigeo: '040401', departamento: 'AREQUIPA', provincia: 'CASTILLA', distrito: 'APLAO', region: 'SIERRA', poblacion: 9800, gpc: 0.62, tasaCrecimiento: 1.4, lat: -16.085, lng: -72.4939, zoom: 13 },
        ]
      },
      {
        id: '0405',
        nombre: 'CAYLLOMA',
        distritos: [
          { ubigeo: '040501', departamento: 'AREQUIPA', provincia: 'CAYLLOMA', distrito: 'CHIVAY', region: 'SIERRA', poblacion: 8200, gpc: 0.6, tasaCrecimiento: 1.4, lat: -15.6389, lng: -71.6019, zoom: 13 },
          { ubigeo: '040509', departamento: 'AREQUIPA', provincia: 'CAYLLOMA', distrito: 'MAJES (EL PEDREGAL)', region: 'SIERRA', poblacion: 72000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -16.322, lng: -72.215, zoom: 13 },
        ]
      },
      {
        id: '0406',
        nombre: 'CONDESUYOS',
        distritos: [
          { ubigeo: '040601', departamento: 'AREQUIPA', provincia: 'CONDESUYOS', distrito: 'CHUQUIBAMBA', region: 'SIERRA', poblacion: 3800, gpc: 0.55, tasaCrecimiento: 1.4, lat: -15.8389, lng: -72.6519, zoom: 13 },
        ]
      },
      {
        id: '0407',
        nombre: 'ISLAY',
        distritos: [
          { ubigeo: '040701', departamento: 'AREQUIPA', provincia: 'ISLAY', distrito: 'MOLLENDO', region: 'SIERRA', poblacion: 28500, gpc: 0.72, tasaCrecimiento: 1.4, lat: -17.0239, lng: -72.015, zoom: 13 },
          { ubigeo: '040704', departamento: 'AREQUIPA', provincia: 'ISLAY', distrito: 'ISLAY (MATARANI)', region: 'SIERRA', poblacion: 6800, gpc: 0.7, tasaCrecimiento: 1.4, lat: -16.9989, lng: -72.1039, zoom: 13 },
        ]
      },
      {
        id: '0408',
        nombre: 'LA UNIÓN',
        distritos: [
          { ubigeo: '040801', departamento: 'AREQUIPA', provincia: 'LA UNIÓN', distrito: 'COTAHUASI', region: 'SIERRA', poblacion: 3200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -15.2139, lng: -72.8919, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '05',
    nombre: 'AYACUCHO',
    region: 'SIERRA',
    provincias: [
      {
        id: '0501',
        nombre: 'HUAMANGA',
        distritos: [
          { ubigeo: '050101', departamento: 'AYACUCHO', provincia: 'HUAMANGA', distrito: 'AYACUCHO', region: 'SIERRA', poblacion: 115000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -13.1589, lng: -74.2239, zoom: 13 },
          { ubigeo: '050103', departamento: 'AYACUCHO', provincia: 'HUAMANGA', distrito: 'CARMEN ALTO', region: 'SIERRA', poblacion: 31000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -13.1819, lng: -74.2189, zoom: 13 },
          { ubigeo: '050108', departamento: 'AYACUCHO', provincia: 'HUAMANGA', distrito: 'SAN JUAN BAUTISTA', region: 'SIERRA', poblacion: 55000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -13.1689, lng: -74.215, zoom: 13 },
          { ubigeo: '050114', departamento: 'AYACUCHO', provincia: 'HUAMANGA', distrito: 'ANDRÉS AVELINO CÁCERES', region: 'SIERRA', poblacion: 38000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -13.1489, lng: -74.205, zoom: 13 },
        ]
      },
      {
        id: '0504',
        nombre: 'HUANTA',
        distritos: [
          { ubigeo: '050401', departamento: 'AYACUCHO', provincia: 'HUANTA', distrito: 'HUANTA', region: 'SIERRA', poblacion: 42000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -12.935, lng: -74.2489, zoom: 13 },
        ]
      },
      {
        id: '0505',
        nombre: 'LA MAR',
        distritos: [
          { ubigeo: '050501', departamento: 'AYACUCHO', provincia: 'LA MAR', distrito: 'SAN MIGUEL', region: 'SIERRA', poblacion: 12000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -13.0139, lng: -73.9819, zoom: 13 },
        ]
      },
      {
        id: '0506',
        nombre: 'LUCANAS',
        distritos: [
          { ubigeo: '050601', departamento: 'AYACUCHO', provincia: 'LUCANAS', distrito: 'PUQUIO', region: 'SIERRA', poblacion: 16000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -14.6939, lng: -74.1239, zoom: 13 },
        ]
      },
      {
        id: '0507',
        nombre: 'PARINACOCHAS',
        distritos: [
          { ubigeo: '050701', departamento: 'AYACUCHO', provincia: 'PARINACOCHAS', distrito: 'CORACORA', region: 'SIERRA', poblacion: 14000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -15.0189, lng: -73.7819, zoom: 13 },
        ]
      },
      {
        id: '0502',
        nombre: 'CANGALLO',
        distritos: [
          { ubigeo: '050201', departamento: 'AYACUCHO', provincia: 'CANGALLO', distrito: 'CANGALLO', region: 'SIERRA', poblacion: 7200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -13.6319, lng: -74.1419, zoom: 13 },
        ]
      },
      {
        id: '0503',
        nombre: 'HUANCA SANCOS',
        distritos: [
          { ubigeo: '050301', departamento: 'AYACUCHO', provincia: 'HUANCA SANCOS', distrito: 'SANCOS', region: 'SIERRA', poblacion: 3800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -13.9189, lng: -74.3319, zoom: 13 },
        ]
      },
      {
        id: '0508',
        nombre: 'PÁUCAR DEL SARA SARA',
        distritos: [
          { ubigeo: '050801', departamento: 'AYACUCHO', provincia: 'PÁUCAR DEL SARA SARA', distrito: 'PAUSA', region: 'SIERRA', poblacion: 3100, gpc: 0.52, tasaCrecimiento: 1.4, lat: -15.2819, lng: -73.3489, zoom: 13 },
        ]
      },
      {
        id: '0509',
        nombre: 'SUCRE',
        distritos: [
          { ubigeo: '050901', departamento: 'AYACUCHO', provincia: 'SUCRE', distrito: 'QUEROBAMBA', region: 'SIERRA', poblacion: 3400, gpc: 0.5, tasaCrecimiento: 1.4, lat: -14.0139, lng: -73.8369, zoom: 13 },
        ]
      },
      {
        id: '0510',
        nombre: 'VÍCTOR FAJARDO',
        distritos: [
          { ubigeo: '051001', departamento: 'AYACUCHO', provincia: 'VÍCTOR FAJARDO', distrito: 'HUANCAPI', region: 'SIERRA', poblacion: 2600, gpc: 0.5, tasaCrecimiento: 1.4, lat: -13.7519, lng: -74.065, zoom: 13 },
        ]
      },
      {
        id: '0511',
        nombre: 'VILCAS HUAMÁN',
        distritos: [
          { ubigeo: '051101', departamento: 'AYACUCHO', provincia: 'VILCAS HUAMÁN', distrito: 'VILCAS HUAMÁN', region: 'SIERRA', poblacion: 8200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -13.6539, lng: -73.9539, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '06',
    nombre: 'CAJAMARCA',
    region: 'SIERRA',
    provincias: [
      {
        id: '0601',
        nombre: 'CAJAMARCA',
        distritos: [
          { ubigeo: '060101', departamento: 'CAJAMARCA', provincia: 'CAJAMARCA', distrito: 'CAJAMARCA', region: 'SIERRA', poblacion: 160000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -7.1637, lng: -78.5002, zoom: 13 },
          { ubigeo: '060102', departamento: 'CAJAMARCA', provincia: 'CAJAMARCA', distrito: 'BAÑOS DEL INCA', region: 'SIERRA', poblacion: 45000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -7.162, lng: -78.462, zoom: 13 },
          { ubigeo: '060104', departamento: 'CAJAMARCA', provincia: 'CAJAMARCA', distrito: 'CHETILLA', region: 'SIERRA', poblacion: 4200, gpc: 0.5, tasaCrecimiento: 1.4, lat: -7.1489, lng: -78.675, zoom: 13 },
          { ubigeo: '060107', departamento: 'CAJAMARCA', provincia: 'CAJAMARCA', distrito: 'ENCAÑADA', region: 'SIERRA', poblacion: 24000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -7.085, lng: -78.3419, zoom: 13 },
          { ubigeo: '060108', departamento: 'CAJAMARCA', provincia: 'CAJAMARCA', distrito: 'JESÚS', region: 'SIERRA', poblacion: 15200, gpc: 0.55, tasaCrecimiento: 1.4, lat: -7.245, lng: -78.3819, zoom: 13 },
          { ubigeo: '060109', departamento: 'CAJAMARCA', provincia: 'CAJAMARCA', distrito: 'LLACANORA', region: 'SIERRA', poblacion: 5600, gpc: 0.54, tasaCrecimiento: 1.4, lat: -7.2019, lng: -78.4289, zoom: 13 },
        ]
      },
      {
        id: '0602',
        nombre: 'CAJABAMBA',
        distritos: [
          { ubigeo: '060201', departamento: 'CAJAMARCA', provincia: 'CAJABAMBA', distrito: 'CAJABAMBA', region: 'SIERRA', poblacion: 32000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -7.6239, lng: -78.0489, zoom: 13 },
          { ubigeo: '060203', departamento: 'CAJAMARCA', provincia: 'CAJABAMBA', distrito: 'CONDEBAMBA (CAUDAY)', region: 'SIERRA', poblacion: 14500, gpc: 0.55, tasaCrecimiento: 1.4, lat: -7.575, lng: -78.1189, zoom: 13 },
        ]
      },
      {
        id: '0603',
        nombre: 'CELENDÍN',
        distritos: [
          { ubigeo: '060301', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'CELENDÍN', region: 'SIERRA', poblacion: 28500, gpc: 0.58, tasaCrecimiento: 1.4, lat: -6.8654, lng: -78.1455, zoom: 13 },
          { ubigeo: '060302', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'CHUMUCH', region: 'SIERRA', poblacion: 3400, gpc: 0.52, tasaCrecimiento: 1.4, lat: -6.6029, lng: -78.2003, zoom: 13 },
          { ubigeo: '060303', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'CORTEGANA (CHIMUCH)', region: 'SIERRA', poblacion: 8900, gpc: 0.54, tasaCrecimiento: 1.4, lat: -6.5132, lng: -78.3289, zoom: 13 },
          { ubigeo: '060304', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'HUASMÍN', region: 'SIERRA', poblacion: 14200, gpc: 0.55, tasaCrecimiento: 1.4, lat: -6.8376, lng: -78.2449, zoom: 13 },
          { ubigeo: '060305', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'JORGE CHÁVEZ', region: 'SIERRA', poblacion: 1800, gpc: 0.5, tasaCrecimiento: 1.4, lat: -6.9408, lng: -78.094, zoom: 13 },
          { ubigeo: '060306', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'JOSÉ GÁLVEZ', region: 'SIERRA', poblacion: 4200, gpc: 0.53, tasaCrecimiento: 1.4, lat: -6.9257, lng: -78.1327, zoom: 13 },
          { ubigeo: '060307', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'MIGUEL IGLESIAS', region: 'SIERRA', poblacion: 5100, gpc: 0.51, tasaCrecimiento: 1.4, lat: -6.6774, lng: -78.2041, zoom: 13 },
          { ubigeo: '060308', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'OXAMARCA', region: 'SIERRA', poblacion: 6800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -7.0419, lng: -78.068, zoom: 13 },
          { ubigeo: '060309', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'SOROCHUCO', region: 'SIERRA', poblacion: 10500, gpc: 0.54, tasaCrecimiento: 1.4, lat: -6.9116, lng: -78.255, zoom: 13 },
          { ubigeo: '060310', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'SUCRE', region: 'SIERRA', poblacion: 6100, gpc: 0.53, tasaCrecimiento: 1.4, lat: -6.9426, lng: -78.1356, zoom: 13 },
          { ubigeo: '060311', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'UTCO', region: 'SIERRA', poblacion: 1500, gpc: 0.49, tasaCrecimiento: 1.4, lat: -6.8964, lng: -78.0633, zoom: 13 },
          { ubigeo: '060312', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'LA LIBERTAD DE PALLÁN', region: 'SIERRA', poblacion: 7800, gpc: 0.53, tasaCrecimiento: 1.4, lat: -6.7234, lng: -78.2823, zoom: 13 },
        ]
      },
      {
        id: '0604',
        nombre: 'CHOTA',
        distritos: [
          { ubigeo: '060401', departamento: 'CAJAMARCA', provincia: 'CHOTA', distrito: 'CHOTA', region: 'SIERRA', poblacion: 52000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -6.5589, lng: -78.65, zoom: 13 },
          { ubigeo: '060408', departamento: 'CAJAMARCA', provincia: 'CHOTA', distrito: 'LAJAS', region: 'SIERRA', poblacion: 14000, gpc: 0.55, tasaCrecimiento: 1.4, lat: -6.5419, lng: -78.7189, zoom: 13 },
          { ubigeo: '060416', departamento: 'CAJAMARCA', provincia: 'CHOTA', distrito: 'TACABAMBA', region: 'SIERRA', poblacion: 18500, gpc: 0.56, tasaCrecimiento: 1.4, lat: -6.3989, lng: -78.6119, zoom: 13 },
          { ubigeo: '060407', departamento: 'CAJAMARCA', provincia: 'CHOTA', distrito: 'HUAMBOS', region: 'SIERRA', poblacion: 10200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -6.4519, lng: -78.9619, zoom: 13 },
        ]
      },
      {
        id: '0605',
        nombre: 'CONTUMAZÁ',
        distritos: [
          { ubigeo: '060501', departamento: 'CAJAMARCA', provincia: 'CONTUMAZÁ', distrito: 'CONTUMAZÁ', region: 'SIERRA', poblacion: 9800, gpc: 0.56, tasaCrecimiento: 1.4, lat: -7.3689, lng: -78.8039, zoom: 13 },
          { ubigeo: '060502', departamento: 'CAJAMARCA', provincia: 'CONTUMAZÁ', distrito: 'CHILETE', region: 'SIERRA', poblacion: 3400, gpc: 0.54, tasaCrecimiento: 1.4, lat: -7.2189, lng: -78.8539, zoom: 13 },
          { ubigeo: '060508', departamento: 'CAJAMARCA', provincia: 'CONTUMAZÁ', distrito: 'YONÁN (TEMBLADERA)', region: 'SIERRA', poblacion: 8200, gpc: 0.58, tasaCrecimiento: 1.4, lat: -7.2539, lng: -79.1319, zoom: 13 },
        ]
      },
      {
        id: '0606',
        nombre: 'CUTERVO',
        distritos: [
          { ubigeo: '060601', departamento: 'CAJAMARCA', provincia: 'CUTERVO', distrito: 'CUTERVO', region: 'SIERRA', poblacion: 58000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -6.375, lng: -78.8189, zoom: 13 },
          { ubigeo: '060602', departamento: 'CAJAMARCA', provincia: 'CUTERVO', distrito: 'CALLAYUC', region: 'SIERRA', poblacion: 11000, gpc: 0.53, tasaCrecimiento: 1.4, lat: -6.0489, lng: -78.9619, zoom: 13 },
          { ubigeo: '060608', departamento: 'CAJAMARCA', provincia: 'CUTERVO', distrito: 'SAN ANDRÉS DE CUTERVO', region: 'SIERRA', poblacion: 6200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -6.2519, lng: -78.7189, zoom: 13 },
          { ubigeo: '060613', departamento: 'CAJAMARCA', provincia: 'CUTERVO', distrito: 'SOCOTA', region: 'SIERRA', poblacion: 12000, gpc: 0.55, tasaCrecimiento: 1.4, lat: -6.2919, lng: -78.6939, zoom: 13 },
        ]
      },
      {
        id: '0607',
        nombre: 'HUALGAYOC',
        distritos: [
          { ubigeo: '060701', departamento: 'CAJAMARCA', provincia: 'HUALGAYOC', distrito: 'BAMBAMARCA', region: 'SIERRA', poblacion: 68000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -6.6789, lng: -78.5289, zoom: 13 },
          { ubigeo: '060702', departamento: 'CAJAMARCA', provincia: 'HUALGAYOC', distrito: 'CHUGUR', region: 'SIERRA', poblacion: 4200, gpc: 0.52, tasaCrecimiento: 1.4, lat: -6.6719, lng: -78.7419, zoom: 13 },
          { ubigeo: '060703', departamento: 'CAJAMARCA', provincia: 'HUALGAYOC', distrito: 'HUALGAYOC', region: 'SIERRA', poblacion: 18500, gpc: 0.6, tasaCrecimiento: 1.4, lat: -6.7639, lng: -78.6189, zoom: 13 },
        ]
      },
      {
        id: '0608',
        nombre: 'JAÉN',
        distritos: [
          { ubigeo: '060801', departamento: 'CAJAMARCA', provincia: 'JAÉN', distrito: 'JAÉN', region: 'SIERRA', poblacion: 98000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -5.7089, lng: -78.8089, zoom: 13 },
          { ubigeo: '060802', departamento: 'CAJAMARCA', provincia: 'JAÉN', distrito: 'BELLAVISTA', region: 'SIERRA', poblacion: 17500, gpc: 0.58, tasaCrecimiento: 1.4, lat: -5.6619, lng: -78.675, zoom: 13 },
          { ubigeo: '060807', departamento: 'CAJAMARCA', provincia: 'JAÉN', distrito: 'PUCARÁ', region: 'SIERRA', poblacion: 8400, gpc: 0.55, tasaCrecimiento: 1.4, lat: -6.035, lng: -79.125, zoom: 13 },
        ]
      },
      {
        id: '0609',
        nombre: 'SAN IGNACIO',
        distritos: [
          { ubigeo: '060901', departamento: 'CAJAMARCA', provincia: 'SAN IGNACIO', distrito: 'SAN IGNACIO', region: 'SIERRA', poblacion: 38000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -5.145, lng: -79.0019, zoom: 13 },
          { ubigeo: '060907', departamento: 'CAJAMARCA', provincia: 'SAN IGNACIO', distrito: 'TABACONAS', region: 'SIERRA', poblacion: 18000, gpc: 0.54, tasaCrecimiento: 1.4, lat: -5.3189, lng: -79.295, zoom: 13 },
        ]
      },
      {
        id: '0610',
        nombre: 'SAN MARCOS',
        distritos: [
          { ubigeo: '061001', departamento: 'CAJAMARCA', provincia: 'SAN MARCOS', distrito: 'PEDRO GÁLVEZ (SAN MARCOS)', region: 'SIERRA', poblacion: 22000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -7.335, lng: -78.1689, zoom: 13 },
          { ubigeo: '061005', departamento: 'CAJAMARCA', provincia: 'SAN MARCOS', distrito: 'ICHOCÁN', region: 'SIERRA', poblacion: 3100, gpc: 0.52, tasaCrecimiento: 1.4, lat: -7.375, lng: -78.145, zoom: 13 },
        ]
      },
      {
        id: '0611',
        nombre: 'SAN MIGUEL',
        distritos: [
          { ubigeo: '061101', departamento: 'CAJAMARCA', provincia: 'SAN MIGUEL', distrito: 'SAN MIGUEL DE PALLAQUES', region: 'SIERRA', poblacion: 18000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -7.0019, lng: -78.8519, zoom: 13 },
          { ubigeo: '061108', departamento: 'CAJAMARCA', provincia: 'SAN MIGUEL', distrito: 'LLAPA', region: 'SIERRA', poblacion: 5400, gpc: 0.52, tasaCrecimiento: 1.4, lat: -7.025, lng: -78.785, zoom: 13 },
        ]
      },
      {
        id: '0612',
        nombre: 'SAN PABLO',
        distritos: [
          { ubigeo: '061201', departamento: 'CAJAMARCA', provincia: 'SAN PABLO', distrito: 'SAN PABLO', region: 'SIERRA', poblacion: 14500, gpc: 0.56, tasaCrecimiento: 1.4, lat: -7.1189, lng: -78.8239, zoom: 13 },
        ]
      },
      {
        id: '0613',
        nombre: 'SANTA CRUZ',
        distritos: [
          { ubigeo: '061301', departamento: 'CAJAMARCA', provincia: 'SANTA CRUZ', distrito: 'SANTA CRUZ DE SUCCHABAMBA', region: 'SIERRA', poblacion: 16500, gpc: 0.58, tasaCrecimiento: 1.4, lat: -6.6269, lng: -78.945, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '07',
    nombre: 'CALLAO',
    region: 'COSTA',
    provincias: [
      {
        id: '0701',
        nombre: 'CALLAO',
        distritos: [
          { ubigeo: '070101', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'CALLAO', region: 'COSTA', poblacion: 425000, gpc: 0.82, tasaCrecimiento: 1.4, lat: -12.0565, lng: -77.1181, zoom: 13 },
          { ubigeo: '070102', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'BELLAVISTA', region: 'COSTA', poblacion: 82000, gpc: 0.78, tasaCrecimiento: 1.4, lat: -12.0639, lng: -77.135, zoom: 13 },
          { ubigeo: '070103', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'CARMEN DE LA LEGUA REYNOSO', region: 'COSTA', poblacion: 44000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -12.0439, lng: -77.0919, zoom: 13 },
          { ubigeo: '070104', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'LA PERLA', region: 'COSTA', poblacion: 65000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -12.0719, lng: -77.1139, zoom: 13 },
          { ubigeo: '070105', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'LA PUNTA', region: 'COSTA', poblacion: 4100, gpc: 0.85, tasaCrecimiento: 1.4, lat: -12.0739, lng: -77.165, zoom: 13 },
          { ubigeo: '070106', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'VENTANILLA', region: 'COSTA', poblacion: 385000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -11.8789, lng: -77.1289, zoom: 13 },
          { ubigeo: '070107', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'MI PERÚ', region: 'COSTA', poblacion: 55000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -11.8569, lng: -77.115, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '08',
    nombre: 'CUSCO',
    region: 'SIERRA',
    provincias: [
      {
        id: '0801',
        nombre: 'CUSCO',
        distritos: [
          { ubigeo: '080101', departamento: 'CUSCO', provincia: 'CUSCO', distrito: 'CUSCO', region: 'SIERRA', poblacion: 135000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -13.5319, lng: -71.9674, zoom: 13 },
          { ubigeo: '080104', departamento: 'CUSCO', provincia: 'CUSCO', distrito: 'SAN JERÓNIMO', region: 'SIERRA', poblacion: 55000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -13.5519, lng: -71.8889, zoom: 13 },
          { ubigeo: '080105', departamento: 'CUSCO', provincia: 'CUSCO', distrito: 'SAN SEBASTIÁN', region: 'SIERRA', poblacion: 115000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -13.535, lng: -71.9289, zoom: 13 },
          { ubigeo: '080106', departamento: 'CUSCO', provincia: 'CUSCO', distrito: 'SANTIAGO', region: 'SIERRA', poblacion: 98000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -13.5419, lng: -71.985, zoom: 13 },
          { ubigeo: '080108', departamento: 'CUSCO', provincia: 'CUSCO', distrito: 'WANCHAQ', region: 'SIERRA', poblacion: 68000, gpc: 0.75, tasaCrecimiento: 1.4, lat: -13.5289, lng: -71.9569, zoom: 13 },
        ]
      },
      {
        id: '0803',
        nombre: 'ANTA',
        distritos: [
          { ubigeo: '080301', departamento: 'CUSCO', provincia: 'ANTA', distrito: 'ANTA', region: 'SIERRA', poblacion: 18000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -13.4619, lng: -72.1489, zoom: 13 },
        ]
      },
      {
        id: '0804',
        nombre: 'CALCA',
        distritos: [
          { ubigeo: '080401', departamento: 'CUSCO', provincia: 'CALCA', distrito: 'CALCA', region: 'SIERRA', poblacion: 22000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -13.3319, lng: -71.9539, zoom: 13 },
          { ubigeo: '080405', departamento: 'CUSCO', provincia: 'CALCA', distrito: 'PÍSAC', region: 'SIERRA', poblacion: 11000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -13.4219, lng: -71.8519, zoom: 13 },
        ]
      },
      {
        id: '0806',
        nombre: 'CANCHIS',
        distritos: [
          { ubigeo: '080601', departamento: 'CUSCO', provincia: 'CANCHIS', distrito: 'SICUANI', region: 'SIERRA', poblacion: 62000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -14.2819, lng: -71.2289, zoom: 13 },
        ]
      },
      {
        id: '0808',
        nombre: 'ESPINAR',
        distritos: [
          { ubigeo: '080801', departamento: 'CUSCO', provincia: 'ESPINAR', distrito: 'YAURI (ESPINAR)', region: 'SIERRA', poblacion: 36000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -14.7939, lng: -71.4119, zoom: 13 },
        ]
      },
      {
        id: '0809',
        nombre: 'LA CONVENCIÓN',
        distritos: [
          { ubigeo: '080901', departamento: 'CUSCO', provincia: 'LA CONVENCIÓN', distrito: 'SANTA ANA (QUILLABAMBA)', region: 'SIERRA', poblacion: 38000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -12.8689, lng: -72.695, zoom: 13 },
          { ubigeo: '080909', departamento: 'CUSCO', provincia: 'LA CONVENCIÓN', distrito: 'MEGANTONI (CAMISEA)', region: 'SIERRA', poblacion: 11000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -11.95, lng: -72.9167, zoom: 13 },
        ]
      },
      {
        id: '0813',
        nombre: 'URUBAMBA',
        distritos: [
          { ubigeo: '081301', departamento: 'CUSCO', provincia: 'URUBAMBA', distrito: 'URUBAMBA', region: 'SIERRA', poblacion: 24000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -13.305, lng: -72.115, zoom: 13 },
          { ubigeo: '081304', departamento: 'CUSCO', provincia: 'URUBAMBA', distrito: 'MACHUPICCHU (AGUAS CALIENTES)', region: 'SIERRA', poblacion: 6500, gpc: 0.85, tasaCrecimiento: 1.4, lat: -13.155, lng: -72.525, zoom: 13 },
          { ubigeo: '081305', departamento: 'CUSCO', provincia: 'URUBAMBA', distrito: 'MARAS', region: 'SIERRA', poblacion: 7200, gpc: 0.58, tasaCrecimiento: 1.4, lat: -13.3319, lng: -72.1589, zoom: 13 },
          { ubigeo: '081306', departamento: 'CUSCO', provincia: 'URUBAMBA', distrito: 'OLLANTAYTAMBO', region: 'SIERRA', poblacion: 12500, gpc: 0.68, tasaCrecimiento: 1.4, lat: -13.2589, lng: -72.2639, zoom: 13 },
        ]
      },
      {
        id: '0802',
        nombre: 'ACOMAYO',
        distritos: [
          { ubigeo: '080201', departamento: 'CUSCO', provincia: 'ACOMAYO', distrito: 'ACOMAYO', region: 'SIERRA', poblacion: 5600, gpc: 0.52, tasaCrecimiento: 1.4, lat: -13.9189, lng: -71.685, zoom: 13 },
        ]
      },
      {
        id: '0805',
        nombre: 'CANAS',
        distritos: [
          { ubigeo: '080501', departamento: 'CUSCO', provincia: 'CANAS', distrito: 'YANAOCA', region: 'SIERRA', poblacion: 10500, gpc: 0.54, tasaCrecimiento: 1.4, lat: -14.2189, lng: -71.4319, zoom: 13 },
        ]
      },
      {
        id: '0807',
        nombre: 'CHUMBIVILCAS',
        distritos: [
          { ubigeo: '080701', departamento: 'CUSCO', provincia: 'CHUMBIVILCAS', distrito: 'SANTO TOMÁS', region: 'SIERRA', poblacion: 28000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -14.4489, lng: -72.0819, zoom: 13 },
        ]
      },
      {
        id: '0810',
        nombre: 'PARURO',
        distritos: [
          { ubigeo: '081001', departamento: 'CUSCO', provincia: 'PARURO', distrito: 'PARURO', region: 'SIERRA', poblacion: 3800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -13.765, lng: -71.845, zoom: 13 },
        ]
      },
      {
        id: '0811',
        nombre: 'PAUCARTAMBO',
        distritos: [
          { ubigeo: '081101', departamento: 'CUSCO', provincia: 'PAUCARTAMBO', distrito: 'PAUCARTAMBO', region: 'SIERRA', poblacion: 14000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -13.315, lng: -71.595, zoom: 13 },
        ]
      },
      {
        id: '0812',
        nombre: 'QUISPICANCHI',
        distritos: [
          { ubigeo: '081201', departamento: 'CUSCO', provincia: 'QUISPICANCHI', distrito: 'URCOS', region: 'SIERRA', poblacion: 12500, gpc: 0.6, tasaCrecimiento: 1.4, lat: -13.6889, lng: -71.625, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '13',
    nombre: 'LA LIBERTAD',
    region: 'COSTA',
    provincias: [
      {
        id: '1301',
        nombre: 'TRUJILLO',
        distritos: [
          { ubigeo: '130101', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'TRUJILLO', region: 'COSTA', poblacion: 340000, gpc: 0.78, tasaCrecimiento: 1.4, lat: -8.1159, lng: -79.0299, zoom: 13 },
          { ubigeo: '130102', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'EL PORVENIR', region: 'COSTA', poblacion: 195000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -8.085, lng: -79.0019, zoom: 13 },
          { ubigeo: '130103', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'FLORENCIA DE MORA', region: 'COSTA', poblacion: 42000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -8.075, lng: -79.0219, zoom: 13 },
          { ubigeo: '130104', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'HUANCHACO', region: 'COSTA', poblacion: 78000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -8.0819, lng: -79.1189, zoom: 13 },
          { ubigeo: '130105', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'LA ESPERANZA', region: 'COSTA', poblacion: 198000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -8.0689, lng: -79.0419, zoom: 13 },
          { ubigeo: '130106', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'LAREDO', region: 'COSTA', poblacion: 38000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -8.0889, lng: -78.9619, zoom: 13 },
          { ubigeo: '130107', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'MOCHE', region: 'COSTA', poblacion: 39000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -8.1719, lng: -79.0119, zoom: 13 },
          { ubigeo: '130110', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'VÍCTOR LARCO HERRERA', region: 'COSTA', poblacion: 72000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -8.1389, lng: -79.045, zoom: 13 },
        ]
      },
      {
        id: '1302',
        nombre: 'ASCOPE',
        distritos: [
          { ubigeo: '130201', departamento: 'LA LIBERTAD', provincia: 'ASCOPE', distrito: 'ASCOPE', region: 'COSTA', poblacion: 7200, gpc: 0.6, tasaCrecimiento: 1.4, lat: -7.7139, lng: -79.1089, zoom: 13 },
          { ubigeo: '130202', departamento: 'LA LIBERTAD', provincia: 'ASCOPE', distrito: 'CHICAMA', region: 'COSTA', poblacion: 16500, gpc: 0.62, tasaCrecimiento: 1.4, lat: -7.8439, lng: -79.145, zoom: 13 },
          { ubigeo: '130205', departamento: 'LA LIBERTAD', provincia: 'ASCOPE', distrito: 'PAIJÁN', region: 'COSTA', poblacion: 28000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -7.7319, lng: -79.3019, zoom: 13 },
        ]
      },
      {
        id: '1304',
        nombre: 'CHEPÉN',
        distritos: [
          { ubigeo: '130401', departamento: 'LA LIBERTAD', provincia: 'CHEPÉN', distrito: 'CHEPÉN', region: 'COSTA', poblacion: 48000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -7.2289, lng: -79.4319, zoom: 13 },
        ]
      },
      {
        id: '1307',
        nombre: 'PACASMAYO',
        distritos: [
          { ubigeo: '130701', departamento: 'LA LIBERTAD', provincia: 'PACASMAYO', distrito: 'SAN PEDRO DE LLOC', region: 'COSTA', poblacion: 18500, gpc: 0.65, tasaCrecimiento: 1.4, lat: -7.4319, lng: -79.505, zoom: 13 },
          { ubigeo: '130704', departamento: 'LA LIBERTAD', provincia: 'PACASMAYO', distrito: 'PACASMAYO', region: 'COSTA', poblacion: 29000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -7.4019, lng: -79.5719, zoom: 13 },
        ]
      },
      {
        id: '1312',
        nombre: 'VIRÚ',
        distritos: [
          { ubigeo: '131201', departamento: 'LA LIBERTAD', provincia: 'VIRÚ', distrito: 'VIRÚ', region: 'COSTA', poblacion: 68000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -8.415, lng: -78.7519, zoom: 13 },
          { ubigeo: '131202', departamento: 'LA LIBERTAD', provincia: 'VIRÚ', distrito: 'CHAO', region: 'COSTA', poblacion: 36000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -8.5419, lng: -78.675, zoom: 13 },
        ]
      },
      {
        id: '1309',
        nombre: 'SÁNCHEZ CARRIÓN',
        distritos: [
          { ubigeo: '130901', departamento: 'LA LIBERTAD', provincia: 'SÁNCHEZ CARRIÓN', distrito: 'HUAMACHUCO', region: 'COSTA', poblacion: 62000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -7.815, lng: -78.0489, zoom: 13 },
        ]
      },
      {
        id: '1310',
        nombre: 'SANTIAGO DE CHUCO',
        distritos: [
          { ubigeo: '131001', departamento: 'LA LIBERTAD', provincia: 'SANTIAGO DE CHUCO', distrito: 'SANTIAGO DE CHUCO', region: 'COSTA', poblacion: 22000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -8.1419, lng: -78.175, zoom: 13 },
        ]
      },
      {
        id: '1306',
        nombre: 'OTUZCO',
        distritos: [
          { ubigeo: '130601', departamento: 'LA LIBERTAD', provincia: 'OTUZCO', distrito: 'OTUZCO', region: 'COSTA', poblacion: 28000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -7.9019, lng: -78.5819, zoom: 13 },
        ]
      },
      {
        id: '1308',
        nombre: 'PATAZ',
        distritos: [
          { ubigeo: '130801', departamento: 'LA LIBERTAD', provincia: 'PATAZ', distrito: 'TAYABAMBA', region: 'COSTA', poblacion: 16000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -8.2789, lng: -77.2969, zoom: 13 },
        ]
      },
      {
        id: '1303',
        nombre: 'BOLÍVAR',
        distritos: [
          { ubigeo: '130301', departamento: 'LA LIBERTAD', provincia: 'BOLÍVAR', distrito: 'BOLÍVAR', region: 'COSTA', poblacion: 4500, gpc: 0.52, tasaCrecimiento: 1.4, lat: -7.1539, lng: -77.7119, zoom: 13 },
        ]
      },
      {
        id: '1305',
        nombre: 'JULCÁN',
        distritos: [
          { ubigeo: '130501', departamento: 'LA LIBERTAD', provincia: 'JULCÁN', distrito: 'JULCÁN', region: 'COSTA', poblacion: 14000, gpc: 0.54, tasaCrecimiento: 1.4, lat: -8.0419, lng: -78.485, zoom: 13 },
        ]
      },
      {
        id: '1311',
        nombre: 'GRAN CHIMÚ',
        distritos: [
          { ubigeo: '131101', departamento: 'LA LIBERTAD', provincia: 'GRAN CHIMÚ', distrito: 'CASCAS', region: 'COSTA', poblacion: 15000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -7.4819, lng: -78.8189, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '14',
    nombre: 'LAMBAYEQUE',
    region: 'COSTA',
    provincias: [
      {
        id: '1401',
        nombre: 'CHICLAYO',
        distritos: [
          { ubigeo: '140101', departamento: 'LAMBAYEQUE', provincia: 'CHICLAYO', distrito: 'CHICLAYO', region: 'COSTA', poblacion: 310000, gpc: 0.78, tasaCrecimiento: 1.4, lat: -6.7713, lng: -79.8408, zoom: 13 },
          { ubigeo: '140105', departamento: 'LAMBAYEQUE', provincia: 'CHICLAYO', distrito: 'JOSÉ LEONARDO ORTIZ', region: 'COSTA', poblacion: 178000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -6.7589, lng: -79.835, zoom: 13 },
          { ubigeo: '140106', departamento: 'LAMBAYEQUE', provincia: 'CHICLAYO', distrito: 'LA VICTORIA', region: 'COSTA', poblacion: 98000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -6.7919, lng: -79.8419, zoom: 13 },
          { ubigeo: '140108', departamento: 'LAMBAYEQUE', provincia: 'CHICLAYO', distrito: 'MONSEFÚ', region: 'COSTA', poblacion: 34000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -6.8789, lng: -79.8689, zoom: 13 },
          { ubigeo: '140112', departamento: 'LAMBAYEQUE', provincia: 'CHICLAYO', distrito: 'PIMENTEL', region: 'COSTA', poblacion: 48000, gpc: 0.75, tasaCrecimiento: 1.4, lat: -6.835, lng: -79.935, zoom: 13 },
        ]
      },
      {
        id: '1402',
        nombre: 'FERREÑAFE',
        distritos: [
          { ubigeo: '140201', departamento: 'LAMBAYEQUE', provincia: 'FERREÑAFE', distrito: 'FERREÑAFE', region: 'COSTA', poblacion: 38000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -6.6389, lng: -79.7889, zoom: 13 },
          { ubigeo: '140206', departamento: 'LAMBAYEQUE', provincia: 'FERREÑAFE', distrito: 'PÍTIPO', region: 'COSTA', poblacion: 22000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -6.5819, lng: -79.745, zoom: 13 },
        ]
      },
      {
        id: '1403',
        nombre: 'LAMBAYEQUE',
        distritos: [
          { ubigeo: '140301', departamento: 'LAMBAYEQUE', provincia: 'LAMBAYEQUE', distrito: 'LAMBAYEQUE', region: 'COSTA', poblacion: 82000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -6.7039, lng: -79.905, zoom: 13 },
          { ubigeo: '140307', departamento: 'LAMBAYEQUE', provincia: 'LAMBAYEQUE', distrito: 'MOTUPE', region: 'COSTA', poblacion: 31000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -6.1519, lng: -79.715, zoom: 13 },
          { ubigeo: '140308', departamento: 'LAMBAYEQUE', provincia: 'LAMBAYEQUE', distrito: 'OLMOS', region: 'COSTA', poblacion: 45000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -5.985, lng: -79.745, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '15',
    nombre: 'LIMA',
    region: 'COSTA',
    provincias: [
      {
        id: '1501',
        nombre: 'LIMA METROPOLITANA',
        distritos: [
          { ubigeo: '150101', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'LIMA (CERCADO)', region: 'COSTA', poblacion: 280000, gpc: 0.88, tasaCrecimiento: 1.4, lat: -12.0463, lng: -77.0427, zoom: 13 },
          { ubigeo: '150132', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'SAN JUAN DE LURIGANCHO', region: 'COSTA', poblacion: 1150000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -11.9889, lng: -77.0019, zoom: 13 },
          { ubigeo: '150135', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'SAN MARTÍN DE PORRES', region: 'COSTA', poblacion: 740000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -12.015, lng: -77.065, zoom: 13 },
          { ubigeo: '150103', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'ATE (VITARTE)', region: 'COSTA', poblacion: 680000, gpc: 0.75, tasaCrecimiento: 1.4, lat: -12.025, lng: -76.9189, zoom: 13 },
          { ubigeo: '150112', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'INDEPENDENCIA', region: 'COSTA', poblacion: 225000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -11.995, lng: -77.0519, zoom: 13 },
          { ubigeo: '150119', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'LURÍN', region: 'COSTA', poblacion: 110000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -12.275, lng: -76.8719, zoom: 13 },
          { ubigeo: '150142', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'VILLA EL SALVADOR', region: 'COSTA', poblacion: 435000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -12.215, lng: -76.935, zoom: 13 },
          { ubigeo: '150143', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'VILLA MARÍA DEL TRIUNFO', region: 'COSTA', poblacion: 420000, gpc: 0.71, tasaCrecimiento: 1.4, lat: -12.1619, lng: -76.9389, zoom: 13 },
        ]
      },
      {
        id: '1502',
        nombre: 'BARRANCA',
        distritos: [
          { ubigeo: '150201', departamento: 'LIMA', provincia: 'BARRANCA', distrito: 'BARRANCA', region: 'COSTA', poblacion: 72000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -10.7519, lng: -77.7619, zoom: 13 },
          { ubigeo: '150204', departamento: 'LIMA', provincia: 'BARRANCA', distrito: 'PATIVILCA', region: 'COSTA', poblacion: 21000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -10.6989, lng: -77.785, zoom: 13 },
          { ubigeo: '150205', departamento: 'LIMA', provincia: 'BARRANCA', distrito: 'SUPE (CARAL)', region: 'COSTA', poblacion: 28000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -10.7989, lng: -77.7119, zoom: 13 },
        ]
      },
      {
        id: '1505',
        nombre: 'CAÑETE',
        distritos: [
          { ubigeo: '150501', departamento: 'LIMA', provincia: 'CAÑETE', distrito: 'SAN VICENTE DE CAÑETE', region: 'COSTA', poblacion: 58000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -13.0789, lng: -76.385, zoom: 13 },
          { ubigeo: '150507', departamento: 'LIMA', provincia: 'CAÑETE', distrito: 'IMPERIAL', region: 'COSTA', poblacion: 41000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -13.0619, lng: -76.3539, zoom: 13 },
          { ubigeo: '150509', departamento: 'LIMA', provincia: 'CAÑETE', distrito: 'MALA', region: 'COSTA', poblacion: 34000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -12.6589, lng: -76.6319, zoom: 13 },
          { ubigeo: '150504', departamento: 'LIMA', provincia: 'CAÑETE', distrito: 'CHILCA', region: 'COSTA', poblacion: 22000, gpc: 0.75, tasaCrecimiento: 1.4, lat: -12.5219, lng: -76.7389, zoom: 13 },
        ]
      },
      {
        id: '1506',
        nombre: 'HUARAL',
        distritos: [
          { ubigeo: '150601', departamento: 'LIMA', provincia: 'HUARAL', distrito: 'HUARAL', region: 'COSTA', poblacion: 98000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -11.495, lng: -77.2089, zoom: 13 },
          { ubigeo: '150604', departamento: 'LIMA', provincia: 'HUARAL', distrito: 'CHANCAY', region: 'COSTA', poblacion: 62000, gpc: 0.78, tasaCrecimiento: 1.4, lat: -11.5689, lng: -77.2689, zoom: 13 },
        ]
      },
      {
        id: '1508',
        nombre: 'HUAURA',
        distritos: [
          { ubigeo: '150801', departamento: 'LIMA', provincia: 'HUAURA', distrito: 'HUACHO', region: 'COSTA', poblacion: 68000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -11.1089, lng: -77.605, zoom: 13 },
          { ubigeo: '150806', departamento: 'LIMA', provincia: 'HUAURA', distrito: 'HUAURA', region: 'COSTA', poblacion: 38000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -11.0719, lng: -77.5989, zoom: 13 },
        ]
      },
      {
        id: '1507',
        nombre: 'HUAROCHIRÍ',
        distritos: [
          { ubigeo: '150701', departamento: 'LIMA', provincia: 'HUAROCHIRÍ', distrito: 'MATUCANA', region: 'COSTA', poblacion: 5800, gpc: 0.58, tasaCrecimiento: 1.4, lat: -11.8439, lng: -76.3819, zoom: 13 },
          { ubigeo: '150706', departamento: 'LIMA', provincia: 'HUAROCHIRÍ', distrito: 'CHOSICA / SANTA EULALIA', region: 'COSTA', poblacion: 16000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -11.8989, lng: -76.6619, zoom: 13 },
        ]
      },
      {
        id: '1503',
        nombre: 'CAJATAMBO',
        distritos: [
          { ubigeo: '150301', departamento: 'LIMA', provincia: 'CAJATAMBO', distrito: 'CAJATAMBO', region: 'COSTA', poblacion: 2800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -10.4719, lng: -76.9939, zoom: 13 },
        ]
      },
      {
        id: '1504',
        nombre: 'CANTA',
        distritos: [
          { ubigeo: '150401', departamento: 'LIMA', provincia: 'CANTA', distrito: 'CANTA', region: 'COSTA', poblacion: 3400, gpc: 0.55, tasaCrecimiento: 1.4, lat: -11.4689, lng: -76.6239, zoom: 13 },
        ]
      },
      {
        id: '1509',
        nombre: 'OYÓN',
        distritos: [
          { ubigeo: '150901', departamento: 'LIMA', provincia: 'OYÓN', distrito: 'OYÓN', region: 'COSTA', poblacion: 12500, gpc: 0.62, tasaCrecimiento: 1.4, lat: -10.6689, lng: -76.7719, zoom: 13 },
        ]
      },
      {
        id: '1510',
        nombre: 'YAUYOS',
        distritos: [
          { ubigeo: '151001', departamento: 'LIMA', provincia: 'YAUYOS', distrito: 'YAUYOS', region: 'COSTA', poblacion: 2100, gpc: 0.5, tasaCrecimiento: 1.4, lat: -12.4589, lng: -75.9189, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '20',
    nombre: 'PIURA',
    region: 'COSTA',
    provincias: [
      {
        id: '2001',
        nombre: 'PIURA',
        distritos: [
          { ubigeo: '200101', departamento: 'PIURA', provincia: 'PIURA', distrito: 'PIURA', region: 'COSTA', poblacion: 185000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -5.1944, lng: -80.6328, zoom: 13 },
          { ubigeo: '200104', departamento: 'PIURA', provincia: 'PIURA', distrito: 'CASTILLA', region: 'COSTA', poblacion: 175000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -5.185, lng: -80.615, zoom: 13 },
          { ubigeo: '200105', departamento: 'PIURA', provincia: 'PIURA', distrito: 'CATACAOS', region: 'COSTA', poblacion: 78000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -5.265, lng: -80.675, zoom: 13 },
          { ubigeo: '200115', departamento: 'PIURA', provincia: 'PIURA', distrito: 'VEINTISÉIS DE OCTUBRE', region: 'COSTA', poblacion: 185000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -5.175, lng: -80.665, zoom: 13 },
        ]
      },
      {
        id: '2006',
        nombre: 'SULLANA',
        distritos: [
          { ubigeo: '200601', departamento: 'PIURA', provincia: 'SULLANA', distrito: 'SULLANA', region: 'COSTA', poblacion: 185000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -4.8989, lng: -80.685, zoom: 13 },
          { ubigeo: '200602', departamento: 'PIURA', provincia: 'SULLANA', distrito: 'BELLAVISTA', region: 'COSTA', poblacion: 42000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -4.885, lng: -80.675, zoom: 13 },
        ]
      },
      {
        id: '2007',
        nombre: 'TALARA',
        distritos: [
          { ubigeo: '200701', departamento: 'PIURA', provincia: 'TALARA', distrito: 'PARIÑAS (TALARA)', region: 'COSTA', poblacion: 98000, gpc: 0.78, tasaCrecimiento: 1.4, lat: -4.5789, lng: -81.2719, zoom: 13 },
          { ubigeo: '200705', departamento: 'PIURA', provincia: 'TALARA', distrito: 'MÁNCORA', region: 'COSTA', poblacion: 15000, gpc: 0.85, tasaCrecimiento: 1.4, lat: -4.1069, lng: -81.0489, zoom: 13 },
        ]
      },
      {
        id: '2005',
        nombre: 'PAITA',
        distritos: [
          { ubigeo: '200501', departamento: 'PIURA', provincia: 'PAITA', distrito: 'PAITA', region: 'COSTA', poblacion: 92000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -5.0889, lng: -81.1089, zoom: 13 },
        ]
      },
      {
        id: '2008',
        nombre: 'SECHURA',
        distritos: [
          { ubigeo: '200801', departamento: 'PIURA', provincia: 'SECHURA', distrito: 'SECHURA', region: 'COSTA', poblacion: 48000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -5.5589, lng: -80.8239, zoom: 13 },
        ]
      },
      {
        id: '2004',
        nombre: 'MORROPÓN',
        distritos: [
          { ubigeo: '200401', departamento: 'PIURA', provincia: 'MORROPÓN', distrito: 'CHULUCANAS', region: 'COSTA', poblacion: 88000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -5.095, lng: -80.1619, zoom: 13 },
        ]
      },
      {
        id: '2002',
        nombre: 'AYABACA',
        distritos: [
          { ubigeo: '200201', departamento: 'PIURA', provincia: 'AYABACA', distrito: 'AYABACA', region: 'COSTA', poblacion: 38000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -4.6389, lng: -79.715, zoom: 13 },
        ]
      },
      {
        id: '2003',
        nombre: 'HUANCABAMBA',
        distritos: [
          { ubigeo: '200301', departamento: 'PIURA', provincia: 'HUANCABAMBA', distrito: 'HUANCABAMBA', region: 'COSTA', poblacion: 34000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -5.2389, lng: -79.45, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '12',
    nombre: 'JUNÍN',
    region: 'SIERRA',
    provincias: [
      {
        id: '1201',
        nombre: 'HUANCAYO',
        distritos: [
          { ubigeo: '120101', departamento: 'JUNÍN', provincia: 'HUANCAYO', distrito: 'HUANCAYO', region: 'SIERRA', poblacion: 125000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -12.0651, lng: -75.2048, zoom: 13 },
          { ubigeo: '120114', departamento: 'JUNÍN', provincia: 'HUANCAYO', distrito: 'EL TAMBO', region: 'SIERRA', poblacion: 175000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -12.0489, lng: -75.2219, zoom: 13 },
          { ubigeo: '120107', departamento: 'JUNÍN', provincia: 'HUANCAYO', distrito: 'CHILCA', region: 'SIERRA', poblacion: 98000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -12.0819, lng: -75.195, zoom: 13 },
        ]
      },
      {
        id: '1203',
        nombre: 'CHANCHAMAYO',
        distritos: [
          { ubigeo: '120301', departamento: 'JUNÍN', provincia: 'CHANCHAMAYO', distrito: 'LA MERCED (CHANCHAMAYO)', region: 'SIERRA', poblacion: 32000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -11.055, lng: -75.3289, zoom: 13 },
          { ubigeo: '120305', departamento: 'JUNÍN', provincia: 'CHANCHAMAYO', distrito: 'SAN RAMÓN', region: 'SIERRA', poblacion: 28000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -11.125, lng: -75.3569, zoom: 13 },
        ]
      },
      {
        id: '1206',
        nombre: 'SATIPO',
        distritos: [
          { ubigeo: '120601', departamento: 'JUNÍN', provincia: 'SATIPO', distrito: 'SATIPO', region: 'SIERRA', poblacion: 42000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -11.2539, lng: -74.6819, zoom: 13 },
        ]
      },
      {
        id: '1207',
        nombre: 'TARMA',
        distritos: [
          { ubigeo: '120701', departamento: 'JUNÍN', provincia: 'TARMA', distrito: 'TARMA', region: 'SIERRA', poblacion: 55000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -11.4189, lng: -75.6889, zoom: 13 },
        ]
      },
      {
        id: '1204',
        nombre: 'JAUJA',
        distritos: [
          { ubigeo: '120401', departamento: 'JUNÍN', provincia: 'JAUJA', distrito: 'JAUJA', region: 'SIERRA', poblacion: 31000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -11.775, lng: -75.4989, zoom: 13 },
        ]
      },
      {
        id: '1208',
        nombre: 'YAULI',
        distritos: [
          { ubigeo: '120801', departamento: 'JUNÍN', provincia: 'YAULI', distrito: 'LA OROYA', region: 'SIERRA', poblacion: 22000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -11.5289, lng: -75.9089, zoom: 13 },
        ]
      },
      {
        id: '1202',
        nombre: 'CONCEPCIÓN',
        distritos: [
          { ubigeo: '120201', departamento: 'JUNÍN', provincia: 'CONCEPCIÓN', distrito: 'CONCEPCIÓN', region: 'SIERRA', poblacion: 16000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -11.9189, lng: -75.3119, zoom: 13 },
        ]
      },
      {
        id: '1209',
        nombre: 'CHUPACA',
        distritos: [
          { ubigeo: '120901', departamento: 'JUNÍN', provincia: 'CHUPACA', distrito: 'CHUPACA', region: 'SIERRA', poblacion: 24000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -12.0619, lng: -75.285, zoom: 13 },
        ]
      },
      {
        id: '1205',
        nombre: 'JUNÍN',
        distritos: [
          { ubigeo: '120501', departamento: 'JUNÍN', provincia: 'JUNÍN', distrito: 'JUNÍN', region: 'SIERRA', poblacion: 12000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -11.1589, lng: -75.9939, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '21',
    nombre: 'PUNO',
    region: 'SIERRA',
    provincias: [
      {
        id: '2101',
        nombre: 'PUNO',
        distritos: [
          { ubigeo: '210101', departamento: 'PUNO', provincia: 'PUNO', distrito: 'PUNO', region: 'SIERRA', poblacion: 142000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -15.8422, lng: -70.0199, zoom: 13 },
          { ubigeo: '210102', departamento: 'PUNO', provincia: 'PUNO', distrito: 'ACORA', region: 'SIERRA', poblacion: 28000, gpc: 0.54, tasaCrecimiento: 1.4, lat: -15.975, lng: -69.805, zoom: 13 },
        ]
      },
      {
        id: '2111',
        nombre: 'SAN ROMÁN',
        distritos: [
          { ubigeo: '211101', departamento: 'PUNO', provincia: 'SAN ROMÁN', distrito: 'JULIACA', region: 'SIERRA', poblacion: 310000, gpc: 0.75, tasaCrecimiento: 1.4, lat: -15.495, lng: -70.1319, zoom: 13 },
          { ubigeo: '211104', departamento: 'PUNO', provincia: 'SAN ROMÁN', distrito: 'SAN MIGUEL', region: 'SIERRA', poblacion: 68000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -15.4819, lng: -70.145, zoom: 13 },
        ]
      },
      {
        id: '2102',
        nombre: 'AZÁNGARO',
        distritos: [
          { ubigeo: '210201', departamento: 'PUNO', provincia: 'AZÁNGARO', distrito: 'AZÁNGARO', region: 'SIERRA', poblacion: 32000, gpc: 0.55, tasaCrecimiento: 1.4, lat: -14.9089, lng: -70.1989, zoom: 13 },
        ]
      },
      {
        id: '2103',
        nombre: 'CARABAYA',
        distritos: [
          { ubigeo: '210301', departamento: 'PUNO', provincia: 'CARABAYA', distrito: 'MACUSANI', region: 'SIERRA', poblacion: 14000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -14.0689, lng: -70.4319, zoom: 13 },
        ]
      },
      {
        id: '2104',
        nombre: 'CHUCUITO',
        distritos: [
          { ubigeo: '210401', departamento: 'PUNO', provincia: 'CHUCUITO', distrito: 'JULI', region: 'SIERRA', poblacion: 24000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -16.215, lng: -69.4589, zoom: 13 },
        ]
      },
      {
        id: '2105',
        nombre: 'EL COLLAO',
        distritos: [
          { ubigeo: '210501', departamento: 'PUNO', provincia: 'EL COLLAO', distrito: 'ILAVE', region: 'SIERRA', poblacion: 58000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -16.085, lng: -69.6389, zoom: 13 },
        ]
      },
      {
        id: '2106',
        nombre: 'HUANCANÉ',
        distritos: [
          { ubigeo: '210601', departamento: 'PUNO', provincia: 'HUANCANÉ', distrito: 'HUANCANÉ', region: 'SIERRA', poblacion: 22000, gpc: 0.54, tasaCrecimiento: 1.4, lat: -15.2019, lng: -69.7619, zoom: 13 },
        ]
      },
      {
        id: '2107',
        nombre: 'LAMPA',
        distritos: [
          { ubigeo: '210701', departamento: 'PUNO', provincia: 'LAMPA', distrito: 'LAMPA', region: 'SIERRA', poblacion: 12500, gpc: 0.54, tasaCrecimiento: 1.4, lat: -15.3619, lng: -70.3689, zoom: 13 },
        ]
      },
      {
        id: '2108',
        nombre: 'MELGAR',
        distritos: [
          { ubigeo: '210801', departamento: 'PUNO', provincia: 'MELGAR', distrito: 'AYAVIRI', region: 'SIERRA', poblacion: 26000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -14.8819, lng: -70.5889, zoom: 13 },
        ]
      },
      {
        id: '2109',
        nombre: 'MOHO',
        distritos: [
          { ubigeo: '210901', departamento: 'PUNO', provincia: 'MOHO', distrito: 'MOHO', region: 'SIERRA', poblacion: 18000, gpc: 0.52, tasaCrecimiento: 1.4, lat: -15.3589, lng: -69.4989, zoom: 13 },
        ]
      },
      {
        id: '2110',
        nombre: 'SAN ANTONIO DE PUTINA',
        distritos: [
          { ubigeo: '211001', departamento: 'PUNO', provincia: 'SAN ANTONIO DE PUTINA', distrito: 'PUTINA', region: 'SIERRA', poblacion: 16000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -14.9139, lng: -69.8719, zoom: 13 },
        ]
      },
      {
        id: '2112',
        nombre: 'SANDIA',
        distritos: [
          { ubigeo: '211201', departamento: 'PUNO', provincia: 'SANDIA', distrito: 'SANDIA', region: 'SIERRA', poblacion: 11500, gpc: 0.54, tasaCrecimiento: 1.4, lat: -14.3319, lng: -69.4289, zoom: 13 },
        ]
      },
      {
        id: '2113',
        nombre: 'YUNGUYO',
        distritos: [
          { ubigeo: '211301', departamento: 'PUNO', provincia: 'YUNGUYO', distrito: 'YUNGUYO', region: 'SIERRA', poblacion: 29000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -16.2419, lng: -69.0919, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '16',
    nombre: 'LORETO',
    region: 'SELVA',
    provincias: [
      {
        id: '1601',
        nombre: 'MAYNAS',
        distritos: [
          { ubigeo: '160101', departamento: 'LORETO', provincia: 'MAYNAS', distrito: 'IQUITOS', region: 'SELVA', poblacion: 160000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -3.7491, lng: -73.2538, zoom: 13 },
          { ubigeo: '160108', departamento: 'LORETO', provincia: 'MAYNAS', distrito: 'PUNCHANA', region: 'SELVA', poblacion: 92000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -3.725, lng: -73.245, zoom: 13 },
          { ubigeo: '160112', departamento: 'LORETO', provincia: 'MAYNAS', distrito: 'BELÉN', region: 'SELVA', poblacion: 78000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -3.7689, lng: -73.2589, zoom: 13 },
          { ubigeo: '160113', departamento: 'LORETO', provincia: 'MAYNAS', distrito: 'SAN JUAN BAUTISTA', region: 'SELVA', poblacion: 145000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -3.785, lng: -73.2919, zoom: 13 },
        ]
      },
      {
        id: '1602',
        nombre: 'ALTO AMAZONAS',
        distritos: [
          { ubigeo: '160201', departamento: 'LORETO', provincia: 'ALTO AMAZONAS', distrito: 'YURIMAGUAS', region: 'SELVA', poblacion: 72000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -5.9019, lng: -76.1089, zoom: 13 },
        ]
      },
      {
        id: '1603',
        nombre: 'LORETO',
        distritos: [
          { ubigeo: '160301', departamento: 'LORETO', provincia: 'LORETO', distrito: 'NAUTA', region: 'SELVA', poblacion: 32000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -4.5089, lng: -73.575, zoom: 13 },
        ]
      },
      {
        id: '1604',
        nombre: 'MARISCAL RAMÓN CASTILLA',
        distritos: [
          { ubigeo: '160401', departamento: 'LORETO', provincia: 'MARISCAL RAMÓN CASTILLA', distrito: 'RAMÓN CASTILLA (CABALLOCOCHA)', region: 'SELVA', poblacion: 26000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -3.905, lng: -70.5189, zoom: 13 },
        ]
      },
      {
        id: '1605',
        nombre: 'REQUENA',
        distritos: [
          { ubigeo: '160501', departamento: 'LORETO', provincia: 'REQUENA', distrito: 'REQUENA', region: 'SELVA', poblacion: 28000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -5.0589, lng: -73.845, zoom: 13 },
        ]
      },
      {
        id: '1606',
        nombre: 'UCAYALI',
        distritos: [
          { ubigeo: '160601', departamento: 'LORETO', provincia: 'UCAYALI', distrito: 'CONTAMANA', region: 'SELVA', poblacion: 24000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -7.355, lng: -75.0119, zoom: 13 },
        ]
      },
      {
        id: '1607',
        nombre: 'DATEM DEL MARAÑÓN',
        distritos: [
          { ubigeo: '160701', departamento: 'LORETO', provincia: 'DATEM DEL MARAÑÓN', distrito: 'BARRANCA (SAN LORENZO)', region: 'SELVA', poblacion: 16000, gpc: 0.55, tasaCrecimiento: 1.4, lat: -4.825, lng: -76.5819, zoom: 13 },
        ]
      },
      {
        id: '1608',
        nombre: 'PUTUMAYO',
        distritos: [
          { ubigeo: '160801', departamento: 'LORETO', provincia: 'PUTUMAYO', distrito: 'PUTUMAYO (SAN ANTONIO DEL ESTRECHO)', region: 'SELVA', poblacion: 8500, gpc: 0.52, tasaCrecimiento: 1.4, lat: -2.45, lng: -72.6667, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '22',
    nombre: 'SAN MARTÍN',
    region: 'SELVA',
    provincias: [
      {
        id: '2209',
        nombre: 'SAN MARTÍN',
        distritos: [
          { ubigeo: '220901', departamento: 'SAN MARTÍN', provincia: 'SAN MARTÍN', distrito: 'TARAPOTO', region: 'SELVA', poblacion: 110000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -6.4889, lng: -76.365, zoom: 13 },
          { ubigeo: '220910', departamento: 'SAN MARTÍN', provincia: 'SAN MARTÍN', distrito: 'MORALES', region: 'SELVA', poblacion: 38000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -6.475, lng: -76.3889, zoom: 13 },
          { ubigeo: '220903', departamento: 'SAN MARTÍN', provincia: 'SAN MARTÍN', distrito: 'LA BANDA DE SHILCAYO', region: 'SELVA', poblacion: 48000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -6.495, lng: -76.345, zoom: 13 },
        ]
      },
      {
        id: '2201',
        nombre: 'MOYOBAMBA',
        distritos: [
          { ubigeo: '220101', departamento: 'SAN MARTÍN', provincia: 'MOYOBAMBA', distrito: 'MOYOBAMBA', region: 'SELVA', poblacion: 88000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -6.035, lng: -76.9719, zoom: 13 },
        ]
      },
      {
        id: '2208',
        nombre: 'RIOJA',
        distritos: [
          { ubigeo: '220801', departamento: 'SAN MARTÍN', provincia: 'RIOJA', distrito: 'RIOJA', region: 'SELVA', poblacion: 32000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -6.0619, lng: -77.1689, zoom: 13 },
        ]
      },
      {
        id: '2210',
        nombre: 'TOCACHE',
        distritos: [
          { ubigeo: '221001', departamento: 'SAN MARTÍN', provincia: 'TOCACHE', distrito: 'TOCACHE', region: 'SELVA', poblacion: 34000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -8.1889, lng: -76.5189, zoom: 13 },
        ]
      },
      {
        id: '2206',
        nombre: 'MARISCAL CÁCERES',
        distritos: [
          { ubigeo: '220601', departamento: 'SAN MARTÍN', provincia: 'MARISCAL CÁCERES', distrito: 'JUANJUÍ', region: 'SELVA', poblacion: 39000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -7.175, lng: -76.7289, zoom: 13 },
        ]
      },
      {
        id: '2202',
        nombre: 'BELLAVISTA',
        distritos: [
          { ubigeo: '220201', departamento: 'SAN MARTÍN', provincia: 'BELLAVISTA', distrito: 'BELLAVISTA', region: 'SELVA', poblacion: 26000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -7.0589, lng: -76.585, zoom: 13 },
        ]
      },
      {
        id: '2205',
        nombre: 'LAMAS',
        distritos: [
          { ubigeo: '220501', departamento: 'SAN MARTÍN', provincia: 'LAMAS', distrito: 'LAMAS', region: 'SELVA', poblacion: 16500, gpc: 0.6, tasaCrecimiento: 1.4, lat: -6.4219, lng: -76.515, zoom: 13 },
        ]
      },
      {
        id: '2207',
        nombre: 'PICOTA',
        distritos: [
          { ubigeo: '220701', departamento: 'SAN MARTÍN', provincia: 'PICOTA', distrito: 'PICOTA', region: 'SELVA', poblacion: 12000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -6.9189, lng: -76.3319, zoom: 13 },
        ]
      },
      {
        id: '2203',
        nombre: 'EL DORADO',
        distritos: [
          { ubigeo: '220301', departamento: 'SAN MARTÍN', provincia: 'EL DORADO', distrito: 'SAN JOSÉ DE SISA', region: 'SELVA', poblacion: 18000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -6.6189, lng: -76.695, zoom: 13 },
        ]
      },
      {
        id: '2204',
        nombre: 'HUALLAGA',
        distritos: [
          { ubigeo: '220401', departamento: 'SAN MARTÍN', provincia: 'HUALLAGA', distrito: 'SAPOSOA', region: 'SELVA', poblacion: 14000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -6.935, lng: -76.7719, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '11',
    nombre: 'ICA',
    region: 'COSTA',
    provincias: [
      {
        id: '1101',
        nombre: 'ICA',
        distritos: [
          { ubigeo: '110101', departamento: 'ICA', provincia: 'ICA', distrito: 'ICA', region: 'COSTA', poblacion: 160000, gpc: 0.78, tasaCrecimiento: 1.4, lat: -14.0678, lng: -75.7286, zoom: 13 },
          { ubigeo: '110107', departamento: 'ICA', provincia: 'ICA', distrito: 'PARCONA', region: 'COSTA', poblacion: 58000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -14.055, lng: -75.705, zoom: 13 },
          { ubigeo: '110112', departamento: 'ICA', provincia: 'ICA', distrito: 'SUBTANJALLA', region: 'COSTA', poblacion: 34000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -14.025, lng: -75.7589, zoom: 13 },
        ]
      },
      {
        id: '1102',
        nombre: 'CHINCHA',
        distritos: [
          { ubigeo: '110201', departamento: 'ICA', provincia: 'CHINCHA', distrito: 'CHINCHA ALTA', region: 'COSTA', poblacion: 74000, gpc: 0.75, tasaCrecimiento: 1.4, lat: -13.4189, lng: -76.1319, zoom: 13 },
          { ubigeo: '110203', departamento: 'ICA', provincia: 'CHINCHA', distrito: 'CHINCHA BAJA', region: 'COSTA', poblacion: 14500, gpc: 0.68, tasaCrecimiento: 1.4, lat: -13.4589, lng: -76.1619, zoom: 13 },
          { ubigeo: '110205', departamento: 'ICA', provincia: 'CHINCHA', distrito: 'GROCIO PRADO', region: 'COSTA', poblacion: 26000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -13.3989, lng: -76.155, zoom: 13 },
          { ubigeo: '110207', departamento: 'ICA', provincia: 'CHINCHA', distrito: 'PUEBLO NUEVO', region: 'COSTA', poblacion: 65000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -13.4089, lng: -76.1289, zoom: 13 },
        ]
      },
      {
        id: '1105',
        nombre: 'PISCO',
        distritos: [
          { ubigeo: '110501', departamento: 'ICA', provincia: 'PISCO', distrito: 'PISCO', region: 'COSTA', poblacion: 72000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -13.7119, lng: -76.205, zoom: 13 },
          { ubigeo: '110505', departamento: 'ICA', provincia: 'PISCO', distrito: 'PARACAS', region: 'COSTA', poblacion: 9500, gpc: 0.85, tasaCrecimiento: 1.4, lat: -13.835, lng: -76.2519, zoom: 13 },
          { ubigeo: '110506', departamento: 'ICA', provincia: 'PISCO', distrito: 'SAN ANDRÉS', region: 'COSTA', poblacion: 16000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -13.7389, lng: -76.2189, zoom: 13 },
        ]
      },
      {
        id: '1103',
        nombre: 'NAZCA',
        distritos: [
          { ubigeo: '110301', departamento: 'ICA', provincia: 'NAZCA', distrito: 'NAZCA', region: 'COSTA', poblacion: 31000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -14.8319, lng: -74.9389, zoom: 13 },
          { ubigeo: '110303', departamento: 'ICA', provincia: 'NAZCA', distrito: 'MARCONA (SAN JUAN)', region: 'COSTA', poblacion: 18500, gpc: 0.76, tasaCrecimiento: 1.4, lat: -15.345, lng: -75.1619, zoom: 13 },
        ]
      },
      {
        id: '1104',
        nombre: 'PALPA',
        distritos: [
          { ubigeo: '110401', departamento: 'ICA', provincia: 'PALPA', distrito: 'PALPA', region: 'COSTA', poblacion: 7800, gpc: 0.62, tasaCrecimiento: 1.4, lat: -14.5319, lng: -75.185, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '10',
    nombre: 'HUÁNUCO',
    region: 'SIERRA',
    provincias: [
      {
        id: '1001',
        nombre: 'HUÁNUCO',
        distritos: [
          { ubigeo: '100101', departamento: 'HUÁNUCO', provincia: 'HUÁNUCO', distrito: 'HUÁNUCO', region: 'SIERRA', poblacion: 98000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -9.9306, lng: -76.2422, zoom: 13 },
          { ubigeo: '100102', departamento: 'HUÁNUCO', provincia: 'HUÁNUCO', distrito: 'AMARILIS', region: 'SIERRA', poblacion: 88000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -9.9489, lng: -76.2319, zoom: 13 },
          { ubigeo: '100111', departamento: 'HUÁNUCO', provincia: 'HUÁNUCO', distrito: 'PILLCO MARCA', region: 'SIERRA', poblacion: 42000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -9.9689, lng: -76.2419, zoom: 13 },
        ]
      },
      {
        id: '1006',
        nombre: 'LEONCIO PRADO',
        distritos: [
          { ubigeo: '100601', departamento: 'HUÁNUCO', provincia: 'LEONCIO PRADO', distrito: 'RUPA-RUPA (TINGO MARÍA)', region: 'SIERRA', poblacion: 68000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -9.2989, lng: -75.9989, zoom: 13 },
        ]
      },
      {
        id: '1002',
        nombre: 'AMBO',
        distritos: [
          { ubigeo: '100201', departamento: 'HUÁNUCO', provincia: 'AMBO', distrito: 'AMBO', region: 'SIERRA', poblacion: 18000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -10.1319, lng: -76.205, zoom: 13 },
        ]
      },
      {
        id: '1003',
        nombre: 'DOS DE MAYO',
        distritos: [
          { ubigeo: '100301', departamento: 'HUÁNUCO', provincia: 'DOS DE MAYO', distrito: 'LA UNIÓN', region: 'SIERRA', poblacion: 12000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -9.8289, lng: -76.8019, zoom: 13 },
        ]
      },
      {
        id: '1004',
        nombre: 'HUACAYBAMBA',
        distritos: [
          { ubigeo: '100401', departamento: 'HUÁNUCO', provincia: 'HUACAYBAMBA', distrito: 'HUACAYBAMBA', region: 'SIERRA', poblacion: 6500, gpc: 0.52, tasaCrecimiento: 1.4, lat: -9.0389, lng: -76.9539, zoom: 13 },
        ]
      },
      {
        id: '1005',
        nombre: 'HUAMALÍES',
        distritos: [
          { ubigeo: '100501', departamento: 'HUÁNUCO', provincia: 'HUAMALÍES', distrito: 'LLATA', region: 'SIERRA', poblacion: 16000, gpc: 0.55, tasaCrecimiento: 1.4, lat: -9.55, lng: -76.8189, zoom: 13 },
        ]
      },
      {
        id: '1007',
        nombre: 'MARAÑÓN',
        distritos: [
          { ubigeo: '100701', departamento: 'HUÁNUCO', provincia: 'MARAÑÓN', distrito: 'HUACRACHUCO', region: 'SIERRA', poblacion: 12000, gpc: 0.54, tasaCrecimiento: 1.4, lat: -8.6089, lng: -77.1489, zoom: 13 },
        ]
      },
      {
        id: '1008',
        nombre: 'PACHITEA',
        distritos: [
          { ubigeo: '100801', departamento: 'HUÁNUCO', provincia: 'PACHITEA', distrito: 'PANAO', region: 'SIERRA', poblacion: 22000, gpc: 0.54, tasaCrecimiento: 1.4, lat: -9.8989, lng: -75.9989, zoom: 13 },
        ]
      },
      {
        id: '1009',
        nombre: 'PUERTO INCA',
        distritos: [
          { ubigeo: '100901', departamento: 'HUÁNUCO', provincia: 'PUERTO INCA', distrito: 'PUERTO INCA', region: 'SIERRA', poblacion: 14000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -9.3789, lng: -74.965, zoom: 13 },
        ]
      },
      {
        id: '1010',
        nombre: 'LAURICOCHA',
        distritos: [
          { ubigeo: '101001', departamento: 'HUÁNUCO', provincia: 'LAURICOCHA', distrito: 'JESÚS', region: 'SIERRA', poblacion: 7200, gpc: 0.52, tasaCrecimiento: 1.4, lat: -10.075, lng: -76.6319, zoom: 13 },
        ]
      },
      {
        id: '1011',
        nombre: 'YAROWILCA',
        distritos: [
          { ubigeo: '101101', departamento: 'HUÁNUCO', provincia: 'YAROWILCA', distrito: 'CHAVINILLO', region: 'SIERRA', poblacion: 6800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -9.855, lng: -76.6119, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '09',
    nombre: 'HUANCAVELICA',
    region: 'SIERRA',
    provincias: [
      {
        id: '0901',
        nombre: 'HUANCAVELICA',
        distritos: [
          { ubigeo: '090101', departamento: 'HUANCAVELICA', provincia: 'HUANCAVELICA', distrito: 'HUANCAVELICA', region: 'SIERRA', poblacion: 54000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -12.7872, lng: -74.9731, zoom: 13 },
          { ubigeo: '090102', departamento: 'HUANCAVELICA', provincia: 'HUANCAVELICA', distrito: 'ACOBAMBILLA', region: 'SIERRA', poblacion: 3800, gpc: 0.5, tasaCrecimiento: 1.4, lat: -12.6689, lng: -75.3319, zoom: 13 },
          { ubigeo: '090104', departamento: 'HUANCAVELICA', provincia: 'HUANCAVELICA', distrito: 'ASCENSIÓN', region: 'SIERRA', poblacion: 16000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -12.7819, lng: -74.9819, zoom: 13 },
        ]
      },
      {
        id: '0907',
        nombre: 'TAYACAJA',
        distritos: [
          { ubigeo: '090701', departamento: 'HUANCAVELICA', provincia: 'TAYACAJA', distrito: 'PAMPAS', region: 'SIERRA', poblacion: 14500, gpc: 0.58, tasaCrecimiento: 1.4, lat: -12.3989, lng: -74.8689, zoom: 13 },
        ]
      },
      {
        id: '0902',
        nombre: 'ACOBAMBA',
        distritos: [
          { ubigeo: '090201', departamento: 'HUANCAVELICA', provincia: 'ACOBAMBA', distrito: 'ACOBAMBA', region: 'SIERRA', poblacion: 12000, gpc: 0.54, tasaCrecimiento: 1.4, lat: -12.8419, lng: -74.5719, zoom: 13 },
        ]
      },
      {
        id: '0903',
        nombre: 'ANGARAES',
        distritos: [
          { ubigeo: '090301', departamento: 'HUANCAVELICA', provincia: 'ANGARAES', distrito: 'LIRCAY', region: 'SIERRA', poblacion: 26000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -12.9889, lng: -74.7219, zoom: 13 },
        ]
      },
      {
        id: '0904',
        nombre: 'CASTROVIRREYNA',
        distritos: [
          { ubigeo: '090401', departamento: 'HUANCAVELICA', provincia: 'CASTROVIRREYNA', distrito: 'CASTROVIRREYNA', region: 'SIERRA', poblacion: 3800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -13.2789, lng: -75.3189, zoom: 13 },
        ]
      },
      {
        id: '0905',
        nombre: 'CHURCAMPA',
        distritos: [
          { ubigeo: '090501', departamento: 'HUANCAVELICA', provincia: 'CHURCAMPA', distrito: 'CHURCAMPA', region: 'SIERRA', poblacion: 7200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -12.7419, lng: -74.3889, zoom: 13 },
        ]
      },
      {
        id: '0906',
        nombre: 'HUAYTARÁ',
        distritos: [
          { ubigeo: '090601', departamento: 'HUANCAVELICA', provincia: 'HUAYTARÁ', distrito: 'HUAYTARÁ', region: 'SIERRA', poblacion: 2800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -13.6039, lng: -75.3539, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '18',
    nombre: 'MOQUEGUA',
    region: 'COSTA',
    provincias: [
      {
        id: '1801',
        nombre: 'MARISCAL NIETO',
        distritos: [
          { ubigeo: '180101', departamento: 'MOQUEGUA', provincia: 'MARISCAL NIETO', distrito: 'MOQUEGUA', region: 'COSTA', poblacion: 68000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -17.1939, lng: -70.9339, zoom: 13 },
          { ubigeo: '180106', departamento: 'MOQUEGUA', provincia: 'MARISCAL NIETO', distrito: 'SAMEGUA', region: 'COSTA', poblacion: 11500, gpc: 0.7, tasaCrecimiento: 1.4, lat: -17.175, lng: -70.8989, zoom: 13 },
          { ubigeo: '180105', departamento: 'MOQUEGUA', provincia: 'MARISCAL NIETO', distrito: 'SAN ANTONIO', region: 'COSTA', poblacion: 18000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -17.205, lng: -70.925, zoom: 13 },
        ]
      },
      {
        id: '1802',
        nombre: 'GENERAL SÁNCHEZ CERRO',
        distritos: [
          { ubigeo: '180201', departamento: 'MOQUEGUA', provincia: 'GENERAL SÁNCHEZ CERRO', distrito: 'OMATE', region: 'COSTA', poblacion: 4200, gpc: 0.56, tasaCrecimiento: 1.4, lat: -16.6739, lng: -70.9689, zoom: 13 },
        ]
      },
      {
        id: '1803',
        nombre: 'ILO',
        distritos: [
          { ubigeo: '180301', departamento: 'MOQUEGUA', provincia: 'ILO', distrito: 'ILO', region: 'COSTA', poblacion: 78000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -17.645, lng: -71.3419, zoom: 13 },
          { ubigeo: '180303', departamento: 'MOQUEGUA', provincia: 'ILO', distrito: 'PACOCHA', region: 'COSTA', poblacion: 5600, gpc: 0.78, tasaCrecimiento: 1.4, lat: -17.595, lng: -71.3319, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '19',
    nombre: 'PASCO',
    region: 'SIERRA',
    provincias: [
      {
        id: '1901',
        nombre: 'PASCO',
        distritos: [
          { ubigeo: '190101', departamento: 'PASCO', provincia: 'PASCO', distrito: 'CHAUPIMARCA (CERRO DE PASCO)', region: 'SIERRA', poblacion: 34000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -10.6839, lng: -76.255, zoom: 13 },
          { ubigeo: '190113', departamento: 'PASCO', provincia: 'PASCO', distrito: 'YANACANCHA', region: 'SIERRA', poblacion: 32000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -10.655, lng: -76.2419, zoom: 13 },
        ]
      },
      {
        id: '1903',
        nombre: 'OXAPAMPA',
        distritos: [
          { ubigeo: '190301', departamento: 'PASCO', provincia: 'OXAPAMPA', distrito: 'OXAPAMPA', region: 'SIERRA', poblacion: 22000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -10.575, lng: -75.4019, zoom: 13 },
          { ubigeo: '190306', departamento: 'PASCO', provincia: 'OXAPAMPA', distrito: 'POZUZO', region: 'SIERRA', poblacion: 9500, gpc: 0.65, tasaCrecimiento: 1.4, lat: -10.0689, lng: -75.5519, zoom: 13 },
          { ubigeo: '190307', departamento: 'PASCO', provincia: 'OXAPAMPA', distrito: 'VILLA RICA', region: 'SIERRA', poblacion: 19000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -10.7389, lng: -75.2719, zoom: 13 },
        ]
      },
      {
        id: '1902',
        nombre: 'DANIEL ALCIDES CARRIÓN',
        distritos: [
          { ubigeo: '190201', departamento: 'PASCO', provincia: 'DANIEL ALCIDES CARRIÓN', distrito: 'YANAHUANCA', region: 'SIERRA', poblacion: 14000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -10.4939, lng: -76.515, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '23',
    nombre: 'TACNA',
    region: 'COSTA',
    provincias: [
      {
        id: '2301',
        nombre: 'TACNA',
        distritos: [
          { ubigeo: '230101', departamento: 'TACNA', provincia: 'TACNA', distrito: 'TACNA', region: 'COSTA', poblacion: 110000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -18.0146, lng: -70.2525, zoom: 13 },
          { ubigeo: '230102', departamento: 'TACNA', provincia: 'TACNA', distrito: 'ALTO DE LA ALIANZA', region: 'COSTA', poblacion: 38000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -17.995, lng: -70.2589, zoom: 13 },
          { ubigeo: '230104', departamento: 'TACNA', provincia: 'TACNA', distrito: 'CIUDAD NUEVA', region: 'COSTA', poblacion: 36000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -17.985, lng: -70.245, zoom: 13 },
          { ubigeo: '230108', departamento: 'TACNA', provincia: 'TACNA', distrito: 'CORONEL GREGORIO ALBARRACÍN', region: 'COSTA', poblacion: 130000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -18.055, lng: -70.2789, zoom: 13 },
          { ubigeo: '230109', departamento: 'TACNA', provincia: 'TACNA', distrito: 'POCOLLAY', region: 'COSTA', poblacion: 21000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -18.0019, lng: -70.2289, zoom: 13 },
        ]
      },
      {
        id: '2302',
        nombre: 'CANDARAVE',
        distritos: [
          { ubigeo: '230201', departamento: 'TACNA', provincia: 'CANDARAVE', distrito: 'CANDARAVE', region: 'COSTA', poblacion: 3800, gpc: 0.54, tasaCrecimiento: 1.4, lat: -17.2689, lng: -70.2489, zoom: 13 },
        ]
      },
      {
        id: '2303',
        nombre: 'JORGE BASADRE',
        distritos: [
          { ubigeo: '230301', departamento: 'TACNA', provincia: 'JORGE BASADRE', distrito: 'ILABAYA', region: 'COSTA', poblacion: 6500, gpc: 0.65, tasaCrecimiento: 1.4, lat: -17.4219, lng: -70.5119, zoom: 13 },
        ]
      },
      {
        id: '2304',
        nombre: 'TARATA',
        distritos: [
          { ubigeo: '230401', departamento: 'TACNA', provincia: 'TARATA', distrito: 'TARATA', region: 'COSTA', poblacion: 4200, gpc: 0.55, tasaCrecimiento: 1.4, lat: -17.4739, lng: -70.0319, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '24',
    nombre: 'TUMBES',
    region: 'COSTA',
    provincias: [
      {
        id: '2401',
        nombre: 'TUMBES',
        distritos: [
          { ubigeo: '240101', departamento: 'TUMBES', provincia: 'TUMBES', distrito: 'TUMBES', region: 'COSTA', poblacion: 115000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -3.5669, lng: -80.4519, zoom: 13 },
          { ubigeo: '240102', departamento: 'TUMBES', provincia: 'TUMBES', distrito: 'CORRALES', region: 'COSTA', poblacion: 26000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -3.595, lng: -80.485, zoom: 13 },
          { ubigeo: '240105', departamento: 'TUMBES', provincia: 'TUMBES', distrito: 'PAMPAS DE HOSPITAL', region: 'COSTA', poblacion: 8200, gpc: 0.62, tasaCrecimiento: 1.4, lat: -3.695, lng: -80.4389, zoom: 13 },
        ]
      },
      {
        id: '2402',
        nombre: 'CONTRALMIRANTE VILLAR',
        distritos: [
          { ubigeo: '240201', departamento: 'TUMBES', provincia: 'CONTRALMIRANTE VILLAR', distrito: 'ZORRITOS', region: 'COSTA', poblacion: 14000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -3.6789, lng: -80.6689, zoom: 13 },
          { ubigeo: '240203', departamento: 'TUMBES', provincia: 'CONTRALMIRANTE VILLAR', distrito: 'CANOAS DE PUNTA SAL', region: 'COSTA', poblacion: 6800, gpc: 0.85, tasaCrecimiento: 1.4, lat: -3.9489, lng: -80.935, zoom: 13 },
        ]
      },
      {
        id: '2403',
        nombre: 'ZARUMILLA',
        distritos: [
          { ubigeo: '240301', departamento: 'TUMBES', provincia: 'ZARUMILLA', distrito: 'ZARUMILLA', region: 'COSTA', poblacion: 26000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -3.5019, lng: -80.2719, zoom: 13 },
          { ubigeo: '240302', departamento: 'TUMBES', provincia: 'ZARUMILLA', distrito: 'AGUAS VERDES', region: 'COSTA', poblacion: 19000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -3.4819, lng: -80.245, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '17',
    nombre: 'MADRE DE DIOS',
    region: 'SELVA',
    provincias: [
      {
        id: '1701',
        nombre: 'TAMBOPATA',
        distritos: [
          { ubigeo: '170101', departamento: 'MADRE DE DIOS', provincia: 'TAMBOPATA', distrito: 'TAMBOPATA (PUERTO MALDONADO)', region: 'SELVA', poblacion: 88000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -12.5939, lng: -69.1889, zoom: 13 },
          { ubigeo: '170102', departamento: 'MADRE DE DIOS', provincia: 'TAMBOPATA', distrito: 'INAMBARI (MAZUKO)', region: 'SELVA', poblacion: 16000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -13.0489, lng: -70.2989, zoom: 13 },
          { ubigeo: '170103', departamento: 'MADRE DE DIOS', provincia: 'TAMBOPATA', distrito: 'LAS PIEDRAS', region: 'SELVA', poblacion: 15500, gpc: 0.65, tasaCrecimiento: 1.4, lat: -12.3989, lng: -69.1989, zoom: 13 },
          { ubigeo: '170104', departamento: 'MADRE DE DIOS', provincia: 'TAMBOPATA', distrito: 'LABERINTO', region: 'SELVA', poblacion: 8200, gpc: 0.64, tasaCrecimiento: 1.4, lat: -12.715, lng: -69.585, zoom: 13 },
        ]
      },
      {
        id: '1702',
        nombre: 'MANU',
        distritos: [
          { ubigeo: '170201', departamento: 'MADRE DE DIOS', provincia: 'MANU', distrito: 'MANU', region: 'SELVA', poblacion: 4800, gpc: 0.62, tasaCrecimiento: 1.4, lat: -12.2539, lng: -70.9019, zoom: 13 },
        ]
      },
      {
        id: '1703',
        nombre: 'TAHUAMANU',
        distritos: [
          { ubigeo: '170301', departamento: 'MADRE DE DIOS', provincia: 'TAHUAMANU', distrito: 'IÑAPARI', region: 'SELVA', poblacion: 3800, gpc: 0.66, tasaCrecimiento: 1.4, lat: -10.95, lng: -69.575, zoom: 13 },
        ]
      },
    ]
  },
  {
    id: '25',
    nombre: 'UCAYALI',
    region: 'SELVA',
    provincias: [
      {
        id: '2501',
        nombre: 'CORONEL PORTILLO',
        distritos: [
          { ubigeo: '250101', departamento: 'UCAYALI', provincia: 'CORONEL PORTILLO', distrito: 'CALLERÍA (PUCALLPA)', region: 'SELVA', poblacion: 165000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -8.3791, lng: -74.5538, zoom: 13 },
          { ubigeo: '250107', departamento: 'UCAYALI', provincia: 'CORONEL PORTILLO', distrito: 'MANANTAY', region: 'SELVA', poblacion: 98000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -8.4189, lng: -74.545, zoom: 13 },
          { ubigeo: '250105', departamento: 'UCAYALI', provincia: 'CORONEL PORTILLO', distrito: 'YARINACOCHA', region: 'SELVA', poblacion: 112000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -8.355, lng: -74.575, zoom: 13 },
          { ubigeo: '250103', departamento: 'UCAYALI', provincia: 'CORONEL PORTILLO', distrito: 'CAMPOVERDE', region: 'SELVA', poblacion: 18500, gpc: 0.62, tasaCrecimiento: 1.4, lat: -8.475, lng: -74.805, zoom: 13 },
        ]
      },
      {
        id: '2502',
        nombre: 'ATALAYA',
        distritos: [
          { ubigeo: '250201', departamento: 'UCAYALI', provincia: 'ATALAYA', distrito: 'RAYMONDI (ATALAYA)', region: 'SELVA', poblacion: 34000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -10.7319, lng: -73.755, zoom: 13 },
        ]
      },
      {
        id: '2503',
        nombre: 'PADRE ABAD',
        distritos: [
          { ubigeo: '250301', departamento: 'UCAYALI', provincia: 'PADRE ABAD', distrito: 'PADRE ABAD (AGUAYTÍA)', region: 'SELVA', poblacion: 36000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -9.035, lng: -75.5089, zoom: 13 },
          { ubigeo: '250303', departamento: 'UCAYALI', provincia: 'PADRE ABAD', distrito: 'BOQUERÓN', region: 'SELVA', poblacion: 9200, gpc: 0.58, tasaCrecimiento: 1.4, lat: -9.105, lng: -75.685, zoom: 13 },
        ]
      },
      {
        id: '2504',
        nombre: 'PURÚS',
        distritos: [
          { ubigeo: '250401', departamento: 'UCAYALI', provincia: 'PURÚS', distrito: 'PURÚS (ESPERANZA)', region: 'SELVA', poblacion: 4500, gpc: 0.54, tasaCrecimiento: 1.4, lat: -9.7719, lng: -70.7119, zoom: 13 },
        ]
      },
    ]
  },
];

export const PERU_NACIONAL_JURISDICTION: Jurisdiction = {
  ubigeo: '000000',
  departamento: 'PERÚ (NACIONAL)',
  provincia: 'VISTA PANORÁMICA',
  distrito: 'TODO EL PERÚ',
  region: 'SIERRA',
  poblacion: 33726000,
  gpc: 0.75,
  tasaCrecimiento: 1.2,
  lat: -9.189967,
  lng: -75.015152,
  zoom: 6
};

export const PERU_JURISDICTIONS: Jurisdiction[] = [
  PERU_NACIONAL_JURISDICTION,
  { ubigeo: '010101', departamento: 'AMAZONAS', provincia: 'CHACHAPOYAS', distrito: 'CHACHAPOYAS', region: 'SELVA', poblacion: 35000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -6.2317, lng: -77.869, zoom: 13 },
  { ubigeo: '010102', departamento: 'AMAZONAS', provincia: 'CHACHAPOYAS', distrito: 'ASUNCIÓN', region: 'SELVA', poblacion: 3200, gpc: 0.52, tasaCrecimiento: 1.4, lat: -6.0319, lng: -77.7128, zoom: 13 },
  { ubigeo: '010103', departamento: 'AMAZONAS', provincia: 'CHACHAPOYAS', distrito: 'BALSAS', region: 'SELVA', poblacion: 1800, gpc: 0.5, tasaCrecimiento: 1.4, lat: -6.8356, lng: -78.0189, zoom: 13 },
  { ubigeo: '010108', departamento: 'AMAZONAS', provincia: 'CHACHAPOYAS', distrito: 'HUANCAS', region: 'SELVA', poblacion: 1400, gpc: 0.5, tasaCrecimiento: 1.4, lat: -6.1739, lng: -77.8631, zoom: 13 },
  { ubigeo: '010111', departamento: 'AMAZONAS', provincia: 'CHACHAPOYAS', distrito: 'LEIMEBAMBA', region: 'SELVA', poblacion: 4200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -6.7022, lng: -77.8042, zoom: 13 },
  { ubigeo: '010201', departamento: 'AMAZONAS', provincia: 'BAGUA', distrito: 'BAGUA', region: 'SELVA', poblacion: 32000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -5.6397, lng: -78.5311, zoom: 13 },
  { ubigeo: '010202', departamento: 'AMAZONAS', provincia: 'BAGUA', distrito: 'ARAMANGO', region: 'SELVA', poblacion: 12500, gpc: 0.56, tasaCrecimiento: 1.4, lat: -5.4189, lng: -78.4358, zoom: 13 },
  { ubigeo: '010205', departamento: 'AMAZONAS', provincia: 'BAGUA', distrito: 'IMAZA', region: 'SELVA', poblacion: 25000, gpc: 0.53, tasaCrecimiento: 1.4, lat: -5.1583, lng: -78.3094, zoom: 13 },
  { ubigeo: '010206', departamento: 'AMAZONAS', provincia: 'BAGUA', distrito: 'LA PECA', region: 'SELVA', poblacion: 8200, gpc: 0.58, tasaCrecimiento: 1.4, lat: -5.6111, lng: -78.435, zoom: 13 },
  { ubigeo: '010301', departamento: 'AMAZONAS', provincia: 'BONGARÁ', distrito: 'JUMBILLA', region: 'SELVA', poblacion: 2100, gpc: 0.52, tasaCrecimiento: 1.4, lat: -5.9039, lng: -77.7972, zoom: 13 },
  { ubigeo: '010306', departamento: 'AMAZONAS', provincia: 'BONGARÁ', distrito: 'FLORIDA (POMACOCHAS)', region: 'SELVA', poblacion: 6800, gpc: 0.56, tasaCrecimiento: 1.4, lat: -5.8239, lng: -77.9733, zoom: 13 },
  { ubigeo: '010308', departamento: 'AMAZONAS', provincia: 'BONGARÁ', distrito: 'RECTA', region: 'SELVA', poblacion: 1100, gpc: 0.48, tasaCrecimiento: 1.4, lat: -5.9983, lng: -77.7967, zoom: 13 },
  { ubigeo: '010401', departamento: 'AMAZONAS', provincia: 'CONDORCANQUI', distrito: 'NIEVA (SANTA MARÍA DE NIEVA)', region: 'SELVA', poblacion: 26000, gpc: 0.52, tasaCrecimiento: 1.4, lat: -4.5889, lng: -77.8683, zoom: 13 },
  { ubigeo: '010402', departamento: 'AMAZONAS', provincia: 'CONDORCANQUI', distrito: 'EL CENEPA', region: 'SELVA', poblacion: 11000, gpc: 0.48, tasaCrecimiento: 1.4, lat: -3.9856, lng: -78.2917, zoom: 13 },
  { ubigeo: '010403', departamento: 'AMAZONAS', provincia: 'CONDORCANQUI', distrito: 'RÍO SANTIAGO', region: 'SELVA', poblacion: 17000, gpc: 0.49, tasaCrecimiento: 1.4, lat: -4.1039, lng: -77.6472, zoom: 13 },
  { ubigeo: '010501', departamento: 'AMAZONAS', provincia: 'LUYA', distrito: 'LÁMUD', region: 'SELVA', poblacion: 3100, gpc: 0.54, tasaCrecimiento: 1.4, lat: -6.1639, lng: -77.9439, zoom: 13 },
  { ubigeo: '010502', departamento: 'AMAZONAS', provincia: 'LUYA', distrito: 'CAMPORREDONDO', region: 'SELVA', poblacion: 6200, gpc: 0.52, tasaCrecimiento: 1.4, lat: -6.1611, lng: -78.3361, zoom: 13 },
  { ubigeo: '010512', departamento: 'AMAZONAS', provincia: 'LUYA', distrito: 'LUYA', region: 'SELVA', poblacion: 4500, gpc: 0.53, tasaCrecimiento: 1.4, lat: -6.1722, lng: -77.915, zoom: 13 },
  { ubigeo: '010520', departamento: 'AMAZONAS', provincia: 'LUYA', distrito: 'TINGO (KUÉLAP)', region: 'SELVA', poblacion: 1600, gpc: 0.56, tasaCrecimiento: 1.4, lat: -6.3789, lng: -77.9056, zoom: 13 },
  { ubigeo: '010601', departamento: 'AMAZONAS', provincia: 'RODRÍGUEZ DE MENDOZA', distrito: 'SAN NICOLÁS (MENDOZA)', region: 'SELVA', poblacion: 6500, gpc: 0.58, tasaCrecimiento: 1.4, lat: -6.3989, lng: -77.4878, zoom: 13 },
  { ubigeo: '010607', departamento: 'AMAZONAS', provincia: 'RODRÍGUEZ DE MENDOZA', distrito: 'OMIA', region: 'SELVA', poblacion: 8800, gpc: 0.54, tasaCrecimiento: 1.4, lat: -6.4719, lng: -77.4111, zoom: 13 },
  { ubigeo: '010701', departamento: 'AMAZONAS', provincia: 'UTCUBAMBA', distrito: 'BAGUA GRANDE', region: 'SELVA', poblacion: 58000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -5.7556, lng: -78.4428, zoom: 13 },
  { ubigeo: '010702', departamento: 'AMAZONAS', provincia: 'UTCUBAMBA', distrito: 'CAJARURO', region: 'SELVA', poblacion: 26000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -5.7361, lng: -78.4239, zoom: 13 },
  { ubigeo: '010703', departamento: 'AMAZONAS', provincia: 'UTCUBAMBA', distrito: 'CUMBA', region: 'SELVA', poblacion: 9800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -5.9389, lng: -78.6583, zoom: 13 },
  { ubigeo: '010705', departamento: 'AMAZONAS', provincia: 'UTCUBAMBA', distrito: 'JAMALCA', region: 'SELVA', poblacion: 7800, gpc: 0.53, tasaCrecimiento: 1.4, lat: -5.8756, lng: -78.3417, zoom: 13 },
  { ubigeo: '010706', departamento: 'AMAZONAS', provincia: 'UTCUBAMBA', distrito: 'LONYA GRANDE', region: 'SELVA', poblacion: 11500, gpc: 0.55, tasaCrecimiento: 1.4, lat: -6.0967, lng: -78.5239, zoom: 13 },
  { ubigeo: '020101', departamento: 'ANCASH', provincia: 'HUARAZ', distrito: 'HUARAZ', region: 'SIERRA', poblacion: 130000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -9.5261, lng: -77.5289, zoom: 13 },
  { ubigeo: '020102', departamento: 'ANCASH', provincia: 'HUARAZ', distrito: 'INDEPENDENCIA', region: 'SIERRA', poblacion: 78000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -9.5153, lng: -77.5228, zoom: 13 },
  { ubigeo: '020107', departamento: 'ANCASH', provincia: 'HUARAZ', distrito: 'JANGAS', region: 'SIERRA', poblacion: 5200, gpc: 0.55, tasaCrecimiento: 1.4, lat: -9.4189, lng: -77.5769, zoom: 13 },
  { ubigeo: '020110', departamento: 'ANCASH', provincia: 'HUARAZ', distrito: 'OLLEROS', region: 'SIERRA', poblacion: 3400, gpc: 0.52, tasaCrecimiento: 1.4, lat: -9.6589, lng: -77.4189, zoom: 13 },
  { ubigeo: '020111', departamento: 'ANCASH', provincia: 'HUARAZ', distrito: 'TARICA', region: 'SIERRA', poblacion: 6800, gpc: 0.56, tasaCrecimiento: 1.4, lat: -9.3981, lng: -77.5819, zoom: 13 },
  { ubigeo: '021801', departamento: 'ANCASH', provincia: 'SANTA', distrito: 'CHIMBOTE', region: 'SIERRA', poblacion: 215000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -9.0744, lng: -78.5936, zoom: 13 },
  { ubigeo: '021809', departamento: 'ANCASH', provincia: 'SANTA', distrito: 'NUEVO CHIMBOTE', region: 'SIERRA', poblacion: 165000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -9.1228, lng: -78.5358, zoom: 13 },
  { ubigeo: '021803', departamento: 'ANCASH', provincia: 'SANTA', distrito: 'CÁCERES DEL PERÚ', region: 'SIERRA', poblacion: 5400, gpc: 0.54, tasaCrecimiento: 1.4, lat: -9.0069, lng: -78.2194, zoom: 13 },
  { ubigeo: '021804', departamento: 'ANCASH', provincia: 'SANTA', distrito: 'COISHCO', region: 'SIERRA', poblacion: 16500, gpc: 0.66, tasaCrecimiento: 1.4, lat: -9.0228, lng: -78.6189, zoom: 13 },
  { ubigeo: '021806', departamento: 'ANCASH', provincia: 'SANTA', distrito: 'NEPEÑA', region: 'SIERRA', poblacion: 15800, gpc: 0.62, tasaCrecimiento: 1.4, lat: -9.1769, lng: -78.3847, zoom: 13 },
  { ubigeo: '021808', departamento: 'ANCASH', provincia: 'SANTA', distrito: 'SANTA', region: 'SIERRA', poblacion: 22000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -8.995, lng: -78.6472, zoom: 13 },
  { ubigeo: '020501', departamento: 'ANCASH', provincia: 'BOLOGNESI', distrito: 'CHIQUIÁN', region: 'SIERRA', poblacion: 4800, gpc: 0.56, tasaCrecimiento: 1.4, lat: -10.1539, lng: -77.1589, zoom: 13 },
  { ubigeo: '020601', departamento: 'ANCASH', provincia: 'CARHUAZ', distrito: 'CARHUAZ', region: 'SIERRA', poblacion: 15200, gpc: 0.58, tasaCrecimiento: 1.4, lat: -9.2819, lng: -77.645, zoom: 13 },
  { ubigeo: '020605', departamento: 'ANCASH', provincia: 'CARHUAZ', distrito: 'MARCARÁ', region: 'SIERRA', poblacion: 11000, gpc: 0.55, tasaCrecimiento: 1.4, lat: -9.3178, lng: -77.6047, zoom: 13 },
  { ubigeo: '020801', departamento: 'ANCASH', provincia: 'CASMA', distrito: 'CASMA', region: 'SIERRA', poblacion: 34000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -9.4739, lng: -78.3039, zoom: 13 },
  { ubigeo: '020803', departamento: 'ANCASH', provincia: 'CASMA', distrito: 'COMANDANTE NOEL', region: 'SIERRA', poblacion: 2400, gpc: 0.55, tasaCrecimiento: 1.4, lat: -9.4589, lng: -78.3972, zoom: 13 },
  { ubigeo: '021001', departamento: 'ANCASH', provincia: 'HUARI', distrito: 'HUARI', region: 'SIERRA', poblacion: 10500, gpc: 0.58, tasaCrecimiento: 1.4, lat: -9.3361, lng: -77.1689, zoom: 13 },
  { ubigeo: '021004', departamento: 'ANCASH', provincia: 'HUARI', distrito: 'CHAVÍN DE HUÁNTAR', region: 'SIERRA', poblacion: 10200, gpc: 0.59, tasaCrecimiento: 1.4, lat: -9.5889, lng: -77.1778, zoom: 13 },
  { ubigeo: '021014', departamento: 'ANCASH', provincia: 'HUARI', distrito: 'SAN MARCOS', region: 'SIERRA', poblacion: 15800, gpc: 0.64, tasaCrecimiento: 1.4, lat: -9.525, lng: -77.1539, zoom: 13 },
  { ubigeo: '021101', departamento: 'ANCASH', provincia: 'HUARMEY', distrito: 'HUARMEY', region: 'SIERRA', poblacion: 24000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -10.0689, lng: -78.1528, zoom: 13 },
  { ubigeo: '021201', departamento: 'ANCASH', provincia: 'HUAYLAS', distrito: 'CARAZ', region: 'SIERRA', poblacion: 28000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -9.0489, lng: -77.8119, zoom: 13 },
  { ubigeo: '021403', departamento: 'ANCASH', provincia: 'PALLASCA', distrito: 'CABANA', region: 'SIERRA', poblacion: 3200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -8.3956, lng: -78.0167, zoom: 13 },
  { ubigeo: '021501', departamento: 'ANCASH', provincia: 'POMABAMBA', distrito: 'POMABAMBA', region: 'SIERRA', poblacion: 16500, gpc: 0.56, tasaCrecimiento: 1.4, lat: -8.8206, lng: -77.4619, zoom: 13 },
  { ubigeo: '021601', departamento: 'ANCASH', provincia: 'RECUAY', distrito: 'RECUAY', region: 'SIERRA', poblacion: 5200, gpc: 0.58, tasaCrecimiento: 1.4, lat: -9.7239, lng: -77.4569, zoom: 13 },
  { ubigeo: '021901', departamento: 'ANCASH', provincia: 'SIHUAS', distrito: 'SIHUAS', region: 'SIERRA', poblacion: 6100, gpc: 0.54, tasaCrecimiento: 1.4, lat: -8.5589, lng: -77.625, zoom: 13 },
  { ubigeo: '022001', departamento: 'ANCASH', provincia: 'YUNGAY', distrito: 'YUNGAY', region: 'SIERRA', poblacion: 21000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -9.1389, lng: -77.7439, zoom: 13 },
  { ubigeo: '020201', departamento: 'ANCASH', provincia: 'AIJA', distrito: 'AIJA', region: 'SIERRA', poblacion: 2200, gpc: 0.52, tasaCrecimiento: 1.4, lat: -9.7839, lng: -77.6119, zoom: 13 },
  { ubigeo: '020301', departamento: 'ANCASH', provincia: 'ANTONIO RAYMONDI', distrito: 'LLAMELLÍN', region: 'SIERRA', poblacion: 2100, gpc: 0.5, tasaCrecimiento: 1.4, lat: -9.0989, lng: -77.0169, zoom: 13 },
  { ubigeo: '020401', departamento: 'ANCASH', provincia: 'ASUNCIÓN', distrito: 'CHACAS', region: 'SIERRA', poblacion: 5600, gpc: 0.54, tasaCrecimiento: 1.4, lat: -9.1639, lng: -77.365, zoom: 13 },
  { ubigeo: '020701', departamento: 'ANCASH', provincia: 'CARLOS FERMÍN FITZCARRALD', distrito: 'SAN LUIS', region: 'SIERRA', poblacion: 4300, gpc: 0.52, tasaCrecimiento: 1.4, lat: -9.095, lng: -77.3289, zoom: 13 },
  { ubigeo: '020901', departamento: 'ANCASH', provincia: 'CORONGO', distrito: 'CORONGO', region: 'SIERRA', poblacion: 1900, gpc: 0.5, tasaCrecimiento: 1.4, lat: -8.5728, lng: -77.8967, zoom: 13 },
  { ubigeo: '021301', departamento: 'ANCASH', provincia: 'MARISCAL LUZURIAGA', distrito: 'PISCOBAMBA', region: 'SIERRA', poblacion: 3800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -8.8719, lng: -77.3589, zoom: 13 },
  { ubigeo: '021701', departamento: 'ANCASH', provincia: 'OCROS', distrito: 'OCROS', region: 'SIERRA', poblacion: 1600, gpc: 0.5, tasaCrecimiento: 1.4, lat: -10.4039, lng: -77.3972, zoom: 13 },
  { ubigeo: '030101', departamento: 'APURÍMAC', provincia: 'ABANCAY', distrito: 'ABANCAY', region: 'SIERRA', poblacion: 72000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -13.6361, lng: -72.8794, zoom: 13 },
  { ubigeo: '030109', departamento: 'APURÍMAC', provincia: 'ABANCAY', distrito: 'TAMBURCO', region: 'SIERRA', poblacion: 14500, gpc: 0.62, tasaCrecimiento: 1.4, lat: -13.6228, lng: -72.8719, zoom: 13 },
  { ubigeo: '030201', departamento: 'APURÍMAC', provincia: 'ANDAHUAYLAS', distrito: 'ANDAHUAYLAS', region: 'SIERRA', poblacion: 45000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -13.6556, lng: -73.3872, zoom: 13 },
  { ubigeo: '030212', departamento: 'APURÍMAC', provincia: 'ANDAHUAYLAS', distrito: 'SAN JERÓNIMO', region: 'SIERRA', poblacion: 22000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -13.6489, lng: -73.365, zoom: 13 },
  { ubigeo: '030213', departamento: 'APURÍMAC', provincia: 'ANDAHUAYLAS', distrito: 'TALAVERA', region: 'SIERRA', poblacion: 18500, gpc: 0.61, tasaCrecimiento: 1.4, lat: -13.6539, lng: -73.4319, zoom: 13 },
  { ubigeo: '030301', departamento: 'APURÍMAC', provincia: 'ANTABAMBA', distrito: 'ANTABAMBA', region: 'SIERRA', poblacion: 3400, gpc: 0.5, tasaCrecimiento: 1.4, lat: -14.3689, lng: -72.8789, zoom: 13 },
  { ubigeo: '030401', departamento: 'APURÍMAC', provincia: 'AYMARAES', distrito: 'CHALHUANCA', region: 'SIERRA', poblacion: 5200, gpc: 0.55, tasaCrecimiento: 1.4, lat: -14.2961, lng: -73.2439, zoom: 13 },
  { ubigeo: '030501', departamento: 'APURÍMAC', provincia: 'COTABAMBAS', distrito: 'TAMBOBAMBA', region: 'SIERRA', poblacion: 11500, gpc: 0.58, tasaCrecimiento: 1.4, lat: -13.9439, lng: -72.1769, zoom: 13 },
  { ubigeo: '030504', departamento: 'APURÍMAC', provincia: 'COTABAMBAS', distrito: 'CHALLHUAHUACHO (LAS BAMBAS)', region: 'SIERRA', poblacion: 19000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -14.1167, lng: -72.2333, zoom: 13 },
  { ubigeo: '030601', departamento: 'APURÍMAC', provincia: 'CHINCHEROS', distrito: 'CHINCHEROS', region: 'SIERRA', poblacion: 6100, gpc: 0.55, tasaCrecimiento: 1.4, lat: -13.5189, lng: -73.725, zoom: 13 },
  { ubigeo: '030701', departamento: 'APURÍMAC', provincia: 'GRAU', distrito: 'CHUQUIBAMBILLA', region: 'SIERRA', poblacion: 5800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -14.1089, lng: -72.7119, zoom: 13 },
  { ubigeo: '040101', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'AREQUIPA', region: 'SIERRA', poblacion: 180000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -16.409, lng: -71.5375, zoom: 13 },
  { ubigeo: '040128', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'YURA', region: 'SIERRA', poblacion: 42000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -16.245, lng: -71.625, zoom: 13 },
  { ubigeo: '040103', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'CERRO COLORADO', region: 'SIERRA', poblacion: 215000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -16.368, lng: -71.565, zoom: 13 },
  { ubigeo: '040104', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'CHARACATO', region: 'SIERRA', poblacion: 16000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -16.475, lng: -71.488, zoom: 13 },
  { ubigeo: '040112', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'PAUCARPATA', region: 'SIERRA', poblacion: 135000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -16.433, lng: -71.505, zoom: 13 },
  { ubigeo: '040119', departamento: 'AREQUIPA', provincia: 'AREQUIPA', distrito: 'SOCABAYA', region: 'SIERRA', poblacion: 88000, gpc: 0.69, tasaCrecimiento: 1.4, lat: -16.4689, lng: -71.5319, zoom: 13 },
  { ubigeo: '040201', departamento: 'AREQUIPA', provincia: 'CAMANÁ', distrito: 'CAMANÁ', region: 'SIERRA', poblacion: 16500, gpc: 0.7, tasaCrecimiento: 1.4, lat: -16.6239, lng: -72.7119, zoom: 13 },
  { ubigeo: '040301', departamento: 'AREQUIPA', provincia: 'CARAVELÍ', distrito: 'CARAVELÍ', region: 'SIERRA', poblacion: 4200, gpc: 0.6, tasaCrecimiento: 1.4, lat: -15.7739, lng: -73.365, zoom: 13 },
  { ubigeo: '040307', departamento: 'AREQUIPA', provincia: 'CARAVELÍ', distrito: 'CHALA', region: 'SIERRA', poblacion: 10500, gpc: 0.68, tasaCrecimiento: 1.4, lat: -15.8619, lng: -74.2469, zoom: 13 },
  { ubigeo: '040401', departamento: 'AREQUIPA', provincia: 'CASTILLA', distrito: 'APLAO', region: 'SIERRA', poblacion: 9800, gpc: 0.62, tasaCrecimiento: 1.4, lat: -16.085, lng: -72.4939, zoom: 13 },
  { ubigeo: '040501', departamento: 'AREQUIPA', provincia: 'CAYLLOMA', distrito: 'CHIVAY', region: 'SIERRA', poblacion: 8200, gpc: 0.6, tasaCrecimiento: 1.4, lat: -15.6389, lng: -71.6019, zoom: 13 },
  { ubigeo: '040509', departamento: 'AREQUIPA', provincia: 'CAYLLOMA', distrito: 'MAJES (EL PEDREGAL)', region: 'SIERRA', poblacion: 72000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -16.322, lng: -72.215, zoom: 13 },
  { ubigeo: '040601', departamento: 'AREQUIPA', provincia: 'CONDESUYOS', distrito: 'CHUQUIBAMBA', region: 'SIERRA', poblacion: 3800, gpc: 0.55, tasaCrecimiento: 1.4, lat: -15.8389, lng: -72.6519, zoom: 13 },
  { ubigeo: '040701', departamento: 'AREQUIPA', provincia: 'ISLAY', distrito: 'MOLLENDO', region: 'SIERRA', poblacion: 28500, gpc: 0.72, tasaCrecimiento: 1.4, lat: -17.0239, lng: -72.015, zoom: 13 },
  { ubigeo: '040704', departamento: 'AREQUIPA', provincia: 'ISLAY', distrito: 'ISLAY (MATARANI)', region: 'SIERRA', poblacion: 6800, gpc: 0.7, tasaCrecimiento: 1.4, lat: -16.9989, lng: -72.1039, zoom: 13 },
  { ubigeo: '040801', departamento: 'AREQUIPA', provincia: 'LA UNIÓN', distrito: 'COTAHUASI', region: 'SIERRA', poblacion: 3200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -15.2139, lng: -72.8919, zoom: 13 },
  { ubigeo: '050101', departamento: 'AYACUCHO', provincia: 'HUAMANGA', distrito: 'AYACUCHO', region: 'SIERRA', poblacion: 115000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -13.1589, lng: -74.2239, zoom: 13 },
  { ubigeo: '050103', departamento: 'AYACUCHO', provincia: 'HUAMANGA', distrito: 'CARMEN ALTO', region: 'SIERRA', poblacion: 31000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -13.1819, lng: -74.2189, zoom: 13 },
  { ubigeo: '050108', departamento: 'AYACUCHO', provincia: 'HUAMANGA', distrito: 'SAN JUAN BAUTISTA', region: 'SIERRA', poblacion: 55000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -13.1689, lng: -74.215, zoom: 13 },
  { ubigeo: '050114', departamento: 'AYACUCHO', provincia: 'HUAMANGA', distrito: 'ANDRÉS AVELINO CÁCERES', region: 'SIERRA', poblacion: 38000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -13.1489, lng: -74.205, zoom: 13 },
  { ubigeo: '050401', departamento: 'AYACUCHO', provincia: 'HUANTA', distrito: 'HUANTA', region: 'SIERRA', poblacion: 42000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -12.935, lng: -74.2489, zoom: 13 },
  { ubigeo: '050501', departamento: 'AYACUCHO', provincia: 'LA MAR', distrito: 'SAN MIGUEL', region: 'SIERRA', poblacion: 12000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -13.0139, lng: -73.9819, zoom: 13 },
  { ubigeo: '050601', departamento: 'AYACUCHO', provincia: 'LUCANAS', distrito: 'PUQUIO', region: 'SIERRA', poblacion: 16000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -14.6939, lng: -74.1239, zoom: 13 },
  { ubigeo: '050701', departamento: 'AYACUCHO', provincia: 'PARINACOCHAS', distrito: 'CORACORA', region: 'SIERRA', poblacion: 14000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -15.0189, lng: -73.7819, zoom: 13 },
  { ubigeo: '050201', departamento: 'AYACUCHO', provincia: 'CANGALLO', distrito: 'CANGALLO', region: 'SIERRA', poblacion: 7200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -13.6319, lng: -74.1419, zoom: 13 },
  { ubigeo: '050301', departamento: 'AYACUCHO', provincia: 'HUANCA SANCOS', distrito: 'SANCOS', region: 'SIERRA', poblacion: 3800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -13.9189, lng: -74.3319, zoom: 13 },
  { ubigeo: '050801', departamento: 'AYACUCHO', provincia: 'PÁUCAR DEL SARA SARA', distrito: 'PAUSA', region: 'SIERRA', poblacion: 3100, gpc: 0.52, tasaCrecimiento: 1.4, lat: -15.2819, lng: -73.3489, zoom: 13 },
  { ubigeo: '050901', departamento: 'AYACUCHO', provincia: 'SUCRE', distrito: 'QUEROBAMBA', region: 'SIERRA', poblacion: 3400, gpc: 0.5, tasaCrecimiento: 1.4, lat: -14.0139, lng: -73.8369, zoom: 13 },
  { ubigeo: '051001', departamento: 'AYACUCHO', provincia: 'VÍCTOR FAJARDO', distrito: 'HUANCAPI', region: 'SIERRA', poblacion: 2600, gpc: 0.5, tasaCrecimiento: 1.4, lat: -13.7519, lng: -74.065, zoom: 13 },
  { ubigeo: '051101', departamento: 'AYACUCHO', provincia: 'VILCAS HUAMÁN', distrito: 'VILCAS HUAMÁN', region: 'SIERRA', poblacion: 8200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -13.6539, lng: -73.9539, zoom: 13 },
  { ubigeo: '060101', departamento: 'CAJAMARCA', provincia: 'CAJAMARCA', distrito: 'CAJAMARCA', region: 'SIERRA', poblacion: 160000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -7.1637, lng: -78.5002, zoom: 13 },
  { ubigeo: '060102', departamento: 'CAJAMARCA', provincia: 'CAJAMARCA', distrito: 'BAÑOS DEL INCA', region: 'SIERRA', poblacion: 45000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -7.162, lng: -78.462, zoom: 13 },
  { ubigeo: '060104', departamento: 'CAJAMARCA', provincia: 'CAJAMARCA', distrito: 'CHETILLA', region: 'SIERRA', poblacion: 4200, gpc: 0.5, tasaCrecimiento: 1.4, lat: -7.1489, lng: -78.675, zoom: 13 },
  { ubigeo: '060107', departamento: 'CAJAMARCA', provincia: 'CAJAMARCA', distrito: 'ENCAÑADA', region: 'SIERRA', poblacion: 24000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -7.085, lng: -78.3419, zoom: 13 },
  { ubigeo: '060108', departamento: 'CAJAMARCA', provincia: 'CAJAMARCA', distrito: 'JESÚS', region: 'SIERRA', poblacion: 15200, gpc: 0.55, tasaCrecimiento: 1.4, lat: -7.245, lng: -78.3819, zoom: 13 },
  { ubigeo: '060109', departamento: 'CAJAMARCA', provincia: 'CAJAMARCA', distrito: 'LLACANORA', region: 'SIERRA', poblacion: 5600, gpc: 0.54, tasaCrecimiento: 1.4, lat: -7.2019, lng: -78.4289, zoom: 13 },
  { ubigeo: '060201', departamento: 'CAJAMARCA', provincia: 'CAJABAMBA', distrito: 'CAJABAMBA', region: 'SIERRA', poblacion: 32000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -7.6239, lng: -78.0489, zoom: 13 },
  { ubigeo: '060203', departamento: 'CAJAMARCA', provincia: 'CAJABAMBA', distrito: 'CONDEBAMBA (CAUDAY)', region: 'SIERRA', poblacion: 14500, gpc: 0.55, tasaCrecimiento: 1.4, lat: -7.575, lng: -78.1189, zoom: 13 },
  { ubigeo: '060301', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'CELENDÍN', region: 'SIERRA', poblacion: 28500, gpc: 0.58, tasaCrecimiento: 1.4, lat: -6.8654, lng: -78.1455, zoom: 13 },
  { ubigeo: '060302', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'CHUMUCH', region: 'SIERRA', poblacion: 3400, gpc: 0.52, tasaCrecimiento: 1.4, lat: -6.6029, lng: -78.2003, zoom: 13 },
  { ubigeo: '060303', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'CORTEGANA (CHIMUCH)', region: 'SIERRA', poblacion: 8900, gpc: 0.54, tasaCrecimiento: 1.4, lat: -6.5132, lng: -78.3289, zoom: 13 },
  { ubigeo: '060304', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'HUASMÍN', region: 'SIERRA', poblacion: 14200, gpc: 0.55, tasaCrecimiento: 1.4, lat: -6.8376, lng: -78.2449, zoom: 13 },
  { ubigeo: '060305', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'JORGE CHÁVEZ', region: 'SIERRA', poblacion: 1800, gpc: 0.5, tasaCrecimiento: 1.4, lat: -6.9408, lng: -78.094, zoom: 13 },
  { ubigeo: '060306', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'JOSÉ GÁLVEZ', region: 'SIERRA', poblacion: 4200, gpc: 0.53, tasaCrecimiento: 1.4, lat: -6.9257, lng: -78.1327, zoom: 13 },
  { ubigeo: '060307', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'MIGUEL IGLESIAS', region: 'SIERRA', poblacion: 5100, gpc: 0.51, tasaCrecimiento: 1.4, lat: -6.6774, lng: -78.2041, zoom: 13 },
  { ubigeo: '060308', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'OXAMARCA', region: 'SIERRA', poblacion: 6800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -7.0419, lng: -78.068, zoom: 13 },
  { ubigeo: '060309', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'SOROCHUCO', region: 'SIERRA', poblacion: 10500, gpc: 0.54, tasaCrecimiento: 1.4, lat: -6.9116, lng: -78.255, zoom: 13 },
  { ubigeo: '060310', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'SUCRE', region: 'SIERRA', poblacion: 6100, gpc: 0.53, tasaCrecimiento: 1.4, lat: -6.9426, lng: -78.1356, zoom: 13 },
  { ubigeo: '060311', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'UTCO', region: 'SIERRA', poblacion: 1500, gpc: 0.49, tasaCrecimiento: 1.4, lat: -6.8964, lng: -78.0633, zoom: 13 },
  { ubigeo: '060312', departamento: 'CAJAMARCA', provincia: 'CELENDÍN', distrito: 'LA LIBERTAD DE PALLÁN', region: 'SIERRA', poblacion: 7800, gpc: 0.53, tasaCrecimiento: 1.4, lat: -6.7234, lng: -78.2823, zoom: 13 },
  { ubigeo: '060401', departamento: 'CAJAMARCA', provincia: 'CHOTA', distrito: 'CHOTA', region: 'SIERRA', poblacion: 52000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -6.5589, lng: -78.65, zoom: 13 },
  { ubigeo: '060408', departamento: 'CAJAMARCA', provincia: 'CHOTA', distrito: 'LAJAS', region: 'SIERRA', poblacion: 14000, gpc: 0.55, tasaCrecimiento: 1.4, lat: -6.5419, lng: -78.7189, zoom: 13 },
  { ubigeo: '060416', departamento: 'CAJAMARCA', provincia: 'CHOTA', distrito: 'TACABAMBA', region: 'SIERRA', poblacion: 18500, gpc: 0.56, tasaCrecimiento: 1.4, lat: -6.3989, lng: -78.6119, zoom: 13 },
  { ubigeo: '060407', departamento: 'CAJAMARCA', provincia: 'CHOTA', distrito: 'HUAMBOS', region: 'SIERRA', poblacion: 10200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -6.4519, lng: -78.9619, zoom: 13 },
  { ubigeo: '060501', departamento: 'CAJAMARCA', provincia: 'CONTUMAZÁ', distrito: 'CONTUMAZÁ', region: 'SIERRA', poblacion: 9800, gpc: 0.56, tasaCrecimiento: 1.4, lat: -7.3689, lng: -78.8039, zoom: 13 },
  { ubigeo: '060502', departamento: 'CAJAMARCA', provincia: 'CONTUMAZÁ', distrito: 'CHILETE', region: 'SIERRA', poblacion: 3400, gpc: 0.54, tasaCrecimiento: 1.4, lat: -7.2189, lng: -78.8539, zoom: 13 },
  { ubigeo: '060508', departamento: 'CAJAMARCA', provincia: 'CONTUMAZÁ', distrito: 'YONÁN (TEMBLADERA)', region: 'SIERRA', poblacion: 8200, gpc: 0.58, tasaCrecimiento: 1.4, lat: -7.2539, lng: -79.1319, zoom: 13 },
  { ubigeo: '060601', departamento: 'CAJAMARCA', provincia: 'CUTERVO', distrito: 'CUTERVO', region: 'SIERRA', poblacion: 58000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -6.375, lng: -78.8189, zoom: 13 },
  { ubigeo: '060602', departamento: 'CAJAMARCA', provincia: 'CUTERVO', distrito: 'CALLAYUC', region: 'SIERRA', poblacion: 11000, gpc: 0.53, tasaCrecimiento: 1.4, lat: -6.0489, lng: -78.9619, zoom: 13 },
  { ubigeo: '060608', departamento: 'CAJAMARCA', provincia: 'CUTERVO', distrito: 'SAN ANDRÉS DE CUTERVO', region: 'SIERRA', poblacion: 6200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -6.2519, lng: -78.7189, zoom: 13 },
  { ubigeo: '060613', departamento: 'CAJAMARCA', provincia: 'CUTERVO', distrito: 'SOCOTA', region: 'SIERRA', poblacion: 12000, gpc: 0.55, tasaCrecimiento: 1.4, lat: -6.2919, lng: -78.6939, zoom: 13 },
  { ubigeo: '060701', departamento: 'CAJAMARCA', provincia: 'HUALGAYOC', distrito: 'BAMBAMARCA', region: 'SIERRA', poblacion: 68000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -6.6789, lng: -78.5289, zoom: 13 },
  { ubigeo: '060702', departamento: 'CAJAMARCA', provincia: 'HUALGAYOC', distrito: 'CHUGUR', region: 'SIERRA', poblacion: 4200, gpc: 0.52, tasaCrecimiento: 1.4, lat: -6.6719, lng: -78.7419, zoom: 13 },
  { ubigeo: '060703', departamento: 'CAJAMARCA', provincia: 'HUALGAYOC', distrito: 'HUALGAYOC', region: 'SIERRA', poblacion: 18500, gpc: 0.6, tasaCrecimiento: 1.4, lat: -6.7639, lng: -78.6189, zoom: 13 },
  { ubigeo: '060801', departamento: 'CAJAMARCA', provincia: 'JAÉN', distrito: 'JAÉN', region: 'SIERRA', poblacion: 98000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -5.7089, lng: -78.8089, zoom: 13 },
  { ubigeo: '060802', departamento: 'CAJAMARCA', provincia: 'JAÉN', distrito: 'BELLAVISTA', region: 'SIERRA', poblacion: 17500, gpc: 0.58, tasaCrecimiento: 1.4, lat: -5.6619, lng: -78.675, zoom: 13 },
  { ubigeo: '060807', departamento: 'CAJAMARCA', provincia: 'JAÉN', distrito: 'PUCARÁ', region: 'SIERRA', poblacion: 8400, gpc: 0.55, tasaCrecimiento: 1.4, lat: -6.035, lng: -79.125, zoom: 13 },
  { ubigeo: '060901', departamento: 'CAJAMARCA', provincia: 'SAN IGNACIO', distrito: 'SAN IGNACIO', region: 'SIERRA', poblacion: 38000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -5.145, lng: -79.0019, zoom: 13 },
  { ubigeo: '060907', departamento: 'CAJAMARCA', provincia: 'SAN IGNACIO', distrito: 'TABACONAS', region: 'SIERRA', poblacion: 18000, gpc: 0.54, tasaCrecimiento: 1.4, lat: -5.3189, lng: -79.295, zoom: 13 },
  { ubigeo: '061001', departamento: 'CAJAMARCA', provincia: 'SAN MARCOS', distrito: 'PEDRO GÁLVEZ (SAN MARCOS)', region: 'SIERRA', poblacion: 22000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -7.335, lng: -78.1689, zoom: 13 },
  { ubigeo: '061005', departamento: 'CAJAMARCA', provincia: 'SAN MARCOS', distrito: 'ICHOCÁN', region: 'SIERRA', poblacion: 3100, gpc: 0.52, tasaCrecimiento: 1.4, lat: -7.375, lng: -78.145, zoom: 13 },
  { ubigeo: '061101', departamento: 'CAJAMARCA', provincia: 'SAN MIGUEL', distrito: 'SAN MIGUEL DE PALLAQUES', region: 'SIERRA', poblacion: 18000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -7.0019, lng: -78.8519, zoom: 13 },
  { ubigeo: '061108', departamento: 'CAJAMARCA', provincia: 'SAN MIGUEL', distrito: 'LLAPA', region: 'SIERRA', poblacion: 5400, gpc: 0.52, tasaCrecimiento: 1.4, lat: -7.025, lng: -78.785, zoom: 13 },
  { ubigeo: '061201', departamento: 'CAJAMARCA', provincia: 'SAN PABLO', distrito: 'SAN PABLO', region: 'SIERRA', poblacion: 14500, gpc: 0.56, tasaCrecimiento: 1.4, lat: -7.1189, lng: -78.8239, zoom: 13 },
  { ubigeo: '061301', departamento: 'CAJAMARCA', provincia: 'SANTA CRUZ', distrito: 'SANTA CRUZ DE SUCCHABAMBA', region: 'SIERRA', poblacion: 16500, gpc: 0.58, tasaCrecimiento: 1.4, lat: -6.6269, lng: -78.945, zoom: 13 },
  { ubigeo: '070101', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'CALLAO', region: 'COSTA', poblacion: 425000, gpc: 0.82, tasaCrecimiento: 1.4, lat: -12.0565, lng: -77.1181, zoom: 13 },
  { ubigeo: '070102', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'BELLAVISTA', region: 'COSTA', poblacion: 82000, gpc: 0.78, tasaCrecimiento: 1.4, lat: -12.0639, lng: -77.135, zoom: 13 },
  { ubigeo: '070103', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'CARMEN DE LA LEGUA REYNOSO', region: 'COSTA', poblacion: 44000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -12.0439, lng: -77.0919, zoom: 13 },
  { ubigeo: '070104', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'LA PERLA', region: 'COSTA', poblacion: 65000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -12.0719, lng: -77.1139, zoom: 13 },
  { ubigeo: '070105', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'LA PUNTA', region: 'COSTA', poblacion: 4100, gpc: 0.85, tasaCrecimiento: 1.4, lat: -12.0739, lng: -77.165, zoom: 13 },
  { ubigeo: '070106', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'VENTANILLA', region: 'COSTA', poblacion: 385000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -11.8789, lng: -77.1289, zoom: 13 },
  { ubigeo: '070107', departamento: 'CALLAO', provincia: 'CALLAO', distrito: 'MI PERÚ', region: 'COSTA', poblacion: 55000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -11.8569, lng: -77.115, zoom: 13 },
  { ubigeo: '080101', departamento: 'CUSCO', provincia: 'CUSCO', distrito: 'CUSCO', region: 'SIERRA', poblacion: 135000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -13.5319, lng: -71.9674, zoom: 13 },
  { ubigeo: '080104', departamento: 'CUSCO', provincia: 'CUSCO', distrito: 'SAN JERÓNIMO', region: 'SIERRA', poblacion: 55000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -13.5519, lng: -71.8889, zoom: 13 },
  { ubigeo: '080105', departamento: 'CUSCO', provincia: 'CUSCO', distrito: 'SAN SEBASTIÁN', region: 'SIERRA', poblacion: 115000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -13.535, lng: -71.9289, zoom: 13 },
  { ubigeo: '080106', departamento: 'CUSCO', provincia: 'CUSCO', distrito: 'SANTIAGO', region: 'SIERRA', poblacion: 98000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -13.5419, lng: -71.985, zoom: 13 },
  { ubigeo: '080108', departamento: 'CUSCO', provincia: 'CUSCO', distrito: 'WANCHAQ', region: 'SIERRA', poblacion: 68000, gpc: 0.75, tasaCrecimiento: 1.4, lat: -13.5289, lng: -71.9569, zoom: 13 },
  { ubigeo: '080301', departamento: 'CUSCO', provincia: 'ANTA', distrito: 'ANTA', region: 'SIERRA', poblacion: 18000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -13.4619, lng: -72.1489, zoom: 13 },
  { ubigeo: '080401', departamento: 'CUSCO', provincia: 'CALCA', distrito: 'CALCA', region: 'SIERRA', poblacion: 22000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -13.3319, lng: -71.9539, zoom: 13 },
  { ubigeo: '080405', departamento: 'CUSCO', provincia: 'CALCA', distrito: 'PÍSAC', region: 'SIERRA', poblacion: 11000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -13.4219, lng: -71.8519, zoom: 13 },
  { ubigeo: '080601', departamento: 'CUSCO', provincia: 'CANCHIS', distrito: 'SICUANI', region: 'SIERRA', poblacion: 62000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -14.2819, lng: -71.2289, zoom: 13 },
  { ubigeo: '080801', departamento: 'CUSCO', provincia: 'ESPINAR', distrito: 'YAURI (ESPINAR)', region: 'SIERRA', poblacion: 36000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -14.7939, lng: -71.4119, zoom: 13 },
  { ubigeo: '080901', departamento: 'CUSCO', provincia: 'LA CONVENCIÓN', distrito: 'SANTA ANA (QUILLABAMBA)', region: 'SIERRA', poblacion: 38000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -12.8689, lng: -72.695, zoom: 13 },
  { ubigeo: '080909', departamento: 'CUSCO', provincia: 'LA CONVENCIÓN', distrito: 'MEGANTONI (CAMISEA)', region: 'SIERRA', poblacion: 11000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -11.95, lng: -72.9167, zoom: 13 },
  { ubigeo: '081301', departamento: 'CUSCO', provincia: 'URUBAMBA', distrito: 'URUBAMBA', region: 'SIERRA', poblacion: 24000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -13.305, lng: -72.115, zoom: 13 },
  { ubigeo: '081304', departamento: 'CUSCO', provincia: 'URUBAMBA', distrito: 'MACHUPICCHU (AGUAS CALIENTES)', region: 'SIERRA', poblacion: 6500, gpc: 0.85, tasaCrecimiento: 1.4, lat: -13.155, lng: -72.525, zoom: 13 },
  { ubigeo: '081305', departamento: 'CUSCO', provincia: 'URUBAMBA', distrito: 'MARAS', region: 'SIERRA', poblacion: 7200, gpc: 0.58, tasaCrecimiento: 1.4, lat: -13.3319, lng: -72.1589, zoom: 13 },
  { ubigeo: '081306', departamento: 'CUSCO', provincia: 'URUBAMBA', distrito: 'OLLANTAYTAMBO', region: 'SIERRA', poblacion: 12500, gpc: 0.68, tasaCrecimiento: 1.4, lat: -13.2589, lng: -72.2639, zoom: 13 },
  { ubigeo: '080201', departamento: 'CUSCO', provincia: 'ACOMAYO', distrito: 'ACOMAYO', region: 'SIERRA', poblacion: 5600, gpc: 0.52, tasaCrecimiento: 1.4, lat: -13.9189, lng: -71.685, zoom: 13 },
  { ubigeo: '080501', departamento: 'CUSCO', provincia: 'CANAS', distrito: 'YANAOCA', region: 'SIERRA', poblacion: 10500, gpc: 0.54, tasaCrecimiento: 1.4, lat: -14.2189, lng: -71.4319, zoom: 13 },
  { ubigeo: '080701', departamento: 'CUSCO', provincia: 'CHUMBIVILCAS', distrito: 'SANTO TOMÁS', region: 'SIERRA', poblacion: 28000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -14.4489, lng: -72.0819, zoom: 13 },
  { ubigeo: '081001', departamento: 'CUSCO', provincia: 'PARURO', distrito: 'PARURO', region: 'SIERRA', poblacion: 3800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -13.765, lng: -71.845, zoom: 13 },
  { ubigeo: '081101', departamento: 'CUSCO', provincia: 'PAUCARTAMBO', distrito: 'PAUCARTAMBO', region: 'SIERRA', poblacion: 14000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -13.315, lng: -71.595, zoom: 13 },
  { ubigeo: '081201', departamento: 'CUSCO', provincia: 'QUISPICANCHI', distrito: 'URCOS', region: 'SIERRA', poblacion: 12500, gpc: 0.6, tasaCrecimiento: 1.4, lat: -13.6889, lng: -71.625, zoom: 13 },
  { ubigeo: '130101', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'TRUJILLO', region: 'COSTA', poblacion: 340000, gpc: 0.78, tasaCrecimiento: 1.4, lat: -8.1159, lng: -79.0299, zoom: 13 },
  { ubigeo: '130102', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'EL PORVENIR', region: 'COSTA', poblacion: 195000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -8.085, lng: -79.0019, zoom: 13 },
  { ubigeo: '130103', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'FLORENCIA DE MORA', region: 'COSTA', poblacion: 42000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -8.075, lng: -79.0219, zoom: 13 },
  { ubigeo: '130104', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'HUANCHACO', region: 'COSTA', poblacion: 78000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -8.0819, lng: -79.1189, zoom: 13 },
  { ubigeo: '130105', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'LA ESPERANZA', region: 'COSTA', poblacion: 198000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -8.0689, lng: -79.0419, zoom: 13 },
  { ubigeo: '130106', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'LAREDO', region: 'COSTA', poblacion: 38000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -8.0889, lng: -78.9619, zoom: 13 },
  { ubigeo: '130107', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'MOCHE', region: 'COSTA', poblacion: 39000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -8.1719, lng: -79.0119, zoom: 13 },
  { ubigeo: '130110', departamento: 'LA LIBERTAD', provincia: 'TRUJILLO', distrito: 'VÍCTOR LARCO HERRERA', region: 'COSTA', poblacion: 72000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -8.1389, lng: -79.045, zoom: 13 },
  { ubigeo: '130201', departamento: 'LA LIBERTAD', provincia: 'ASCOPE', distrito: 'ASCOPE', region: 'COSTA', poblacion: 7200, gpc: 0.6, tasaCrecimiento: 1.4, lat: -7.7139, lng: -79.1089, zoom: 13 },
  { ubigeo: '130202', departamento: 'LA LIBERTAD', provincia: 'ASCOPE', distrito: 'CHICAMA', region: 'COSTA', poblacion: 16500, gpc: 0.62, tasaCrecimiento: 1.4, lat: -7.8439, lng: -79.145, zoom: 13 },
  { ubigeo: '130205', departamento: 'LA LIBERTAD', provincia: 'ASCOPE', distrito: 'PAIJÁN', region: 'COSTA', poblacion: 28000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -7.7319, lng: -79.3019, zoom: 13 },
  { ubigeo: '130401', departamento: 'LA LIBERTAD', provincia: 'CHEPÉN', distrito: 'CHEPÉN', region: 'COSTA', poblacion: 48000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -7.2289, lng: -79.4319, zoom: 13 },
  { ubigeo: '130701', departamento: 'LA LIBERTAD', provincia: 'PACASMAYO', distrito: 'SAN PEDRO DE LLOC', region: 'COSTA', poblacion: 18500, gpc: 0.65, tasaCrecimiento: 1.4, lat: -7.4319, lng: -79.505, zoom: 13 },
  { ubigeo: '130704', departamento: 'LA LIBERTAD', provincia: 'PACASMAYO', distrito: 'PACASMAYO', region: 'COSTA', poblacion: 29000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -7.4019, lng: -79.5719, zoom: 13 },
  { ubigeo: '131201', departamento: 'LA LIBERTAD', provincia: 'VIRÚ', distrito: 'VIRÚ', region: 'COSTA', poblacion: 68000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -8.415, lng: -78.7519, zoom: 13 },
  { ubigeo: '131202', departamento: 'LA LIBERTAD', provincia: 'VIRÚ', distrito: 'CHAO', region: 'COSTA', poblacion: 36000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -8.5419, lng: -78.675, zoom: 13 },
  { ubigeo: '130901', departamento: 'LA LIBERTAD', provincia: 'SÁNCHEZ CARRIÓN', distrito: 'HUAMACHUCO', region: 'COSTA', poblacion: 62000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -7.815, lng: -78.0489, zoom: 13 },
  { ubigeo: '131001', departamento: 'LA LIBERTAD', provincia: 'SANTIAGO DE CHUCO', distrito: 'SANTIAGO DE CHUCO', region: 'COSTA', poblacion: 22000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -8.1419, lng: -78.175, zoom: 13 },
  { ubigeo: '130601', departamento: 'LA LIBERTAD', provincia: 'OTUZCO', distrito: 'OTUZCO', region: 'COSTA', poblacion: 28000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -7.9019, lng: -78.5819, zoom: 13 },
  { ubigeo: '130801', departamento: 'LA LIBERTAD', provincia: 'PATAZ', distrito: 'TAYABAMBA', region: 'COSTA', poblacion: 16000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -8.2789, lng: -77.2969, zoom: 13 },
  { ubigeo: '130301', departamento: 'LA LIBERTAD', provincia: 'BOLÍVAR', distrito: 'BOLÍVAR', region: 'COSTA', poblacion: 4500, gpc: 0.52, tasaCrecimiento: 1.4, lat: -7.1539, lng: -77.7119, zoom: 13 },
  { ubigeo: '130501', departamento: 'LA LIBERTAD', provincia: 'JULCÁN', distrito: 'JULCÁN', region: 'COSTA', poblacion: 14000, gpc: 0.54, tasaCrecimiento: 1.4, lat: -8.0419, lng: -78.485, zoom: 13 },
  { ubigeo: '131101', departamento: 'LA LIBERTAD', provincia: 'GRAN CHIMÚ', distrito: 'CASCAS', region: 'COSTA', poblacion: 15000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -7.4819, lng: -78.8189, zoom: 13 },
  { ubigeo: '140101', departamento: 'LAMBAYEQUE', provincia: 'CHICLAYO', distrito: 'CHICLAYO', region: 'COSTA', poblacion: 310000, gpc: 0.78, tasaCrecimiento: 1.4, lat: -6.7713, lng: -79.8408, zoom: 13 },
  { ubigeo: '140105', departamento: 'LAMBAYEQUE', provincia: 'CHICLAYO', distrito: 'JOSÉ LEONARDO ORTIZ', region: 'COSTA', poblacion: 178000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -6.7589, lng: -79.835, zoom: 13 },
  { ubigeo: '140106', departamento: 'LAMBAYEQUE', provincia: 'CHICLAYO', distrito: 'LA VICTORIA', region: 'COSTA', poblacion: 98000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -6.7919, lng: -79.8419, zoom: 13 },
  { ubigeo: '140108', departamento: 'LAMBAYEQUE', provincia: 'CHICLAYO', distrito: 'MONSEFÚ', region: 'COSTA', poblacion: 34000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -6.8789, lng: -79.8689, zoom: 13 },
  { ubigeo: '140112', departamento: 'LAMBAYEQUE', provincia: 'CHICLAYO', distrito: 'PIMENTEL', region: 'COSTA', poblacion: 48000, gpc: 0.75, tasaCrecimiento: 1.4, lat: -6.835, lng: -79.935, zoom: 13 },
  { ubigeo: '140201', departamento: 'LAMBAYEQUE', provincia: 'FERREÑAFE', distrito: 'FERREÑAFE', region: 'COSTA', poblacion: 38000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -6.6389, lng: -79.7889, zoom: 13 },
  { ubigeo: '140206', departamento: 'LAMBAYEQUE', provincia: 'FERREÑAFE', distrito: 'PÍTIPO', region: 'COSTA', poblacion: 22000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -6.5819, lng: -79.745, zoom: 13 },
  { ubigeo: '140301', departamento: 'LAMBAYEQUE', provincia: 'LAMBAYEQUE', distrito: 'LAMBAYEQUE', region: 'COSTA', poblacion: 82000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -6.7039, lng: -79.905, zoom: 13 },
  { ubigeo: '140307', departamento: 'LAMBAYEQUE', provincia: 'LAMBAYEQUE', distrito: 'MOTUPE', region: 'COSTA', poblacion: 31000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -6.1519, lng: -79.715, zoom: 13 },
  { ubigeo: '140308', departamento: 'LAMBAYEQUE', provincia: 'LAMBAYEQUE', distrito: 'OLMOS', region: 'COSTA', poblacion: 45000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -5.985, lng: -79.745, zoom: 13 },
  { ubigeo: '150101', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'LIMA (CERCADO)', region: 'COSTA', poblacion: 280000, gpc: 0.88, tasaCrecimiento: 1.4, lat: -12.0463, lng: -77.0427, zoom: 13 },
  { ubigeo: '150132', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'SAN JUAN DE LURIGANCHO', region: 'COSTA', poblacion: 1150000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -11.9889, lng: -77.0019, zoom: 13 },
  { ubigeo: '150135', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'SAN MARTÍN DE PORRES', region: 'COSTA', poblacion: 740000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -12.015, lng: -77.065, zoom: 13 },
  { ubigeo: '150103', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'ATE (VITARTE)', region: 'COSTA', poblacion: 680000, gpc: 0.75, tasaCrecimiento: 1.4, lat: -12.025, lng: -76.9189, zoom: 13 },
  { ubigeo: '150112', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'INDEPENDENCIA', region: 'COSTA', poblacion: 225000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -11.995, lng: -77.0519, zoom: 13 },
  { ubigeo: '150119', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'LURÍN', region: 'COSTA', poblacion: 110000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -12.275, lng: -76.8719, zoom: 13 },
  { ubigeo: '150142', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'VILLA EL SALVADOR', region: 'COSTA', poblacion: 435000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -12.215, lng: -76.935, zoom: 13 },
  { ubigeo: '150143', departamento: 'LIMA', provincia: 'LIMA METROPOLITANA', distrito: 'VILLA MARÍA DEL TRIUNFO', region: 'COSTA', poblacion: 420000, gpc: 0.71, tasaCrecimiento: 1.4, lat: -12.1619, lng: -76.9389, zoom: 13 },
  { ubigeo: '150201', departamento: 'LIMA', provincia: 'BARRANCA', distrito: 'BARRANCA', region: 'COSTA', poblacion: 72000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -10.7519, lng: -77.7619, zoom: 13 },
  { ubigeo: '150204', departamento: 'LIMA', provincia: 'BARRANCA', distrito: 'PATIVILCA', region: 'COSTA', poblacion: 21000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -10.6989, lng: -77.785, zoom: 13 },
  { ubigeo: '150205', departamento: 'LIMA', provincia: 'BARRANCA', distrito: 'SUPE (CARAL)', region: 'COSTA', poblacion: 28000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -10.7989, lng: -77.7119, zoom: 13 },
  { ubigeo: '150501', departamento: 'LIMA', provincia: 'CAÑETE', distrito: 'SAN VICENTE DE CAÑETE', region: 'COSTA', poblacion: 58000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -13.0789, lng: -76.385, zoom: 13 },
  { ubigeo: '150507', departamento: 'LIMA', provincia: 'CAÑETE', distrito: 'IMPERIAL', region: 'COSTA', poblacion: 41000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -13.0619, lng: -76.3539, zoom: 13 },
  { ubigeo: '150509', departamento: 'LIMA', provincia: 'CAÑETE', distrito: 'MALA', region: 'COSTA', poblacion: 34000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -12.6589, lng: -76.6319, zoom: 13 },
  { ubigeo: '150504', departamento: 'LIMA', provincia: 'CAÑETE', distrito: 'CHILCA', region: 'COSTA', poblacion: 22000, gpc: 0.75, tasaCrecimiento: 1.4, lat: -12.5219, lng: -76.7389, zoom: 13 },
  { ubigeo: '150601', departamento: 'LIMA', provincia: 'HUARAL', distrito: 'HUARAL', region: 'COSTA', poblacion: 98000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -11.495, lng: -77.2089, zoom: 13 },
  { ubigeo: '150604', departamento: 'LIMA', provincia: 'HUARAL', distrito: 'CHANCAY', region: 'COSTA', poblacion: 62000, gpc: 0.78, tasaCrecimiento: 1.4, lat: -11.5689, lng: -77.2689, zoom: 13 },
  { ubigeo: '150801', departamento: 'LIMA', provincia: 'HUAURA', distrito: 'HUACHO', region: 'COSTA', poblacion: 68000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -11.1089, lng: -77.605, zoom: 13 },
  { ubigeo: '150806', departamento: 'LIMA', provincia: 'HUAURA', distrito: 'HUAURA', region: 'COSTA', poblacion: 38000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -11.0719, lng: -77.5989, zoom: 13 },
  { ubigeo: '150701', departamento: 'LIMA', provincia: 'HUAROCHIRÍ', distrito: 'MATUCANA', region: 'COSTA', poblacion: 5800, gpc: 0.58, tasaCrecimiento: 1.4, lat: -11.8439, lng: -76.3819, zoom: 13 },
  { ubigeo: '150706', departamento: 'LIMA', provincia: 'HUAROCHIRÍ', distrito: 'CHOSICA / SANTA EULALIA', region: 'COSTA', poblacion: 16000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -11.8989, lng: -76.6619, zoom: 13 },
  { ubigeo: '150301', departamento: 'LIMA', provincia: 'CAJATAMBO', distrito: 'CAJATAMBO', region: 'COSTA', poblacion: 2800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -10.4719, lng: -76.9939, zoom: 13 },
  { ubigeo: '150401', departamento: 'LIMA', provincia: 'CANTA', distrito: 'CANTA', region: 'COSTA', poblacion: 3400, gpc: 0.55, tasaCrecimiento: 1.4, lat: -11.4689, lng: -76.6239, zoom: 13 },
  { ubigeo: '150901', departamento: 'LIMA', provincia: 'OYÓN', distrito: 'OYÓN', region: 'COSTA', poblacion: 12500, gpc: 0.62, tasaCrecimiento: 1.4, lat: -10.6689, lng: -76.7719, zoom: 13 },
  { ubigeo: '151001', departamento: 'LIMA', provincia: 'YAUYOS', distrito: 'YAUYOS', region: 'COSTA', poblacion: 2100, gpc: 0.5, tasaCrecimiento: 1.4, lat: -12.4589, lng: -75.9189, zoom: 13 },
  { ubigeo: '200101', departamento: 'PIURA', provincia: 'PIURA', distrito: 'PIURA', region: 'COSTA', poblacion: 185000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -5.1944, lng: -80.6328, zoom: 13 },
  { ubigeo: '200104', departamento: 'PIURA', provincia: 'PIURA', distrito: 'CASTILLA', region: 'COSTA', poblacion: 175000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -5.185, lng: -80.615, zoom: 13 },
  { ubigeo: '200105', departamento: 'PIURA', provincia: 'PIURA', distrito: 'CATACAOS', region: 'COSTA', poblacion: 78000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -5.265, lng: -80.675, zoom: 13 },
  { ubigeo: '200115', departamento: 'PIURA', provincia: 'PIURA', distrito: 'VEINTISÉIS DE OCTUBRE', region: 'COSTA', poblacion: 185000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -5.175, lng: -80.665, zoom: 13 },
  { ubigeo: '200601', departamento: 'PIURA', provincia: 'SULLANA', distrito: 'SULLANA', region: 'COSTA', poblacion: 185000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -4.8989, lng: -80.685, zoom: 13 },
  { ubigeo: '200602', departamento: 'PIURA', provincia: 'SULLANA', distrito: 'BELLAVISTA', region: 'COSTA', poblacion: 42000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -4.885, lng: -80.675, zoom: 13 },
  { ubigeo: '200701', departamento: 'PIURA', provincia: 'TALARA', distrito: 'PARIÑAS (TALARA)', region: 'COSTA', poblacion: 98000, gpc: 0.78, tasaCrecimiento: 1.4, lat: -4.5789, lng: -81.2719, zoom: 13 },
  { ubigeo: '200705', departamento: 'PIURA', provincia: 'TALARA', distrito: 'MÁNCORA', region: 'COSTA', poblacion: 15000, gpc: 0.85, tasaCrecimiento: 1.4, lat: -4.1069, lng: -81.0489, zoom: 13 },
  { ubigeo: '200501', departamento: 'PIURA', provincia: 'PAITA', distrito: 'PAITA', region: 'COSTA', poblacion: 92000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -5.0889, lng: -81.1089, zoom: 13 },
  { ubigeo: '200801', departamento: 'PIURA', provincia: 'SECHURA', distrito: 'SECHURA', region: 'COSTA', poblacion: 48000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -5.5589, lng: -80.8239, zoom: 13 },
  { ubigeo: '200401', departamento: 'PIURA', provincia: 'MORROPÓN', distrito: 'CHULUCANAS', region: 'COSTA', poblacion: 88000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -5.095, lng: -80.1619, zoom: 13 },
  { ubigeo: '200201', departamento: 'PIURA', provincia: 'AYABACA', distrito: 'AYABACA', region: 'COSTA', poblacion: 38000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -4.6389, lng: -79.715, zoom: 13 },
  { ubigeo: '200301', departamento: 'PIURA', provincia: 'HUANCABAMBA', distrito: 'HUANCABAMBA', region: 'COSTA', poblacion: 34000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -5.2389, lng: -79.45, zoom: 13 },
  { ubigeo: '120101', departamento: 'JUNÍN', provincia: 'HUANCAYO', distrito: 'HUANCAYO', region: 'SIERRA', poblacion: 125000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -12.0651, lng: -75.2048, zoom: 13 },
  { ubigeo: '120114', departamento: 'JUNÍN', provincia: 'HUANCAYO', distrito: 'EL TAMBO', region: 'SIERRA', poblacion: 175000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -12.0489, lng: -75.2219, zoom: 13 },
  { ubigeo: '120107', departamento: 'JUNÍN', provincia: 'HUANCAYO', distrito: 'CHILCA', region: 'SIERRA', poblacion: 98000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -12.0819, lng: -75.195, zoom: 13 },
  { ubigeo: '120301', departamento: 'JUNÍN', provincia: 'CHANCHAMAYO', distrito: 'LA MERCED (CHANCHAMAYO)', region: 'SIERRA', poblacion: 32000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -11.055, lng: -75.3289, zoom: 13 },
  { ubigeo: '120305', departamento: 'JUNÍN', provincia: 'CHANCHAMAYO', distrito: 'SAN RAMÓN', region: 'SIERRA', poblacion: 28000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -11.125, lng: -75.3569, zoom: 13 },
  { ubigeo: '120601', departamento: 'JUNÍN', provincia: 'SATIPO', distrito: 'SATIPO', region: 'SIERRA', poblacion: 42000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -11.2539, lng: -74.6819, zoom: 13 },
  { ubigeo: '120701', departamento: 'JUNÍN', provincia: 'TARMA', distrito: 'TARMA', region: 'SIERRA', poblacion: 55000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -11.4189, lng: -75.6889, zoom: 13 },
  { ubigeo: '120401', departamento: 'JUNÍN', provincia: 'JAUJA', distrito: 'JAUJA', region: 'SIERRA', poblacion: 31000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -11.775, lng: -75.4989, zoom: 13 },
  { ubigeo: '120801', departamento: 'JUNÍN', provincia: 'YAULI', distrito: 'LA OROYA', region: 'SIERRA', poblacion: 22000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -11.5289, lng: -75.9089, zoom: 13 },
  { ubigeo: '120201', departamento: 'JUNÍN', provincia: 'CONCEPCIÓN', distrito: 'CONCEPCIÓN', region: 'SIERRA', poblacion: 16000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -11.9189, lng: -75.3119, zoom: 13 },
  { ubigeo: '120901', departamento: 'JUNÍN', provincia: 'CHUPACA', distrito: 'CHUPACA', region: 'SIERRA', poblacion: 24000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -12.0619, lng: -75.285, zoom: 13 },
  { ubigeo: '120501', departamento: 'JUNÍN', provincia: 'JUNÍN', distrito: 'JUNÍN', region: 'SIERRA', poblacion: 12000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -11.1589, lng: -75.9939, zoom: 13 },
  { ubigeo: '210101', departamento: 'PUNO', provincia: 'PUNO', distrito: 'PUNO', region: 'SIERRA', poblacion: 142000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -15.8422, lng: -70.0199, zoom: 13 },
  { ubigeo: '210102', departamento: 'PUNO', provincia: 'PUNO', distrito: 'ACORA', region: 'SIERRA', poblacion: 28000, gpc: 0.54, tasaCrecimiento: 1.4, lat: -15.975, lng: -69.805, zoom: 13 },
  { ubigeo: '211101', departamento: 'PUNO', provincia: 'SAN ROMÁN', distrito: 'JULIACA', region: 'SIERRA', poblacion: 310000, gpc: 0.75, tasaCrecimiento: 1.4, lat: -15.495, lng: -70.1319, zoom: 13 },
  { ubigeo: '211104', departamento: 'PUNO', provincia: 'SAN ROMÁN', distrito: 'SAN MIGUEL', region: 'SIERRA', poblacion: 68000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -15.4819, lng: -70.145, zoom: 13 },
  { ubigeo: '210201', departamento: 'PUNO', provincia: 'AZÁNGARO', distrito: 'AZÁNGARO', region: 'SIERRA', poblacion: 32000, gpc: 0.55, tasaCrecimiento: 1.4, lat: -14.9089, lng: -70.1989, zoom: 13 },
  { ubigeo: '210301', departamento: 'PUNO', provincia: 'CARABAYA', distrito: 'MACUSANI', region: 'SIERRA', poblacion: 14000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -14.0689, lng: -70.4319, zoom: 13 },
  { ubigeo: '210401', departamento: 'PUNO', provincia: 'CHUCUITO', distrito: 'JULI', region: 'SIERRA', poblacion: 24000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -16.215, lng: -69.4589, zoom: 13 },
  { ubigeo: '210501', departamento: 'PUNO', provincia: 'EL COLLAO', distrito: 'ILAVE', region: 'SIERRA', poblacion: 58000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -16.085, lng: -69.6389, zoom: 13 },
  { ubigeo: '210601', departamento: 'PUNO', provincia: 'HUANCANÉ', distrito: 'HUANCANÉ', region: 'SIERRA', poblacion: 22000, gpc: 0.54, tasaCrecimiento: 1.4, lat: -15.2019, lng: -69.7619, zoom: 13 },
  { ubigeo: '210701', departamento: 'PUNO', provincia: 'LAMPA', distrito: 'LAMPA', region: 'SIERRA', poblacion: 12500, gpc: 0.54, tasaCrecimiento: 1.4, lat: -15.3619, lng: -70.3689, zoom: 13 },
  { ubigeo: '210801', departamento: 'PUNO', provincia: 'MELGAR', distrito: 'AYAVIRI', region: 'SIERRA', poblacion: 26000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -14.8819, lng: -70.5889, zoom: 13 },
  { ubigeo: '210901', departamento: 'PUNO', provincia: 'MOHO', distrito: 'MOHO', region: 'SIERRA', poblacion: 18000, gpc: 0.52, tasaCrecimiento: 1.4, lat: -15.3589, lng: -69.4989, zoom: 13 },
  { ubigeo: '211001', departamento: 'PUNO', provincia: 'SAN ANTONIO DE PUTINA', distrito: 'PUTINA', region: 'SIERRA', poblacion: 16000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -14.9139, lng: -69.8719, zoom: 13 },
  { ubigeo: '211201', departamento: 'PUNO', provincia: 'SANDIA', distrito: 'SANDIA', region: 'SIERRA', poblacion: 11500, gpc: 0.54, tasaCrecimiento: 1.4, lat: -14.3319, lng: -69.4289, zoom: 13 },
  { ubigeo: '211301', departamento: 'PUNO', provincia: 'YUNGUYO', distrito: 'YUNGUYO', region: 'SIERRA', poblacion: 29000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -16.2419, lng: -69.0919, zoom: 13 },
  { ubigeo: '160101', departamento: 'LORETO', provincia: 'MAYNAS', distrito: 'IQUITOS', region: 'SELVA', poblacion: 160000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -3.7491, lng: -73.2538, zoom: 13 },
  { ubigeo: '160108', departamento: 'LORETO', provincia: 'MAYNAS', distrito: 'PUNCHANA', region: 'SELVA', poblacion: 92000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -3.725, lng: -73.245, zoom: 13 },
  { ubigeo: '160112', departamento: 'LORETO', provincia: 'MAYNAS', distrito: 'BELÉN', region: 'SELVA', poblacion: 78000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -3.7689, lng: -73.2589, zoom: 13 },
  { ubigeo: '160113', departamento: 'LORETO', provincia: 'MAYNAS', distrito: 'SAN JUAN BAUTISTA', region: 'SELVA', poblacion: 145000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -3.785, lng: -73.2919, zoom: 13 },
  { ubigeo: '160201', departamento: 'LORETO', provincia: 'ALTO AMAZONAS', distrito: 'YURIMAGUAS', region: 'SELVA', poblacion: 72000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -5.9019, lng: -76.1089, zoom: 13 },
  { ubigeo: '160301', departamento: 'LORETO', provincia: 'LORETO', distrito: 'NAUTA', region: 'SELVA', poblacion: 32000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -4.5089, lng: -73.575, zoom: 13 },
  { ubigeo: '160401', departamento: 'LORETO', provincia: 'MARISCAL RAMÓN CASTILLA', distrito: 'RAMÓN CASTILLA (CABALLOCOCHA)', region: 'SELVA', poblacion: 26000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -3.905, lng: -70.5189, zoom: 13 },
  { ubigeo: '160501', departamento: 'LORETO', provincia: 'REQUENA', distrito: 'REQUENA', region: 'SELVA', poblacion: 28000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -5.0589, lng: -73.845, zoom: 13 },
  { ubigeo: '160601', departamento: 'LORETO', provincia: 'UCAYALI', distrito: 'CONTAMANA', region: 'SELVA', poblacion: 24000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -7.355, lng: -75.0119, zoom: 13 },
  { ubigeo: '160701', departamento: 'LORETO', provincia: 'DATEM DEL MARAÑÓN', distrito: 'BARRANCA (SAN LORENZO)', region: 'SELVA', poblacion: 16000, gpc: 0.55, tasaCrecimiento: 1.4, lat: -4.825, lng: -76.5819, zoom: 13 },
  { ubigeo: '160801', departamento: 'LORETO', provincia: 'PUTUMAYO', distrito: 'PUTUMAYO (SAN ANTONIO DEL ESTRECHO)', region: 'SELVA', poblacion: 8500, gpc: 0.52, tasaCrecimiento: 1.4, lat: -2.45, lng: -72.6667, zoom: 13 },
  { ubigeo: '220901', departamento: 'SAN MARTÍN', provincia: 'SAN MARTÍN', distrito: 'TARAPOTO', region: 'SELVA', poblacion: 110000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -6.4889, lng: -76.365, zoom: 13 },
  { ubigeo: '220910', departamento: 'SAN MARTÍN', provincia: 'SAN MARTÍN', distrito: 'MORALES', region: 'SELVA', poblacion: 38000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -6.475, lng: -76.3889, zoom: 13 },
  { ubigeo: '220903', departamento: 'SAN MARTÍN', provincia: 'SAN MARTÍN', distrito: 'LA BANDA DE SHILCAYO', region: 'SELVA', poblacion: 48000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -6.495, lng: -76.345, zoom: 13 },
  { ubigeo: '220101', departamento: 'SAN MARTÍN', provincia: 'MOYOBAMBA', distrito: 'MOYOBAMBA', region: 'SELVA', poblacion: 88000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -6.035, lng: -76.9719, zoom: 13 },
  { ubigeo: '220801', departamento: 'SAN MARTÍN', provincia: 'RIOJA', distrito: 'RIOJA', region: 'SELVA', poblacion: 32000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -6.0619, lng: -77.1689, zoom: 13 },
  { ubigeo: '221001', departamento: 'SAN MARTÍN', provincia: 'TOCACHE', distrito: 'TOCACHE', region: 'SELVA', poblacion: 34000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -8.1889, lng: -76.5189, zoom: 13 },
  { ubigeo: '220601', departamento: 'SAN MARTÍN', provincia: 'MARISCAL CÁCERES', distrito: 'JUANJUÍ', region: 'SELVA', poblacion: 39000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -7.175, lng: -76.7289, zoom: 13 },
  { ubigeo: '220201', departamento: 'SAN MARTÍN', provincia: 'BELLAVISTA', distrito: 'BELLAVISTA', region: 'SELVA', poblacion: 26000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -7.0589, lng: -76.585, zoom: 13 },
  { ubigeo: '220501', departamento: 'SAN MARTÍN', provincia: 'LAMAS', distrito: 'LAMAS', region: 'SELVA', poblacion: 16500, gpc: 0.6, tasaCrecimiento: 1.4, lat: -6.4219, lng: -76.515, zoom: 13 },
  { ubigeo: '220701', departamento: 'SAN MARTÍN', provincia: 'PICOTA', distrito: 'PICOTA', region: 'SELVA', poblacion: 12000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -6.9189, lng: -76.3319, zoom: 13 },
  { ubigeo: '220301', departamento: 'SAN MARTÍN', provincia: 'EL DORADO', distrito: 'SAN JOSÉ DE SISA', region: 'SELVA', poblacion: 18000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -6.6189, lng: -76.695, zoom: 13 },
  { ubigeo: '220401', departamento: 'SAN MARTÍN', provincia: 'HUALLAGA', distrito: 'SAPOSOA', region: 'SELVA', poblacion: 14000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -6.935, lng: -76.7719, zoom: 13 },
  { ubigeo: '110101', departamento: 'ICA', provincia: 'ICA', distrito: 'ICA', region: 'COSTA', poblacion: 160000, gpc: 0.78, tasaCrecimiento: 1.4, lat: -14.0678, lng: -75.7286, zoom: 13 },
  { ubigeo: '110107', departamento: 'ICA', provincia: 'ICA', distrito: 'PARCONA', region: 'COSTA', poblacion: 58000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -14.055, lng: -75.705, zoom: 13 },
  { ubigeo: '110112', departamento: 'ICA', provincia: 'ICA', distrito: 'SUBTANJALLA', region: 'COSTA', poblacion: 34000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -14.025, lng: -75.7589, zoom: 13 },
  { ubigeo: '110201', departamento: 'ICA', provincia: 'CHINCHA', distrito: 'CHINCHA ALTA', region: 'COSTA', poblacion: 74000, gpc: 0.75, tasaCrecimiento: 1.4, lat: -13.4189, lng: -76.1319, zoom: 13 },
  { ubigeo: '110203', departamento: 'ICA', provincia: 'CHINCHA', distrito: 'CHINCHA BAJA', region: 'COSTA', poblacion: 14500, gpc: 0.68, tasaCrecimiento: 1.4, lat: -13.4589, lng: -76.1619, zoom: 13 },
  { ubigeo: '110205', departamento: 'ICA', provincia: 'CHINCHA', distrito: 'GROCIO PRADO', region: 'COSTA', poblacion: 26000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -13.3989, lng: -76.155, zoom: 13 },
  { ubigeo: '110207', departamento: 'ICA', provincia: 'CHINCHA', distrito: 'PUEBLO NUEVO', region: 'COSTA', poblacion: 65000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -13.4089, lng: -76.1289, zoom: 13 },
  { ubigeo: '110501', departamento: 'ICA', provincia: 'PISCO', distrito: 'PISCO', region: 'COSTA', poblacion: 72000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -13.7119, lng: -76.205, zoom: 13 },
  { ubigeo: '110505', departamento: 'ICA', provincia: 'PISCO', distrito: 'PARACAS', region: 'COSTA', poblacion: 9500, gpc: 0.85, tasaCrecimiento: 1.4, lat: -13.835, lng: -76.2519, zoom: 13 },
  { ubigeo: '110506', departamento: 'ICA', provincia: 'PISCO', distrito: 'SAN ANDRÉS', region: 'COSTA', poblacion: 16000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -13.7389, lng: -76.2189, zoom: 13 },
  { ubigeo: '110301', departamento: 'ICA', provincia: 'NAZCA', distrito: 'NAZCA', region: 'COSTA', poblacion: 31000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -14.8319, lng: -74.9389, zoom: 13 },
  { ubigeo: '110303', departamento: 'ICA', provincia: 'NAZCA', distrito: 'MARCONA (SAN JUAN)', region: 'COSTA', poblacion: 18500, gpc: 0.76, tasaCrecimiento: 1.4, lat: -15.345, lng: -75.1619, zoom: 13 },
  { ubigeo: '110401', departamento: 'ICA', provincia: 'PALPA', distrito: 'PALPA', region: 'COSTA', poblacion: 7800, gpc: 0.62, tasaCrecimiento: 1.4, lat: -14.5319, lng: -75.185, zoom: 13 },
  { ubigeo: '100101', departamento: 'HUÁNUCO', provincia: 'HUÁNUCO', distrito: 'HUÁNUCO', region: 'SIERRA', poblacion: 98000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -9.9306, lng: -76.2422, zoom: 13 },
  { ubigeo: '100102', departamento: 'HUÁNUCO', provincia: 'HUÁNUCO', distrito: 'AMARILIS', region: 'SIERRA', poblacion: 88000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -9.9489, lng: -76.2319, zoom: 13 },
  { ubigeo: '100111', departamento: 'HUÁNUCO', provincia: 'HUÁNUCO', distrito: 'PILLCO MARCA', region: 'SIERRA', poblacion: 42000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -9.9689, lng: -76.2419, zoom: 13 },
  { ubigeo: '100601', departamento: 'HUÁNUCO', provincia: 'LEONCIO PRADO', distrito: 'RUPA-RUPA (TINGO MARÍA)', region: 'SIERRA', poblacion: 68000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -9.2989, lng: -75.9989, zoom: 13 },
  { ubigeo: '100201', departamento: 'HUÁNUCO', provincia: 'AMBO', distrito: 'AMBO', region: 'SIERRA', poblacion: 18000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -10.1319, lng: -76.205, zoom: 13 },
  { ubigeo: '100301', departamento: 'HUÁNUCO', provincia: 'DOS DE MAYO', distrito: 'LA UNIÓN', region: 'SIERRA', poblacion: 12000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -9.8289, lng: -76.8019, zoom: 13 },
  { ubigeo: '100401', departamento: 'HUÁNUCO', provincia: 'HUACAYBAMBA', distrito: 'HUACAYBAMBA', region: 'SIERRA', poblacion: 6500, gpc: 0.52, tasaCrecimiento: 1.4, lat: -9.0389, lng: -76.9539, zoom: 13 },
  { ubigeo: '100501', departamento: 'HUÁNUCO', provincia: 'HUAMALÍES', distrito: 'LLATA', region: 'SIERRA', poblacion: 16000, gpc: 0.55, tasaCrecimiento: 1.4, lat: -9.55, lng: -76.8189, zoom: 13 },
  { ubigeo: '100701', departamento: 'HUÁNUCO', provincia: 'MARAÑÓN', distrito: 'HUACRACHUCO', region: 'SIERRA', poblacion: 12000, gpc: 0.54, tasaCrecimiento: 1.4, lat: -8.6089, lng: -77.1489, zoom: 13 },
  { ubigeo: '100801', departamento: 'HUÁNUCO', provincia: 'PACHITEA', distrito: 'PANAO', region: 'SIERRA', poblacion: 22000, gpc: 0.54, tasaCrecimiento: 1.4, lat: -9.8989, lng: -75.9989, zoom: 13 },
  { ubigeo: '100901', departamento: 'HUÁNUCO', provincia: 'PUERTO INCA', distrito: 'PUERTO INCA', region: 'SIERRA', poblacion: 14000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -9.3789, lng: -74.965, zoom: 13 },
  { ubigeo: '101001', departamento: 'HUÁNUCO', provincia: 'LAURICOCHA', distrito: 'JESÚS', region: 'SIERRA', poblacion: 7200, gpc: 0.52, tasaCrecimiento: 1.4, lat: -10.075, lng: -76.6319, zoom: 13 },
  { ubigeo: '101101', departamento: 'HUÁNUCO', provincia: 'YAROWILCA', distrito: 'CHAVINILLO', region: 'SIERRA', poblacion: 6800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -9.855, lng: -76.6119, zoom: 13 },
  { ubigeo: '090101', departamento: 'HUANCAVELICA', provincia: 'HUANCAVELICA', distrito: 'HUANCAVELICA', region: 'SIERRA', poblacion: 54000, gpc: 0.64, tasaCrecimiento: 1.4, lat: -12.7872, lng: -74.9731, zoom: 13 },
  { ubigeo: '090102', departamento: 'HUANCAVELICA', provincia: 'HUANCAVELICA', distrito: 'ACOBAMBILLA', region: 'SIERRA', poblacion: 3800, gpc: 0.5, tasaCrecimiento: 1.4, lat: -12.6689, lng: -75.3319, zoom: 13 },
  { ubigeo: '090104', departamento: 'HUANCAVELICA', provincia: 'HUANCAVELICA', distrito: 'ASCENSIÓN', region: 'SIERRA', poblacion: 16000, gpc: 0.6, tasaCrecimiento: 1.4, lat: -12.7819, lng: -74.9819, zoom: 13 },
  { ubigeo: '090701', departamento: 'HUANCAVELICA', provincia: 'TAYACAJA', distrito: 'PAMPAS', region: 'SIERRA', poblacion: 14500, gpc: 0.58, tasaCrecimiento: 1.4, lat: -12.3989, lng: -74.8689, zoom: 13 },
  { ubigeo: '090201', departamento: 'HUANCAVELICA', provincia: 'ACOBAMBA', distrito: 'ACOBAMBA', region: 'SIERRA', poblacion: 12000, gpc: 0.54, tasaCrecimiento: 1.4, lat: -12.8419, lng: -74.5719, zoom: 13 },
  { ubigeo: '090301', departamento: 'HUANCAVELICA', provincia: 'ANGARAES', distrito: 'LIRCAY', region: 'SIERRA', poblacion: 26000, gpc: 0.56, tasaCrecimiento: 1.4, lat: -12.9889, lng: -74.7219, zoom: 13 },
  { ubigeo: '090401', departamento: 'HUANCAVELICA', provincia: 'CASTROVIRREYNA', distrito: 'CASTROVIRREYNA', region: 'SIERRA', poblacion: 3800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -13.2789, lng: -75.3189, zoom: 13 },
  { ubigeo: '090501', departamento: 'HUANCAVELICA', provincia: 'CHURCAMPA', distrito: 'CHURCAMPA', region: 'SIERRA', poblacion: 7200, gpc: 0.54, tasaCrecimiento: 1.4, lat: -12.7419, lng: -74.3889, zoom: 13 },
  { ubigeo: '090601', departamento: 'HUANCAVELICA', provincia: 'HUAYTARÁ', distrito: 'HUAYTARÁ', region: 'SIERRA', poblacion: 2800, gpc: 0.52, tasaCrecimiento: 1.4, lat: -13.6039, lng: -75.3539, zoom: 13 },
  { ubigeo: '180101', departamento: 'MOQUEGUA', provincia: 'MARISCAL NIETO', distrito: 'MOQUEGUA', region: 'COSTA', poblacion: 68000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -17.1939, lng: -70.9339, zoom: 13 },
  { ubigeo: '180106', departamento: 'MOQUEGUA', provincia: 'MARISCAL NIETO', distrito: 'SAMEGUA', region: 'COSTA', poblacion: 11500, gpc: 0.7, tasaCrecimiento: 1.4, lat: -17.175, lng: -70.8989, zoom: 13 },
  { ubigeo: '180105', departamento: 'MOQUEGUA', provincia: 'MARISCAL NIETO', distrito: 'SAN ANTONIO', region: 'COSTA', poblacion: 18000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -17.205, lng: -70.925, zoom: 13 },
  { ubigeo: '180201', departamento: 'MOQUEGUA', provincia: 'GENERAL SÁNCHEZ CERRO', distrito: 'OMATE', region: 'COSTA', poblacion: 4200, gpc: 0.56, tasaCrecimiento: 1.4, lat: -16.6739, lng: -70.9689, zoom: 13 },
  { ubigeo: '180301', departamento: 'MOQUEGUA', provincia: 'ILO', distrito: 'ILO', region: 'COSTA', poblacion: 78000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -17.645, lng: -71.3419, zoom: 13 },
  { ubigeo: '180303', departamento: 'MOQUEGUA', provincia: 'ILO', distrito: 'PACOCHA', region: 'COSTA', poblacion: 5600, gpc: 0.78, tasaCrecimiento: 1.4, lat: -17.595, lng: -71.3319, zoom: 13 },
  { ubigeo: '190101', departamento: 'PASCO', provincia: 'PASCO', distrito: 'CHAUPIMARCA (CERRO DE PASCO)', region: 'SIERRA', poblacion: 34000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -10.6839, lng: -76.255, zoom: 13 },
  { ubigeo: '190113', departamento: 'PASCO', provincia: 'PASCO', distrito: 'YANACANCHA', region: 'SIERRA', poblacion: 32000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -10.655, lng: -76.2419, zoom: 13 },
  { ubigeo: '190301', departamento: 'PASCO', provincia: 'OXAPAMPA', distrito: 'OXAPAMPA', region: 'SIERRA', poblacion: 22000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -10.575, lng: -75.4019, zoom: 13 },
  { ubigeo: '190306', departamento: 'PASCO', provincia: 'OXAPAMPA', distrito: 'POZUZO', region: 'SIERRA', poblacion: 9500, gpc: 0.65, tasaCrecimiento: 1.4, lat: -10.0689, lng: -75.5519, zoom: 13 },
  { ubigeo: '190307', departamento: 'PASCO', provincia: 'OXAPAMPA', distrito: 'VILLA RICA', region: 'SIERRA', poblacion: 19000, gpc: 0.66, tasaCrecimiento: 1.4, lat: -10.7389, lng: -75.2719, zoom: 13 },
  { ubigeo: '190201', departamento: 'PASCO', provincia: 'DANIEL ALCIDES CARRIÓN', distrito: 'YANAHUANCA', region: 'SIERRA', poblacion: 14000, gpc: 0.58, tasaCrecimiento: 1.4, lat: -10.4939, lng: -76.515, zoom: 13 },
  { ubigeo: '230101', departamento: 'TACNA', provincia: 'TACNA', distrito: 'TACNA', region: 'COSTA', poblacion: 110000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -18.0146, lng: -70.2525, zoom: 13 },
  { ubigeo: '230102', departamento: 'TACNA', provincia: 'TACNA', distrito: 'ALTO DE LA ALIANZA', region: 'COSTA', poblacion: 38000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -17.995, lng: -70.2589, zoom: 13 },
  { ubigeo: '230104', departamento: 'TACNA', provincia: 'TACNA', distrito: 'CIUDAD NUEVA', region: 'COSTA', poblacion: 36000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -17.985, lng: -70.245, zoom: 13 },
  { ubigeo: '230108', departamento: 'TACNA', provincia: 'TACNA', distrito: 'CORONEL GREGORIO ALBARRACÍN', region: 'COSTA', poblacion: 130000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -18.055, lng: -70.2789, zoom: 13 },
  { ubigeo: '230109', departamento: 'TACNA', provincia: 'TACNA', distrito: 'POCOLLAY', region: 'COSTA', poblacion: 21000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -18.0019, lng: -70.2289, zoom: 13 },
  { ubigeo: '230201', departamento: 'TACNA', provincia: 'CANDARAVE', distrito: 'CANDARAVE', region: 'COSTA', poblacion: 3800, gpc: 0.54, tasaCrecimiento: 1.4, lat: -17.2689, lng: -70.2489, zoom: 13 },
  { ubigeo: '230301', departamento: 'TACNA', provincia: 'JORGE BASADRE', distrito: 'ILABAYA', region: 'COSTA', poblacion: 6500, gpc: 0.65, tasaCrecimiento: 1.4, lat: -17.4219, lng: -70.5119, zoom: 13 },
  { ubigeo: '230401', departamento: 'TACNA', provincia: 'TARATA', distrito: 'TARATA', region: 'COSTA', poblacion: 4200, gpc: 0.55, tasaCrecimiento: 1.4, lat: -17.4739, lng: -70.0319, zoom: 13 },
  { ubigeo: '240101', departamento: 'TUMBES', provincia: 'TUMBES', distrito: 'TUMBES', region: 'COSTA', poblacion: 115000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -3.5669, lng: -80.4519, zoom: 13 },
  { ubigeo: '240102', departamento: 'TUMBES', provincia: 'TUMBES', distrito: 'CORRALES', region: 'COSTA', poblacion: 26000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -3.595, lng: -80.485, zoom: 13 },
  { ubigeo: '240105', departamento: 'TUMBES', provincia: 'TUMBES', distrito: 'PAMPAS DE HOSPITAL', region: 'COSTA', poblacion: 8200, gpc: 0.62, tasaCrecimiento: 1.4, lat: -3.695, lng: -80.4389, zoom: 13 },
  { ubigeo: '240201', departamento: 'TUMBES', provincia: 'CONTRALMIRANTE VILLAR', distrito: 'ZORRITOS', region: 'COSTA', poblacion: 14000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -3.6789, lng: -80.6689, zoom: 13 },
  { ubigeo: '240203', departamento: 'TUMBES', provincia: 'CONTRALMIRANTE VILLAR', distrito: 'CANOAS DE PUNTA SAL', region: 'COSTA', poblacion: 6800, gpc: 0.85, tasaCrecimiento: 1.4, lat: -3.9489, lng: -80.935, zoom: 13 },
  { ubigeo: '240301', departamento: 'TUMBES', provincia: 'ZARUMILLA', distrito: 'ZARUMILLA', region: 'COSTA', poblacion: 26000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -3.5019, lng: -80.2719, zoom: 13 },
  { ubigeo: '240302', departamento: 'TUMBES', provincia: 'ZARUMILLA', distrito: 'AGUAS VERDES', region: 'COSTA', poblacion: 19000, gpc: 0.72, tasaCrecimiento: 1.4, lat: -3.4819, lng: -80.245, zoom: 13 },
  { ubigeo: '170101', departamento: 'MADRE DE DIOS', provincia: 'TAMBOPATA', distrito: 'TAMBOPATA (PUERTO MALDONADO)', region: 'SELVA', poblacion: 88000, gpc: 0.76, tasaCrecimiento: 1.4, lat: -12.5939, lng: -69.1889, zoom: 13 },
  { ubigeo: '170102', departamento: 'MADRE DE DIOS', provincia: 'TAMBOPATA', distrito: 'INAMBARI (MAZUKO)', region: 'SELVA', poblacion: 16000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -13.0489, lng: -70.2989, zoom: 13 },
  { ubigeo: '170103', departamento: 'MADRE DE DIOS', provincia: 'TAMBOPATA', distrito: 'LAS PIEDRAS', region: 'SELVA', poblacion: 15500, gpc: 0.65, tasaCrecimiento: 1.4, lat: -12.3989, lng: -69.1989, zoom: 13 },
  { ubigeo: '170104', departamento: 'MADRE DE DIOS', provincia: 'TAMBOPATA', distrito: 'LABERINTO', region: 'SELVA', poblacion: 8200, gpc: 0.64, tasaCrecimiento: 1.4, lat: -12.715, lng: -69.585, zoom: 13 },
  { ubigeo: '170201', departamento: 'MADRE DE DIOS', provincia: 'MANU', distrito: 'MANU', region: 'SELVA', poblacion: 4800, gpc: 0.62, tasaCrecimiento: 1.4, lat: -12.2539, lng: -70.9019, zoom: 13 },
  { ubigeo: '170301', departamento: 'MADRE DE DIOS', provincia: 'TAHUAMANU', distrito: 'IÑAPARI', region: 'SELVA', poblacion: 3800, gpc: 0.66, tasaCrecimiento: 1.4, lat: -10.95, lng: -69.575, zoom: 13 },
  { ubigeo: '250101', departamento: 'UCAYALI', provincia: 'CORONEL PORTILLO', distrito: 'CALLERÍA (PUCALLPA)', region: 'SELVA', poblacion: 165000, gpc: 0.74, tasaCrecimiento: 1.4, lat: -8.3791, lng: -74.5538, zoom: 13 },
  { ubigeo: '250107', departamento: 'UCAYALI', provincia: 'CORONEL PORTILLO', distrito: 'MANANTAY', region: 'SELVA', poblacion: 98000, gpc: 0.68, tasaCrecimiento: 1.4, lat: -8.4189, lng: -74.545, zoom: 13 },
  { ubigeo: '250105', departamento: 'UCAYALI', provincia: 'CORONEL PORTILLO', distrito: 'YARINACOCHA', region: 'SELVA', poblacion: 112000, gpc: 0.7, tasaCrecimiento: 1.4, lat: -8.355, lng: -74.575, zoom: 13 },
  { ubigeo: '250103', departamento: 'UCAYALI', provincia: 'CORONEL PORTILLO', distrito: 'CAMPOVERDE', region: 'SELVA', poblacion: 18500, gpc: 0.62, tasaCrecimiento: 1.4, lat: -8.475, lng: -74.805, zoom: 13 },
  { ubigeo: '250201', departamento: 'UCAYALI', provincia: 'ATALAYA', distrito: 'RAYMONDI (ATALAYA)', region: 'SELVA', poblacion: 34000, gpc: 0.62, tasaCrecimiento: 1.4, lat: -10.7319, lng: -73.755, zoom: 13 },
  { ubigeo: '250301', departamento: 'UCAYALI', provincia: 'PADRE ABAD', distrito: 'PADRE ABAD (AGUAYTÍA)', region: 'SELVA', poblacion: 36000, gpc: 0.65, tasaCrecimiento: 1.4, lat: -9.035, lng: -75.5089, zoom: 13 },
  { ubigeo: '250303', departamento: 'UCAYALI', provincia: 'PADRE ABAD', distrito: 'BOQUERÓN', region: 'SELVA', poblacion: 9200, gpc: 0.58, tasaCrecimiento: 1.4, lat: -9.105, lng: -75.685, zoom: 13 },
  { ubigeo: '250401', departamento: 'UCAYALI', provincia: 'PURÚS', distrito: 'PURÚS (ESPERANZA)', region: 'SELVA', poblacion: 4500, gpc: 0.54, tasaCrecimiento: 1.4, lat: -9.7719, lng: -70.7119, zoom: 13 },
];
