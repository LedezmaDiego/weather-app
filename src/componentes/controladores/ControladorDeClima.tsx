import { ContenedorDePantallaClima } from '../contenedores/ContenedorDePantallaClima';
import { useClima } from '@/src/hooks/useClima';

export const ControladorDeClima = () => {
  const { climaActual } = useClima();

  return <ContenedorDePantallaClima clima={climaActual} />;
};
