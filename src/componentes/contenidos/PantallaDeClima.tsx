import { View, Text } from 'react-native';
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
  const diaSeleccionado = clima[indiceDiaSeleccionado];

  // debug
  console.log('ÍNDICE:', indiceDiaSeleccionado);
  console.log('FECHA:', diaSeleccionado?.fecha);
  console.log('CIUDAD:', diaSeleccionado?.ciudad);

  if (!diaSeleccionado) return null;

  const esDiaActual = diaSeleccionado.temperatura !== undefined;

  const obtenerIconoIndicador = (tipo: string) => {
    const tipoNormalizado = tipo.toLowerCase();

    if (tipoNormalizado.includes('humedad')) return <Droplets size={18} />;
    if (tipoNormalizado.includes('pres')) return <Gauge size={18} />;
    if (tipoNormalizado.includes('viento')) return <Flag size={18} />;

    return null;
  };

  return (
    <View className="flex-1 bg-white">
      {/* CONTENEDOR CENTRADO */}
      <View className="flex-1 items-center justify-center px-6">
        {/* navegación */}
        <NavegacionDeDias
          indice={indiceDiaSeleccionado}
          onCambiarDia={onCambiarDia}
          fechas={clima.map((dia) => dia.fecha)}
        />

        {/* ciudad */}
        <Text className="mt-6 text-center text-3xl font-black uppercase tracking-widest text-black">
          {diaSeleccionado.ciudad}
        </Text>

        {/* icono */}
        <View className="my-6 items-center justify-center">
          <IconoDeClima codigo={diaSeleccionado.codigoCondicion} />
        </View>

        {/* indicadores */}
        {esDiaActual && (
          <View className="mb-6 gap-3">
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
        <View className="flex-row items-end gap-6">
          <Text className="text-xl font-semibold text-gray-500">{diaSeleccionado.max}°</Text>

          {esDiaActual && (
            <Text className="text-5xl font-black text-black">{diaSeleccionado.temperatura}°</Text>
          )}

          <Text className="text-xl font-semibold text-gray-500">{diaSeleccionado.min}°</Text>
        </View>
      </View>
    </View>
  );
};
