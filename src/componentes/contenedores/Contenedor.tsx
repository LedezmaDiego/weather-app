import { View } from 'react-native';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export default function Contenedor({ children }: Props) {
  return (
    <View testID="screen-weather" className="flex-1 items-center justify-evenly bg-white px-6">
      {children}
    </View>
  );
}
