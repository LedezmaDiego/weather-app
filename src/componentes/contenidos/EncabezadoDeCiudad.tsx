import { Text } from 'react-native';

type Props = {
  nombreCiudad: string;
};

export const EncabezadoDeCiudad = ({ nombreCiudad }: Props) => {
  return <Text className="mb-4 text-center text-2xl font-bold uppercase">{nombreCiudad}</Text>;
};
