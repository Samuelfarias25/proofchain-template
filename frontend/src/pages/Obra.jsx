import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Obra() {
  const { hash } = useParams();

  const [obra, setObra] = useState(null);

  useEffect(() => {
    buscarObra();
  }, []);

  const buscarObra = async () => {
    try {
      const resposta = await axios.get(
        "https://api-proofchain.onrender.com/works"
      );

      const encontrada = resposta.data.find(
        (item) => item.ipfsHash === hash
      );

      console.log("OBRA:", encontrada);

      setObra(encontrada);
    } catch (erro) {
      console.log(erro);
    }
  };

  if (!obra) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
        }}
      >
        Carregando obra...
      </div>
    );
  }

  const urlArquivo = `https://gateway.pinata.cloud/ipfs/${obra.ipfsHash}`;

  const ehImagem =
    obra.tipoArquivo?.includes("image") ||
    obra.categoria === "Arte Visual";

  const ehAudio =
    obra.tipoArquivo?.includes("audio") ||
    obra.categoria === "Música";

  const ehVideo =
    obra.tipoArquivo?.includes("video") ||
    obra.categoria === "Cinema";

  const ehPDF =
    obra.tipoArquivo?.includes("pdf") ||
    obra.categoria === "Literatura";

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#111827,#1f2937,#374151)",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          background: "white",
          borderRadius: "25px",
          padding: "40px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            color: "#222",
          }}
        >
          {obra.titulo}
        </h1>

        <p>
          <strong>Categoria:</strong> {obra.categoria}
        </p>

        <p>
          <strong>Autor:</strong> {obra.carteira}
        </p>

        <p>
          <strong>Registrado em:</strong> {obra.data}
        </p>

        <p
          style={{
            wordBreak: "break-all",
            fontSize: "13px",
            color: "#666",
          }}
        >
          <strong>IPFS:</strong> {obra.ipfsHash}
        </p>

        <hr
          style={{
            margin: "30px 0",
          }}
        />

        {/* IMAGEM */}
        {ehImagem && (
          <div>
            <h2>🖼️ Obra Visual</h2>

            <img
              src={urlArquivo}
              alt={obra.titulo}
              style={{
                width: "100%",
                maxHeight: "800px",
                objectFit: "contain",
                borderRadius: "20px",
                background: "#f5f5f5",
                padding: "10px",
              }}
            />
          </div>
        )}

        {/* ÁUDIO */}
        {ehAudio && (
          <div>
            <h2>🎵 Reprodução da Música</h2>

            <audio
              controls
              style={{
                width: "100%",
                marginTop: "20px",
              }}
            >
              <source src={urlArquivo} />
            </audio>
          </div>
        )}

        {/* VÍDEO */}
        {ehVideo && (
          <div>
            <h2>🎬 Reprodução do Vídeo</h2>

            <video
              controls
              style={{
                width: "100%",
                borderRadius: "20px",
                marginTop: "20px",
              }}
            >
              <source src={urlArquivo} />
            </video>
          </div>
        )}

        {/* PDF */}
        {ehPDF && (
          <div>
            <h2>📄 Documento</h2>

            <iframe
              title="PDF"
              src={urlArquivo}
              width="100%"
              height="900"
              style={{
                border: "none",
                borderRadius: "15px",
                marginTop: "20px",
              }}
            />
          </div>
        )}

        {/* OUTROS */}
        {!ehImagem &&
          !ehAudio &&
          !ehVideo &&
          !ehPDF && (
            <div
              style={{
                background: "#f5f5f5",
                padding: "25px",
                borderRadius: "15px",
              }}
            >
              <h2>📦 Arquivo armazenado</h2>

              <p>
                Este formato ainda não possui
                visualização integrada.
              </p>

              <a
                href={urlArquivo}
                target="_blank"
                rel="noreferrer"
              >
                Abrir arquivo
              </a>
            </div>
          )}

        <hr
          style={{
            marginTop: "40px",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <a
            href={urlArquivo}
            target="_blank"
            rel="noreferrer"
          >
            <button
              style={{
                background: "#2e8b57",
                color: "white",
                border: "none",
                padding: "14px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Abrir Original no IPFS
            </button>
          </a>

          <a
            href={`https://sepolia.etherscan.io/tx/${obra.txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            <button
              style={{
                background: "#ff8c42",
                color: "white",
                border: "none",
                padding: "14px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Ver Transação Blockchain
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Obra;