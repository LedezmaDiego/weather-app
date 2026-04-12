import { View, useWindowDimensions } from 'react-native';
import { TarjetaDeClima } from '../contenidos/TarjetaDeClima';
import { ClimaPorDia } from '@/src/tipos/clima';

type Props = {
  climas: ClimaPorDia[][];
  indices: number[];
  onCambiarDia: (tarjetaIndex: number, nuevoIndice: number) => void;
};

export const ContenedorDePantallaClima = ({ climas, indices, onCambiarDia }: Props) => {
  const { width, height } = useWindowDimensions();

  const CARD_WIDTH = width / 3.2; // 🔒 ancho fijo relativo
  const CARD_HEIGHT = height * 0.8; // 🔒 alto fijo relativo

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-row gap-2">
        {climas.map((clima, index) => (
          <View key={index} style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
            <TarjetaDeClima
              clima={clima}
              indiceDiaSeleccionado={indices[index]}
              onCambiarDia={(nuevoIndice) => onCambiarDia(index, nuevoIndice)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
