import { View, Text } from 'react-native';

type Props = {
  min: number;
  max: number;
};

export const TemperaturasExtremas = ({ min, max }: Props) => {
  return (
    <View className="mt-2 flex-row gap-4">
      <Text>{min}°</Text>
      <Text>{max}°</Text>
    </View>
  );
};
