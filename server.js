const express = require("express");
const path = require("path");
const app = express();
const db = require("./backend/models/db");
const bcrypt = require("bcrypt");

const authRoutes = require("./backend/src/routes/authRoutes");
const categoriasRoutes = require("./backend/src/routes/categoriasRoutes");

app.use(express.json());

app.use("/", authRoutes);
app.use("/", categoriasRoutes);

// FRONTEND CLIENTE
app.use(express.static(path.join(__dirname, "frontendCliente")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontendCliente/pages/login.html"));
});

app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "frontendCliente/pages/cadastro.html"));
});








// FRONTEND ADMIN
app.use("/admin/assets", express.static(path.join(__dirname, "frontendAdmin/assets")));

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "frontendAdmin/pages/login.html"));
});

app.get("/admin/index", (req, res) => {
  res.sendFile(path.join(__dirname, "frontendAdmin/pages/index.html"));
});

app.get("/admin/cardapio", (req, res) => {
  res.sendFile(path.join(__dirname, "frontendAdmin/pages/cardapio.html"));
});

app.get("/admin/novo-produto", (req, res) => {
  res.sendFile(path.join(__dirname, "frontendAdmin/pages/novo-produto.html"));
});

app.get("/admin/editar-produto", (req, res) => {
  res.sendFile(path.join(__dirname, "frontendAdmin/pages/editar-produto.html"));
});

app.get("/admin/categorias", (req, res) => {
  res.sendFile(path.join(__dirname, "frontendAdmin/pages/categorias.html"));
});

app.get("/admin/adicionais", (req, res) => {
  res.sendFile(path.join(__dirname, "frontendAdmin/pages/adicionais.html"));
});












//servidor
app.listen(8000, () => {
  console.log("Servidor rodando em http://localhost:8000");
});