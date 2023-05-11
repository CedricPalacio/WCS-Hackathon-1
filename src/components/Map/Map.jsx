import React, { useState } from "react";
import { TileLayer, MapContainer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.scss";

import RoutingControl from "./RoutingControl";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const Map = () => {
  const [map, setMap] = useState(null);
  const [start, setStart] = useState([43.6, 1.433333]);
  const [end, setEnd] = useState([40.712784, -74.005941]);

  return (
    <>
      <div className="mapContent">
        <MapContainer
          center={[37.0902, -95.7129]}
          zoom={3}
          zoomControl={false}
          style={{ height: "50vh", width: "100%", padding: 0 }}
          whenCreated={(map) => setMap(map)}>
          {/* *************** */}
          {/* Pass in our custom control layer here, inside of the map container */}
          {/* *************** */}
          <RoutingControl
            position={"topleft"}
            start={start}
            end={end}
            color={"#757de8"}
          />
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Map">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={maps.base}
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
