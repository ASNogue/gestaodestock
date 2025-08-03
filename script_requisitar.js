// Torna visível a área do leitor QR ao carregar
const leitorDiv = document.getElementById("qr-reader");
leitorDiv.style.display = "block"; // Mostra o leitor

// Função que abre e ativa o leitor de QR Code
function abrirLeitorQR() {
    const leitorDiv = document.getElementById("qr-reader");
    if (!leitorDiv) {
        console.error("Elemento 'qr-reader' não encontrado.");
        return;
    }

    // Verifica se a biblioteca Html5Qrcode está carregada
    if (typeof Html5Qrcode !== 'undefined') {
        const leitor = new Html5Qrcode("qr-reader");

        // Inicia o leitor com configurações
        leitor.start(
            { facingMode: "environment" }, // Usa a câmara traseira
            { fps: 10, qrbox: 250 },       // Configurações do leitor
            qrCodeMessage => {
                const codigoLido = document.getElementById("codigoLido");
                if (codigoLido) {
                    codigoLido.textContent = "Código QR: " + qrCodeMessage;
                }

                // Para o leitor após a leitura
                leitor.stop().then(() => {
                    console.log("Leitor QR parado com sucesso");
                }).catch(err => {
                    console.error("Erro ao parar o leitor QR:", err);
                });
            },
            errorMessage => {
                // Apenas mostra erro se for relevante
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

// Quando a página carrega, inicializa os comportamentos
document.addEventListener('DOMContentLoaded', function() {
    bloquearCampos();     // Bloqueia os campos inicialmente
    configurarEventos();  // Ativa eventos para desbloquear campos
});

// Função que bloqueia todos os campos (exceto o primeiro)
function bloquearCampos() {
    const campos = ['inspecao', 'quantidade'];
    campos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) {
            elemento.disabled = true;
            elemento.value = ''; // Limpa valor anterior
        }
    });

    // Desativa o botão de leitura QR até os campos estarem preenchidos
    const botaoQR = document.getElementById('botaoQR');
    if (botaoQR) botaoQR.disabled = true;

    // Deixa o campo "comboio" disponível
    const comboioSelect = document.getElementById('comboio');
    if (comboioSelect) {
        comboioSelect.disabled = false;
        comboioSelect.value = 'selecionar';
    }
}

// Desbloqueia um campo específico (por ID)
function desbloquearCampo(campoId) {
    const campo = document.getElementById(campoId);
    if (campo) campo.disabled = false;
}

// Ativa eventos que desbloqueiam os campos em sequência
function configurarEventos() {
    const comboioSelect = document.getElementById('comboio');
    if (comboioSelect) {
        comboioSelect.addEventListener('change', function() {
            if (this.value && this.value !== 'selecionar') {
                desbloquearCampo('inspecao'); // Desbloqueia inspeção
                const inspecaoSelect = document.getElementById('inspecao');
                if (inspecaoSelect) inspecaoSelect.value = 'selecionar';
                const quantidade = document.getElementById('quantidade');
                if (quantidade) quantidade.value = '';
            } else {
                bloquearCampos(); // Se for voltar a "selecionar", bloqueia de novo
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

                const quantidade = document.getElementById('quantidade');
                if (quantidade && !quantidade.value) {
                    quantidade.value = 0;
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

// Função para enviar os dados preenchidos para o servidor
function enviarDados() {
    const comboio = document.getElementById("comboio")?.value;
    const inspecao = document.getElementById("inspecao")?.value;
    const codigoQR = document.getElementById("codigoLido")?.textContent.replace("Código QR: ", "").trim();
    const quantidadeInput = document.getElementById("quantidade");
    const quantidade = quantidadeInput ? parseInt(quantidadeInput.value) : 0;

    console.log("A enviar: ", {
        nomenclatura: codigoQR,
        quantidade: quantidade,
        comboio: comboio,
        inspecao: inspecao
    });

    // Validação dos dados antes de enviar
    if (!comboio || comboio === 'selecionar' ||
        !inspecao || inspecao === 'selecionar' ||
        !codigoQR || codigoQR === "Nenhum" || codigoQR === "" ||
        !quantidade || quantidade <= 0) {
        alert("Por favor, preenche todos os campos corretamente.");
        return;
    }

    // Envia os dados para o PHP guardar na base de dados
    fetch("guardar_requisicao.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nomenclatura: codigoQR,
            quantidade: quantidade,
            comboio: comboio,
            inspecao: inspecao
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Requisição registada com sucesso!");
        } else {
            alert("Erro ao guardar: " + (data.erro || "Nomenclatura desconhecida!."));
        }
    })
    .catch(err => {
        console.error("Erro no envio:", err);
        alert("Erro ao comunicar com o servidor.");
    });
}

// Função que limpa e reinicia o formulário
function reiniciarFormulario() {
    const confirmar = confirm("Tem certeza de que deseja reiniciar o formulário? Todos os dados serão perdidos.");
    if (!confirmar) return;

    // Reseta campos
    const comboioSelect = document.getElementById('comboio');
    if (comboioSelect) comboioSelect.value = 'selecionar';

    const inspecaoSelect = document.getElementById('inspecao');
    if (inspecaoSelect) inspecaoSelect.value = 'selecionar';

    const quantidadeInput = document.getElementById('quantidade');
    if (quantidadeInput) quantidadeInput.value = '';

    const codigoLido = document.getElementById('codigoLido');
    if (codigoLido) codigoLido.textContent = 'Código QR: Nenhum';

    // Bloqueia campos novamente
    bloquearCampos();
}
