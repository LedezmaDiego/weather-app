import { View, Text, Pressable } from 'react-native';

type Props = {
  diaActual: string;
  onDiaAnterior: () => void;
  onDiaSiguiente: () => void;
};

export const NavegacionDeDias = ({ diaActual, onDiaAnterior, onDiaSiguiente }: Props) => {
  return (
    <View className="mb-6 w-full flex-row items-center justify-between">
      <Pressable onPress={onDiaAnterior}>
        <Text>{'<'}</Text>
      </Pressable>

      <Text className="font-bold">{diaActual}</Text>

      <Pressable onPress={onDiaSiguiente}>
        <Text>{'>'}</Text>
      </Pressable>
    </View>
  );
};
