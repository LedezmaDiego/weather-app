import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { obtenerClimaPorCiudad } from '../servicios/weatherApi';
import { ClimaPorDia } from '../tipos/clima';

export const useClima = () => {
  const [climas, setClimas] = useState<ClimaPorDia[][]>([]);
  const [indices, setIndices] = useState<number[]>([]);

  const obtenerUbicacion = async (): Promise<string> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return 'Buenos Aires';
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    return `${latitude},${longitude}`;
  };

  const cargarClimas = async () => {
    try {
      const ubicacion = await obtenerUbicacion();

      const ciudades = [ubicacion, 'Lima', 'Guatemala City'];

      const resultados = await Promise.all(ciudades.map((c) => obtenerClimaPorCiudad(c)));

      setClimas(resultados);

      // 🔥 HOY ES EL ÍNDICE 1
      setIndices(resultados.map(() => 1));
    } catch (error) {
      console.error(error);
    }
  };

  const cambiarIndice = (tarjetaIndex: number, nuevoIndice: number) => {
    setIndices((prev) => prev.map((val, i) => (i === tarjetaIndex ? nuevoIndice : val)));
  };

  useEffect(() => {
    cargarClimas();
  }, []);

  return {
    climas,
    indices,
    cambiarIndice,
  };
};
