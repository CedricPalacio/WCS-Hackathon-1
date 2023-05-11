import "./NavBar.scss";
import SearchInputs from "../SearchInputs/SearchInputs";

export default function NavBar({ setDepartureResult, setDestinationResult, departureResult, destinationResult }) {
    return (
        <nav className="nav-bar">
            <SearchInputs  departureResult={departureResult} destinationResult={destinationResult} setDepartureResult={setDepartureResult} setDestinationResult={setDestinationResult} />
        </nav>
    );
}
