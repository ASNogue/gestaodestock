<?php
session_start();
if (!isset($_SESSION['utilizador_id'])) {
    header("Location: menu.php"); 
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
    <script src="https://unpkg.com/html5-qrcode"></script>
    <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>

        <div class="header">
                <img src="Logo_empresa_.png" alt="Logo da Empresa" class="logo slide-right">
                </div>
    <h2>Requisitar Equipamentos</h2>
  
    
    <!-- Selecionar comboio -->
    <label for="comboio">Número do Comboio:</label>
    <select id="comboio">
        <option value="selecionar" disabled selected>Selecionar</option>
        <option value="4001">4001</option>
        <option value="4002">4002</option>
        <option value="4003">4003</option>
        <option value="4004">4004</option>
        <option value="4006">4006</option>
        <option value="4007">4007</option>
        <option value="4008">4008</option>
        <option value="4009">4009</option>
        <option value="4010">4010</option>
    </select>
 <!-- Selecionar Inspeção -->
    <label for="inspecao">Tipo de Inspeção:</label>
    <select id="inspecao">
        <option value="selecionar" disabled selected>Selecionar</option>
        <option value="VAN">VAN</option>
        <option value="VAC">VAC</option>
        <option value="VAV">VAV</option>
        <option value="VL">VL</option>
        <option value="IS">IS</option>
        <option value="VS">VS</option>
        <option value="VI">VI</option>
        <option value="RT">RT</option>
        <option value="2RT">2RT</option>
        <option value="3RT">3RT</option>
        <option value="4RT">4RT</option>
        <option value="6RT">6RT</option>
        <option value="12RT">12RT</option>
        <option value="24RT">24RT</option>
        <option value="36RT">36RT</option>
        <option value="72RT">72RT</option>
        <option value="TRF">TRF</option>
    </select>

    <!-- Função para abrir código Qr -->
    <div>
        <button id="botaoQR" onclick="abrirLeitorQR()">Ler Código QR</button>
        <div id="qr-reader"></div> 
        <p id="codigoLido">Código QR: </p>
    </div>>
<!-- Campo para quantidade de produto a requesitar -->
    <label for="quantidade">Quantidade:</label>
    <input type="number" id="quantidade" placeholder="Insira a quantidade" required>
    <br><br>

    <button onclick="enviarDados()">Enviar</button>
    
    <button onclick="reiniciarFormulario()">Reiniciar Requisição</button>

    <button class="botao-inicio" onclick="window.location.href='index.php'">Voltar ao Início</button>

    <footer>
        &copy; 2025 Gestão de Stock - Projeto André Nogueira.
    </footer>
    <script src="script_requisitar.js"> </script>
</body>

</html>
