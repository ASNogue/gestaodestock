// Aguarda que todo o conteúdo da página HTML esteja carregado
document.addEventListener('DOMContentLoaded', function () { 
    // Seleciona a tabela onde as requisições serão inseridas
    const tabela = document.getElementById('tabela-requisicoes-gerais');

    // Faz uma chamada fetch à API para obter todas as requisições
    fetch("api_consultar_requisicoes.php")
        .then(response => response.json()) // Converte a resposta em JSON
        .then(dados => {
            tabela.innerHTML = ''; // Limpa a tabela antes de preencher

            // Itera por cada item (requisição) recebido da API
            dados.forEach(item => {
                const linha = document.createElement('tr'); // Cria nova linha na tabela

                // Preenche a linha com os dados da requisição
                linha.innerHTML = `
                    <td>${item.id_utilizador}</td>
                    <td>${item.nomenclatura}</td>
                    <td>${item.designacao}</td>
                    <td>${item.quantidade}</td>
                    <td>${item.comboio}</td>
                    <td>${item.inspecao}</td>
                    <td>${item.dataHora}</td>
                    <td><button class="cancelar-btn" data-nomenclatura="${item.nomenclatura}" data-datahora="${item.dataHora}">Cancelar</button></td>

                `;
                tabela.appendChild(linha); // Adiciona a linha à tabela
            });

            // Adiciona evento de clique a todos os botões "Cancelar"
            document.querySelectorAll('.cancelar-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const linha = this.closest('tr'); // Obtém a linha da tabela do botão clicado
                    const nomenclatura = this.dataset.nomenclatura;
                    const dataHora = this.dataset.datahora;


                    // Envia pedido POST para cancelar a requisição
                    fetch("cancelar_requisicao.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ nomenclatura, dataHora }) // Envia os dados da requisição a cancelar
                    })
                        .then(res => res.json()) // Converte a resposta do servidor
                        .then(data => {
                            if (data.success) {
                                linha.remove(); // Remove a linha da tabela se o cancelamento for bem-sucedido
                            } else {
                                alert("Erro ao cancelar: " + (data.erro || "Erro desconhecido.")); // Mostra erro se falhar
                            }
                        })
                        .catch(err => {
                            console.error("Erro ao comunicar com o servidor:", err);
                            alert("Erro ao comunicar com o servidor."); // Erro de rede ou servidor
                        });
                });
            });
        });
});