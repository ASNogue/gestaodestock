// Aguarda que todo o conteúdo HTML da página esteja carregado
document.addEventListener("DOMContentLoaded", () => {
    
    const form = document.getElementById("searchForm");

    // Campo de texto onde o utilizador insere a nomenclatura
    const input = document.getElementById("searchInput");

    // Corpo da tabela onde os resultados serão inseridos
    const table = document.getElementById("resultTable");
    const tableBody = table ? table.tBodies[0] : null;

    // Contentor onde os resultados serão apresentados
    const resultContainer = document.getElementById("resultContainer");

    // Variável para o leitor QR
    let html5QrCode = null;

    // Torna a função acessível globalmente (para usar com botão)
    window.abrirLeitorQR = abrirLeitorQR;

    // Função que abre e inicia o leitor de QR code
    function abrirLeitorQR() {
        const leitorDiv = document.getElementById("qr-reader");
        leitorDiv.style.display = "block"; // Torna visível o leitor

        // Verifica se a biblioteca Html5Qrcode está carregada
        if (typeof Html5Qrcode !== 'undefined') {
            if (!html5QrCode) {
                html5QrCode = new Html5Qrcode("qr-reader");
            }

            // Inicia a leitura do QR code com configurações
            html5QrCode.start(
                { facingMode: "environment" }, // Usa a câmara traseira
                { fps: 10, qrbox: 250 },
                (decodedText) => {
                    // Quando o código é lido com sucesso, coloca-o no input
                    document.getElementById("searchInput").value = decodedText;

                    // Para o leitor e oculta a área
                    html5QrCode.stop().then(() => {
                        leitorDiv.style.display = "none";
                    });

                    // Submete automaticamente o formulário para pesquisar o stock
                    document.getElementById("searchForm").requestSubmit();
                },
                (errorMessage) => {
                    // Mostra aviso apenas se for um erro diferente do normal
                    if (errorMessage !== "QR code not found in camera stream.") {
                        console.warn("Erro leitura QR:", errorMessage);
                    }
                }
            ).catch(err => console.error("Erro ao iniciar QR:", err));
        } else {
            console.error("Html5Qrcode não está carregado.");
        }
    }

    // Evento que trata o envio do formulário de pesquisa
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede o envio tradicional do formulário

        const termo = input.value.trim(); // Obtém o termo de pesquisa

        // Envia pedido POST para o servidor com o termo de pesquisa
        fetch("buscar_stock.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ termo }),
        })
        .then(response => response.json())
        .then(resultado => {
            tableBody.innerHTML = ""; // Limpa resultados anteriores

            if (resultado.length > 0) {
                resultado.forEach((item) => {
                    const row = `
                        <tr>
                            <td>${item.nomenclatura}</td>
                            <td>${item.designacao}</td>
                            <td>${item.quantidade}</td>
                            <td>${item.localizacao}</td>
                        </tr>
                    `;
                    tableBody.insertAdjacentHTML("beforeend", row);
                });
                resultContainer.classList.remove("hidden"); // Mostra os resultados
            } else {
                tableBody.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
                resultContainer.classList.remove("hidden");
            }
        })
        .catch(erro => {
            console.error("Erro na requisição:", erro);
        });
    });
});
