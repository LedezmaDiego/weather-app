import { ClimaPorDia } from '../tipos/clima';
import Constants from 'expo-constants';
import {
  WeatherApiForecastResponse,
  WeatherApiHistoryResponse,
  WeatherApiForecastDay,
} from '../tipos/weatherApi';

const API_KEY =
  Constants.expoConfig?.extra?.weatherApiKey || process.env.EXPO_PUBLIC_WEATHER_API_KEY;

const formatearFecha = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const kmhAMetrosPorSegundo = (kmh: number) => kmh / 3.6;

export const obtenerClimaPorCiudad = async (ubicacion: string): Promise<ClimaPorDia[]> => {
  try {
    const hoy = new Date();
    const ayerDate = new Date();
    ayerDate.setDate(hoy.getDate() - 1);

    const ayerStr = formatearFecha(ayerDate);

    const resAyer = await fetch(
      `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${ubicacion}&dt=${ayerStr}&lang=es`
    );
    const dataAyer: WeatherApiHistoryResponse = await resAyer.json();

    const resForecast = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${ubicacion}&days=2&lang=es`
    );
    const dataForecast: WeatherApiForecastResponse = await resForecast.json();

    const nombreCiudad = dataForecast.location.name;

    const diaAyer = dataAyer.forecast.forecastday[0];

    const climaAyer: ClimaPorDia = {
      ciudad: nombreCiudad,
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

    const horaActual = new Date().getHours();

    const climaForecast: ClimaPorDia[] = dataForecast.forecast.forecastday.map(
      (dia: WeatherApiForecastDay, index: number) => {
        const esHoy = index === 0;

        let probabilidadLluvia = dia.day.daily_chance_of_rain;

        if (esHoy) {
          const horas = dia.hour;

          if (horas && horas[horaActual]) {
            probabilidadLluvia = horas[horaActual].chance_of_rain;
          }
        }

        return {
          ciudad: nombreCiudad,
          codigoCondicion: esHoy ? dataForecast.current.condition.code : dia.day.condition.code,

          condicion: esHoy ? dataForecast.current.condition.text : dia.day.condition.text,
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
              valor: probabilidadLluvia,
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
