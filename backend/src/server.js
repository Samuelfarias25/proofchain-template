import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";

import workRoutes from "./routes/works.js";
import uploadRoute from "./routes/upload.js";

dns.setDefaultResultOrder("ipv4first");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(uploadRoute);

app.use("/works", workRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas conectado!");
  })
  .catch((erro) => {
    console.log(erro);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});