import "./Home.scss";
import SearchInputs from "../../components/SearchInputs/SearchInputs";

export default function Home({ setDepartureResult, setDestinationResult, departureResult, destinationResult }) {
    return (
        <div id="home">
            <div className="container">
                <div className="content">
                    <div className="logo-container">
                        <div className="logo">
                            <img src="/assets/logo.svg" alt="Touriosity logo" />
                        </div>
                        <p>Touriosity</p>
                    </div>
                    <h1>Découvrez. Explorez. Voyagez.</h1>
                    <h2>En route vers votre prochaine destination.</h2>
                    <SearchInputs setDepartureResult={setDepartureResult} setDestinationResult={setDestinationResult} departureResult={departureResult} destinationResult={destinationResult} />
                </div>
            </div>
        </div>
    );
}
