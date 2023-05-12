import React, { useEffect, useState } from "react";
import { TileLayer, MapContainer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "./Map.scss";
import CardTitle from "../CardTitle/CardTitle";

import RoutingControl from "./RoutingControl";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const Map = ({ departureResult, destinationResult }) => {
  const [refresh, setRefresh] = useState([
    {
      departureResult: { ...departureResult },
      destinationResult: { ...destinationResult },
    },
  ]);
  useEffect(() => {
    // Update the state with the new values of departureResult and destinationResult
    setRefresh([
      {
        departureResult: { ...departureResult },
        destinationResult: { ...destinationResult },
      },
    ]);
  }, [departureResult, destinationResult]);

  return (
    <div className="mapContent" id="map">
      <CardTitle title="S'y rendre" icon="pin-map" />
      <MapContainer
        center={[37.0902, -95.7129]}
        zoom={5} // Change the zoom level as needed
        zoomControl={false}
        style={{ height: "100%", width: "100%", padding: 0 }}>
        {/* Use map() instead of map() */}
        {refresh.map((item) => {
          return (
            <RoutingControl
              key={item.destinationResult.coordinates} // Add a key prop to each item
              position={"topleft"}
              start={item.departureResult.coordinates}
              end={item.destinationResult.coordinates}
              color={"#0d9488"}
            />
          );
        })}

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution="Touriosity"
              url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default Map;
