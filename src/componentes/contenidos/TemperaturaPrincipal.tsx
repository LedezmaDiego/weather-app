import { Text } from 'react-native';

type Props = {
  temperatura: number;
};

export const TemperaturaPrincipal = ({ temperatura }: Props) => {
  return <Text className="text-6xl font-bold">{temperatura}°</Text>;
};
