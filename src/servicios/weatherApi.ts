const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export const obtenerClimaPorCiudad = async (ciudad: string) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${ciudad}&days=1&lang=es`
  );

  const data = await res.json();

  const hoy = data.forecast.forecastday[0].day;

  return {
    ciudad: data.location.name,
    condicion: data.current.condition.text,
    temperatura: data.current.temp_c,
    min: hoy.mintemp_c,
    max: hoy.maxtemp_c,
    indicadores: [
      {
        tipo: 'Humedad',
        valor: data.current.humidity,
        unidad: '%',
      },
      {
        tipo: 'Presión',
        valor: data.current.pressure_mb,
        unidad: 'mb',
      },
      {
        tipo: 'Viento',
        valor: data.current.wind_kph,
        unidad: 'km/h',
      },
    ],
  };
};
