import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Results from "./pages/Results/Results";
import "./styles/reset.css";
import "./styles/index.scss";
import { useState } from "react";

function App() {
    const [departureResult, setDepartureResult] = useState([]);
    const [destinationResult, setDestinationResult] = useState([]);
    console.log(departureResult);
    console.log(destinationResult);
    return (
        <>
            <Routes>
                <Route path="/" element={<Home setDepartureResult={setDepartureResult} setDestinationResult={setDestinationResult} />} />
                <Route path="/Results" element={<Results />} />
            </Routes>
        </>
    );
}

export default App;
