export default {
  expo: {
    name: 'weather-app',
    slug: 'weather-app',
    scheme: 'weatherapp',
    userInterfaceStyle: 'automatic',

    android: {
      package: 'com.ledezmadiego.weatherapp',
    },

    ios: {
      bundleIdentifier: 'com.ledezmadiego.weatherapp',
    },

    extra: {
      weatherApiKey: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
      eas: {
        projectId: '4e4b3d3c-c8e9-41bf-a9e6-fb061d89797b',
      },
    },
  },
};
