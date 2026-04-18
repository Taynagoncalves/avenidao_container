let grupos = [];

const lista = document.getElementById("listaGrupos");
const selectGrupo = document.getElementById("selectGrupo");

// CRIAR GRUPO
document.getElementById("btnCriarGrupo").onclick = () => {
  const nome = document.getElementById("nomeGrupo").value;

  if (!nome) return alert("Digite o nome do grupo");

  grupos.push({
    nome,
    adicionais: []
  });

  atualizarSelect();
  render();
};

// CRIAR ADICIONAL
document.getElementById("btnCriarAdicional").onclick = () => {
  const nome = document.getElementById("nomeAdicional").value;
  const valor = document.getElementById("valorAdicional").value;
  const index = selectGrupo.value;

  if (!nome || !valor || index === "Selecione") {
    return alert("Preencha tudo");
  }

  grupos[index].adicionais.push({
    nome,
    valor
  });

  render();
};

// ATUALIZA SELECT
function atualizarSelect() {
  selectGrupo.innerHTML = `<option>Selecione</option>`;

  grupos.forEach((g, i) => {
    selectGrupo.innerHTML += `<option value="${i}">${g.nome}</option>`;
  });
}

// RENDER
function render() {
  lista.innerHTML = "";

  grupos.forEach((grupo, i) => {
    lista.innerHTML += `
      <div class="grupo-lista">
        <div class="grupo-header">${grupo.nome}</div>

        ${grupo.adicionais.map(a => `
          <div class="item-adicional">
            <span>${a.nome}</span>
            <span>R$ ${a.valor}</span>

            <div class="acoes">
              <button class="btn-acao azul">👁</button>
              <button class="btn-acao laranja">✏</button>
              <button class="btn-acao vermelho">🗑</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  });
}