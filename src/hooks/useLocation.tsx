import Geolocation from "@react-native-community/geolocation";
import { useRef } from "react";
import { useEffect, useState } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>();
  const [currentUserLocation, setCurrentUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [routeLines, setRoutesLines] = useState<Location[]>([]);
  const watchId = useRef<number>();

  useEffect(() => {
    getCurrentLocation().then((location) => {
      setInitialPosition(location);
      setCurrentUserLocation(location);
      setRoutesLines(routes => [...routes, location]);
      setHasLocation(true);
    });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        (err) => reject({ err }),
        { enableHighAccuracy: true }
      );
    });
  };

  const followUser = () => {
    watchId.current = Geolocation.watchPosition(
      ({ coords }) => {
        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };

        setCurrentUserLocation(location);
        setRoutesLines(routes => [...routes, location]);
      },
      (err) => console.log({ err }),
      { enableHighAccuracy: true, distanceFilter: 10 }
    );
  };

  const stopFollowUser = () => {
    watchId.current && Geolocation.clearWatch(watchId.current);
  };

  return {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUser,
    currentUserLocation,
    stopFollowUser,
    routeLines
  };
};
