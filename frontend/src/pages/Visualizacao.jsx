import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Visualizacao() {
  const [todosRegistros, setTodosRegistros] = useState([]);
  const [arquivoChecar, setArquivoChecar] = useState(null);
  const [statusChecagem, setStatusChecagem] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [analisando, setAnalisando] = useState(false);

  // Busca todos os documentos salvos no MongoDB Atlas assim que a tela abre
  useEffect(() => {
    buscarRegistrosDoBanco();
  }, []);

  const buscarRegistrosDoBanco = async () => {
    try {
      const resposta = await axios.get("https://api-proofchain.onrender.com/works");
      if (Array.isArray(resposta.data)) {
        setTodosRegistros(resposta.data);
      } else if (resposta.data && Array.isArray(resposta.data.works)) {
        setTodosRegistros(resposta.data.works);
      } else {
        setTodosRegistros([]);
      }
    } catch (erro) {
      console.error("Erro ao ler dados da API:", erro);
    } finally {
      setCarregando(false);
    }
  };

  // Lógica de Verificação Real Criptográfica por Hash IPFS
  const checarSeJaFoiRegistrado = async () => {
    if (!arquivoChecar) {
      alert("Por favor, selecione um arquivo para verificar.");
      return;
    }

    setAnalisando(true);
    setStatusChecagem(null);

    const formData = new FormData();
    formData.append("file", arquivoChecar);

    try {
      const resposta = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
          headers: {
            pinata_api_key: "20b54d76ae093151a28a",
            pinata_secret_api_key: "8c156576bf2c154435e64b15421eda526d1d6e3f7d142c3729b5e0ee45f126b0" 
          }
        }
      );

      const hashDoArquivoSubido = resposta.data.IpfsHash;

      // Compara o Hash gerado com a lista de hashes gravados no MongoDB Atlas
      const obraEncontrada = todosRegistros.find(
        (obra) => obra.ipfsHash === hashDoArquivoSubido
      );

      if (obraEncontrada) {
        setStatusChecagem({
          status: "REGISTRADO",
          dados: obraEncontrada,
        });
      } else {
        setStatusChecagem({
          status: "LIVRE",
          nome: arquivoChecar.name,
          hash: hashDoArquivoSubido
        });
      }
    } catch (erro) {
      console.error("Erro detalhado da Pinata na verificação:", erro.response?.data || erro.message);
      alert("Erro ao processar a identidade criptográfica do arquivo. Verifique se suas chaves estão corretas.");
    } finally {
      setAnalisando(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", padding: "120px 40px 40px", fontFamily: "Arial", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ color: "#222", marginBottom: "10px" }}>Monitoramento de Acervo Web3</h1>
        <p style={{ color: "#666", marginBottom: "40px" }}>Consulte e valide a integridade de obras registradas no MongoDB Atlas</p>

        {/* 1. SEÇÃO: ABA DE VERIFICAÇÃO */}
        <div style={{ background: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", marginBottom: "40px" }}>
          <h3 style={{ margin: "0 0 10px 0" }}>🔍 Aba de Verificação de Autenticidade</h3>
          <p style={{ color: "#777", fontSize: "14px", marginBottom: "20px" }}>Suba um arquivo local para checar instantaneamente se ele já possui registro de propriedade intelectual.</p>
          
          <div style={{ display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap" }}>
            <input 
              type="file" 
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setArquivoChecar(e.target.files[0]);
                }
              }} 
              disabled={analisando} 
              style={{ padding: "10px", background: "#f1f3f5", borderRadius: "8px" }} 
            />
            <button 
              onClick={checarSeJaFoiRegistrado} 
              disabled={analisando || !arquivoChecar} 
              style={{ 
                background: "#2e8b57", 
                color: "white", 
                border: "none", 
                padding: "12px 24px", 
                borderRadius: "10px", 
                fontWeight: "bold", 
                cursor: (analisando || !arquivoChecar) ? "not-allowed" : "pointer", 
                opacity: (analisando || !arquivoChecar) ? 0.7 : 1 
              }}
            >
              {analisando ? "Analisando Criptografia..." : "Verificar Situação da Obra"}
            </button>
          </div>

          {/* CAIXA DE RESULTADOS DA CHECAGEM */}
          {statusChecagem && (
            <div style={{ marginTop: "25px", padding: "20px", borderRadius: "12px", background: statusChecagem.status === "REGISTRADO" ? "#e6f7ed" : "#fff1f0", border: statusChecagem.status === "REGISTRADO" ? "1px solid #b7ebc1" : "1px solid #ffa39e" }}>
              {statusChecagem.status === "REGISTRADO" ? (
                <div>
                  <strong style={{ color: "#2e8b57", fontSize: "18px" }}>✓ OBRA AUTÊNTICA ENCONTRADA INTEGRADA À REDE!</strong>
                  <p style={{ marginTop: "10px", margin: "5px 0" }}><strong>Título Identificado:</strong> {statusChecagem.dados.titulo}</p>
                  <p style={{ margin: "5px 0" }}><strong>Categoria da Mídia:</strong> {statusChecagem.dados.categoria}</p>
                  <p style={{ margin: "5px 0", fontSize: "12px", wordBreak: "break-all" }}><strong>Assinatura do Autor (Wallet):</strong> {statusChecagem.dados.carteira}</p>
                  <p style={{ margin: "5px 0", fontSize: "13px" }}><strong>Código IPFS Hash (ID de Autenticidade):</strong> <code style={{ color: "#2e8b57", fontWeight: "bold" }}>{statusChecagem.dados.ipfsHash}</code></p>
                  <p style={{ margin: "5px 0", fontSize: "13px" }}><strong>Data do Selo Cronológico:</strong> {statusChecagem.dados.data}</p>
                </div>
              ) : (
                <div>
                  <strong style={{ color: "#e53e3e", fontSize: "18px" }}>✕ OBRA NÃO REGISTRADA!</strong>
                  <p style={{ marginTop: "10px", color: "#555" }}>O arquivo selecionado (<u>{statusChecagem.nome}</u>) está inteiramente livre de direitos autorais registrados neste contrato inteligente.</p>
                  <p style={{ fontSize: "11px", color: "gray", wordBreak: "break-all", marginTop: "5px" }}>Hash Calculado: {statusChecagem.hash}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2. SEÇÃO: EXIBIÇÃO DE TODOS OS REGISTROS */}
        <div style={{ background: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: "0 0 20px 0" }}>📋 Registros Armazenados no Banco de Dados</h3>
          {carregando ? (
            <p style={{ color: "#666" }}>Carregando dados do MongoDB Atlas...</p>
          ) : todosRegistros.length === 0 ? (
            <p style={{ color: "#999" }}>Nenhum registro encontrado no banco de dados.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#f1f3f5", borderBottom: "2px solid #ddd" }}>
                    <th style={{ padding: "12px" }}>Título</th>
                    <th style={{ padding: "12px" }}>Categoria</th>
                    <th style={{ padding: "12px" }}>Carteira Autora</th>
                    <th style={{ padding: "12px" }}>Data do Registro</th>
                    <th style={{ padding: "12px" }}>Links de Auditoria</th>
                  </tr>
                </thead>
                <tbody>
                  {todosRegistros.map((item, index) => {
                    return (
                      <tr key={item._id || index} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "12px", fontWeight: "bold" }}>{item.titulo}</td>
                        <td style={{ padding: "12px" }}><span style={{ background: "#eef4ff", color: "#3366cc", padding: "4px 8px", borderRadius: "6px", fontSize: "12px" }}>{item.categoria}</span></td>
                        <td style={{ padding: "12px", fontSize: "12px", fontFamily: "monospace" }}>{item.carteira ? `${item.carteira.substring(0, 8)}...${item.carteira.substring(item.carteira.length - 6)}` : ""}</td>
                        <td style={{ padding: "12px", fontSize: "13px" }}>{item.data}</td>
                        <td style={{ padding: "12px" }}>
                        <div style={{ display: "flex", gap: "10px" }}>
  
  <Link to={`/obra/${item.ipfsHash}`}>
    <button style={botaoVerde}>
      Ver arquivo IPFS
    </button>
  </Link>

  <a
    href={`https://sepolia.etherscan.io/tx/${item.txHash}`}
    target="_blank"
    rel="noreferrer"
  >
    <button style={botaoLaranja}>
      Ver transação Ethereum
    </button>
  </a>
</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
const botaoVerde = {
  background: "#2e8b57",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const botaoLaranja = {
  background: "#ff8c42",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
export default Visualizacao;
// Configuração de estilos idênticos ao do seu arquivo Certificados.jsx
