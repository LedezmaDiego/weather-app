import { Sun, CloudRain, Cloud } from 'lucide-react-native';

type Props = {
  condicion: string;
};

export const IconoDeClima = ({ condicion }: Props) => {
  const c = condicion.toLowerCase();

  if (c.includes('sol')) return <Sun size={80} />;
  if (c.includes('lluv')) return <CloudRain size={80} />;

  return <Cloud size={80} />;
};
