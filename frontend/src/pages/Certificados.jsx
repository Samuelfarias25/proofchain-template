import { useLocation, Link } from "react-router-dom";
import escher from "../assets/escher.png";

function Certificados() {
  const location = useLocation();
  const dados = location.state;

  // Função nativa do navegador para abrir a janela de salvar/imprimir em PDF
  const emitirPDF = () => {
    window.print();
  };

  // =====================================
  // SE NÃO EXISTIR CERTIFICADO
  // =====================================
  if (!dados) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundImage: `url(${escher})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
        padding: "120px 20px 40px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.85)",
          padding: "60px",
          borderRadius: "30px",
          maxWidth: "700px",
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
        }}>
          <h1 style={{ fontSize: "52px", color: "#222", marginBottom: "20px" }}>
            Nenhum certificado encontrado
          </h1>
          <p style={{ fontSize: "22px", color: "#555", lineHeight: "1.7", marginBottom: "40px" }}>
            Faça seu primeiro registro autoral utilizando Blockchain Ethereum + IPFS.
          </p>
          <Link to="/registro">
            <button style={{
              background: "#3FA36C",
              color: "white",
              border: "none",
              padding: "18px 35px",
              borderRadius: "14px",
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: "bold",
            }}>
              Registrar Obra
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // =====================================
  // CERTIFICADO EXISTE
  // =====================================
  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f4", padding: "140px 40px 60px", fontFamily: "Arial" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", background: "white", padding: "50px", borderRadius: "30px", boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}>
        <h1 style={{ fontSize: "58px", color: "#222", marginBottom: "15px" }}> Certificado Digital </h1>
        <p style={{ color: "#666", marginBottom: "50px", fontSize: "20px" }}> Registro permanente realizado em Blockchain Ethereum </p>
        
        <Info titulo="Título" valor={dados.titulo} />
        <Info titulo="Categoria" valor={dados.categoria} />
        <Info titulo="Hash IPFS" valor={dados.ipfsHash} />
        <Info titulo="Transação Blockchain" valor={dados.txHash} />
        <Info titulo="Carteira Autora" valor={dados.carteira} />
        <Info titulo="Data do Registro" valor={dados.data} />
        
        {/* Adicionada a classe 'no-print' nesta barra para ela sumir no papel do PDF */}
        <div className="no-print" style={{ marginTop: "50px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <a href={`https://gateway.pinata.cloud/ipfs/${dados.ipfsHash}`} target="_blank" rel="noreferrer">
            <button style={botaoVerde}> Ver arquivo IPFS </button>
          </a>
          
          <a href={`https://sepolia.etherscan.io/tx/${dados.txHash}`} target="_blank" rel="noreferrer">
            <button style={botaoLaranja}> Ver transação Ethereum </button>
          </a>

          {/* NOVO BOTÃO: Aciona a impressão/geração do PDF */}
          <button onClick={emitirPDF} style={botaoAzul}>
            🖨️ Gerar PDF Certificado
          </button>

          <Link to="/registro">
            <button style={botaoEscuro}> Novo Registro </button>
          </Link>
        </div>
      </div>

      {/* REGRA CSS: Esconde os botões e remove fundos cinzas automáticos na hora de imprimir */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; padding: 0 !important; }
        }
      `}</style>
    </div>
  );
}

function Info({ titulo, valor }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h3 style={{ color: "#222", marginBottom: "10px" }}> {titulo} </h3>
      <p style={{ color: "#555", wordBreak: "break-all", lineHeight: "1.7" }}> {valor} </p>
    </div>
  );
}

const botaoVerde = { background: "#2f8f57", color: "white", border: "none", padding: "16px 28px", borderRadius: "12px", cursor: "pointer", fontWeight: "bold" };
const botaoLaranja = { background: "#F28C38", color: "white", border: "none", padding: "16px 28px", borderRadius: "12px", cursor: "pointer", fontWeight: "bold" };
const botaoEscuro = { background: "#444", color: "white", border: "none", padding: "16px 28px", borderRadius: "12px", cursor: "pointer", fontWeight: "bold" };

// Novo estilo para o botão azul de PDF
const botaoAzul = { background: "#0070f3", color: "white", border: "none", padding: "16px 28px", borderRadius: "12px", cursor: "pointer", fontWeight: "bold" };

export default Certificados;
