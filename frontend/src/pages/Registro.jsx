import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import fundoArte from "../assets/artes.png";
import foguete from "../assets/monalisa-foguete.png";

function Registro() {
  const navigate = useNavigate();
  const [arquivo, setArquivo] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusTexto, setStatusTexto] = useState("");
  const [progresso, setProgresso] = useState(0);
  
 

  const CONTRATO_ENDERECO = "0xC123916451Fdb0846de606A1EB7F6467e68f493d";
  const CONTRATO_ABI = [
    "function registerWork(address to, string memory title, string memory category, string memory ipfsHash) public returns (uint256)"
  ];

  const selecionarArquivo = (e) => {
    if (e.target.files && e.target.files[0]) {
      setArquivo(e.target.files[0]);
    }
  };

  const executarProofChain = async () => {
    if (!arquivo || !titulo || !categoria) {
      alert("Preencha todos os campos.");
      return;
    }
    if (!window.ethereum) {
      alert("MetaMask não encontrada.");
      return;
    }

    setLoading(true);
    try {
      // =========================
      // IPFS
      // =========================
      setStatusTexto("Enviando arquivo para IPFS...");
      setProgresso(20);
      const formData = new FormData();
      formData.append("file", arquivo);

      const resposta = await axios.post(
    "https://api-proofchain.onrender.com/upload",
    formData
  );


      const hashGerado = resposta.data.ipfsHash;
  // =========================
// VERIFICAÇÃO DE DUPLICIDADE
// =========================

setStatusTexto("Verificando autenticidade...");
setProgresso(35);

const consulta = await axios.get(
  "https://api-proofchain.onrender.com/works"
);

const registros = Array.isArray(consulta.data)
  ? consulta.data
  : [];

const obraExistente = registros.find(
  (item) => item.ipfsHash === hashGerado
);

if (obraExistente) {
  alert(`
 ESTA OBRA JÁ FOI REGISTRADA!

Título: ${obraExistente.titulo}

Categoria: ${obraExistente.categoria}

Data: ${obraExistente.data}

Autor: ${obraExistente.carteira}

Por favor registre uma nova obra.
  `);

  setLoading(false);
  return;
}

      setIpfsHash(hashGerado);
      setStatusTexto("Arquivo salvo no IPFS.");
      setProgresso(45);

      // =========================
      // METAMASK
      // =========================
      setStatusTexto("Conectando MetaMask...");
      setProgresso(60);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const wallet = await signer.getAddress();
      const contrato = new ethers.Contract(
        CONTRATO_ENDERECO,
        CONTRATO_ABI,
        signer
      );

      // =========================
      // BLOCKCHAIN
      // =========================
      setStatusTexto("Minerando NFT na Ethereum...");
      setProgresso(80);
      const tx = await contrato.registerWork(
        wallet,
        titulo,
        categoria,
        hashGerado
      );

      setStatusTexto("Transação enviada para blockchain...");
      setProgresso(90);
      const receipt = await tx.wait();

      // SALVAR NO MONGODB
      await axios.post("https://api-proofchain.onrender.com/works", {
        titulo,
        categoria,
        ipfsHash: hashGerado,
        txHash: receipt.hash,
        carteira: wallet,
        data: new Date().toLocaleString(),
        tipoArquivo: arquivo.type,
        nomeArquivo: arquivo.name,
      });

      // SUCESSO
      setTxHash(receipt.hash);
      setStatusTexto("NFT registrado com sucesso!");
      setProgresso(100);

     // Limpar formulário
setTitulo("");
setCategoria("");
setArquivo(null);

// limpar input file visualmente
document.getElementById("upload").value = "";

setIpfsHash("");
setTxHash("");

      await new Promise((resolve) => setTimeout(resolve, 2500));
      
      navigate("/certificados", {
        state: {
          titulo,
          categoria,
          ipfsHash: hashGerado,
          txHash: receipt.hash,
          carteira: wallet,
          data: new Date().toLocaleString(),
        },
      });
    } catch (erro) {
      console.error("Erro completo capturado no Frontend:", erro);
      alert(`Erro no registro: ${erro.response?.data?.error || erro.message}`);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "30px", backgroundImage: `url(${fundoArte})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }} >
      
      {/* OVERLAY */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.25)", backdropFilter: "blur(2px)" }} />
      
      {/* CARD */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "650px", background: "rgba(255,255,255,0.80)", borderRadius: "25px", padding: "40px", boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }} >
        
        {/* TOPO */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "10px" }} >
          <div>
            <h1 style={{ margin: 0, fontSize: "42px", color: "#222" }}> ProofChain </h1>
            <p style={{ color: "#666", marginTop: "10px" }}> Registro digital permanente de autoria. </p>
          </div>
          <button onClick={() => navigate("/")} style={{ background: "#ff8c42", border: "none", color: "white", padding: "12px 18px", borderRadius: "12px", cursor: "pointer", fontWeight: "bold" }} >
            ← Voltar
          </button>
        </div>

        {/* INPUT */}
        <label>Título da obra</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex: Minha Música" style={{ width: "100%", padding: "15px", marginTop: "10px", marginBottom: "25px", borderRadius: "12px", border: "1px solid #ddd", fontSize: "15px" }} />

        {/* SELECT */}
        <label>Categoria</label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} style={{ width: "100%", padding: "15px", marginTop: "10px", marginBottom: "25px", borderRadius: "12px", border: "1px solid #ddd", fontSize: "15px" }} >
          <option value="">Selecione</option>
          <option value="Música">Música</option>
          <option value="Arte Visual">Arte Visual</option> 
          <option value="Cinema">Cinema</option>
          <option value="Literatura">Literatura</option>
        </select>

        {/* FILE */}
        <label>Arquivo</label>
        <div style={{ marginTop: "10px", marginBottom: "25px" }} >
          <input type="file" id="upload" onChange={selecionarArquivo} style={{ display: "none" }} />
          <label htmlFor="upload" style={{ background: "#2e8b57", color: "white", padding: "14px 22px", borderRadius: "12px", cursor: "pointer", display: "inline-block", fontWeight: "bold" }} >
            Escolher arquivo
          </label>
          <span
  style={{
    marginLeft: "15px",
    color: arquivo ? "#2e8b57" : "#666",
    fontWeight: arquivo ? "bold" : "normal",
  }}
>
  {arquivo
    ? `✓ ${arquivo.name}`
    : "Nenhum arquivo escolhido"}
</span>
        </div>

        {/* BOTÃO */}
        <button onClick={executarProofChain} disabled={loading} style={{ width: "100%", background: "#ff8c42", color: "white", border: "none", padding: "18px", borderRadius: "14px", fontSize: "17px", fontWeight: "bold", cursor: "pointer" }} >
          {loading ? "Processando..." : "Registrar na Blockchain"}
        </button>
        
        {/* AVISO REDE SEPOLIA */}
          <div
            style={{
              marginTop: "20px",
              padding: "14px 18px",
              background: "rgba(242, 140, 56, 0.12)", // Fundo laranja super transparente
              border: "1px solid rgba(242, 140, 56, 0.3)", // Borda gslaranja suave
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#000000", // teste na fonte com cor preta-
              fontSize: "14px",
              fontWeight: "500",
              textAlign: "left",
              backdropFilter: "blur(5px)",
            }}
          >
            <span style={{ fontSize: "22px" }}>🦊</span>
            <p style={{ margin: 0, lineHeight: "1.5" }}>
              <strong>Atenção:</strong> Certifique-se de que a sua carteira MetaMask está conectada à rede de testes <strong>Sepolia</strong> para realizar o registro.
            </p>
          </div>

        {/* RESULTADOS */}
        {ipfsHash && (
          <div style={{ background: "#e6f7ed", padding: "18px", borderRadius: "15px", marginTop: "25px" }} >
            <strong style={{ color: "#2e8b57" }}> ✓ Upload realizado no IPFS </strong>
            <p style={{ wordBreak: "break-all", marginTop: "10px" }}> {ipfsHash} </p>
          </div>
        )}

        {txHash && (
          <div style={{ background: "#eef4ff", padding: "18px", borderRadius: "15px", marginTop: "20px" }} >
            <strong style={{ color: "#3366cc" }}> ✓ NFT registrado </strong>
            <p style={{ wordBreak: "break-all", marginTop: "10px" }}> {txHash} </p>
          </div>
        )}
      </div>

      {/* TELA DE MINERAÇÃO CORRIGIDA COM VISÃO DA PLATAFORMA ATRÁS */}
      {loading && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(255, 255, 255, 0.45)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "30px", textAlign: "center" }} >
          <img src={foguete} alt="Minerando" style={{ width: "320px", maxWidth: "90%", animation: "voar 0.8s infinite alternate ease-in-out" }} />
          <h2 style={{ marginTop: "25px", fontSize: "36px", color: "#222", textShadow: "0 2px 10px rgba(255,255,255,0.8)" }}> Minerando NFT... </h2>
          <p style={{ color: "#111", marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}> {statusTexto} </p>
          
          {/* BARRA */}
          <div style={{ width: "80%", maxWidth: "500px", height: "22px", background: "rgba(0,0,0,0.1)", borderRadius: "30px", overflow: "hidden", marginTop: "35px", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)" }} >
            <div style={{ width: `${progresso}%`, height: "100%", background: "linear-gradient(90deg,#2e8b57,#ffb347,#ff8c42)", transition: "1s" }} />
          </div>
          <p style={{ marginTop: "15px", fontWeight: "bold", color: "#111", fontSize: "20px" }}> {progresso}% </p>
        </div>
      )}

      {/* ANIMAÇÃO */}
      <style>
        {`
          @keyframes voar {
            from { transform: translateY(0px) rotate(-2deg); }
            to { transform: translateY(-12px) rotate(2deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Registro;
    