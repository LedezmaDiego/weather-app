import { renderHook, waitFor, act } from '@testing-library/react-native';
import { useClima } from '@/src/hooks/useClima';

jest.mock('@/src/hooks/useUbicacionActual', () => ({
  useUbicacionActual: () => ({
    obtenerUbicacionActual: jest.fn().mockResolvedValue('Buenos Aires'),
  }),
}));

jest.mock('@/src/servicios/weatherApi', () => ({
  obtenerClimaPorCiudad: jest.fn(),
}));

import { obtenerClimaPorCiudad } from '@/src/servicios/weatherApi';

describe('useClima', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('carga clima correctamente', async () => {
    const mockClima = [{ ciudad: 'Buenos Aires', fecha: '2026-04-14', min: 10, max: 20 }];

    (obtenerClimaPorCiudad as jest.Mock).mockResolvedValue(mockClima);

    const { result } = renderHook(() => useClima());

    await waitFor(() => {
      expect(result.current.clima.length).toBeGreaterThan(0);
    });

    expect(obtenerClimaPorCiudad).toHaveBeenCalledWith('Buenos Aires');
    expect(result.current.clima).toEqual(mockClima);
    expect(result.current.indiceDiaSeleccionado).toBe(1);
  });

  test('cambia el día seleccionado', async () => {
    const mockClima = [
      { ciudad: 'Buenos Aires', fecha: '2026-04-14', min: 10, max: 20 },
      { ciudad: 'Buenos Aires', fecha: '2026-04-15', min: 12, max: 22 },
    ];

    (obtenerClimaPorCiudad as jest.Mock).mockResolvedValue(mockClima);

    const { result } = renderHook(() => useClima());

    await waitFor(() => {
      expect(result.current.clima.length).toBe(2);
    });

    act(() => {
      result.current.onCambiarDia(0);
    });

    expect(result.current.indiceDiaSeleccionado).toBe(0);
  });

  test('maneja error al cargar clima', async () => {
    (obtenerClimaPorCiudad as jest.Mock).mockRejectedValue(new Error('API error'));

    const { result } = renderHook(() => useClima());

    await waitFor(() => {
      expect(result.current.clima).toEqual([]);
    });

    expect(obtenerClimaPorCiudad).toHaveBeenCalled();
  });
});
