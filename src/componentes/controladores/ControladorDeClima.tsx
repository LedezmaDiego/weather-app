import { ContenedorDePantallaClima } from '../contenedores/ContenedorDePantallaClima';
import { useClima } from '../../hooks/useClima';

export const ControladorDeClima = () => {
  const { climas, indices, cambiarIndice } = useClima();

  return (
    <ContenedorDePantallaClima climas={climas} indices={indices} onCambiarDia={cambiarIndice} />
  );
};
