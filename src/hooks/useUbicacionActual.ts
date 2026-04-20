import * as Location from 'expo-location';

let yaPidioPermiso = false;

export const useUbicacionActual = () => {
  const obtenerUbicacionActual = async (): Promise<{
    lat: number;
    lon: number;
    permiso: boolean;
  }> => {
    try {
      if (yaPidioPermiso) {
        return {
          lat: 0,
          lon: 0,
          permiso: false,
        };
      }

      yaPidioPermiso = true;

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        return {
          lat: 0,
          lon: 0,
          permiso: false,
        };
      }

      const posicionActual = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = posicionActual.coords;

      return {
        lat: latitude,
        lon: longitude,
        permiso: true,
      };
    } catch (error) {
      console.log('UBICACION → error:', error);

      return {
        lat: 0,
        lon: 0,
        permiso: false,
      };
    }
  };

  return { obtenerUbicacionActual };
};