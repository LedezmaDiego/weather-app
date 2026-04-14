import { useEffect, useState } from 'react';
import { ClimaPorDia } from '../tipos/clima';
import { obtenerClimaPorCiudad } from '../servicios/weatherApi';
import { useUbicacionActual } from './useUbicacionActual';

export const useClima = () => {
  const [clima, setClima] = useState<ClimaPorDia[]>([]);
  const [indiceDiaSeleccionado, setIndiceDiaSeleccionado] = useState(1);

  const { obtenerUbicacionActual } = useUbicacionActual();

  const cargarClima = async () => {
    try {
      const ubicacionActual = await obtenerUbicacionActual();

      const nuevoClima = await obtenerClimaPorCiudad(ubicacionActual);

      setClima(nuevoClima);
      setIndiceDiaSeleccionado(1);
    } catch (error) {
      console.error('Error al cargar clima', error);
    }
  };

  const handleCambiarDia = (nuevoIndice: number) => {
    setIndiceDiaSeleccionado(nuevoIndice);
  };

  useEffect(() => {
    cargarClima();
  }, []);

  return {
    clima,
    indiceDiaSeleccionado,
    onCambiarDia: handleCambiarDia,
  };
};
