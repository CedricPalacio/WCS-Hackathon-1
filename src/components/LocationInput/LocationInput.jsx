import { useState } from "react";
import "./LocationInput.scss";
export default function LocationInput({ icon = "geo", placeholder, setDepartureResult, setDestinationResult }) {
    const [value, setValue] = useState("");
    const [apiResults, setApiResults] = useState([]);

    const getLocation = (value) => {
        console.log(value);
        axios.get(`https://api.geocodify.com/v2/autocomplete?api_key=${import.meta.env.VITE_APP_GEOCODIFY_API_KEY}&q=${value}`).then((response) => {
            setApiResults(response.data.predictions);
        });
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
            />

            <ul className="location-selector">
                {apiResults.map((result) => (
                    <li key={result.id}>{result.description}</li>
                ))}
            </ul>
        </div>
    );
}
