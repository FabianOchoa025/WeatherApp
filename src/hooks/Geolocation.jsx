import { useState } from "react";

export function useGeolocation() {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  const getCoords = () => {
    if (!navigator.geolocation) {
      setError("Geolocalización no soportada en este navegador");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setError("No se pudo obtener tu ubicación");
        console.error(err);
      }
    );
  };

  return { coords, error, getCoords };
}