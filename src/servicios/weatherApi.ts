import { ClimaPorDia } from '../tipos/clima';

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

const formatearFecha = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const obtenerClimaPorCiudad = async (ciudad: string): Promise<ClimaPorDia[]> => {
  const hoy = new Date();
  const ayerDate = new Date();
  ayerDate.setDate(hoy.getDate() - 1);

  const hoyStr = formatearFecha(hoy);
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
    temperatura: undefined, // no hay "actual"
    min: diaAyer.day.mintemp_c,
    max: diaAyer.day.maxtemp_c,
    indicadores: [
      {
        tipo: 'Humedad',
        valor: diaAyer.day.avghumidity,
        unidad: '%',
      },
      {
        tipo: 'Presión',
        valor: 0, // API no da promedio claro
        unidad: 'hPa',
      },
      {
        tipo: 'Viento',
        valor: diaAyer.day.maxwind_kph,
        unidad: 'km/h',
      },
    ],
  };

  // hoy y mañana vienen juntos en el forecast, así que los mapeamos ambos de una
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
        max: dia.day.maxtemp_c,
        indicadores: esHoy
          ? [
              {
                tipo: 'Humedad',
                valor: dataForecast.current.humidity,
                unidad: '%',
              },
              {
                tipo: 'Presión',
                valor: dataForecast.current.pressure_mb,
                unidad: 'hPa',
              },
              {
                tipo: 'Viento',
                valor: dataForecast.current.wind_kph,
                unidad: 'km/h',
              },
            ]
          : undefined,
      };
    }
  );

  return [climaAyer, ...climaForecast];
};
