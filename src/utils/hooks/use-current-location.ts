import { useState, useEffect } from 'react';

export function useCurrentLocation() {
  const [location, setLocation] = useState <{latitude: number, longitude: number}>({
    latitude:-1.290393,
    longitude:36.816583
  });
  const [error, setError] = useState < GeolocationPositionError|null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        setError(error);
      },
      { enableHighAccuracy: true } // Optional configuration for accuracy
    );
  }, []);

  return {location, error}
}
