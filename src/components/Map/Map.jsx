import React, { useState } from "react";
import { TileLayer, MapContainer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.scss";

import RoutingControl from "./RoutingControl";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const Map = ({ departureResult, destinationResult }) => {
  const [map, setMap] = useState(null);
  const [start, setStart] = useState(departureResult.coordinates);
  const [end, setEnd] = useState(destinationResult.coordinates);
  const [distance, setDistance] = useState(null);

  console.log(departureResult);
  console.log(destinationResult);

  const handleRoutesFound = (e) => {
    const route = e.routes[0];
    const distanceInKm = route.summary.totalDistance / 1000;
    setDistance(distanceInKm);
  };
  // console.log(distanceInKm);
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
                url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
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
