import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Results from "./pages/Results/Results";
import "./styles/reset.css";
import "./styles/index.scss";
import { useState } from "react";

function App() {
    const [departureResult, setDepartureResult] = useState("");
    const [destinationResult, setDestinationResult] = useState("");
    return (
        <>
            <Routes>
                <Route path="/" element={<Home setDepartureResult={setDepartureResult} setDestinationResult={setDestinationResult} departureResult={departureResult} destinationResult={destinationResult}  />} />
                <Route path="/results" element={<Results  setDepartureResult={setDepartureResult} setDestinationResult={setDestinationResult} departureResult={departureResult} destinationResult={destinationResult} />} />
            </Routes>
        </>
    );
}

export default App;
