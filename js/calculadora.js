const display = document.getElementById("display");

let valorAtual = "";
let valorAnterior = "";
let operadorAtual = "";

// Adiciona números
function numero(n) {
  if (n === "." && valorAtual.includes(".")) return;
  valorAtual += n;
  atualizarDisplay();
}

// Define operador
function operador(op) {
  if (valorAtual === "") return;
  if (valorAnterior !== "") calcular();

  operadorAtual = op;
  valorAnterior = valorAtual;
  valorAtual = "";
}

// Calcula o resultado
function calcular() {
  let resultado;
  const anterior = parseFloat(valorAnterior);
  const atual = parseFloat(valorAtual);

  if (isNaN(anterior) || isNaN(atual)) return;

  switch (operadorAtual) {
    case "+":
      resultado = anterior + atual;
      break;
    case "-":
      resultado = anterior - atual;
      break;
    case "*":
      resultado = anterior * atual;
      break;
    case "/":
      resultado = atual === 0 ? "Erro" : anterior / atual;
      break;
    default:
      return;
  }

  valorAtual = resultado.toString();
  operadorAtual = "";
  valorAnterior = "";
  atualizarDisplay();
}

function limpar() {
  valorAtual = "";
  valorAnterior = "";
  operadorAtual = "";
  atualizarDisplay();
}

function backspace() {
  valorAtual = valorAtual.slice(0, -1);
  atualizarDisplay();
}

function porcentagem() {
  if (valorAtual === "") return;
  valorAtual = (parseFloat(valorAtual) / 100).toString();
  atualizarDisplay();
}

function atualizarDisplay() {
  display.value = valorAtual || valorAnterior || "0";
}