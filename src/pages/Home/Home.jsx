import "./Home.scss";
import SearchInputs from "../../components/SearchInputs/SearchInputs";

export default function Home({ setDepartureResult, setDestinationResult, departureResult, destinationResult }) {
    return (
        <div id="home">
            <div className="container">
                <div className="content">
                    <h1>En route pour un premier aperçu de votre prochaine destination.</h1>
                    <SearchInputs setDepartureResult={setDepartureResult} setDestinationResult={setDestinationResult} departureResult={departureResult} destinationResult={destinationResult} />
                </div>
            </div>
        </div>
    );
}
