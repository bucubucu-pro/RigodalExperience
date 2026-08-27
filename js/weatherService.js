/* ============================================
   WEATHER SERVICE
   Fetches current weather once per page load using
   Open-Meteo (free, no API key required, no backend
   needed — safe to call directly from a static site).

   Any module can read the result via RigodalWeather.get()
   once the 'rigodal:weatherready' event has fired (or
   immediately, if it already fired before you checked).

   Coordinates are hardcoded to Eger, Hungary. If the
   guesthouse ever moves, update EGER_LAT / EGER_LNG below
   — nothing else needs to change.
   ============================================ */

const RigodalWeather = (function () {
  const EGER_LAT = 47.9025;
  const EGER_LNG = 20.3772;

  let current = null; // { tempC, weatherCode, isDay, description, icon }
  let ready = false;

  // Open-Meteo weather codes -> simple description + emoji.
  // Reference: https://open-meteo.com/en/docs (WMO Weather interpretation codes)
  const CODE_MAP = {
    0: { desc: 'Clear sky', icon: '☀️' },
    1: { desc: 'Mostly clear', icon: '🌤️' },
    2: { desc: 'Partly cloudy', icon: '⛅' },
    3: { desc: 'Overcast', icon: '☁️' },
    45: { desc: 'Fog', icon: '🌫️' },
    48: { desc: 'Fog', icon: '🌫️' },
    51: { desc: 'Light drizzle', icon: '🌦️' },
    53: { desc: 'Drizzle', icon: '🌦️' },
    55: { desc: 'Heavy drizzle', icon: '🌧️' },
    61: { desc: 'Light rain', icon: '🌦️' },
    63: { desc: 'Rain', icon: '🌧️' },
    65: { desc: 'Heavy rain', icon: '🌧️' },
    71: { desc: 'Light snow', icon: '🌨️' },
    73: { desc: 'Snow', icon: '❄️' },
    75: { desc: 'Heavy snow', icon: '❄️' },
    80: { desc: 'Rain showers', icon: '🌦️' },
    81: { desc: 'Rain showers', icon: '🌧️' },
    82: { desc: 'Violent showers', icon: '⛈️' },
    95: { desc: 'Thunderstorm', icon: '⛈️' },
    96: { desc: 'Thunderstorm w/ hail', icon: '⛈️' },
    99: { desc: 'Thunderstorm w/ hail', icon: '⛈️' }
  };

  function describeCode(code) {
    return CODE_MAP[code] || { desc: 'Unknown', icon: '🌡️' };
  }

  async function fetchWeather() {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${EGER_LAT}&longitude=${EGER_LNG}&current=temperature_2m,weather_code,is_day&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather fetch failed: ' + res.status);
      const data = await res.json();

      const code = data.current.weather_code;
      const meta = describeCode(code);

      current = {
        tempC: Math.round(data.current.temperature_2m),
        weatherCode: code,
        isDay: data.current.is_day === 1,
        description: meta.desc,
        icon: meta.icon
      };
    } catch (err) {
      console.warn('RigodalWeather: could not fetch live weather, falling back to null.', err);
      current = null; // modules must handle null gracefully — no fake data
    } finally {
      ready = true;
      document.dispatchEvent(new CustomEvent('rigodal:weatherready', { detail: current }));
    }
  }

  fetchWeather();

  return {
    get: () => current,
    isReady: () => ready
  };
})();
