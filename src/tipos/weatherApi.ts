export type WeatherApiForecastDay = {
  date: string;
  day: {
    condition: {
      text: string;
      code: number;
    };
    mintemp_c: number;
    maxtemp_c: number;
    avghumidity: number;
    daily_chance_of_rain: number;
    totalprecip_mm: number;
    maxwind_kph: number;
  };
  hour: {
    chance_of_rain: number;
  }[];
};

export type WeatherApiForecastResponse = {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    condition: {
      text: string;
      code: number;
    };
  };
  forecast: {
    forecastday: WeatherApiForecastDay[];
  };
};

export type WeatherApiHistoryResponse = {
  forecast: {
    forecastday: WeatherApiForecastDay[];
  };
};
