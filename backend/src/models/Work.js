import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema({
  titulo: String,
  categoria: String,
  nomeArquivo: String,
  tipoArquivo: String,
  ipfsHash: String,
  txHash: String,
  carteira: String,
  data: String,
});

export default mongoose.model("Work", WorkSchema);