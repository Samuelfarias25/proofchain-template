import foguete from "../assets/monalisa_logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 999,
      background: "rgba(255,255,255,0.82)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
      padding: "18px 50px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxSizing: "border-box",
    }}
    >
    {/* LOGO CLICÁVEL */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none", // Remove o sublinhado azul padrão dos links
          cursor: "pointer",
        }}
      >
        <img
          src={foguete}
          alt="ProofChain"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "contain",
          }}
        />

        <h2
          style={{
            margin: 0,
            color: "#222", // A sua cor preta continua aqui
          }}
        >
          ProofChain
        </h2>
      </Link>

      {/* MENU */}
      <div style={{ display: "flex", gap: "25px", alignItems: "center", flexWrap: "wrap" }}>
        <Link style={linkStyle} to="/"> Home </Link>
        <Link style={linkStyle} to="/sobre"> Sobre </Link>
        <Link style={linkStyle} to="/registro"> Registro </Link>
       
        {/* NOVO LINK: Integrado perfeitamente no mesmo padrão */}
        <Link style={linkStyle} to="/acervo"> Verificar Acervo </Link>

      </div>
    </div>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#444",
  fontWeight: "bold",
  fontSize: "16px",
};

export default Navbar;
