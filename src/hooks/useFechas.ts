export const useFechas = () => {
  const hoy = new Date();

  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);

  const maniana = new Date(hoy);
  maniana.setDate(hoy.getDate() + 1);

  const formatear = (fecha: Date) => {
    return `${fecha.getDate()}/${fecha.getMonth() + 1}`;
  };

  return {
    hoy: formatear(hoy),
    ayer: formatear(ayer),
    maniana: formatear(maniana),
  };
};
