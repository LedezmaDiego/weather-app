import * as Location from 'expo-location';
import { UBICACION_POR_DEFECTO } from '../constantes/ubicacion';

export const useUbicacionActual = () => {
  const obtenerUbicacionActual = async (): Promise<string> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      const tienePermisoDeUbicacion = status === 'granted';

      if (!tienePermisoDeUbicacion) {
        return UBICACION_POR_DEFECTO;
      }

      const posicionActual = await Location.getCurrentPositionAsync({});

      const { latitude, longitude } = posicionActual.coords;

      return `${latitude},${longitude}`;
    } catch {
      return UBICACION_POR_DEFECTO;
    }
  };

  return { obtenerUbicacionActual };
};
