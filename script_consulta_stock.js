
document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm'); // Formulário de consulta
    const resultContainer = document.getElementById('resultContainer'); // Contentor de resultados
    const resultTableBody = document.querySelector('#resultTable tbody'); // Corpo da tabela

    if (searchForm) {
        searchForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // faz get o valor do campo de entrada
            const searchInput = document.getElementById('searchInput').value;

            if (searchInput) {
                // Simula uma consulta e mostra os resultados
                console.log(`Consultando o produto com código: ${searchInput}`);

                
                // Exibe o contentor de resultados
                resultContainer.classList.remove('hidden');
            } else {
                alert('Por favor, insira um código de produto válido.');
            }
        });
    } else {
        console.error('Elemento com ID "searchForm" não encontrado.');
    }
});