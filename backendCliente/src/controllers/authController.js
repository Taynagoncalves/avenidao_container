const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { nome, email, telefone, senha, termos } = req.body;

  if (!nome || !email || !telefone || !senha) {
    return res.status(400).json({ erro: "Preencha todos os campos" });
  }

  // 🔥 validação obrigatória
  if (!termos) {
    return res.status(400).json({ erro: "Você precisa aceitar os termos" });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    const sql = `
      INSERT INTO usuarios (nome, email, telefone, senha, termos_aceitos)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [nome, email, telefone, senhaHash, termos], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ erro: "Email já cadastrado" });
        }
        return res.status(500).json(err);
      }

      res.json({ mensagem: "Usuário cadastrado com sucesso" });
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Preencha todos os campos" });
  }

  const sql = "SELECT * FROM usuarios WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(400).json({ erro: "Usuário não encontrado" });
    }

    const usuario = result[0];

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(400).json({ erro: "Senha incorreta" });
    }

    res.json({
      mensagem: "Login realizado com sucesso",
      usuario: {
        id: usuario.id,
        nome: usuario.nome
      }
    });
  });
};