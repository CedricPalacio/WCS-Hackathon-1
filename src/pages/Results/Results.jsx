import React from "react";
import Events from "../../components/Events/Events";
import Booking from "../../components/Booking/Booking";
import Map from "../../components/Map/Map";
import Weather from "../../components/Weather/Weather";
import NavBar from "../../components/NavBar/NavBar";
import "./Results.scss";

function Results({ setDepartureResult, setDestinationResult, departureResult, destinationResult }) {
    return (
        <div id="results">
            <NavBar setDepartureResult={setDepartureResult} setDestinationResult={setDestinationResult} departureResult={departureResult} destinationResult={destinationResult} />

            <div className="container">
                <Booking departureResult={departureResult} destinationResult={destinationResult} />
                <Events departureResult={departureResult} destinationResult={destinationResult} />
                <Map departureResult={departureResult} destinationResult={destinationResult} />
                <Weather />
            </div>
        </div>
    );
}

export default Results;
