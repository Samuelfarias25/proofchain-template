# 🚀 ProofChain - O Guardião da Criatividade Humana

**Desafio 1:** Hackweb Web3 (Residência TIC 29)
**Equipe:** Cartorio web3.0 Samuel Farias e Ubiracy Nobrega / TIC 29

🔗 **[Acesse o MVP Funcional aqui](https://proofchain-template.vercel.app)**
🎥 **[Link para o Vídeo Pitch](https://www.youtube.com/watch?v=CoxIy_3iSCs)**
📊 **[Link para a Apresentação de Slides](https://gamma.app/docs/Proteja-Sua-Arte-Agora-9q8xxbgtm6tgi3r?follow_on_start=true&following_id=p7qhjhdf2g3j34e&mode=doc)**

---

## 💡 O Problema
Na era da Inteligência Artificial, o roubo de propriedade intelectual leva segundos. Criadores de conteúdo (músicos, escritores, artistas) sofrem para provar que uma obra é originalmente deles. O modelo atual (cartórios físicos) é burocrático, caro, demorado e só tem validade regional. 

## 🛠️ A Solução
Criamos o **ProofChain**: um cartório 100% digital e descentralizado.
Nossa solução permite que qualquer usuário registre sua obra na blockchain Ethereum (Sepolia). O sistema gera uma identidade matemática única do arquivo via IPFS e grava essa "impressão digital" on-chain, vinculada à carteira MetaMask do autor com um carimbo de tempo inviolável.

---

## 🏗️ Arquitetura e Tecnologias

Nossa stack foi desenhada para garantir **Descentralização, Segurança e Performance**:

* **Blockchain / Smart Contracts:** Solidity, Hardhat, Sepolia Testnet.
* **Armazenamento Descentralizado:** IPFS via Pinata.
* **Backend (Engine & Relacional):** Node.js, Render, MongoDB Atlas.
* **Frontend / UX:** React, Vite, Vercel, Ethers.js.
* **Provedor de Nó:** Alchemy.

### 🔗 O que fica On-Chain e Off-Chain?
Para garantir viabilidade econômica e velocidade, dividimos a arquitetura:
* **On-Chain (Blockchain Sepolia):** Fica o registro de imutabilidade. Gravamos a Carteira do Autor (Wallet), o Título da Obra, a Categoria e o `ipfsHash`.
* **Off-Chain (IPFS/MongoDB):** O arquivo físico (a música, a imagem, o PDF) fica armazenado de forma descentralizada na rede IPFS. Os metadados de busca são espelhados no MongoDB apenas para permitir a listagem instantânea na página "Verificar Acervo" sem sobrecarregar a leitura da rede Ethereum.

---

## 📜 Smart Contract e Evidências

* **Rede:** Sepolia Testnet
* **Endereço do Contrato:** `0xC123916451Fdb0846de606A1EB7F6467e68f493d`
* **Link Etherscan:** [Ver Contrato na Sepolia](https://sepolia.etherscan.io/address/0xC123916451Fdb0846de606A1EB7F6467e68f493d)

---

## ⚙️ Como executar o projeto localmente

**1. Clone este repositório:**
```bash
git clone [https://github.com/Samuelfarias25/proofchain-template.git](https://github.com/Samuelfarias25/proofchain-template.git)
cd proofchain-template