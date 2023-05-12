import React from "react";
import Events from "../../components/Events/Events";
import Booking from "../../components/Booking/Booking";
import Map from "../../components/Map/Map";
import Weather from "../../components/Weather/Weather";
import NavBar from "../../components/NavBar/NavBar";
import IconsLinks from "../../components/IconsLinks/IconsLinks";

import ScrollToTopButton from "../../components/ToTopButton/ScrollToTopButton";
import "./Results.scss";

function Results({ setDepartureResult, setDestinationResult, departureResult, destinationResult }) {
    return (
        <div id="results">
            <NavBar setDepartureResult={setDepartureResult} setDestinationResult={setDestinationResult} departureResult={departureResult} destinationResult={destinationResult} />

            <div className="container">
                <IconsLinks />
                <Map departureResult={departureResult} destinationResult={destinationResult} />
                <Weather destinationResult={destinationResult} />
                <Booking destinationResult={destinationResult} />
                <Events destinationResult={destinationResult} />
            </div>

            <ScrollToTopButton />
        </div>
    );
}

export default Results;
