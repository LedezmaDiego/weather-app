export default {
  expo: {
    name: 'Clima',
    slug: 'weather-app',
    version: '1.0.0',
    orientation: 'portrait',
    scheme: 'weather-app',
    userInterfaceStyle: 'automatic',

    icon: './assets/images/icon.png',

    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },

    assetBundlePatterns: ['**/*'],

    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.ledezmadiego.weatherapp',
    },

    android: {
      package: 'com.ledezmadiego.weatherapp',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: [
        'android.permission.ACCESS_COARSE_LOCATION',
        'android.permission.ACCESS_FINE_LOCATION',
      ],
    },

    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },

    plugins: [
      'expo-router',
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission: 'Permitir que $(PRODUCT_NAME) use tu localización.',
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
    },

    extra: {
      weatherApiKey: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
      eas: {
        projectId: '4e4b3d3c-c8e9-41bf-a9e6-fb061d89797b',
      },
    },
  },
};
