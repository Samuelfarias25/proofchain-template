import express from "express";
import multer from "multer";
import FormData from "form-data";
import axios from "axios";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const formData = new FormData();

      formData.append(
        "file",
        req.file.buffer,
        req.file.originalname
      );

      const resposta = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            ...formData.getHeaders(),
            pinata_api_key:
              process.env.PINATA_API_KEY,
            pinata_secret_api_key:
              process.env.PINATA_SECRET_KEY,
          },
        }
      );

      res.json({
        ipfsHash: resposta.data.IpfsHash,
      });

    } catch (erro) {
      console.error(erro);

      res.status(500).json({
        error: "Erro upload IPFS",
      });
    }
  }
);

export default router;