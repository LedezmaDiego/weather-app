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
    <View className="max-w-[30%] flex-1 items-center rounded-2xl bg-gray-200 p-4">
      {/* NAVEGACIÓN */}
      <NavegacionDeDias
        indice={indiceDiaSeleccionado}
        onCambiarDia={onCambiarDia}
        fechas={clima.map((d) => d.fecha)}
      />

      {/* CIUDAD */}
      <Text className="text-center text-xl font-bold uppercase">{dia.ciudad}</Text>

      {/* ICONO SIEMPRE */}
      <View className="my-4">
        <IconoDeClima condicion={dia.condicion} />
      </View>

      {/* INDICADORES SOLO HOY */}
      {esHoy && (
        <View className="mt-2 w-full items-start">
          {dia.indicadores?.map((ind, index) => {
            let valor = ind.valor;
            let unidad = ind.unidad;

            // 🔥 conversión mb → hPa (equivalente pero explícito)
            if (unidad === 'mb') {
              valor = Math.round(valor * 1);
              unidad = 'hPa';
            }

            return (
              <View key={index} className="mb-1 flex-row items-center gap-2">
                {obtenerIconoIndicador(ind.tipo)}
                <Text>
                  {valor} {unidad}
                </Text>
              </View>
            );
          })}
        </View>
      )}

      {/* TEMPERATURAS */}
      <View className="mt-6 flex-row items-center gap-4">
        <Text>{dia.min}°</Text>

        {esHoy && <Text className="text-4xl font-bold">{dia.temperatura}°</Text>}

        <Text>{dia.max}°</Text>
      </View>
    </View>
  );
};
