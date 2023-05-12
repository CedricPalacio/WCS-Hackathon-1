import "./NavBar.scss";
import SearchInputs from "../SearchInputs/SearchInputs";
import { Link } from "react-router-dom";

export default function NavBar({ setDepartureResult, setDestinationResult, departureResult, destinationResult }) {
    return (
        <nav className="nav-bar">
            <div className="nav-container">
                <Link to={`/`} className="logo-container">
                    <div className="logo">
                        <img src="/assets/logo.svg" alt="Touriosity logo" />
                    </div>
                    <p>Touriosity</p>
                </Link>
                <SearchInputs departureResult={departureResult} destinationResult={destinationResult} setDepartureResult={setDepartureResult} setDestinationResult={setDestinationResult} />
            </div>
        </nav>
    );
}
