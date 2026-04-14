import { renderHook } from '@testing-library/react-native';
import { useUbicacionActual } from '@/src/hooks/useUbicacionActual';
import * as Location from 'expo-location';

jest.mock('expo-location');

describe('useUbicacionActual', () => {
  test('devuelve coordenadas si hay permiso', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: {
        latitude: -34.7,
        longitude: -58.4,
      },
    });

    const { result } = renderHook(() => useUbicacionActual());

    const ubicacion = await result.current.obtenerUbicacionActual();

    expect(ubicacion).toBe('-34.7,-58.4');
  });

  test('usa fallback si no hay permiso', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });

    const { result } = renderHook(() => useUbicacionActual());

    const ubicacion = await result.current.obtenerUbicacionActual();

    expect(ubicacion).toBe('Ciudad Autónoma de Buenos Aires');
  });
});
