import { Text } from 'react-native';

type Props = {
  ciudad: string;
};

export default function EncabezadoDeCiudad({ ciudad }: Props) {
  return (
    <Text
      testID="header-city"
      className="text-center text-3xl font-black uppercase tracking-widest text-black">
      {ciudad}
    </Text>
  );
}
