<?php
session_start(); // Inicia ou mantém a sessão

// Verifica se o utilizador está autenticado
if (!isset($_SESSION['utilizador_id'])) {
    header("Location: menu.php"); // Redireciona para a página principal se não houver sessão
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
    <script src="script_consulta_stock.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>

   

</head>

<body>

    <div class="header">
            <img src="Logo_empresa_.png" alt="Logo da Empresa" class="logo slide-right">
            </div>
    <div class="container">
        <!-- Formulário de pesquisa -->
        <h1>Consultar Stock</h1>
      <form id="searchForm">
    <input type="text" id="searchInput" placeholder="Introduza a nomenclatura ou use o leitor QR" required>
    <button type="submit">Pesquisar</button>
    <button type="button" onclick="abrirLeitorQR()">Ler Código QR</button>
</form>

<div id="qr-reader" style="width: 300px; display: none;"></div>


        <div id="resultContainer" class="hidden">
            <h2>Resultados da Consulta</h2>
            <table id="resultTable">
                <thead>
                    <tr>
                        <th>Nomenclatura</th>
                        <th>Designação</th>
                        <th>Quantidade</th>
                        <th>Localização</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>

        <button class="botao-inicio" onclick="window.location.href='menu.php'">Voltar ao Início</button>


        <footer>
            &copy; 2025 Gestão de Stock - Projeto André Nogueira.
        </footer>
</body>
