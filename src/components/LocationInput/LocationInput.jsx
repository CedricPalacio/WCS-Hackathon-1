import { useState } from "react";

import axios from "axios";
import "./LocationInput.scss";
export default function LocationInput({
  icon = "geo",
  placeholder,
  setResult,
}) {
  const [value, setValue] = useState("");
  const [apiResults, setApiResults] = useState([]);
  const [areAPIResultsVisible, setAreAPIResultsVisible] = useState(false);

  function handleInputBlur(event) {
    setTimeout(() => {
      setAreAPIResultsVisible(false);
    }, 500);
  }

  const getLocation = (value) => {
    if (value.length >= 3) {
      setAreAPIResultsVisible(true);
      axios
        .get(
          `https://api.geocodify.com/v2/autocomplete?api_key=${
            import.meta.env.VITE_APP_GEOCODIFY_API_KEY
          }&q=${value}`
        )
        .then((response) => {
          setApiResults(response.data.response.features.splice(0, 3));
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
        onBlur={handleInputBlur}
      />
      {areAPIResultsVisible ? (
        <ul className="location-selector">
          {apiResults.map((result) => (
            <li
              key={result.properties.id}
              onClick={() => {
                const { locality, region, macroregion, country } =
                  result.properties;
                setResult({
                  coordinates: result.geometry.coordinates.reverse(),
                  city: {
                    name: locality,
                    departement: region,
                    region: macroregion,
                    country: country,
                  },
                });

                setValue(
                  `${locality || ""}${locality && region ? ", " : ""}${
                    region || ""
                  }${(locality || region) && country ? ", " : ""}${
                    country || ""
                  }`
                );

                setAreAPIResultsVisible(false);
              }}>
              {result.properties.locality
                ? `${result.properties.locality}, `
                : ""}
              {result.properties.region ? `${result.properties.region}, ` : ""}
              {result.properties.country ? result.properties.country : ""}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
