const express = require("express");
const path = require("path");
const app = express();
const db = require("./backendCliente/src/config/db");
const bcrypt = require("bcrypt");

const authRoutes = require("./backendCliente/src/routes/authRoutes");

app.use(express.json());

// ROTAS API
app.use("/", authRoutes);

// Servir frontend
app.use(express.static(path.join(__dirname, "frontendCliente")));

// Página login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontendCliente/pages/login.html"));
});

// Página cadastro
app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "frontendCliente/pages/cadastro.html"));
});

// servidor
app.listen(8000, () => {
  console.log("Servidor rodando em http://localhost:8000");
});