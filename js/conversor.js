const valorDe = document.getElementById("valorDe");
const valorPara = document.getElementById("valorPara");
const unidadeDe = document.getElementById("unidadeDe");
const unidadePara = document.getElementById("unidadePara");
const textoFormula = document.getElementById("textoFormula");
const categoria = document.getElementById("categoria");

const unidades = {
    comprimento: [
        { value: "km", label: "Quilômetro" },
        { value: "m", label: "Metro" },
        { value: "cm", label: "Centímetro" },
        { value: "mm", label: "Milímetro" }
    ],
    volume: [
        { value: "mc", label: "Metro Cúbico" },
        { value: "l", label: "Litro" },
        { value: "ml", label: "Mililitro" }
    ],
    massa: [
        { value: "t", label: "Tonelada" },
        { value: "kg", label: "Quilograma" },
        { value: "g", label: "Grama" },
        { value: "mg", label: "Miligrama" }
    ]
};

const fatores = {
    comprimento: {
        km: 0.001,
        m: 1,
        cm: 100,
        mm: 1000
    },
    volume: {
        mc: 0.001,
        l: 1,
        ml: 1000
    },
    massa: {
        t: 0.001,
        kg: 1,
        g: 1000,
        mg: 1000000
    }
};

function carregarUnidades() {
    const cat = categoria.value;

    unidadeDe.innerHTML = "";
    unidadePara.innerHTML = "";

    unidades[cat].forEach(u => {
        unidadeDe.innerHTML += `<option value="${u.value}">${u.label}</option>`;
        unidadePara.innerHTML += `<option value="${u.value}">${u.label}</option>`;
    });

    converter();
}

function converter() {
    const valor = parseFloat(valorDe.value);
    if (isNaN(valor)) return;

    const cat = categoria.value;
    const de = unidadeDe.value;
    const para = unidadePara.value;

    const fator = fatores[cat][para] / fatores[cat][de];
    const resultado = valor * fator;

    valorPara.value = resultado;
    textoFormula.innerText = `multiplique o valor por ${fator}`;
}

categoria.addEventListener("change", carregarUnidades);
valorDe.addEventListener("input", converter);
unidadeDe.addEventListener("change", converter);
unidadePara.addEventListener("change", converter);

carregarUnidades();
converter();