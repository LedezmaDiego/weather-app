import { View } from 'react-native';
import { Sun, Cloud, CloudRain, CloudSun, CloudFog, CloudLightning } from 'lucide-react-native';

import {
  CODIGOS_CLIMA_SOLEADO,
  CODIGOS_CLIMA_PARCIALMENTE_NUBLADO,
  CODIGOS_CLIMA_NUBLADO,
  CODIGOS_CLIMA_NIEBLA,
  CODIGOS_CLIMA_LLUVIA,
  CODIGOS_CLIMA_TORMENTA,
} from '@/src/constantes/clima';

type Props = {
  codigo: number;
};

const TAMANIO_ICONO = 180;

export const IconoDeClima = ({ codigo }: Props) => {
  if (CODIGOS_CLIMA_SOLEADO.includes(codigo)) {
    return (
      <View testID="icon-weather-sunny">
        <Sun size={TAMANIO_ICONO} strokeWidth={1.8} />
      </View>
    );
  }

  if (CODIGOS_CLIMA_PARCIALMENTE_NUBLADO.includes(codigo)) {
    return (
      <View testID="icon-weather-partly-cloudy">
        <CloudSun size={TAMANIO_ICONO} strokeWidth={1.8} />
      </View>
    );
  }

  if (CODIGOS_CLIMA_NUBLADO.includes(codigo)) {
    return (
      <View testID="icon-weather-cloudy">
        <Cloud size={TAMANIO_ICONO} strokeWidth={1.8} />
      </View>
    );
  }

  if (CODIGOS_CLIMA_NIEBLA.includes(codigo)) {
    return (
      <View testID="icon-weather-fog">
        <CloudFog size={TAMANIO_ICONO} strokeWidth={1.8} />
      </View>
    );
  }

  if (CODIGOS_CLIMA_LLUVIA.includes(codigo)) {
    return (
      <View testID="icon-weather-rain">
        <CloudRain size={TAMANIO_ICONO} strokeWidth={1.8} />
      </View>
    );
  }

  if (CODIGOS_CLIMA_TORMENTA.includes(codigo)) {
    return (
      <View testID="icon-weather-storm">
        <CloudLightning size={TAMANIO_ICONO} strokeWidth={1.8} />
      </View>
    );
  }

  return (
    <View testID="icon-weather-default">
      <Cloud size={TAMANIO_ICONO} strokeWidth={1.8} />
    </View>
  );
};
