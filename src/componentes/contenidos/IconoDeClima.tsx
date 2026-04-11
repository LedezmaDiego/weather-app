import { Text } from 'react-native';

type Props = {
  condicion: string;
};

const obtenerIconoSegunCondicion = (condicion: string) => {
  if (condicion === 'soleado') return '☀️';
  if (condicion === 'lluvia') return '🌧️';
  if (condicion === 'nublado') return '☁️';
  return '❓';
};

export const IconoDeClima = ({ condicion }: Props) => {
  const icono = obtenerIconoSegunCondicion(condicion);

  return <Text className="my-6 text-6xl">{icono}</Text>;
};
