import Contenedor from '@/src/componentes/contenedores/Contenedor';
import { NavegacionDeDias } from '@/src/componentes/contenidos/NavegacionDeDias';
import { IconoDeClima } from '@/src/componentes/contenidos/IconoDeClima';
import EncabezadoDeCiudad from '@/src/componentes/contenidos/EncabezadoDeCiudad';
import TarjetaParaDatosClimaticos from '@/src/componentes/contenidos/TarjetaParaDatosClimaticos';
import { useClima } from '@/src/hooks/useClima';

export default function Home() {
  const { clima, loading, indiceDiaSeleccionado, onCambiarDia } = useClima();

  if (loading || !clima[indiceDiaSeleccionado]) return null;

  const dia = clima[indiceDiaSeleccionado];

  return (
    <Contenedor>
      <NavegacionDeDias
        indice={indiceDiaSeleccionado}
        onCambiarDia={onCambiarDia}
        fechas={clima.map((d) => d.fecha)}
      />

      <EncabezadoDeCiudad ciudad={dia.ciudad} />

      <IconoDeClima codigo={dia.codigoCondicion} />

      <TarjetaParaDatosClimaticos dia={dia} />
    </Contenedor>
  );
}
