const inputs = document.querySelectorAll("input");
const erros = document.querySelectorAll(".erro-msg");

// 👁️ olho senha
document.querySelectorAll("#toggleSenha").forEach(icon => {
  icon.addEventListener("click", () => {
    const input = icon.previousElementSibling;

    if (input.type === "password") {
      input.type = "text";
      icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
});

// 🔥 função padrão igual cadastro
function validarCampo(index, condicao, msgErro) {
  const input = inputs[index];
  const grupo = input.closest(".input-group");
  const erro = erros[index];

  grupo.classList.remove("error", "success");

  if (!condicao) {
    erro.innerText = msgErro;
    erro.className = "erro-msg erro"; // 🔥 deixa vermelho
    erro.style.display = "block";
    grupo.classList.add("error");
    return false;
  } else {
    erro.style.display = "none";
    grupo.classList.add("success");
    return true;
  }
}

// 🔥 LOGIN
document.querySelector(".btn-primary").addEventListener("click", async () => {

  let valido = true;

  const email = inputs[0];
  const senha = inputs[1];

  if (!validarCampo(0, email.value.trim() !== "", "Informe seu email")) {
    valido = false;
  }

  if (!validarCampo(1, senha.value !== "", "Informe sua senha")) {
    valido = false;
  }

  if (!valido) return;

  try {
    const resposta = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.value,
        senha: senha.value
      })
    });

    const data = await resposta.json();

    if (resposta.ok) {
      window.location.href = "/pages/home.html";
    } else {
      validarCampo(1, false, data.erro); // 🔥 erro no campo senha
    }

  } catch {
    console.log("Erro ao conectar");
  }

});

// navegação
window.irCadastro = function () {
  window.location.href = "/cadastro";
};

window.irHome = function () {
  window.location.href = "/pages/home.html";
};