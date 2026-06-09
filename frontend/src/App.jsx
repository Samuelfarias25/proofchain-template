import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Registro from "./pages/Registro";
import Certificados from "./pages/Certificados";
import Visualizacao from "./pages/Visualizacao";
import Obra from "./pages/Obra";


function App() {
  return (
    <BrowserRouter>
      {/* MENU FIXO */}
      <Navbar />

      {/* ROTAS */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/certificados" element={<Certificados />} />
        <Route path="/acervo" element={<Visualizacao />} />
        <Route path="/obra/:hash" element={<Obra />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;