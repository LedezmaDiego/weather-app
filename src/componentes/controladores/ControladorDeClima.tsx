import { ContenedorDePantallaClima } from '../contenedores/ContenedorDePantallaClima';
import { useClima } from '../../hooks/useClima';

export const ControladorDeClima = () => {
  const { clima, indiceDiaSeleccionado, onCambiarDia } = useClima();

  return (
    <ContenedorDePantallaClima
      clima={clima}
      indiceDiaSeleccionado={indiceDiaSeleccionado}
      onCambiarDia={onCambiarDia}
    />
  );
};
