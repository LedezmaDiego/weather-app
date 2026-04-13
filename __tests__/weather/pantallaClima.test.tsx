import { render, fireEvent } from '@testing-library/react-native';
import { PantallaDeClima } from '@/src/componentes/contenidos/PantallaDeClima';
import { DATOS_CLIMA } from '@/src/constantes/clima';

describe('PantallaDeClima', () => {
  test('renderiza la pantalla principal', () => {
    const { getByTestId } = render(
      <PantallaDeClima clima={DATOS_CLIMA} indiceDiaSeleccionado={0} onCambiarDia={() => {}} />
    );

    expect(getByTestId('screen-weather')).toBeTruthy();
  });

  test('muestra el nombre de la ciudad', () => {
    const { getByTestId } = render(
      <PantallaDeClima clima={DATOS_CLIMA} indiceDiaSeleccionado={0} onCambiarDia={() => {}} />
    );

    expect(getByTestId('header-city').props.children).toBe('BUENOS AIRES');
  });

  test('expone los testID obligatorios', () => {
    const { getByTestId } = render(
      <PantallaDeClima clima={DATOS_CLIMA} indiceDiaSeleccionado={0} onCambiarDia={() => {}} />
    );

    const requiredTestIds = [
      'screen-weather',
      'header-city',
      'button-prev-day',
      'button-next-day',
      'temp-min',
      'temp-max',
    ];

    requiredTestIds.forEach((id) => {
      expect(getByTestId(id)).toBeTruthy();
    });
  });

  test('renderiza un icono climático dinámico', () => {
    const { getByTestId } = render(
      <PantallaDeClima clima={DATOS_CLIMA} indiceDiaSeleccionado={0} onCambiarDia={() => {}} />
    );

    expect(getByTestId('icon-weather-sunny')).toBeTruthy();
  });

  test('renderiza métricas secundarias', () => {
    const { getAllByTestId } = render(
      <PantallaDeClima clima={DATOS_CLIMA} indiceDiaSeleccionado={0} onCambiarDia={() => {}} />
    );

    expect(getAllByTestId('metric-item').length).toBeGreaterThanOrEqual(3);
  });

  test('permite navegar al siguiente día', () => {
    const onCambiarDiaMock = jest.fn();

    const { getByTestId } = render(
      <PantallaDeClima
        clima={DATOS_CLIMA}
        indiceDiaSeleccionado={0}
        onCambiarDia={onCambiarDiaMock}
      />
    );

    fireEvent.press(getByTestId('button-next-day'));

    expect(onCambiarDiaMock).toHaveBeenCalledWith(1);
  });

  test('muestra temperatura actual solo cuando corresponde', () => {
    const { queryByTestId, rerender } = render(
      <PantallaDeClima clima={DATOS_CLIMA} indiceDiaSeleccionado={0} onCambiarDia={() => {}} />
    );

    expect(queryByTestId('temp-current')).toBeTruthy();

    rerender(
      <PantallaDeClima clima={DATOS_CLIMA} indiceDiaSeleccionado={1} onCambiarDia={() => {}} />
    );

    expect(queryByTestId('temp-current')).toBeNull();
  });
});
