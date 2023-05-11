import { TileLayer, MapContainer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.scss";

import RoutingControl from "./RoutingControl";

const maps = {
  base: "https://%7Bs%7D.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png",
};

const MapContent = React.memo(
  ({ map, start, end, onRoutesFound, distance }) => {
    const handleRoutesFound = (e) => {
      const route = e.routes[0];
      const distanceInKm = route.summary.totalDistance / 1000;
      onRoutesFound(distanceInKm);
    };

    return (
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
                attribution='&copy; <a href="https://stadiamaps.com/%22%3EStadia Maps</a>'
                url="https://tiles.stadiamaps.com/tiles/outdoors/%7Bz%7D/%7Bx%7D/%7By%7D%7Br%7D.png"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        </MapContainer>
        <div>{distance && <p>Distance: {distance} km</p>}</div>
      </div>
    );
  }
);

export default MapContent;
