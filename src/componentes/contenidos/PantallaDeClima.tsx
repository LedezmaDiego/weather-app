import { View, Text } from 'react-native';
import { Droplets, Flag, CloudRain } from 'lucide-react-native';
import { IconoDeClima } from './IconoDeClima';
import { NavegacionDeDias } from './NavegacionDeDias';
import { ClimaPorDia } from '@/src/tipos/clima';

type Props = {
  clima: ClimaPorDia[];
  indiceDiaSeleccionado: number;
  onCambiarDia: (nuevoIndice: number) => void;
};

const mapCodigoAString = (codigo: number): string => {
  if (codigo === 1000) return 'sunny';
  if ([1003].includes(codigo)) return 'partly-cloudy';
  if ([1006, 1009].includes(codigo)) return 'cloudy';
  if ([1030, 1135, 1147].includes(codigo)) return 'fog';
  if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195].includes(codigo)) return 'rain';
  if ([1066, 1210, 1213, 1216, 1219].includes(codigo)) return 'snow';
  if ([1087, 1273, 1276].includes(codigo)) return 'storm';

  return 'unknown';
};

export const PantallaDeClima = ({ clima, indiceDiaSeleccionado, onCambiarDia }: Props) => {
  const diaSeleccionado = clima[indiceDiaSeleccionado];

  if (!diaSeleccionado) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Cargando clima...</Text>
      </View>
    );
  }

  const esDiaActual = diaSeleccionado.temperatura !== undefined;

  const obtenerIconoIndicador = (tipo: string) => {
    const tipoNormalizado = tipo.toLowerCase();

    if (tipoNormalizado.includes('humedad')) return <Droplets size={18} />;
    if (tipoNormalizado.includes('prec')) return <CloudRain size={18} />;
    if (tipoNormalizado.includes('prob')) return <CloudRain size={18} />;
    if (tipoNormalizado.includes('viento')) return <Flag size={18} />;

    return null;
  };

  const condition = mapCodigoAString(diaSeleccionado.codigoCondicion);

  return (
    <View testID="screen-weather" className="flex-1 bg-white">
      <View className="flex-1 items-center justify-evenly px-6">
        <NavegacionDeDias
          indice={indiceDiaSeleccionado}
          onCambiarDia={onCambiarDia}
          fechas={clima.map((dia) => dia.fecha)}
        />

        <Text
          testID="header-city"
          className="text-center text-3xl font-black uppercase tracking-widest text-black">
          {diaSeleccionado.ciudad}
        </Text>

        <View
          testID={`icon-weather-${condition}`}
          accessibilityRole="image"
          className="h-[220px] w-[220px] items-center justify-center">
          <IconoDeClima codigo={diaSeleccionado.codigoCondicion} />
        </View>

        {diaSeleccionado.indicadores && (
          <View className="gap-3">
            {diaSeleccionado.indicadores.map((indicador) => (
              <View
                testID="metric-item"
                key={indicador.tipo}
                className="flex-row items-center gap-3">
                <View testID="metric-icon">{obtenerIconoIndicador(indicador.tipo)}</View>
                <Text testID="metric-value" className="text-lg text-black">
                  {Math.round(indicador.valor)} {indicador.unidad}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View className="w-full flex-row items-baseline justify-between px-10">
          <Text
            testID="temp-max"
            className={`text-xl font-bold ${esDiaActual ? 'text-gray-500' : 'text-black'}`}>
            ↑ {Math.round(diaSeleccionado.max)}°
          </Text>

          {esDiaActual && (
            <Text testID="temp-current" className="text-5xl font-black leading-none text-black">
              {Math.round(diaSeleccionado.temperatura!)}°
            </Text>
          )}

          <Text
            testID="temp-min"
            className={`text-xl font-bold ${esDiaActual ? 'text-gray-500' : 'text-black'}`}>
            ↓ {Math.round(diaSeleccionado.min)}°
          </Text>
        </View>
      </View>
    </View>
  );
};
