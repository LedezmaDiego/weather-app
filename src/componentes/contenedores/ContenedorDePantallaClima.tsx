import { View } from 'react-native';
import { PantallaDeClima } from '../contenidos/PantallaDeClima';
import { ClimaPorDia } from '@/src/tipos/clima';

type Props = {
  clima: ClimaPorDia[];
  indiceDiaSeleccionado: number;
  onCambiarDia: (nuevoIndice: number) => void;
};

export const ContenedorDePantallaClima = ({
  clima,
  indiceDiaSeleccionado,
  onCambiarDia,
}: Props) => {
  return (
    <View className="flex-1">
      <PantallaDeClima
        clima={clima}
        indiceDiaSeleccionado={indiceDiaSeleccionado}
        onCambiarDia={onCambiarDia}
      />
    </View>
  );
};
