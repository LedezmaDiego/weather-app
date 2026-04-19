import { View } from 'react-native';
import { PantallaDeClima } from '../contenidos/PantallaDeClima';
import { ClimaPorDia } from '@/src/tipos/clima';

type Props = {
  clima: ClimaPorDia[];
  loading: boolean;
  indiceDiaSeleccionado: number;
  onCambiarDia: (nuevoIndice: number) => void;
};

export const ContenedorDePantallaClima = ({
  clima,
  loading,
  indiceDiaSeleccionado,
  onCambiarDia,
}: Props) => {
  return (
    <View className="flex-1">
      <PantallaDeClima
        clima={clima}
        loading={loading}
        indiceDiaSeleccionado={indiceDiaSeleccionado}
        onCambiarDia={onCambiarDia}
      />
    </View>
  );
};
