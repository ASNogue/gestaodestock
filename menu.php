<?php
session_start();
if (!isset($_SESSION['utilizador_id'])) {
    header("Location:index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <title>Menu Principal</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gestão de Stock - Armazém</title>
    <link rel="stylesheet" href="style.css" />
  
    
</head>
<body> 
<div class="header">
            <img src="Logo_empresa_.png" alt="Logo da Empresa" class="logo slide-right">
            </div>
    <h2>Bem-vindo, <?php echo $_SESSION['nome']; ?>!</h2>
    <p>Escolha uma opção:</p>
    <div class="options-container">
        <ul>
            <li><a href="requisitar_equipamentos.php" id="option1">Requisitar Equipamentos</a></li>
            <li><a href="consultar_requisicoes.php" id="option2">Consultar Requisições</a></li>
            <li><a href="consultar_stock.php" id="option3">Consultar Stock</a></li>
            <li><a href="logout.php">Terminar Sessão</a></li>
        </ul>
    </div>

    </ul>
  
    <footer>
        &copy; 2025 Gestão de Stock - Projeto André Nogueira.
    </footer>
</body>
</html>
