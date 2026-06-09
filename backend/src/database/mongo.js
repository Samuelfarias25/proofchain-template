import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const conectarMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Atlas conectado com sucesso!");
  } catch (erro) {
    console.log("Erro MongoDB:");
    console.log(erro);

    process.exit(1);
  }
};

export default conectarMongo;