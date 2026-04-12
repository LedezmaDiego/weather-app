import { View, Text, Pressable } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

type Props = {
  indice: number;
  onCambiarDia: (nuevoIndice: number) => void;
  fechas: string[];
};

const formatearFecha = (fecha: string) => {
  const date = new Date(fecha);
  const dia = date.getDate();
  const mes = date.getMonth() + 1;

  return `${dia}/${mes}`;
};

export const NavegacionDeDias = ({ indice, onCambiarDia, fechas }: Props) => {
  const fechaActual = fechas[indice];
  const fechaAnterior = fechas[indice - 1];
  const fechaSiguiente = fechas[indice + 1];

  return (
    <View className="mb-4 w-full flex-row items-center justify-between px-2">
      {/* IZQUIERDA */}
      <Pressable
        onPress={() => indice > 0 && onCambiarDia(indice - 1)}
        className="flex-row items-center gap-1">
        {indice > 0 && (
          <>
            <ChevronLeft size={16} />
            <Text>{formatearFecha(fechaAnterior)}</Text>
          </>
        )}
      </Pressable>

      {/* CENTRO */}
      <Text className="text-lg font-bold">{formatearFecha(fechaActual)}</Text>

      {/* DERECHA */}
      <Pressable
        onPress={() => indice < fechas.length - 1 && onCambiarDia(indice + 1)}
        className="flex-row items-center gap-1">
        {indice < fechas.length - 1 && (
          <>
            <Text>{formatearFecha(fechaSiguiente)}</Text>
            <ChevronRight size={16} />
          </>
        )}
      </Pressable>
    </View>
  );
};
