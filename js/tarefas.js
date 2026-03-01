const inputTarefa = document.getElementById("inputTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");
const card = document.querySelector(".tarefa-card");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function renderizarTarefas() {
  listaTarefas.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const item = document.createElement("li");
    item.className = "list-group-item d-flex align-items-center justify-content-between";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.concluida;
    checkbox.className = "form-check-input me-2";

    checkbox.addEventListener("change", () => {
      tarefa.concluida = checkbox.checked;
      salvarNoStorage();
      renderizarTarefas();
    });

    const texto = document.createElement("span");
    texto.textContent = tarefa.texto;

    if (tarefa.concluida) {
      texto.style.textDecoration = "line-through";
      texto.style.opacity = "0.6";
    }

    const btnExcluir = document.createElement("button");
    btnExcluir.className = "btn-excluir";

    btnExcluir.addEventListener("click", () => {
      removerTarefa(index);
    });

    const esquerda = document.createElement("div");
    esquerda.className = "d-flex align-items-center";
    esquerda.appendChild(checkbox);
    esquerda.appendChild(texto);

    item.appendChild(esquerda);
    item.appendChild(btnExcluir);

    listaTarefas.appendChild(item);
  });
}

function adicionarTarefa() {
  const texto = inputTarefa.value.trim();

  removerAlertas();

  if (texto === "") {
    mostrarAlerta("Por favor, digite a tarefa!");
    return;
  }

  tarefas.push({
    texto: texto,
    concluida: false
  });

  salvarNoStorage();
  renderizarTarefas();

  inputTarefa.value = "";
}

function removerTarefa(index) {
  tarefas.splice(index, 1);
  salvarNoStorage();
  renderizarTarefas();
}

function salvarNoStorage() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function mostrarAlerta(mensagem) {
  const span = document.createElement("span");
  span.className = "alert alert-warning mt-2 d-block";
  span.textContent = mensagem;
  card.appendChild(span);
}

function removerAlertas() {
  const alertas = card.querySelectorAll(".alert");
  alertas.forEach(alerta => alerta.remove());
}

btnAdicionar.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});

renderizarTarefas();