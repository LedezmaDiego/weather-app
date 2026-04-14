````md
# Weather App

Aplicación mobile desarrollada con Expo + React Native que muestra el clima actual y próximos días según la ubicación del usuario.

---

## Descargas

- APK (Android):
  https://github.com/LedezmaDiego/weather-app/releases/download/v1.0.0/weather-app.apk

---

## Instalación en dispositivo (Android)

### Opción 1 — Instalar APK (recomendado para usuarios)

1. Descargar la APK desde la sección "Descargas"
2. Transferir el archivo al dispositivo
3. Abrir el archivo `.apk`
4. Aceptar la instalación desde orígenes desconocidos si es necesario
5. Instalar la aplicación

---

### Opción 2 — Usar Expo Go (modo desarrollo)

> Requiere conocimientos técnicos y API Key

1. Instalar Expo Go en el dispositivo
2. Clonar el repositorio:

```bash
git clone https://github.com/LedezmaDiego/weather-app.git
cd weather-app
```
````

3. Crear archivo `.env`:

La aplicación utiliza WeatherAPI
Para desarrollo:

Crear una cuenta en [https://www.weatherapi.com/](https://www.weatherapi.com/)
Obtener una API Key
Crear archivo `.env` en el proyecto:

```bash
EXPO_PUBLIC_WEATHER_API_KEY=tu_api_key
```

> ⚠️ La APK ya incluye una API Key funcional, no es necesario configurarla para uso normal

4. Instalar dependencias:

```bash
bun install
```

5. Iniciar el servidor:

```bash
bun run dev
```

6. Escanear el QR con Expo Go

---

## Funcionalidades

- Obtención de ubicación actual (GPS)
- Clima del día actual
- Día anterior
- Pronóstico de próximos días
- Navegación entre días
- Indicadores:
  - Humedad
  - Probabilidad de lluvia
  - Viento

---

## Ubicación

- La app solicita permisos de ubicación
- Si el usuario no los concede, usa:

```bash
Ciudad Autónoma de Buenos Aires
```

---

## Notas importantes

- Funciona con Expo Go
- La APK no requiere configuración adicional
- El modo desarrollo requiere API Key
- Requiere conexión a internet
- Los cambios se reflejan en tiempo real

---
