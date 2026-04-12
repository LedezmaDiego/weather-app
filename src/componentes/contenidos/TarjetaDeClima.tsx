import { View, Text } from 'react-native';
import { IconoDeClima } from './IconoDeClima';
import { NavegacionDeDias } from './NavegacionDeDias';
import { Droplets, Gauge, Flag } from 'lucide-react-native';

type Indicador = {
  tipo: string;
  valor: number;
  unidad: string;
};

type ClimaPorDia = {
  ciudad: string;
  condicion: string;
  fecha: string;
  temperatura?: number;
  min: number;
  max: number;
  indicadores?: Indicador[];
};

type Props = {
  clima: ClimaPorDia[];
  indiceDiaSeleccionado: number;
  onCambiarDia: (index: number) => void;
};

export const TarjetaDeClima = ({ clima, indiceDiaSeleccionado, onCambiarDia }: Props) => {
  const dia = clima[indiceDiaSeleccionado];

  if (!dia) return null;

  const esHoy = dia.temperatura !== undefined;

  const obtenerIconoIndicador = (tipo: string) => {
    const t = tipo.toLowerCase();

    if (t.includes('humedad')) return <Droplets size={16} />;
    if (t.includes('pres')) return <Gauge size={16} />;
    if (t.includes('viento')) return <Flag size={16} />;

    return null;
  };

  return (
    <View className="flex-1 justify-between overflow-hidden rounded-2xl bg-gray-200 p-3">
      {/* NAVEGACIÓN */}
      <NavegacionDeDias
        indice={indiceDiaSeleccionado}
        onCambiarDia={onCambiarDia}
        fechas={clima.map((d) => d.fecha)}
      />

      {/* CIUDAD */}
      <Text numberOfLines={1} className="text-center text-base font-bold uppercase">
        {dia.ciudad}
      </Text>

      {/* ICONO */}
      <View className="items-center">
        <IconoDeClima condicion={dia.condicion} />
      </View>

      {/* INDICADORES */}
      {esHoy && (
        <View className="w-full items-start">
          {dia.indicadores?.map((ind, index) => {
            let valor = ind.valor;
            let unidad = ind.unidad;

            if (unidad === 'mb') {
              valor = Math.round(valor);
              unidad = 'hPa';
            }

            return (
              <View key={index} className="mb-1 flex-row items-center gap-2">
                {obtenerIconoIndicador(ind.tipo)}
                <Text numberOfLines={1} className="text-sm">
                  {valor} {unidad}
                </Text>
              </View>
            );
          })}
        </View>
      )}

      {/* TEMPERATURAS */}
      <View className="flex-row items-center justify-center gap-2">
        <Text className="text-sm">{dia.min}°</Text>

        {esHoy && <Text className="text-2xl font-bold">{dia.temperatura}°</Text>}

        <Text className="text-sm">{dia.max}°</Text>
      </View>
    </View>
  );
};
