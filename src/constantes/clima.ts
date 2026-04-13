import { ClimaPorDia } from '@/src/tipos/clima';

// para mockear por si hay que testear solo componentes y no necesariamente llamadas a la API

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
