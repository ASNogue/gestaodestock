
// Abre o leitor de QR Code
function abrirLeitorQR() {
    const leitorDiv = document.getElementById("qr-reader");
    if (!leitorDiv) {
        console.error("Elemento 'qr-reader' não encontrado.");
        return;
    }

    // Verifica se Html5Qrcode está disponível
    if (typeof Html5Qrcode !== 'undefined') {
        const leitor = new Html5Qrcode("qr-reader");
        leitor.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: 250
            },
            qrCodeMessage => {
                const codigoLido = document.getElementById("codigoLido");
                if (codigoLido) {
                    codigoLido.textContent = "Código QR: " + qrCodeMessage;
                }
                leitor.stop().then(() => {
                    console.log("Leitor QR parado com sucesso");
                }).catch(err => {
                    console.error("Erro ao parar o leitor QR:", err);
                });
            },
            errorMessage => {
                // Ignora erros de não encontrado (código esperado)
                if (errorMessage !== "QR code not found in camera stream.") {
                    console.log("Erro na leitura do QR:", errorMessage);
                }
            }
        ).catch(err => {
            console.error("Erro ao iniciar o leitor QR:", err);
        });
    } else {
        console.error("Biblioteca Html5Qrcode não carregada");
    }
}

// Inicializa o comportamento ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    bloquearCampos();
    configurarEventos();
});

// Função para bloquear campos
function bloquearCampos() {
    const campos = ['inspecao', 'quantidade'];
    campos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) {
            elemento.disabled = true;
            elemento.value = ''; // Limpa o valor
        }
    });

    const botaoQR = document.querySelector('button[onclick="abrirLeitorQR()"]');
    if (botaoQR) botaoQR.disabled = true;

    // Garante que o campo "comboio" está livre
    const comboioSelect = document.getElementById('comboio');
    if (comboioSelect) {
        comboioSelect.disabled = false;
        comboioSelect.value = 'selecionar'; // Reset para o valor padrão
    }
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
        comboioSelect.addEventListener('change', function() {
            if (this.value && this.value !== 'selecionar') {
                desbloquearCampo('inspecao');
                // Reseta campos dependentes
                const inspecaoSelect = document.getElementById('inspecao');
                if (inspecaoSelect) inspecaoSelect.value = 'selecionar';
                const quantidade = document.getElementById('quantidade');
                if (quantidade) quantidade.value = '';
            } else {
                bloquearCampos();
            }
        });
    }

    const inspecaoSelect = document.getElementById('inspecao');
    if (inspecaoSelect) {
        inspecaoSelect.addEventListener('change', function() {
            if (this.value && this.value !== 'selecionar') {
                desbloquearCampo('quantidade');
                const botaoQR = document.querySelector('button[onclick="abrirLeitorQR()"]');
                if (botaoQR) botaoQR.disabled = false;
                // Define valor padrão para quantidade
                const quantidade = document.getElementById('quantidade');
                if (quantidade && !quantidade.value) {
                    quantidade.value = 1;
                }
            } else {
                const quantidade = document.getElementById('quantidade');
                if (quantidade) {
                    quantidade.disabled = true;
                    quantidade.value = '';
                }
                const botaoQR = document.querySelector('button[onclick="abrirLeitorQR()"]');
                if (botaoQR) botaoQR.disabled = true;
            }
        });
    }
}

// Envia os dados preenchidos
function enviarDados() {
    const comboio = document.getElementById("comboio")?.value;
    const inspecao = document.getElementById("inspecao")?.value;
    const codigoQR = document.getElementById("codigoLido")?.textContent.replace("Código QR: ", "");
    const quantidade = document.getElementById("quantidade")?.value;

    if (!comboio || comboio === 'selecionar' || 
        !inspecao || inspecao === 'selecionar' || 
        !quantidade || codigoQR === "Nenhum") {
        alert("Por favor, preencha todos os campos corretamente.");
        return false;
    }

    const dados = {
        comboio: comboio,
        inspecao: inspecao,
        codigoQR: codigoQR,
        quantidade: quantidade
    };

    console.log("Dados enviados: ", dados);
    alert("Dados enviados com sucesso!");
    return true;
}

// Função para reiniciar o formulário
function reiniciarFormulario() {
    const confirmar = confirm("Tem certeza de que deseja reiniciar o formulário? Todos os dados serão perdidos.");
    if (!confirmar) return;

    // Reset a todos os campos
    const comboioSelect = document.getElementById('comboio');
    if (comboioSelect) comboioSelect.value = 'selecionar';

    const inspecaoSelect = document.getElementById('inspecao');
    if (inspecaoSelect) inspecaoSelect.value = 'selecionar';

    const quantidadeInput = document.getElementById('quantidade');
    if (quantidadeInput) quantidadeInput.value = '';

    const codigoLido = document.getElementById('codigoLido');
    if (codigoLido) codigoLido.textContent = 'Código QR: Nenhum';

    // Reaplica o bloqueio inicial
    bloquearCampos();
}