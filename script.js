document.addEventListener('DOMContentLoaded', function () {
    // Bloqueia os links inicialmente
    const options = document.querySelectorAll('.options-container a');
    options.forEach(option => {
        option.classList.add('disabled');
        option.style.pointerEvents = 'none'; // Impede o clique
        option.style.opacity = '0.5'; // Torna visualmente desbloqueado
    });

    // Adiciona evento ao formulário de login
    const loginForm = document.getElementById('dataForm');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário

        const id = document.getElementById('dataInput').value;
        const password = document.getElementById('dataPassword').value;

        if (id && password) {
            // Habilita os links
            options.forEach(option => {
                option.classList.remove('disabled');
                option.style.pointerEvents = 'auto'; // Permite o clique
                option.style.opacity = '1'; // Torna visualmente desbloqueado
            });
            alert('Login bem-sucedido! Agora você pode acessar as opções.');
        } else {
            alert('Por favor, insira ID e senha válidos.');
        }
    });
});

// Abre o leitor de QR Code
function abrirLeitorQR() {
    const leitorDiv = document.getElementById("qr-reader");
    if (!leitorDiv) {
        console.error("Elemento 'qr-reader' não encontrado.");
        return;
    }

    let leitor = new Html5Qrcode("qr-reader");
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


// Inicializa o comportamento ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    bloquearCampos();
    configurarEventos();
});

// Função para bloquear campos
function bloquearCampos() {
    const campos = ['inspecao', 'quantidade'];
    campos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) elemento.disabled = true;
    });

    const botaoQR = document.querySelector('button[onclick="abrirLeitorQR()"]');
    if (botaoQR) botaoQR.disabled = true;

    // Certifica-se de que o campo "comboio" está habilitado
    const comboioSelect = document.getElementById('comboio');
    if (comboioSelect) comboioSelect.disabled = false;
}

// Função para desbloquear um campo específico
function desbloquearCampo(campoId) {
    const campo = document.getElementById(campoId);
    if (campo) campo.disabled = false;
}

// Configura os eventos para desbloquear os campos sequencialmente
function configurarEventos() {
    const comboioSelect = document.getElementById('comboio');
    if (comboioSelect) {
        comboioSelect.addEventListener('change', function () {
            if (this.value) {
                desbloquearCampo('inspecao'); // Desbloqueia o campo "inspecao" após validação
            } else {
                // Bloqueia os campos subsequentes se o valor de "comboio" for inválido
                bloquearCampos();
            }
        });
    }

    const inspecaoSelect = document.getElementById('inspecao');
    if (inspecaoSelect) {
        inspecaoSelect.addEventListener('change', function () {
            if (this.value) {
                desbloquearCampo('quantidade'); // Desbloqueia o campo "quantidade"
                const botaoQR = document.querySelector('button[onclick="abrirLeitorQR()"]');
                if (botaoQR) botaoQR.disabled = false; // Desbloqueia o botão QR
            } else {
                // Bloqueia os campos subsequentes se o valor de "inspecao" for inválido
                const quantidade = document.getElementById('quantidade');
                if (quantidade) quantidade.disabled = true;

                const botaoQR = document.querySelector('button[onclick="abrirLeitorQR()"]');
                if (botaoQR) botaoQR.disabled = true;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const dataForm = document.getElementById('dataForm');
    const dataInput = document.getElementById('dataInput');

    dataForm.addEventListener('submit', function (event) {
        const idValue = dataInput.value;

        // Verifica se o ID é um número válido
        if (!/^\d+$/.test(idValue)) {
            event.preventDefault(); // Impede o envio do formulário
            alert('O campo ID deve conter apenas números.');
        }
    });
});

// Envia os dados preenchidos
function enviarDados() {
    const comboio = document.getElementById("comboio")?.value;
    const inspecao = document.getElementById("inspecao")?.value;
    const codigoQR = document.getElementById("codigoLido")?.innerText.replace("Código QR: ", "");
    const quantidade = document.getElementById("quantidade")?.value;

    if (!comboio || !inspecao || !quantidade || codigoQR === "Nenhum") {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const dados = {
        comboio: comboio,
        inspecao: inspecao,
        codigoQR: codigoQR,
        quantidade: quantidade
    };

    console.log("Dados enviados: ", dados);
    alert("Dados enviados com sucesso!");
}
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

    desbloquearCampo();
}
