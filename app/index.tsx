import { ContenedorDePantallaClima } from '@/src/componentes/contenedores/ContenedorDePantallaClima';
import { useClima } from '@/src/hooks/useClima';

export default function Home() {
  const { clima, loading, indiceDiaSeleccionado, onCambiarDia } = useClima();

  return (
    <ContenedorDePantallaClima
      clima={clima}
      loading={loading}
      indiceDiaSeleccionado={indiceDiaSeleccionado}
      onCambiarDia={onCambiarDia}
    />
  );
}