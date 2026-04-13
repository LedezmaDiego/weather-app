import { View, Text, Pressable } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

type Props = {
  indice: number;
  onCambiarDia: (nuevoIndice: number) => void;
  fechas: string[];
};

const formatearFecha = (fecha: string) => {
  const partes = fecha.split('-');

  if (partes.length !== 3) return fecha;

  const [anio, mes, dia] = partes;
  return `${dia}/${mes}`;
};

export const NavegacionDeDias = ({ indice, onCambiarDia, fechas }: Props) => {
  const fechaActual = fechas[indice];
  const fechaAnterior = fechas[indice - 1];
  const fechaSiguiente = fechas[indice + 1];

  return (
    <View className="mb-4 w-full flex-row items-center px-2">
      <Pressable
        onPress={() => indice > 0 && onCambiarDia(indice - 1)}
        className="flex-1 flex-row items-center">
        {indice > 0 && (
          <>
            <ChevronLeft size={16} />
            <Text className="opacity-70">{formatearFecha(fechaAnterior)}</Text>
          </>
        )}
      </Pressable>

      <Text className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold">
        {formatearFecha(fechaActual)}
      </Text>

      <Pressable
        onPress={() => indice < fechas.length - 1 && onCambiarDia(indice + 1)}
        className="flex-1 flex-row items-center justify-end">
        {indice < fechas.length - 1 && (
          <>
            <Text className="opacity-70">{formatearFecha(fechaSiguiente)}</Text>
            <ChevronRight size={16} />
          </>
        )}
      </Pressable>
    </View>
  );
};
