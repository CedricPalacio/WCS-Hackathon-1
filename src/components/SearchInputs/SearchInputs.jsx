import "./SearchInputs.scss";
import LocationInput from "../LocationInput/LocationInput";

export default function SearchInputs({ setDepartureResult, setDestinationResult }) {
    return (
        <div className="search-inputs">
            <LocationInput icon="geo" placeholder="De..."  setDepartureResult={setDepartureResult} setDestinationResult={setDestinationResult} />
            <LocationInput icon="airplane" placeholder="À..." setDepartureResult={setDepartureResult} setDestinationResult={setDestinationResult} />

            <button>
                C'est parti <i className="bi bi-arrow-right" />
            </button>
        </div>
    );
}
