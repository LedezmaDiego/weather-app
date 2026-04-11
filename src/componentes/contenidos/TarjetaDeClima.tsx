import { View, Text } from 'react-native';
import { Droplet, Gauge, Flag } from 'lucide-react-native';
import { IconoDeClima } from './IconoDeClima';
import { NavegacionDeDias } from './NavegacionDeDias';
import { useFechas } from '@/src/hooks/useFechas';

export const TarjetaDeClima = ({ clima }: any) => {
  const { hoy, ayer, maniana } = useFechas();

  return (
    <View className="m-3 w-72 items-center rounded-2xl bg-gray-200 p-4">
      {/* FECHAS */}
      <NavegacionDeDias ayer={ayer} hoy={hoy} maniana={maniana} />

      {/* CIUDAD */}
      <Text className="text-center text-xl font-bold uppercase">{clima.ciudad}</Text>

      {/* ICONO CLIMA */}
      <View className="my-4">
        <IconoDeClima condicion={clima.condicion} />
      </View>

      {/* HUMEDAD */}
      <View className="mt-2 items-center">
        <Droplet size={20} />
        <Text>{clima.indicadores[0].valor}%</Text>
      </View>

      {/* PRESION */}
      <View className="mt-2 items-center">
        <Gauge size={20} />
        <Text>{clima.indicadores[1].valor} mb</Text>
      </View>

      {/* VIENTO */}
      <View className="mt-2 items-center">
        <Flag size={20} />
        <Text>{clima.indicadores[2].valor} km/h</Text>
      </View>

      {/* TEMPERATURAS */}
      <View className="mt-6 flex-row items-center gap-4">
        <Text>{clima.min}°</Text>

        <Text className="text-4xl font-bold">{clima.temperatura}°</Text>

        <Text>{clima.max}°</Text>
      </View>
    </View>
  );
};
