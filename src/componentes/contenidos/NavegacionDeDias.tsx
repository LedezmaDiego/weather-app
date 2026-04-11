import { View, Text, Pressable } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

type Props = {
  ayer: string;
  hoy: string;
  maniana: string;
};

export const NavegacionDeDias = ({ ayer, hoy, maniana }: Props) => {
  return (
    <View className="mb-6 w-full flex-row items-center justify-between px-4">
      <View className="flex-row items-center gap-2">
        <ChevronLeft size={20} />
        <Text>{ayer}</Text>
      </View>

      <Text className="text-lg font-bold">{hoy}</Text>

      <View className="flex-row items-center gap-2">
        <Text>{maniana}</Text>
        <ChevronRight size={20} />
      </View>
    </View>
  );
};
