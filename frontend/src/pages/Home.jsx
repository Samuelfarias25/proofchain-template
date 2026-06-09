import { Link } from "react-router-dom";
import fundoArte from "../assets/michangelo.png";
import Navbar from "../components/Navbar";
import foguete from "../assets/monalisa_logo.png";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${fundoArte})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Arial",
      }}
    >
      {/* NAVBAR */}
      <Navbar />

      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(1px)",
        }}
      />

      {/* CONTEÚDO */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "140px 60px 60px 60px",
        }}
      >
        {/* HERO */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "50px",
    flexWrap: "wrap",
  }}
>
  {/* TEXTO */}
  <div
    style={{
      flex: 1,
      minWidth: "350px",
      maxWidth: "850px",
    }}
  >
    <h1
      style={{
        fontSize: "72px",
        color: "#1d1d1d",
        marginBottom: "20px",
        lineHeight: "1",
      }}
    >
      ProofChain
    </h1>

    <p
      style={{
        fontSize: "28px",
        color: "#444",
        lineHeight: "1.6",
        maxWidth: "700px",
      }}
    >
      Protegendo a criatividade humana na era da Inteligência Artificial.
    </p>

    {/* BOTÕES */}
    <div
      style={{
        marginTop: "50px",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <Link to="/registro">
        <button
          style={{
            background: "#3FA36C",
            color: "white",
            border: "none",
            padding: "18px 34px",
            borderRadius: "14px",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 5px 20px rgba(0,0,0,0.12)",
          }}
        >
          Registrar Obra
        </button>
      </Link>

      <Link to="/sobre">
        <button
          style={{
            background: "#F28C38",
            color: "white",
            border: "none",
            padding: "18px 34px",
            borderRadius: "14px",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 5px 20px rgba(0,0,0,0.12)",
          }}
        >
          Saiba Mais
        </button>
      </Link>
    </div>
  </div>

  {/* MASCOTE */}
  <div
    style={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      minWidth: "300px",
    }}
  >
    <img
      src={foguete}
      alt="ProofChain"
      style={{
        width: "500px",
        maxWidth: "100%",
        animation: "flutuar 4s ease-in-out infinite",
        filter:
          "drop-shadow(0 15px 30px rgba(0,0,0,0.20))",
      }}
    />
  </div>
</div>

        {/* CARDS */}
        <div
          style={{
            marginTop: "90px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "25px",
          }}
        >
          <div style={cardStyle}>
            <h2>🎵 Música</h2>

            <p>
              Proteja composições, demos e produções autorais.
            </p>
          </div>

          <div style={cardStyle}>
            <h2>🎬 Cinema</h2>

            <p>
              Roteiros, curtas, ideias visuais e projetos audiovisuais.
            </p>
          </div>

          <div style={cardStyle}>
            <h2>🎨 Artes</h2>

            <p>
              Pinturas, ilustrações e obras criativas digitais.
            </p>
          </div>

          <div style={cardStyle}>
            <h2>📚 Literatura</h2>

            <p>
              Livros, poemas, artigos e escrita autoral.
            </p>
          </div>
        </div>
      </div>
<style>
  {`
    @keyframes flutuar {
      0% {
        transform: translateY(0px);
      }

      50% {
        transform: translateY(-18px);
      }

      100% {
        transform: translateY(0px);
      }
    }
  `}
</style>
    </div>
  );
}

const cardStyle = {
  background: "rgba(255,255,255,0.82)",
  backdropFilter: "blur(8px)",
  padding: "30px",
  borderRadius: "24px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  transition: "0.3s",
  color: "#222",
};

export default Home;