import { View } from 'react-native';
import { EncabezadoDeCiudad } from './EncabezadoDeCiudad';
import { NavegacionDeDias } from './NavegacionDeDias';
import { IconoDeClima } from './IconoDeClima';
import { TemperaturaPrincipal } from './TemperaturaPrincipal';
import { TemperaturasExtremas } from './TemperaturasExtremas';
import { IndicadoresSecundarios } from './IndicadoresSecundarios';

type Props = {
  clima: any;
};

export const TarjetaDeClima = ({ clima }: Props) => {
  return (
    <View className="w-40 items-center rounded-2xl bg-white p-4 shadow">
      <EncabezadoDeCiudad nombreCiudad={clima.ciudad} />

      <NavegacionDeDias diaActual={clima.dia} onDiaAnterior={() => {}} onDiaSiguiente={() => {}} />

      <IconoDeClima condicion={clima.condicion} />

      <TemperaturaPrincipal temperatura={clima.temperatura} />

      <TemperaturasExtremas min={clima.min} max={clima.max} />

      <IndicadoresSecundarios indicadores={clima.indicadores} />
    </View>
  );
};
