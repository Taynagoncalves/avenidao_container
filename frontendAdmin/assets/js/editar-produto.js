const formEditarProduto = document.getElementById("formEditarProduto");
const selectCategoria = document.getElementById("categoria");

const params = new URLSearchParams(window.location.search);
const idProduto = params.get("id");

// depois vem do backend
const categorias = [];

// depois vem do backend
const produto = null;

function carregarCategorias() {
  selectCategoria.innerHTML = '<option value="">Selecionar a categoria</option>';

  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria.id;
    option.textContent = categoria.nome;
    selectCategoria.appendChild(option);
  });
}

function preencherFormulario() {
  if (!produto) return;

  document.getElementById("nome").value = produto.nome || "";
  document.getElementById("descricao").value = produto.descricao || "";
  document.getElementById("valor").value = produto.preco || "";
  document.getElementById("categoria").value = produto.categoria_id || "";
}

formEditarProduto.addEventListener("submit", (e) => {
  e.preventDefault();

  const produtoEditado = {
    id: idProduto,
    nome: document.getElementById("nome").value,
    descricao: document.getElementById("descricao").value,
    valor: document.getElementById("valor").value,
    categoria: document.getElementById("categoria").value
  };

  console.log("Salvar edição:", produtoEditado);
  // depois você envia pro backend
});

carregarCategorias();
preencherFormulario();