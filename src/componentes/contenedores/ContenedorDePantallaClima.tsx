import { View } from 'react-native';
import { ContenedorDeListaDeClimas } from './ContenedorDeListaDeClimas';

type Props = {
  clima: any;
};

export const ContenedorDePantallaClima = ({ clima }: Props) => {
  const listaDeClimas = [clima, clima, clima]; // 👈 3 TOKYO

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <ContenedorDeListaDeClimas climas={listaDeClimas} />
    </View>
  );
};
