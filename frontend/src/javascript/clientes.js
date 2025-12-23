const API_URL = "http://localhost:8081/clientes";

// 🔐 TOKEN PADRÃO
const token = localStorage.getItem("accessToken");

// 🚫 BLOQUEIA SE NÃO ESTIVER LOGADO
if (!token) {
  alert("Você precisa estar logado");
  window.location.href = "login.html";
}

// 🔄 AO CARREGAR PÁGINA
document.addEventListener("DOMContentLoaded", () => {
  listarClientes();

  const form = document.getElementById("formCliente");
  form.addEventListener("submit", salvarCliente);
});


async function salvarCliente(e) {
  e.preventDefault();

  const id = document.getElementById("id").value;

  const cliente = {
    nome: document.getElementById("nome").value,
    cpf: document.getElementById("cpf").value.replace(/\D/g, ""),
    logradouro: document.getElementById("logradouro").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
    cep: document.getElementById("cep").value
  };

  const url = id ? `${API_URL}/${id}` : API_URL;
  const method = id ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cliente)
  });

  if (!response.ok) {
    alert("Erro ao salvar cliente");
    return;
  }

  alert("Cliente salvo com sucesso!");
  limparFormulario();
  await listarClientes();

  // Rola até a lista
  const tituloLista = document.getElementById("tituloLista");
  if (tituloLista) {
    tituloLista.scrollIntoView({ behavior: "smooth" });
  }
}

// 📄 LISTAR
async function listarClientes() {
  const response = await fetch(API_URL, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (response.status === 401 || response.status === 403) {
    alert("Sessão expirada. Faça login novamente.");
    localStorage.removeItem("accessToken");
    window.location.href = "login.html";
    return;
  }

  const clientes = await response.json();
  const tabela = document.getElementById("tabelaClientes");
  tabela.innerHTML = "";

  clientes.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.nome}</td>
      <td>${c.cpf}</td>
      <td>${c.logradouro || ""}</td>
      <td>${c.bairro || ""}</td>
      <td>${c.cidade || ""}</td>
      <td>${c.estado || ""}</td>
      <td>${c.cep || ""}</td>
      <td>
        <button onclick="editarCliente(${c.id})">Editar</button>
        <button onclick="deletarCliente(${c.id})">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

// ✏️ EDITAR
async function editarCliente(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const c = await response.json();

  document.getElementById("id").value = c.id;
  document.getElementById("nome").value = c.nome;
  document.getElementById("cpf").value = c.cpf;
  document.getElementById("logradouro").value = c.logradouro || "";
  document.getElementById("bairro").value = c.bairro || "";
  document.getElementById("cidade").value = c.cidade || "";
  document.getElementById("estado").value = c.estado || "";
  document.getElementById("cep").value = c.cep || "";
}

// ❌ DELETAR
async function deletarCliente(id) {
  if (!confirm("Deseja excluir?")) return;

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  listarClientes();
}

// 🧹 LIMPAR
function limparFormulario() {
  document.getElementById("formCliente").reset();
  document.getElementById("id").value = "";
}
