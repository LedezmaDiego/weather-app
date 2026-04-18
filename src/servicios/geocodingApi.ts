export const obtenerNombreUbicacion = async (lat: number, lon: number): Promise<string | null> => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'weather-app',
      },
    });

    const data = await res.json();
    const address = data.address;

    const localidad =
      address?.suburb ||
      address?.city ||
      address?.town ||
      address?.village ||
      address?.quarter ||
      address?.hamlet ||
      null;

    let provincia = address?.state || address?.region || address?.state_district || null;

    if (provincia === 'Ciudad Autónoma de Buenos Aires') {
      provincia = 'CABA';
    }

    if (!localidad || !provincia) {
      console.log('NOMINATIM → datos insuficientes');
      return null;
    }

    const nombreFinal = `${localidad}, ${provincia}`;

    return nombreFinal;
  } catch (error) {
    console.log('NOMINATIM → error:', error);
    return null;
  }
};
