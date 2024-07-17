import { useState, useEffect } from 'react';

export function useCurrentLocation() {
  const [location, setLocation] = useState < GeolocationPosition['coords']|null>(null);
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
