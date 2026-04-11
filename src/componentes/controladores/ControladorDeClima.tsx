import { ContenedorDePantallaClima } from '../contenedores/ContenedorDePantallaClima';
import { useClima } from '../../hooks/useClima';

export const ControladorDeClima = () => {
  const { climas } = useClima();

  return <ContenedorDePantallaClima climas={climas} />;
};
