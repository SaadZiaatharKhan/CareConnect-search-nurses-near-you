"use client";

import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility'; // Ensures default markers load correctly

// Explicitly set the default marker icon
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Define type for coordinates
type Coordinates = [number, number];

// Custom hook to center the map on the user's location
const SetViewOnLocation = ({ coords }: { coords: Coordinates }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 13); // Set map view to user's location
  }, [coords, map]);

  return null;
};

const MapComponent: React.FC<{ nurseLocation: Coordinates | null; userLocation: Coordinates | null }> = ({ nurseLocation, userLocation }) => {
  const [position, setPosition] = useState<Coordinates | null>(userLocation);
  const [route, setRoute] = useState<Coordinates[]>([]); // Store the calculated route

  // Fetch the user's location if not provided
  useEffect(() => {
    if (!userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error('Error fetching location', error);
        }
      );
    }
  }, [userLocation]);

  // Fetch the route between the patient and the nurse
  useEffect(() => {
    if (position && nurseLocation) {
      const fetchRoute = async () => {
        try {
          const response = await fetch(
            `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248b2b6630de9a44678b8ca3b503b3ac28a&start=${position[1]},${position[0]}&end=${nurseLocation[1]},${nurseLocation[0]}`
          );
          const data = await response.json();
          const coordinates = data.features[0].geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]]); // Convert [lng, lat] to [lat, lng]
          setRoute(coordinates);
        } catch (error) {
          console.error("Error fetching route:", error);
        }
      };

      fetchRoute();
    }
  }, [position, nurseLocation]);

  return (
    <div style={{ height: '400px', width: '75%' }}>
      {position ? (
        <MapContainer center={position} zoom={13} style={{ height: '75%', width: '75%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Marker for the user's current position */}
          <Marker position={position} />
          {nurseLocation && (
            <>
              {/* Marker for the nurse's location */}
              <Marker position={nurseLocation} />
              {/* Display the proper route between the user and the nurse */}
              {route.length > 0 && <Polyline positions={route} color="blue" />}
            </>
          )}
          <SetViewOnLocation coords={position} />
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default MapComponent;
