import React, { useState } from "react";
import { TileLayer, MapContainer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.scss";

import RoutingControl from "./RoutingControl";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const Map = ({ startCoordinates, endCoordinates }) => {
  const [map, setMap] = useState(null);
  const [start, setStart] = useState([43, 1.433333]);
  const [end, setEnd] = useState([48.72262900986691, 1.5878540993350367]);
  const [distance, setDistance] = useState(null);

  const handleRoutesFound = (e) => {
    const route = e.routes[0];
    const distanceInKm = route.summary.totalDistance / 1000;
    setDistance(distanceInKm);
  };

  return (
    <>
      <div className="mapContent">
        <MapContainer
          center={[37.0902, -95.7129]}
          zoomLevel={5}
          zoomControl={false}
          style={{ height: "50vh", width: "100%", padding: 0 }}
          whenCreated={(map) => setMap(map)}>
          <RoutingControl
            position={"topleft"}
            start={start}
            end={end}
            color={"#757de8"}
            onRoutesFound={handleRoutesFound}
          />
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Map">
              <TileLayer
                attribution="Touriosity"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        </MapContainer>
        <div>{distance && <p>Distance: {distance} km</p>}</div>
      </div>
    </>
  );
};

export default Map;
