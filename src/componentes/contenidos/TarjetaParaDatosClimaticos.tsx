import { View, Text } from 'react-native';
import { ClimaPorDia } from '@/src/tipos/clima';

type Props = {
  dia: ClimaPorDia;
};

export default function TarjetaParaDatosClimaticos({ dia }: Props) {
  return (
    <View className="w-full items-start gap-3">
      {dia.indicadores?.map((indicador) => (
        <View testID="metric-item" key={indicador.tipo} className="flex-row items-center gap-3">
          <Text testID="metric-value" className="text-lg text-black">
            {Math.round(indicador.valor)} {indicador.unidad}
          </Text>
        </View>
      ))}

      <View className="w-full flex-row items-end justify-between px-10">
        <View className="items-center">
          <Text testID="temp-max" className="text-xl font-bold text-gray-500">
            ↑ {Math.round(dia.max)}°
          </Text>
          <Text className="text-sm text-gray-500">Máx.</Text>
        </View>

        {dia.temperatura !== undefined && (
          <View className="items-center">
            <Text testID="temp-current" className="text-5xl font-black leading-none text-black">
              {Math.round(dia.temperatura)}°
            </Text>
            <Text className="text-sm font-bold">Ahora</Text>
          </View>
        )}

        <View className="items-center">
          <Text testID="temp-min" className="text-xl font-bold text-gray-500">
            ↓ {Math.round(dia.min)}°
          </Text>
          <Text className="text-sm text-gray-500">Mín.</Text>
        </View>
      </View>
    </View>
  );
}
