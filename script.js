// Inicializa os eventos e desabilita os campos ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    desabilitarCampos();
    configurarEventos();
});

// Função para desabilitar campos 

function desabilitarCampos() {
    const campos = ['comboio', 'inspecao', 'quantidade'];
    campos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) elemento.disabled = true;
    });

    const botaoQR = document.querySelector('button[onclick="abrirLeitorQR()"]');
    if (botaoQR) botaoQR.disabled = true;
}
function validarInteiro(input) {
    // Função para aceitar apenas numeros 
    input.value = input.value.replace(/[^0-9]/g, '');
}
// Função para habilitar um campo
function habilitarCampo(id) {
    const elemento = document.getElementById(id);
    if (elemento) elemento.disabled = false;
}

// Configura os eventos para habilitar os campos sequencialmente
function configurarEventos() {
    const idInput = document.getElementById('id');
    if (idInput) {
        idInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                validarID();
            }
        });
    }

    const comboioSelect = document.getElementById('comboio');
    if (comboioSelect) {
        comboioSelect.addEventListener('change', function () {
            if (this.value) habilitarCampo('inspecao');
        });
    }

    const inspecaoSelect = document.getElementById('inspecao');
    if (inspecaoSelect) {
        inspecaoSelect.addEventListener('change', function () {
            if (this.value) {
                habilitarCampo('quantidade');
                const botaoQR = document.querySelector('button[onclick="abrirLeitorQR()"]');
                if (botaoQR) botaoQR.disabled = false;
            }
        });
    }
}

// Valida o ID inserido
function validarID() {
    const idInput = document.getElementById('id');
    if (!idInput) return;

    if (idInput.value.trim() === '') {
        alert('Utilizador desconhecido! Por favor, insira um ID válido.');
        idInput.focus();
        idInput.classList.add('required-field');
        desabilitarCampos();
    } else {
        idInput.classList.remove('required-field');
        habilitarCampo('comboio');
        const comboioSelect = document.getElementById('comboio');
        if (comboioSelect) comboioSelect.focus();
    }
}

// Abre o leitor de QR Code
function abrirLeitorQR() {
    const leitorDiv = document.getElementById("leitorQR");
    if (!leitorDiv) {
        console.error("Elemento 'leitorQR' não encontrado.");
        return;
    }

    let leitor = new Html5Qrcode("leitorQR");
    leitor.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: 250
        },
        qrCodeMessage => {
            const codigoLido = document.getElementById("codigoLido");
            if (codigoLido) codigoLido.innerText = "Código QR: " + qrCodeMessage;
            leitor.stop();
        },
        errorMessage => {
            console.log("Erro na leitura do QR: ", errorMessage);
        }
    );
}

// Envia os dados preenchidos
function enviarDados() {
    const id = document.getElementById("id")?.value.trim();
    const comboio = document.getElementById("comboio")?.value;
    const inspecao = document.getElementById("inspecao")?.value;
    const codigoQR = document.getElementById("codigoLido")?.innerText.replace("Código QR: ", "");
    const quantidade = document.getElementById("quantidade")?.value;

    if (!id || !comboio || !inspecao || !quantidade || codigoQR === "Nenhum") {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const dados = {
        id: id,
        comboio: comboio,
        inspecao: inspecao,
        codigoQR: codigoQR,
        quantidade: quantidade
    };

    console.log("Dados enviados: ", dados);
    alert("Dados enviados com sucesso!");
}

// Gera um QR Code com os dados lidos
function gerarQRCode() {
    const codigoLido = document.getElementById("codigoLido");
    if (!codigoLido) {
        console.error("Elemento 'codigoLido' não encontrado.");
        return;
    }

    const dados = codigoLido.innerText.replace("Código QR: ", "");
    if (dados === "Nenhum") {
        alert("Nenhum código QR para gerar!");
        return;
    }

    const qrcodeDiv = document.getElementById("qrcode");
    if (!qrcodeDiv) {
        console.error("Elemento 'qrcode' não encontrado.");
        return;
    }

    qrcodeDiv.innerHTML = "";
    new QRCode(qrcodeDiv, dados);
}

// Após o carregamento completo da página, oculta o loading screen
window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) loadingScreen.style.display = 'none';
});

// Função para reiniciar o formulário
function reiniciarFormulario() {
    const confirmar = confirm("Tem certeza de que deseja reiniciar a requisição? Todos os dados serão perdidos.");
    if (!confirmar) return;

    const comboioSelect = document.getElementById('comboio');
    if (comboioSelect) comboioSelect.value = 'selecionar';

    const inspecaoSelect = document.getElementById('inspecao');
    if (inspecaoSelect) inspecaoSelect.value = 'selecionar';

    const quantidadeInput = document.getElementById('quantidade');
    if (quantidadeInput) quantidadeInput.value = 1;

    const codigoLido = document.getElementById('codigoLido');
    if (codigoLido) codigoLido.innerText = 'Código QR: Nenhum';

    desabilitarCampos();
}

