document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo para Requisição do ID
    const requisicoesID = [
        { equipamento: 'Transdutor de pressão', comboio: '4010', inspecao: 'IS', dataHora: '2025-04-28 14:00' },
        { equipamento: 'Cabo Gf4b', comboio: '4008', inspecao: 'VAV', dataHora: '2025-04-27 09:30' }
    ];

    // Dados de exemplo para Requisições Gerais
    const requisicoesGerais = [
        { id: '1000777', equipamento: 'Transdutor de pressão', comboio: '4010', inspecao: 'IS', dataHora: '2025-04-28 14:00' },
        { id: '1000777', equipamento: 'Cabo Gf4b', comboio: '4008', inspecao: 'VAV', dataHora: '2025-04-27 09:30' },
        { id: '1000778', equipamento: 'Pressostato 0-6bar', comboio: '4001', inspecao: 'VS', dataHora: '2025-04-29 16:00' },
    ];

    const tabelaID = document.getElementById('tabela-requisicao-id');
    const tabelaGerais = document.getElementById('tabela-requisicoes-gerais-id');

    // Limpar tabelas antes de preencher (caso seja atualização)
    tabelaID.innerHTML = '';
    tabelaGerais.innerHTML = '';

    // Preencher tabela Requisição do ID
    requisicoesID.forEach(item => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${item.equipamento}</td>
            <td>${item.comboio}</td>
            <td>${item.inspecao}</td>
            <td>${item.dataHora}</td>
            <td><button class="cancelar-btn">Cancelar</button></td>
        `;
        tabelaID.appendChild(linha);
    });

    // Preencher tabela Requisições Gerais
    requisicoesGerais.forEach(item => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${item.id}</td>
            <td>${item.equipamento}</td>
            <td>${item.comboio}</td>
            <td>${item.inspecao}</td>
            <td>${item.dataHora}</td>
            <td><button class="cancelar-btn">Cancelar</button></td>
        `;
        tabelaGerais.appendChild(linha);
    });

    // Evento de clique para cancelar requisição
    document.querySelectorAll('.cancelar-btn').forEach(button => {
        button.addEventListener('click', function() {
            const linha = this.closest('tr');
            linha.remove();
        });
    });

    // Função de Atualizar Requisições (ao carregar no botão)
    document.getElementById('refreshButton').addEventListener('click', function() {
        location.reload(); // Simplesmente recarrega a página
    });
});
