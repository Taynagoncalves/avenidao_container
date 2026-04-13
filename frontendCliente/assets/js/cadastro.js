document.querySelector(".btn-primary").addEventListener("click", async () => {

  const inputs = document.querySelectorAll("input");

  const nome = inputs[0].value;
  const email = inputs[1].value;
  const telefone = inputs[2].value;
  const senha = inputs[3].value;
  const confirmar = inputs[4].value;

  if (!nome || !email || !telefone || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  if (senha !== confirmar) {
    alert("Senhas não coincidem");
    return;
  }

  try {
    const resposta = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        email,
        telefone,
        senha
      })
    });

    const data = await resposta.json();

    if (resposta.ok) {
      alert("Cadastro realizado com sucesso");

      // volta para login
      window.location.href = "/";
    } else {
      alert(data.erro);
    }

  } catch (erro) {
    alert("Erro ao conectar com o servidor");
  }

});