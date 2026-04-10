const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// Servir arquivos do frontend
app.use(express.static(path.join(__dirname, "frontendCliente")));

// Rota principal → abre login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontendCliente/pages/login.html"));
});

// servidor
app.listen(8000, () => {
  console.log("Servidor rodando em http://localhost:8000");
});