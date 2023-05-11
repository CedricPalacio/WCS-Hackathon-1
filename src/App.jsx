import "./styles/reset.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/Results" element={<Results />} />
    </>
  );
}

export default App;
