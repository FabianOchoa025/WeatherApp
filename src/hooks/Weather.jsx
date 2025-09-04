import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const config = {
  params: {
    appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
    units: "metric",
    lang: "es",
  },
};

export function useWeather(cityName, coords) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(config.params).toString();

  useEffect(() => {
    if (!cityName) return;
    setLoading(true);
    axios
      .get(BASE_URL + `?q=${cityName}&` + params)
      .then((res) => {
        setWeather({
          city: res.data.name,
          country: res.data.sys.country,
          temp: res.data.main.temp,
          humidity: res.data.main.humidity,
          wind_speed: res.data.wind.speed,
          clouds: res.data.clouds.all,
          description: res.data.weather[0].main,
          icon: res.data.weather[0].icon,
          iconCode: res.data.weather[0].id,
        });
      })
      .finally(() => setLoading(false));
  }, [cityName]);

  useEffect(() => {
    if (!coords?.lat || !coords?.lon) return;
    setLoading(true);
    axios
      .get(BASE_URL + `?lat=${coords.lat}&lon=${coords.lon}&` + params)
      .then((res) => {
        setWeather({
          city: res.data.name,
          country: res.data.sys.country,
          temp: res.data.main.temp,
          humidity: res.data.main.humidity,
          wind_speed: res.data.wind.speed,
          clouds: res.data.clouds.all,
          description: res.data.weather[0].main,
          icon: res.data.weather[0].icon,
          iconCode: res.data.weather[0].id,
        });
      })
      .finally(() => setLoading(false));
  }, [coords]);

  return { weather, loading };
}