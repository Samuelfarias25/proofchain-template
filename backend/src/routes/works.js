import express from "express";
import Work from "../models/Work.js";

const router = express.Router();

// 1. MANTIDO (POST): Continua salvando os dados vindos do formulário de Registro
router.post("/", async (req, res) => {
  try {
    const novaWork = new Work(req.body);
    await novaWork.save();
    res.status(201).json({ message: "Registro salvo!" });
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ error: "Erro ao salvar" });
  }
});

// 2. REVISADO (GET): Busca todos os registros e padroniza as variáveis Web3
router.get("/", async (req, res) => {
  try {
    const todasObras = await Work.find();
    
    // Mapeia os dados limpando conflitos de letras maiúsculas/minúsculas vindas do banco
    const obrasFormatadas = todasObras.map((obra) => {
      const obraObj = obra.toObject();
      
      return {
        _id: obraObj._id,
        titulo: obraObj.titulo || "Sem título",
        categoria: obraObj.categoria || "Sem categoria",
        carteira: obraObj.carteira || "",
        data: obraObj.data || "",
        // Blindagem criptográfica: aceita o campo em caixa alta ou baixa e padroniza
        ipfsHash: obraObj.ipfsHash || obraObj.ipfshash || "",
        txHash: obraObj.txHash || obraObj.txhash || ""
      };
    });

    // Envia a lista tratada e perfeita para o Front-end React
    res.status(200).json(obrasFormatadas);
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ error: "Erro ao buscar os registros do banco" });
  }
});

export default router;
