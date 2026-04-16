const filtrosCategorias = document.getElementById("filtrosCategorias");
const listaProdutos = document.getElementById("listaProdutos");
const semProdutos = document.getElementById("semProdutos");

let categoriaAtiva = null;

// depois isso vem do backend
const categorias = [];

// depois isso vem do backend
const produtos = [];

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function renderizarCategorias(lista) {
  filtrosCategorias.innerHTML = "";

  lista.forEach((categoria) => {
    const botao = document.createElement("button");
    botao.className = "btn-categoria";
    botao.textContent = categoria.nome;

    if (categoriaAtiva === categoria.id) {
      botao.classList.add("ativa");
    }

    botao.addEventListener("click", () => {
      if (categoriaAtiva === categoria.id) {
        categoriaAtiva = null;
      } else {
        categoriaAtiva = categoria.id;
      }

      renderizarCategorias(categorias);
      renderizarProdutos();
    });

    filtrosCategorias.appendChild(botao);
  });
}

function criarCardProduto(produto) {
  const card = document.createElement("div");
  card.className = "produto-card";

  if (produto.ativo === false) {
    card.classList.add("oculto");
  }

  card.innerHTML = `
    <div class="produto-esquerda">
      <img class="produto-imagem" src="${produto.imagem || ""}" alt="${produto.nome || ""}">
      <div class="produto-info">
        <div class="produto-nome">${produto.nome || ""}</div>
        <div class="produto-descricao">${produto.descricao || ""}</div>
      </div>
    </div>

    <div class="produto-preco">${formatarMoeda(produto.preco)}</div>

    <div class="produto-acoes">
      <button class="btn-visibilidade ${produto.ativo === false ? "oculto" : "visivel"}">
        ${produto.ativo === false ? "🙈" : "👁"}
      </button>

      <button class="btn-editar">EDITAR</button>
      <button class="btn-excluir">🗑</button>
    </div>
  `;

  const btnVisibilidade = card.querySelector(".btn-visibilidade");
  const btnEditar = card.querySelector(".btn-editar");
  const btnExcluir = card.querySelector(".btn-excluir");

  btnVisibilidade.addEventListener("click", () => {
    alterarVisibilidade(produto.id);
  });

  btnEditar.addEventListener("click", () => {
    window.location.href = `editar-produto.html?id=${produto.id}`;
  });

  btnExcluir.addEventListener("click", () => {
    excluirProduto(produto.id);
  });

  return card;
}

function renderizarProdutos() {
  listaProdutos.innerHTML = "";

  let listaFiltrada = produtos;

  if (categoriaAtiva !== null) {
    listaFiltrada = produtos.filter(
      (produto) => produto.categoria_id === categoriaAtiva
    );
  }

  if (!listaFiltrada.length) {
    semProdutos.style.display = "block";
    return;
  }

  semProdutos.style.display = "none";

  listaFiltrada.forEach((produto) => {
    listaProdutos.appendChild(criarCardProduto(produto));
  });
}

function alterarVisibilidade(id) {
  const produto = produtos.find((item) => item.id === id);
  if (!produto) return;

  produto.ativo = !produto.ativo;
  renderizarProdutos();
}

function excluirProduto(id) {
  console.log("Excluir produto:", id);
  // depois você liga com backend
}

function iniciarCardapio() {
  renderizarCategorias(categorias);
  renderizarProdutos();
}

iniciarCardapio();