import { ClimaPorDia } from '@/src/tipos/clima';

// Mapeos de códigos de WeatherAPI a tipos de condición
// Fuente: https://www.weatherapi.com/docs/weather_codes.asp
export const CODIGOS_CLIMA_SOLEADO = [1000];
export const CODIGOS_CLIMA_PARCIALMENTE_NUBLADO = [1003];
export const CODIGOS_CLIMA_NUBLADO = [1006, 1009];
export const CODIGOS_CLIMA_NIEBLA = [1030, 1135, 1147];
export const CODIGOS_CLIMA_LLUVIA = [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195];
export const CODIGOS_CLIMA_TORMENTA = [1087, 1273, 1276];

// para mockear, por si hay que testear solo componentes y no llamadas a la API

export const DATOS_CLIMA: ClimaPorDia[] = [
  {
    ciudad: 'BUENOS AIRES',
    condicion: 'Soleado',
    codigoCondicion: 1000,
    fecha: '2026-04-13',
    temperatura: 24,
    min: 18,
    max: 26,
    indicadores: [
      { tipo: 'Humedad', valor: 60, unidad: '%' },
      { tipo: 'Probabilidad de lluvia', valor: 10, unidad: '%' },
      { tipo: 'Viento', valor: 3.2, unidad: 'm/s' },
    ],
  },
  {
    ciudad: 'BUENOS AIRES',
    condicion: 'Parcialmente nublado',
    codigoCondicion: 1003,
    fecha: '2026-04-14',
    min: 17,
    max: 25,
    indicadores: [
      { tipo: 'Humedad', valor: 65, unidad: '%' },
      { tipo: 'Probabilidad de lluvia', valor: 20, unidad: '%' },
      { tipo: 'Viento', valor: 2.5, unidad: 'm/s' },
    ],
  },
  {
    ciudad: 'BUENOS AIRES',
    condicion: 'Lluvia',
    codigoCondicion: 1183,
    fecha: '2026-04-15',
    min: 16,
    max: 22,
    indicadores: [
      { tipo: 'Humedad', valor: 80, unidad: '%' },
      { tipo: 'Probabilidad de lluvia', valor: 75, unidad: '%' },
      { tipo: 'Viento', valor: 4.1, unidad: 'm/s' },
    ],
  },
];
