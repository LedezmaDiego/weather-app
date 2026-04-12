export type Indicador = {
  tipo: string;
  valor: number;
  unidad: string;
};

export type ClimaPorDia = {
  ciudad: string;
  condicion: string;
  fecha: string;
  temperatura?: number;
  min: number;
  max: number;
  indicadores?: Indicador[];
};
