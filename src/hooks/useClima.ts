import { useState } from 'react';
import { DATOS_CLIMA } from '../constantes/clima';

export const useClima = () => {
  const [indiceDiaActual, setIndiceDiaActual] = useState(0);

  const cambiarDia = (index: number) => {
    setIndiceDiaActual(index);
  };

  const irAlDiaAnterior = () => {
    setIndiceDiaActual((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const irAlDiaSiguiente = () => {
    setIndiceDiaActual((prev) => (prev < DATOS_CLIMA.length - 1 ? prev + 1 : prev));
  };

  return {
    climaActual: DATOS_CLIMA[indiceDiaActual],
    cambiarDia,
    irAlDiaAnterior,
    irAlDiaSiguiente,
  };
};
