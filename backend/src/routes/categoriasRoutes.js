const express = require("express");
const router = express.Router();
const db = require("../../models/db");

// LISTAR CATEGORIAS
router.get("/categorias", (req, res) => {
  const sql = "SELECT * FROM categorias ORDER BY id DESC";

  db.query(sql, (erro, resultado) => {
    if (erro) {
      return res.status(500).json({ erro: "Erro ao buscar categorias" });
    }

    res.json(resultado);
  });
});

// CRIAR CATEGORIA
router.post("/categorias", (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: "Nome é obrigatório" });
  }

  const sql = "INSERT INTO categorias (nome) VALUES (?)";

  db.query(sql, [nome], (erro, resultado) => {
    if (erro) {
      return res.status(500).json({ erro: "Erro ao criar categoria" });
    }

    res.status(201).json({
      mensagem: "Categoria criada com sucesso",
      id: resultado.insertId
    });
  });
});

module.exports = router;