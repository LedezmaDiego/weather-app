import { View, Text } from 'react-native';
import { Droplets, Flag, CloudRain } from 'lucide-react-native';
import { IconoDeClima } from './IconoDeClima';
import { NavegacionDeDias } from './NavegacionDeDias';
import { ClimaPorDia } from '@/src/tipos/clima';
import {
  CODIGOS_CLIMA_SOLEADO,
  CODIGOS_CLIMA_PARCIALMENTE_NUBLADO,
  CODIGOS_CLIMA_NUBLADO,
  CODIGOS_CLIMA_NIEBLA,
  CODIGOS_CLIMA_LLUVIA,
  CODIGOS_CLIMA_TORMENTA,
} from '@/src/constantes/clima';

type Props = {
  clima: ClimaPorDia[];
  indiceDiaSeleccionado: number;
  onCambiarDia: (nuevoIndice: number) => void;
};

const mapearCodigoACondicion = (codigo: number): string => {
  if (CODIGOS_CLIMA_SOLEADO.includes(codigo)) return 'sunny';
  if (CODIGOS_CLIMA_PARCIALMENTE_NUBLADO.includes(codigo)) return 'partly-cloudy';
  if (CODIGOS_CLIMA_NUBLADO.includes(codigo)) return 'cloudy';
  if (CODIGOS_CLIMA_NIEBLA.includes(codigo)) return 'fog';
  if (CODIGOS_CLIMA_LLUVIA.includes(codigo)) return 'rain';
  if (CODIGOS_CLIMA_TORMENTA.includes(codigo)) return 'storm';

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

  const condition = mapearCodigoACondicion(diaSeleccionado.codigoCondicion);

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

        <View className="w-full flex-row items-end justify-between px-10">
          {/* MAX */}
          <View className="items-center">
            <Text
              testID="temp-max"
              className={`text-xl font-bold ${esDiaActual ? 'text-gray-500' : 'text-black'}`}>
              ↑ {Math.round(diaSeleccionado.max)}°
            </Text>
            <Text className="text-sm text-gray-500">Máx.</Text>
          </View>

          {/* ACTUAL */}
          {esDiaActual && (
            <View className="items-center">
              <Text testID="temp-current" className="text-5xl font-black leading-none text-black">
                {Math.round(diaSeleccionado.temperatura!)}°
              </Text>
              <Text className="text-sm font-bold">Ahora</Text>
            </View>
          )}

          {/* MIN */}
          <View className="items-center">
            <Text
              testID="temp-min"
              className={`text-xl font-bold ${esDiaActual ? 'text-gray-500' : 'text-black'}`}>
              ↓ {Math.round(diaSeleccionado.min)}°
            </Text>
            <Text className="text-sm text-gray-500">Mín.</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
