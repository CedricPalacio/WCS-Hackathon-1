import "./SearchInputs.scss";
import LocationInput from "../LocationInput/LocationInput";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SearchInputs({ setDepartureResult, setDestinationResult, departureResult, destinationResult }) {

    
    return (
        <div className="search-inputs">
            <LocationInput icon="geo" placeholder="De..." setResult={setDepartureResult} result={departureResult}/>
            <LocationInput icon="airplane" placeholder="À..." setResult={setDestinationResult} result={destinationResult} />
            {departureResult && destinationResult ? (
                <Link to={`/results`}>
                    C'est parti <i className="bi bi-arrow-right" />
                </Link>
            ) : (
                <a>
                    C'est parti <i className="bi bi-arrow-right" />
                </a>
            )}
        </div>
    );
}
