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

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-evenly px-6">
        {/* 🔹 Navegación */}
        <NavegacionDeDias
          indice={indiceDiaSeleccionado}
          onCambiarDia={onCambiarDia}
          fechas={clima.map((dia) => dia.fecha)}
        />

        {/* 🔹 Ciudad */}
        <Text className="text-center text-3xl font-black uppercase tracking-widest text-black">
          {diaSeleccionado.ciudad}
        </Text>

        {/* 🔹 Icono (contenedor fijo) */}
        <View className="h-[220px] w-[220px] items-center justify-center">
          <IconoDeClima codigo={diaSeleccionado.codigoCondicion} />
        </View>

        {/* 🔹 Indicadores */}
        {diaSeleccionado.indicadores && (
          <View className="gap-3">
            {diaSeleccionado.indicadores.map((indicador) => (
              <View key={indicador.tipo} className="flex-row items-center gap-3">
                {obtenerIconoIndicador(indicador.tipo)}
                <Text className="text-lg text-black">
                  {Math.round(indicador.valor)} {indicador.unidad}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View className="w-full flex-row items-baseline justify-between px-10">
          {/* MAX */}
          <Text className={`text-xl font-bold ${esDiaActual ? 'text-gray-500' : 'text-black'}`}>
            ↑ {Math.round(diaSeleccionado.max)}°
          </Text>

          {/* ACTUAL */}
          {esDiaActual && (
            <Text className="text-5xl font-black leading-none text-black">
              {Math.round(diaSeleccionado.temperatura!)}°
            </Text>
          )}

          {/* MIN */}
          <Text className={`text-xl font-bold ${esDiaActual ? 'text-gray-500' : 'text-black'}`}>
            ↓ {Math.round(diaSeleccionado.min)}°
          </Text>
        </View>
      </View>
    </View>
  );
};
