import React from "react";
import Events from "../../components/Events/Events";
import Booking from "../../components/Booking/Booking";
import Map from "../../components/Map/Map";
import Weather from "../../components/Weather/Weather";

function Results({ setDepartureResult, setDestinationResult, departureResult, destinationResult }) {
  return (
    <div>
      <Booking />
      <Events />
      <Map departureResult={departureResult} destinationResult={destinationResult} />
      <Weather />
    </div>
  );
}

export default Results;
