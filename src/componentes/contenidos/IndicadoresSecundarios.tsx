import { View, Text } from 'react-native';

type Indicador = {
  tipo: string;
  valor: number;
  unidad: string;
};

type Props = {
  indicadores: Indicador[];
};

export const IndicadoresSecundarios = ({ indicadores }: Props) => {
  return (
    <View className="mt-6 w-full flex-row justify-between">
      {indicadores.map((indicador, index) => (
        <View key={index} className="items-center">
          <Text>{indicador.tipo}</Text>
          <Text>{indicador.valor}</Text>
          <Text>{indicador.unidad}</Text>
        </View>
      ))}
    </View>
  );
};
