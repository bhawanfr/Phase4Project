import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Pokemon from "./Pokemon";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/details/:pokemonName" element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  );
}

