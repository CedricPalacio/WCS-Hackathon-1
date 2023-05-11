import "./SearchInputs.scss";
import LocationInput from "../LocationInput/LocationInput";

export default function SearchInputs({ setDepartureResult, setDestinationResult }) {
    return (
        <div className="search-inputs">
            <LocationInput icon="geo" placeholder="De..." setResult={setDepartureResult} />
            <LocationInput icon="airplane" placeholder="À..." setResult={setDestinationResult} />

            <button>
                C'est parti <i className="bi bi-arrow-right" />
            </button>
        </div>
    );
}
