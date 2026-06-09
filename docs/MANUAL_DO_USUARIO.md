# 📖 Manual do Usuário - ProofChain

Este documento fornece as instruções passo a passo e as evidências de funcionamento do MVP **ProofChain**, desenvolvido para o Hackweb Web3.

---

## 🎥 Vídeo de Demonstração (Fluxo)
Assista ao nosso vídeo completo demonstrando o problema, a solução e o registro real de uma obra na blockchain:
👉 **[CLIQUE AQUI PARA ASSISTIR AO VÍDEO NO YOUTUBE](https://youtu.be/oplttypenIc?si=I-yAYSZL1U49jwyH)**

---

## 🦊 Pré-requisitos para Testar

Para testar a plataforma por conta própria, o avaliador precisará de:
1. Uma carteira web3 (recomendamos a **MetaMask**) instalada no navegador.
2. A carteira deve estar conectada à rede de testes **Sepolia**.
3. Ter um pequeno saldo de Sepolia ETH (obtido gratuitamente em faucets) para pagar a taxa de "gas" do registro.

---

## 🚀 Passo a Passo: Como Registrar uma Obra

1. **Acesse a Plataforma:** Entre no link de produção [ProofChain Vercel](https://proofchain-template.vercel.app/).
2. **Navegue até o Registro:** Clique em "Registrar Obra" na página inicial ou pelo menu superior.
3. **Preencha os Dados:** - Digite o Título da Obra.
   - Selecione a Categoria (Música, Arte Visual, Cinema, etc.).
   - Faça o upload do arquivo físico (PDF, PNG, MP3).
4. **Assinatura na Blockchain:** Clique no botão "Registrar na Blockchain". A sua MetaMask irá abrir solicitando a confirmação da transação.
5. **Confirmação:** Após alguns segundos, a tela exibirá o Hash do IPFS (onde o arquivo foi salvo) e o Hash da Transação na rede Ethereum.
*(Você pode adicionar um print screen desta tela aqui)*

---

## 🔍 Passo a Passo: Como Verificar o Acervo

A rastreabilidade e transparência são pilares do projeto. Para verificar os registros:
1. Clique em **"Verificar Acervo"** no menu principal.
2. A página listará todas as obras registradas.
3. Clique sobre o **Hash da Transação (TX)** de uma obra para ser redirecionado automaticamente para o *Sepolia Etherscan*, onde a imutabilidade do registro on-chain é comprovada.
4. Clique no botão de **Verificação IPFS** para carregar o arquivo original salvo de forma descentralizada.

---

## 🔗 Links Oficiais do Projeto
* **Aplicação (MVP):** [https://proofchain-template.vercel.app/]
* **Contrato Inteligente (Sepolia Etherscan):** [0xC123916451Fdb0846de606A1EB7F6467e68f493d](https://sepolia.etherscan.io/address/0xC123916451Fdb0846de606A1EB7F6467e68f493d)