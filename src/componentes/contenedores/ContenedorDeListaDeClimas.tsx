import { View } from 'react-native';
import { TarjetaDeClima } from '../contenidos/TarjetaDeClima';

type Props = {
  climas: any[];
};

export const ContenedorDeListaDeClimas = ({ climas }: Props) => {
  return (
    <View className="flex-row justify-center gap-4">
      {climas.map((clima, index) => (
        <TarjetaDeClima key={index} clima={clima} />
      ))}
    </View>
  );
};
