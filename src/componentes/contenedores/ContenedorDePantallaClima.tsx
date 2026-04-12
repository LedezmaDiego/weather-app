import { View, Dimensions } from 'react-native';
import { TarjetaDeClima } from '../contenidos/TarjetaDeClima';
import { ClimaPorDia } from '@/src/tipos/clima';

const ANCHO_PANTALLA = Dimensions.get('window').width;

type Props = {
  climas: ClimaPorDia[][];
  indices: number[];
  onCambiarDia: (tarjetaIndex: number, nuevoIndice: number) => void;
};

export const ContenedorDePantallaClima = ({ climas, indices, onCambiarDia }: Props) => {
  return (
    <View className="flex-1 items-center justify-center">
      <View
        style={{ width: ANCHO_PANTALLA }}
        className="flex-row items-center justify-center gap-4">
        {climas.map((clima, index) => (
          <TarjetaDeClima
            key={index}
            clima={clima}
            indiceDiaSeleccionado={indices[index]}
            onCambiarDia={(nuevoIndice) => onCambiarDia(index, nuevoIndice)}
          />
        ))}
      </View>
    </View>
  );
};
