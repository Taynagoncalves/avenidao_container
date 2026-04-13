document.querySelector(".btn-primary").addEventListener("click", async () => {

  const inputs = document.querySelectorAll("input");

  const email = inputs[0].value;
  const senha = inputs[1].value;

  if (!email || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  try {
    const resposta = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await resposta.json();

    if (resposta.ok) {
      alert("Login realizado com sucesso");
      window.location.href = "/pages/home.html";
    } else {
      alert(data.erro);
    }

  } catch (erro) {
    alert("Erro ao conectar com o servidor");
  }

});

// botão cadastro
function irCadastro() {
  window.location.href = "/cadastro";
}

// comprar sem cadastro
function irHome() {
  window.location.href = "/pages/home.html";
}