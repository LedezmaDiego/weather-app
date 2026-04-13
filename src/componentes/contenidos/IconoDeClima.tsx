import {
  Sun,
  Cloud,
  CloudRain,
  CloudSun,
  CloudSnow,
  CloudFog,
  CloudLightning,
} from 'lucide-react-native';

type Props = {
  codigo: number;
};

const TAMANIO_ICONO_GRANDE = 180;

export const IconoDeClima = ({ codigo }: Props) => {
  // basado en WeatherAPI condition codes
  if (codigo === 1000) {
    return <Sun size={TAMANIO_ICONO_GRANDE} strokeWidth={1.8} />;
  }

  if ([1003].includes(codigo)) {
    return <CloudSun size={TAMANIO_ICONO_GRANDE} strokeWidth={1.8} />;
  }

  if ([1006, 1009].includes(codigo)) {
    return <Cloud size={TAMANIO_ICONO_GRANDE} strokeWidth={1.8} />;
  }

  if ([1030, 1135, 1147].includes(codigo)) {
    return <CloudFog size={TAMANIO_ICONO_GRANDE} strokeWidth={1.8} />;
  }

  if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195].includes(codigo)) {
    return <CloudRain size={TAMANIO_ICONO_GRANDE} strokeWidth={1.8} />;
  }

  if ([1066, 1210, 1213, 1216, 1219].includes(codigo)) {
    return <CloudSnow size={TAMANIO_ICONO_GRANDE} strokeWidth={1.8} />;
  }

  if ([1087, 1273, 1276].includes(codigo)) {
    return <CloudLightning size={TAMANIO_ICONO_GRANDE} strokeWidth={1.8} />;
  }

  return <Cloud size={TAMANIO_ICONO_GRANDE} strokeWidth={1.8} />;
};
