<?php
session_start();
if (!isset($_SESSION['utilizador_id'])) {
    header("Location: menu.php"); // ficheiro pagina inicial
    exit();
}
?>

<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de Stock - Armazém</title>
    <link rel="stylesheet" href="style.css">
    <script src="script_consultar_requi.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>

    <div class="header">
        <img src="Logo_empresa_.png" alt="Logo da Empresa" class="logo slide-right">
    </div>
    <div class="content">
        <h1>Consultar Requisições</h1>

        <div class="requisicoes_container">
            <h2>Requisições</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID do utilizador</th>
                        <th>Nomenclatura</th>
                        <th>Designação</th>
                        <th>Quantidade</th>
                        <th>Comboio</th>
                        <th>Inspeção</th>
                        <th>Data/Hora</th>
                        <th>Cancelar Requisição</th>
                    </tr>
                </thead>
                <tbody id="tabela-requisicoes-gerais">

                    <!-- As requisições serão inseridas aqui dinamicamente -->
                </tbody>
            </table>

         
            <button class="refreshButton" onclick="window.location.href='consultar_requisicoes.php'">Atualizar Requisições</button>
        
        </div>
    </div>

    <button class="botao-inicio" onclick="window.location.href='index.php'">Voltar ao Início</button>

    <footer>
        &copy; 2025 Gestão de Stock - Projeto André Nogueira.
    </footer>

</body>

</html>