const formProduto = document.getElementById("formProduto");
const selectCategoria = document.getElementById("categoria");

// depois vem do backend
const categorias = [];

function carregarCategorias() {
  selectCategoria.innerHTML = '<option value="">Selecionar a categoria</option>';

  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria.id;
    option.textContent = categoria.nome;
    selectCategoria.appendChild(option);
  });
}

formProduto.addEventListener("submit", (e) => {
  e.preventDefault();

  const novoProduto = {
    nome: document.getElementById("nome").value,
    descricao: document.getElementById("descricao").value,
    valor: document.getElementById("valor").value,
    categoria: document.getElementById("categoria").value
  };

  console.log("Salvar novo produto:", novoProduto);
  // depois você envia pro backend
});

carregarCategorias();