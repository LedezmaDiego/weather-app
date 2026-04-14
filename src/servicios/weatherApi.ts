import { ClimaPorDia } from '../tipos/clima';

//  use dotenv
const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

const formatearFecha = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const kmhAMetrosPorSegundo = (kmh: number) => kmh / 3.6;

export const obtenerClimaPorCiudad = async (ciudad: string): Promise<ClimaPorDia[]> => {
  try {
    const hoy = new Date();
    const ayerDate = new Date();
    ayerDate.setDate(hoy.getDate() - 1);

    const ayerStr = formatearFecha(ayerDate);

    const resAyer = await fetch(
      `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${ciudad}&dt=${ayerStr}&lang=es`
    );
    const dataAyer = await resAyer.json();

    const resForecast = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${ciudad}&days=2&lang=es`
    );
    const dataForecast = await resForecast.json();

    const diaAyer = dataAyer.forecast.forecastday[0];

    const climaAyer: ClimaPorDia = {
      ciudad: dataAyer.location.name,
      condicion: diaAyer.day.condition.text,
      codigoCondicion: diaAyer.day.condition.code,
      fecha: diaAyer.date,
      temperatura: undefined,
      min: diaAyer.day.mintemp_c,
      max: diaAyer.day.maxtemp_c,
      indicadores: [
        {
          tipo: 'Humedad',
          valor: diaAyer.day.avghumidity,
          unidad: '%',
        },
        {
          tipo: 'Precipitación',
          valor: diaAyer.day.totalprecip_mm,
          unidad: 'mm',
        },
        {
          tipo: 'Viento',
          valor: kmhAMetrosPorSegundo(diaAyer.day.maxwind_kph),
          unidad: 'm/s',
        },
      ],
    };

    const climaForecast: ClimaPorDia[] = dataForecast.forecast.forecastday.map(
      (dia: any, index: number) => {
        const esHoy = index === 0;

        return {
          ciudad: dataForecast.location.name,
          condicion: dia.day.condition.text,
          codigoCondicion: dia.day.condition.code,
          fecha: dia.date,
          temperatura: esHoy ? dataForecast.current.temp_c : undefined,
          min: dia.day.mintemp_c,
          max: esHoy ? Math.max(dia.day.maxtemp_c, dataForecast.current.temp_c) : dia.day.maxtemp_c,

          indicadores: [
            {
              tipo: 'Humedad',
              valor: esHoy ? dataForecast.current.humidity : dia.day.avghumidity,
              unidad: '%',
            },
            {
              tipo: 'Probabilidad de lluvia',
              valor: dia.day.daily_chance_of_rain,
              unidad: '%',
            },
            {
              tipo: 'Viento',
              valor: kmhAMetrosPorSegundo(
                esHoy ? dataForecast.current.wind_kph : dia.day.maxwind_kph
              ),
              unidad: 'm/s',
            },
          ],
        };
      }
    );

    return [climaAyer, ...climaForecast];
  } catch (error) {
    console.error('Error al obtener datos de clima desde API:', error);
    throw error;
  }
};
