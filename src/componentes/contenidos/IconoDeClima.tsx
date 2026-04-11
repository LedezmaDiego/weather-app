import { Sun, CloudRain, Cloud } from 'lucide-react-native';

export const IconoDeClima = ({ condicion }: any) => {
  if (condicion.toLowerCase().includes('sol')) return <Sun size={80} />;
  if (condicion.toLowerCase().includes('lluv')) return <CloudRain size={80} />;
  return <Cloud size={80} />;
};
