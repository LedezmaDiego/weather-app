import { View, Text, useWindowDimensions } from 'react-native';
import { Droplets, Gauge, Flag } from 'lucide-react-native';
import { IconoDeClima } from './IconoDeClima';
import { NavegacionDeDias } from './NavegacionDeDias';
import { ClimaPorDia } from '@/src/tipos/clima';

type Props = {
  clima: ClimaPorDia[];
  indiceDiaSeleccionado: number;
  onCambiarDia: (nuevoIndice: number) => void;
};

export const PantallaDeClima = ({ clima, indiceDiaSeleccionado, onCambiarDia }: Props) => {
  const { height } = useWindowDimensions();

  const diaSeleccionado = clima[indiceDiaSeleccionado];

  if (!diaSeleccionado) return null;

  const esDiaActual = diaSeleccionado.temperatura !== undefined;

  const obtenerIconoIndicador = (tipo: string) => {
    const tipoNormalizado = tipo.toLowerCase();

    if (tipoNormalizado.includes('humedad')) return <Droplets size={18} color="black" />;
    if (tipoNormalizado.includes('pres')) return <Gauge size={18} color="black" />;
    if (tipoNormalizado.includes('viento')) return <Flag size={18} color="black" />;

    return null;
  };

  return (
    <View className="flex-1 bg-white px-6 pb-8 pt-14">
      {/* navegación */}
      <NavegacionDeDias
        indice={indiceDiaSeleccionado}
        onCambiarDia={onCambiarDia}
        fechas={clima.map((dia) => dia.fecha)}
      />

      {/* ciudad */}
      <Text className="mb-8 mt-16 text-center text-3xl font-black uppercase tracking-widest text-black">
        {diaSeleccionado.ciudad}
      </Text>

      {/* icono */}
      <View className="items-center justify-center" style={{ minHeight: height * 0.35 }}>
        <IconoDeClima condicion={diaSeleccionado.condicion} />
      </View>

      {/* indicadores */}
      {esDiaActual && (
        <View className="mb-10 gap-3">
          {diaSeleccionado.indicadores?.map((indicador) => (
            <View key={indicador.tipo} className="flex-row items-center gap-3">
              {obtenerIconoIndicador(indicador.tipo)}
              <Text className="text-lg text-black">
                {Math.round(indicador.valor)} {indicador.unidad}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* temperaturas */}
      <View className="mt-auto flex-row items-end justify-between">
        {/* máxima */}
        <Text className="text-xl font-semibold text-black">{diaSeleccionado.max}°</Text>

        {/* actual ajustada */}
        {esDiaActual && (
          <Text className="text-4xl font-black text-black">{diaSeleccionado.temperatura}°</Text>
        )}

        {/* mínima */}
        <Text className="text-xl font-semibold text-black">{diaSeleccionado.min}°</Text>
      </View>
    </View>
  );
};
