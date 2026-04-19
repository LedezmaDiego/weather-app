import { ContenedorDePantallaClima } from '../contenedores/ContenedorDePantallaClima';
import { useClima } from '../../hooks/useClima';

export const ControladorDeClima = () => {
  const { clima, loading, indiceDiaSeleccionado, onCambiarDia } = useClima();

  return (
    <ContenedorDePantallaClima
      clima={clima}
      loading={loading}
      indiceDiaSeleccionado={indiceDiaSeleccionado}
      onCambiarDia={onCambiarDia}
    />
  );
};
