const listaPedidos = document.getElementById("listaPedidos");
const semPedidos = document.getElementById("semPedidos");

const totalPedidos = document.getElementById("totalPedidos");
const totalPagoHoje = document.getElementById("totalPagoHoje");
const totalClientes = document.getElementById("totalClientes");

const btnStatusLoja = document.getElementById("btnStatusLoja");
const textoStatusLoja = document.getElementById("textoStatusLoja");

let lojaAberta = true;

const pedidos = [];

const dashboard = {
  totalPedidos: 0,
  totalPagoHoje: 0,
  totalClientes: 0
};

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function obterConfiguracaoStatus(pedido) {
  if (pedido.status === "novo") {
    return {
      classeStatus: "status-novo",
      textoStatus: "Novo",
      textoBotao: "Aceitar",
      classeBotao: "btn-laranja"
    };
  }

  if (pedido.status === "preparo") {
    return {
      classeStatus: "status-preparo",
      textoStatus: "Em Preparo",
      textoBotao: pedido.tipo === "entrega" ? "Despachar" : "Pronto",
      classeBotao: "btn-azul"
    };
  }

  if (pedido.status === "entrega") {
    return {
      classeStatus: "status-entrega",
      textoStatus: "Em Entrega",
      textoBotao: "Concluir",
      classeBotao: "btn-azul"
    };
  }

  if (pedido.status === "concluido") {
    return {
      classeStatus: "status-concluido",
      textoStatus: "CONCLUIDO",
      textoBotao: "",
      classeBotao: ""
    };
  }

  return {
    classeStatus: "",
    textoStatus: "",
    textoBotao: "",
    classeBotao: ""
  };
}

function criarBotaoAcao(pedido) {
  const config = obterConfiguracaoStatus(pedido);

  if (!config.textoBotao) {
    return null;
  }

  const botao = document.createElement("button");
  botao.className = `btn-acao ${config.classeBotao}`;
  botao.textContent = config.textoBotao;

  botao.addEventListener("click", () => {
    atualizarStatusPedido(pedido.id);
  });

  return botao;
}

function criarCardPedido(pedido) {
  const config = obterConfiguracaoStatus(pedido);

  const card = document.createElement("div");
  card.className = "pedido-card";

  const tipoTexto = pedido.tipo === "entrega" ? "Entrega" : "Retirar";
  const pagamentoTexto = pedido.pagamento || "";
  const valorTexto = formatarMoeda(pedido.total);

  card.innerHTML = `
    <div class="pedido-topo">
      <span class="status-faixa ${config.classeStatus}">${config.textoStatus}</span>
      <span class="pedido-id">#${pedido.id}</span>
    </div>

    <div class="pedido-conteudo">
      <div class="pedido-info">
        <div class="pedido-cliente">${pedido.cliente || ""}</div>
        <div class="pedido-tipo">${tipoTexto}</div>
        <div class="pedido-data">${pedido.data || ""}</div>
      </div>

      <div class="pedido-pagamento">${pagamentoTexto}</div>

      <div class="pedido-valor">${valorTexto}</div>

      <div class="pedido-acoes"></div>
    </div>
  `;

  const areaAcoes = card.querySelector(".pedido-acoes");

  const botaoAcao = criarBotaoAcao(pedido);
  if (botaoAcao) {
    areaAcoes.appendChild(botaoAcao);
  }

  const botaoImprimir = document.createElement("button");
  botaoImprimir.className = "btn-imprimir";
  botaoImprimir.textContent = "🖨";
  botaoImprimir.addEventListener("click", () => {
    imprimirPedido(pedido.id);
  });

  areaAcoes.appendChild(botaoImprimir);

  return card;
}

function renderizarPedidos(lista) {
  listaPedidos.innerHTML = "";

  if (!lista.length) {
    semPedidos.style.display = "block";
    return;
  }

  semPedidos.style.display = "none";

  lista.forEach((pedido) => {
    listaPedidos.appendChild(criarCardPedido(pedido));
  });
}

function atualizarResumo(dados) {
  totalPedidos.textContent = dados.totalPedidos ?? 0;
  totalPagoHoje.textContent = formatarMoeda(dados.totalPagoHoje ?? 0);
  totalClientes.textContent = dados.totalClientes ?? 0;
}

function atualizarStatusPedido(id) {
  const pedido = pedidos.find((item) => item.id === id);
  if (!pedido) return;

  if (pedido.tipo === "entrega") {
    if (pedido.status === "novo") pedido.status = "preparo";
    else if (pedido.status === "preparo") pedido.status = "entrega";
    else if (pedido.status === "entrega") pedido.status = "concluido";
  }

  if (pedido.tipo === "retirar") {
    if (pedido.status === "novo") pedido.status = "preparo";
    else if (pedido.status === "preparo") pedido.status = "concluido";
  }

  renderizarPedidos(pedidos);
}

function imprimirPedido(id) {
  console.log("Imprimir pedido:", id);
}

function alternarStatusLoja() {
  lojaAberta = !lojaAberta;

  if (lojaAberta) {
    btnStatusLoja.classList.remove("desligado");
    btnStatusLoja.classList.add("ligado");
    textoStatusLoja.textContent = "LIGADO";
  } else {
    btnStatusLoja.classList.remove("ligado");
    btnStatusLoja.classList.add("desligado");
    textoStatusLoja.textContent = "DESLIGADO";
  }
}

btnStatusLoja.addEventListener("click", alternarStatusLoja);

function iniciarTela() {
  atualizarResumo(dashboard);
  renderizarPedidos(pedidos);
}

iniciarTela();