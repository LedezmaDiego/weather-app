import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { obtenerClimaPorCiudad } from '../servicios/weatherApi';

export const useClima = () => {
  const [climas, setClimas] = useState<any[]>([]);

  const obtenerUbicacion = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permiso denegado');
      return 'Buenos Aires';
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    return `${latitude},${longitude}`;
  };

  const cargarClimas = async () => {
    try {
      const ubicacion = await obtenerUbicacion();

      const ciudades = [
        ubicacion, // tu ubicación
        'Lima', // Perú
        'Guatemala City', // Guatemala
      ];

      const resultados = await Promise.all(ciudades.map((c) => obtenerClimaPorCiudad(c)));

      setClimas(resultados);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarClimas();
  }, []);

  return { climas };
};
