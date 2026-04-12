import { Sun, CloudRain, Cloud } from 'lucide-react-native';

type Props = {
  condicion: string;
};

const TAMANIO_ICONO_GRANDE = 260;

export const IconoDeClima = ({ condicion }: Props) => {
  const condicionNormalizada = condicion.toLowerCase();

  if (condicionNormalizada.includes('sol')) {
    return <Sun size={TAMANIO_ICONO_GRANDE} strokeWidth={1.8} />;
  }

  if (condicionNormalizada.includes('lluv')) {
    return <CloudRain size={TAMANIO_ICONO_GRANDE} strokeWidth={1.8} />;
  }

  return <Cloud size={TAMANIO_ICONO_GRANDE} strokeWidth={1.8} />;
};
