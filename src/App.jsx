import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Results from "./pages/Results/Results";
import "./styles/reset.css";
import "./styles/index.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Results" element={<Results />} />
      </Routes>
    </>
  );
}

export default App;
