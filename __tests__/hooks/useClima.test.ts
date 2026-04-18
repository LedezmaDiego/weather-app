import { renderHook, waitFor, act } from '@testing-library/react-native';
import { useClima } from '@/src/hooks/useClima';

jest.mock('@/src/hooks/useUbicacionActual', () => ({
  useUbicacionActual: () => ({
    obtenerUbicacionActual: jest.fn().mockResolvedValue({
      lat: -34.6,
      lon: -58.4,
      permiso: true,
    }),
  }),
}));

jest.mock('@/src/servicios/geocodingApi', () => ({
  obtenerNombreUbicacion: jest.fn().mockResolvedValue('Villa Celina, CABA'),
}));

jest.mock('@/src/servicios/weatherApi', () => ({
  obtenerClimaPorUbicacion: jest.fn(),
}));

import { obtenerClimaPorUbicacion } from '@/src/servicios/weatherApi';

describe('useClima', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('carga clima correctamente', async () => {
    const mockClima = [
      {
        ciudad: 'X',
        fecha: '2026-04-14',
        min: 10,
        max: 20,
        codigoCondicion: 1000,
      },
      {
        ciudad: 'X',
        fecha: '2026-04-15',
        min: 12,
        max: 22,
        codigoCondicion: 1000,
      },
    ];

    (obtenerClimaPorUbicacion as jest.Mock).mockResolvedValue({
      clima: mockClima,
      nombreCiudad: 'Buenos Aires',
    });

    const { result } = renderHook(() => useClima());

    await waitFor(() => {
      expect(result.current.clima.length).toBeGreaterThan(0);
    });

    expect(result.current.clima[0].ciudad).toBe('VILLA CELINA, CABA');
    expect(result.current.indiceDiaSeleccionado).toBe(1);
  });

  test('permite cambiar día', async () => {
    (obtenerClimaPorUbicacion as jest.Mock).mockResolvedValue({
      clima: [
        { ciudad: 'X', fecha: '1', min: 0, max: 0, codigoCondicion: 1000 },
        { ciudad: 'X', fecha: '2', min: 0, max: 0, codigoCondicion: 1000 },
      ],
      nombreCiudad: 'Buenos Aires',
    });

    const { result } = renderHook(() => useClima());

    await waitFor(() => {
      expect(result.current.clima.length).toBe(2);
    });

    act(() => {
      result.current.onCambiarDia(0);
    });

    expect(result.current.indiceDiaSeleccionado).toBe(0);
  });

  test('maneja error', async () => {
    (obtenerClimaPorUbicacion as jest.Mock).mockRejectedValue(new Error('API error'));

    const { result } = renderHook(() => useClima());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.clima.length).toBe(1);
    expect(result.current.clima[0].ciudad).toBe('SIN CONEXIÓN');
  });
});
