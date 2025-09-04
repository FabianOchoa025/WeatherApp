import { useEffect, useState } from "react";
import { Search, LocateFixed, Sun, Cloud, CloudRain, CloudSnow, Zap, Wind, CloudFog, Droplets } from "lucide-react";
import { useWeather } from "./hooks/Weather";
import { useGeolocation } from "./hooks/Geolocation";
import axios from "axios";

const iconUrl = "https://openweathermap.org/img/wn/[icon]@4x.png";

function App() {
  const [cityName, setCityName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [unit, setUnit] = useState("C");
  const { coords, getCoords } = useGeolocation();
  const { weather, loading } = useWeather(cityName, coords);

  useEffect(() => {
    axios.get("https://ipinfo.io/json").then((res) => setCityName(res.data.city));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim() === "") return;
    setCityName(searchValue);
    setSearchValue("");
  };

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  const displayedTemp = weather
    ? unit === "C"
      ? weather.temp.toFixed(0)
      : (weather.temp * 9 / 5 + 32).toFixed(0)
    : "";

  if (loading || !weather) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-white border-t-sky-500 rounded-full animate-spin shadow-lg"></div>
          <span className="text-white font-semibold text-lg">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="backdrop-blur-xl bg-white/10 p-6 rounded-3xl shadow-2xl w-full max-w-sm text-white border border-white/20">
        <div className="flex items-center gap-2 mb-6">
          <form 
            onSubmit={handleSubmit} 
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex-1"
          >
            <Search className="size-5 text-white/70" />
            <input
              type="text"
              className="w-full bg-transparent outline-none placeholder-white/50 text-white"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar ciudad..."
            />
          </form>
          <button 
            onClick={getCoords} 
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <LocateFixed className="size-5 text-white" />
          </button>
        </div>

        <div className="flex justify-center mb-4">
          <div className="w-28 h-28 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full shadow-inner border border-white/20">
            <img 
              src={iconUrl.replace("[icon]", weather.icon)} 
              alt={weather.description} 
              className="w-20 h-20 drop-shadow-lg"
            />
          </div>
        </div>

        <h2 className="text-6xl font-extrabold text-center drop-shadow-sm">
          {displayedTemp}°<span className="text-5xl">{unit}</span>
        </h2>
        <h3 className="text-xl font-medium text-center mt-2 tracking-wide">
          {weather.city}, {weather.country}
        </h3>
        <p className="text-center text-white/50 capitalize">{weather.description}</p>

        <ul className="flex items-center justify-between mt-6 text-sm">
          <li className="flex flex-col items-center">
            <Wind className="size-10 mb-1 text-white/80" />
            <span>{weather.wind_speed} km/h</span>
            <span className="text-white/50 text-m">Viento</span>
          </li>
          <li className="flex flex-col items-center">
            <Droplets className="size-10 mb-1 text-white/80" />
            <span>{weather.humidity}%</span>
            <span className="text-white/50 text-m">Humedad</span>
          </li>
          <li className="flex flex-col items-center">
            <Cloud className="size-10 mb-1 text-white/80" />
            <span>{weather.clouds}%</span>
            <span className="text-white/50 text-m">Nubes</span>
          </li>
        </ul>

        <div className="flex justify-center mt-6">
          <button 
            onClick={toggleUnit} 
            className="text-sm text-white/70 bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors"
          >
            Cambiar unidad
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
