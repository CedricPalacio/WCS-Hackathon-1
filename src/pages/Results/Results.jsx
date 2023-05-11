import React from "react";
import Events from "../../components/Events/Events";
import Booking from "../../components/Booking/Booking";
import Map from "../../components/Map/Map";
import Weather from "../../components/Weather/Weather";
import ScrollToTopButton from "../../components/ToTopButton/ScrollToTopButton";

function Results({
  setDepartureResult,
  setDestinationResult,
  departureResult,
  destinationResult,
}) {
  return (
    <div>
      <Booking destinationResult={destinationResult} />
      <Events destinationResult={destinationResult} />
      <Map
        departureResult={departureResult}
        destinationResult={destinationResult}
      />
      <Weather />
      <ScrollToTopButton />
    </div>
  );
}

export default Results;
