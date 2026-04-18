import { useEffect, useState } from 'react';
import { ClimaPorDia } from '../tipos/clima';
import { obtenerClimaPorUbicacion } from '../servicios/weatherApi';
import { useUbicacionActual } from './useUbicacionActual';
import { obtenerNombreUbicacion } from '../servicios/geocodingApi';
import { UBICACION_POR_DEFECTO } from '../constantes/ubicacion';

export const useClima = () => {
  const [clima, setClima] = useState<ClimaPorDia[]>([]);
  const [indiceDiaSeleccionado, setIndiceDiaSeleccionado] = useState(1);
  const [loading, setLoading] = useState(true);

  const { obtenerUbicacionActual } = useUbicacionActual();

  const cargarClima = async () => {
    try {
      setLoading(true);

      const { lat, lon } = await obtenerUbicacionActual();

      let nombreFinal = UBICACION_POR_DEFECTO;
      let nombreGeocoding: string | null = null;

      const hayCoords = lat !== 0 && lon !== 0;

      if (hayCoords) {
        nombreGeocoding = await obtenerNombreUbicacion(lat, lon);
      }

      const { clima: datosClima, nombreCiudad } = await obtenerClimaPorUbicacion(lat, lon);

      if (nombreGeocoding) {
        nombreFinal = nombreGeocoding;
      } else if (nombreCiudad) {
        nombreFinal = nombreCiudad;
      }

      const climaFinal = datosClima.map((dia) => ({
        ...dia,
        ciudad: nombreFinal.toUpperCase(),
      }));

      setClima(climaFinal);
      setIndiceDiaSeleccionado(1);
    } catch (error) {
      console.error('CLIMA → error:', error);

      setClima([
        {
          ciudad: 'SIN CONEXIÓN',
          condicion: 'No disponible',
          codigoCondicion: 1006,
          fecha: new Date().toISOString().split('T')[0],
          min: 0,
          max: 0,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarClima();
  }, []);

  return {
    clima,
    loading,
    indiceDiaSeleccionado,
    onCambiarDia: setIndiceDiaSeleccionado,
  };
};
