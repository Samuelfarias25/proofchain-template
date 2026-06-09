import fundoMonet from "../assets/monet.png";
import foguete from "../assets/monalisa_logo.png";
function Sobre() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${fundoMonet})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(0,0,0,0.10)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Arial",
      }}
    >
      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.35)",
          backdropFilter: "blur(3px)",
        }}
      />

      {/* CONTEÚDO */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "140px 40px 80px",
          maxWidth: "1200px",
          margin: "0 auto",
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
    marginBottom: "80px",
  }}
>
  {/* TEXTO */}
  <div
    style={{
      flex: 1,
      minWidth: "350px",
    }}
  >
    <div
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(10px)",
        padding: "45px",
        borderRadius: "30px",
        boxShadow: "0 10px 35px rgba(0,0,0,0.10)",
      }}
    >
      <h1
        style={{
          fontSize: "82px",
          fontWeight: "900",
          color: "#1d1d1d",
          marginBottom: "25px",
          lineHeight: "1",
          textShadow: "0 3px 15px rgba(0,0,0,0.12)",
        }}
      >
        Sobre o ProofChain
      </h1>

      <p
        style={{
          fontSize: "24px",
          color: "#333",
          lineHeight: "1.9",
          fontWeight: "500",
        }}
      >
        Uma plataforma de registro autoral digital baseada em Blockchain
        Ethereum e armazenamento descentralizado IPFS.
      </p>
    </div>
  </div>

  {/* IMAGEM */}
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
          "drop-shadow(0 20px 40px rgba(0,0,0,0.20))",
      }}
    />
  </div>
</div>

        {/* CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px",
          }}
        >
          <div style={cardStyle}>
            <h2 style={tituloCard}>🔒 Imutabilidade</h2>

            <p style={textoCard}>
              Cada registro realizado no ProofChain é armazenado
              permanentemente na Blockchain Ethereum, garantindo
              integridade e impossibilidade de alteração futura.
            </p>
          </div>

          <div style={cardStyle}>
            <h2 style={tituloCard}>🌎 Transparência</h2>

            <p style={textoCard}>
              Todas as transações podem ser auditadas publicamente
              através do Etherscan, permitindo rastreabilidade e
              confiança total sobre a autoria registrada.
            </p>
          </div>

          <div style={cardStyle}>
            <h2 style={tituloCard}>🎨 Proteção Criativa</h2>

            <p style={textoCard}>
              O sistema foi desenvolvido para artistas, músicos,
              escritores, cineastas e criadores digitais que desejam
              proteger suas obras na era da Inteligência Artificial.
            </p>
          </div>

          <div style={cardStyle}>
            <h2 style={tituloCard}>☁️ IPFS</h2>

            <p style={textoCard}>
              Os arquivos são armazenados de forma descentralizada
              utilizando IPFS + Pinata, garantindo persistência,
              disponibilidade e autenticidade do conteúdo original.
            </p>
          </div>

          <div style={cardStyle}>
            <h2 style={tituloCard}>⚡ MVP Blockchain</h2>

            <p style={textoCard}>
              Este projeto demonstra como Blockchain pode resolver
              problemas reais relacionados à autenticidade,
              rastreabilidade e confiança digital.
            </p>
          </div>

          <div style={cardStyle}>
            <h2 style={tituloCard}>🚀 Futuro</h2>

            <p style={textoCard}>
              O próximo passo do ProofChain é integrar banco de dados,
              certificados PDF, dashboard de usuários e verificação
              automatizada de registros autorais.
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
  backdropFilter: "blur(12px)",
  padding: "35px",
  borderRadius: "26px",
  boxShadow: "0 12px 35px rgba(0,0,0,0.10)",
  transition: "0.3s",
  cursor: "pointer",
};

const tituloCard = {
  fontSize: "30px",
  fontWeight: "700",
  color: "#222",
  marginBottom: "20px",
};

const textoCard = {
  color: "#444",
  lineHeight: "1.9",
  fontSize: "17px",
};

export default Sobre;