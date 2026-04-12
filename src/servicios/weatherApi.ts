import { ClimaPorDia } from '../tipos/clima';

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export const obtenerClimaPorCiudad = async (ciudad: string): Promise<ClimaPorDia[]> => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${ciudad}&days=3&lang=es`
  );

  const data = await res.json();

  return data.forecast.forecastday.map((dia: any, index: number) => {
    const esHoy = index === 1;

    const temperaturaActual = data.current.temp_c;

    const min = dia.day.mintemp_c;
    const max = dia.day.maxtemp_c;

    return {
      ciudad: data.location.name,
      condicion: dia.day.condition.text,
      codigoCondicion: dia.day.condition.code,
      fecha: dia.date,
      temperatura: esHoy ? temperaturaActual : undefined,
      min,
      max,
      indicadores: esHoy
        ? [
            {
              tipo: 'Humedad',
              valor: data.current.humidity,
              unidad: '%',
            },
            {
              tipo: 'Presión',
              valor: data.current.pressure_mb,
              unidad: 'hPa',
            },
            {
              tipo: 'Viento',
              valor: data.current.wind_kph,
              unidad: 'km/h',
            },
          ]
        : undefined,
    };
  });
};
