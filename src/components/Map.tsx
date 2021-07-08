import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useLocation } from "../hooks/useLocation";
import { LoadingScreen } from "../pages/LoadingScreen";
import { Fab } from "./Fab";

export const Map = () => {
  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUser,
    currentUserLocation,
    stopFollowUser,
    routeLines,
  } = useLocation();
  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);
  const [showPolyline, setShowPolyline] = useState(true);

  useEffect(() => {
    followUser();

    return () => stopFollowUser();
  }, []);

  useEffect(() => {
    if (!following.current) return;

    const { latitude, longitude } = currentUserLocation;

    mapViewRef.current?.animateCamera({
      center: { latitude, longitude },
    });
  }, [currentUserLocation]);

  const getCenterPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation();
    following.current = true;

    mapViewRef.current?.animateCamera({
      center: { latitude, longitude },
    });
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        ref={(el) => (mapViewRef.current = el!)}
        style={{ flex: 1 }}
        provider={"google"}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition!.latitude,
          longitude: initialPosition!.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => (following.current = false)}
      >
        {showPolyline && (
          <Polyline
            coordinates={routeLines}
            strokeColor="black"
            strokeWidth={3}
          />
        )}
      </MapView>
      <Fab
        iconName={"compass-outline"}
        onPress={getCenterPosition}
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
        }}
      />
      <Fab
        iconName={"brush-outline"}
        onPress={() => setShowPolyline(!showPolyline)}
        style={{
          position: "absolute",
          right: 20,
          bottom: 80,
        }}
      />
    </>
  );
};
