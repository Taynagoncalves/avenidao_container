const inputs = document.querySelectorAll("input");
const erros = document.querySelectorAll(".erro-msg");
const termosCheck = document.getElementById("termos");
const erroTermos = document.querySelector(".erro-termos");
const botao = document.querySelector(".btn-primary");

// começa desabilitado
botao.disabled = true;

// função geral
function validarCampo(index, condicao, msgErro) {
  const input = inputs[index];
  const grupo = input.closest(".input-group");
  const erro = erros[index];

  grupo.classList.remove("error", "success");

  if (!condicao) {
    erro.innerText = msgErro;
    erro.className = "erro-msg erro";
    erro.style.display = "block";
    grupo.classList.add("error");
    return false;
  } else {
    erro.style.display = "none";
    grupo.classList.add("success");
    return true;
  }
}

// 🔥 tempo real

inputs[0].addEventListener("input", () => {
  validarCampo(0, inputs[0].value.trim().length > 2, "Nome muito curto");
});

inputs[1].addEventListener("input", () => {
  const valido = inputs[1].value.includes("@") && inputs[1].value.includes(".");
  validarCampo(1, valido, "Email inválido");
});

inputs[2].addEventListener("input", () => {
  let v = inputs[2].value.replace(/\D/g, "");

  if (v.length > 11) v = v.slice(0, 11);

  if (v.length > 6) {
    v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
  } else if (v.length > 2) {
    v = `(${v.slice(0,2)}) ${v.slice(2)}`;
  }

  inputs[2].value = v;

  validarCampo(2, v.length >= 14, "Telefone incompleto");
});

inputs[3].addEventListener("input", () => {
  validarCampo(3, inputs[3].value.length >= 6, "Mínimo 6 caracteres");
});

inputs[4].addEventListener("input", () => {
  const igual = inputs[4].value === inputs[3].value;
  validarCampo(4, igual, "Senhas não coincidem");
});

// 🔥 checkbox termos
termosCheck.addEventListener("change", () => {
  botao.disabled = !termosCheck.checked;
  erroTermos.style.display = "none";
});

// 🔥 MODAL
window.abrirTermos = function () {
  document.getElementById("modalTermos").style.display = "block";
};

window.fecharModal = function () {
  document.getElementById("modalTermos").style.display = "none";
};

window.onclick = function (event) {
  const modal = document.getElementById("modalTermos");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

window.aceitarTermos = function () {
  termosCheck.checked = true;
  botao.disabled = false;
  fecharModal();
};

// 🔥 ENVIO FINAL
botao.addEventListener("click", async () => {

  let valido = true;

  if (!validarCampo(0, inputs[0].value.trim().length > 2, "Nome muito curto")) valido = false;
  if (!validarCampo(1, inputs[1].value.includes("@"), "Email inválido")) valido = false;
  if (!validarCampo(2, inputs[2].value.length >= 14, "Telefone incompleto")) valido = false;
  if (!validarCampo(3, inputs[3].value.length >= 6, "Senha muito curta")) valido = false;
  if (!validarCampo(4, inputs[4].value === inputs[3].value, "Senhas não coincidem")) valido = false;

  // 🔥 valida termos
  if (!termosCheck.checked) {
    erroTermos.style.display = "block";
    return;
  }

  if (!valido) return;

  try {
    const resposta = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: inputs[0].value,
        email: inputs[1].value,
        telefone: inputs[2].value,
        senha: inputs[3].value,
        termos: termosCheck.checked
      })
    });

    const data = await resposta.json();

    if (resposta.ok) {
      window.location.href = "/";
    } else {
      alert(data.erro);
    }

  } catch {
    alert("Erro ao conectar");
  }

});