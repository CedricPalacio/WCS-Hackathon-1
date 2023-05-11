import { useState } from "react";

import axios from "axios";
import "./LocationInput.scss";
export default function LocationInput({ icon = "geo", placeholder, setResult }) {
    const [value, setValue] = useState("");
    const [apiResults, setApiResults] = useState([]);
    const [areAPIResultsVisible, setAreAPIResultsVisible] = useState(false);

    const getLocation = (value) => {
        if (value.length >= 3) {
            setAreAPIResultsVisible(true);
            axios.get(`https://api.geocodify.com/v2/autocomplete?api_key=${import.meta.env.VITE_APP_GEOCODIFY_API_KEY}&q=${value}`).then((response) => {
                setApiResults(response.data.response.features.splice(0, 3));
                console.log(response.data.response.features);
            });
        } else {
            setApiResults([]);
            setAreAPIResultsVisible(false);
        }
    };

    return (
        <div className="location-input">
            <i className={`bi bi-${icon}`} />
            <input
                type="text"
                placeholder={placeholder}
                onChange={(event) => {
                    setValue(event.target.value);
                    getLocation(event.target.value);
                }}
                value={value}
                onFocus={(event) => {
                    setAreAPIResultsVisible(true);
                    getLocation(event.target.value);
                    
                }}
                onBlur={() => {
                    setAreAPIResultsVisible(false);
                }}
            />
            {areAPIResultsVisible ? (
                <ul className="location-selector">
                    {apiResults.map((result) => (
                        <li
                            key={result.properties.id}
                            onClick={() => {
                                setResult({
                                    coordinates: result.geometry.coordinates.reverse(),
                                    city: {
                                        name: result.properties.localadmin,
                                        departement: result.properties.region,
                                        region: result.properties.macroregion,
                                        country: result.properties.country,
                                    },
                                });
                                setValue(`${result.properties.locality}, ${result.properties.region}, ${result.properties.country}`);
                                setAreAPIResultsVisible(false);
                            }}>
                            {result.properties.locality ? `${result.properties.locality}, ` : null}
                            {result.properties.region ? `${result.properties.region}, ` : null}
                            {result.properties.country ? result.properties.country : null}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}
