const lista = document.getElementById("listaCategorias");
const btn = document.getElementById("btnCriar");

let categorias = [];

function render() {
  lista.innerHTML = "";

  categorias.forEach((cat, index) => {
    lista.innerHTML += `
      <div class="item-categoria ${cat.ativo ? "" : "oculta"}">
        <span>${cat.nome}</span>
        <span>${cat.temAdicional ? "Sim" : "Não"}</span>

        <div class="acoes">
          <button class="btn-visibilidade ${cat.ativo ? "visivel" : "oculto"}" onclick="alternarStatus(${index})">
            ${cat.ativo ? "👁" : "🚫"}
          </button>

          <button class="btn-excluir" onclick="remover(${index})">🗑</button>
        </div>
      </div>
    `;
  });
}

btn.addEventListener("click", () => {
  const nome = document.getElementById("nomeCategoria").value;
  const tem = document.getElementById("temAdicional").value === "sim";

  if (!nome) {
    alert("Digite o nome da categoria");
    return;
  }

  categorias.push({
    nome,
    temAdicional: tem,
    ativo: true
  });

  document.getElementById("nomeCategoria").value = "";
  document.getElementById("temAdicional").value = "nao";

  render();
});

function alternarStatus(index) {
  categorias[index].ativo = !categorias[index].ativo;
  render();
}

function remover(index) {
  categorias.splice(index, 1);
  render();
}

window.alternarStatus = alternarStatus;
window.remover = remover;