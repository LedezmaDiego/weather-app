import * as Location from 'expo-location';
import { UBICACION_POR_DEFECTO } from '../constantes/ubicacion';

export const useUbicacionActual = () => {
  const obtenerUbicacionActual = async (): Promise<string> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      const tienePermisoDeUbicacion = status === 'granted';

      if (!tienePermisoDeUbicacion) {
        console.log('Sin permisos, usando fallback:', UBICACION_POR_DEFECTO);
        return UBICACION_POR_DEFECTO;
      }

      const posicionActual = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = posicionActual.coords;

      const ubicacion = `${latitude},${longitude}`;

      return ubicacion;
    } catch (error) {
      console.log('Error obteniendo ubicación:', error);
      console.log('Usando fallback:', UBICACION_POR_DEFECTO);
      return UBICACION_POR_DEFECTO;
    }
  };

  return { obtenerUbicacionActual };
};
