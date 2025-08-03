<?php
session_start();

if (isset($_SESSION['utilizador_id'])) {
    header("Location: menu.php");
    exit();
}

// Verifica se há mensagem de erro
$erro_login = isset($_SESSION['erro_login']) ? $_SESSION['erro_login'] : '';
unset($_SESSION['erro_login']); // Limpa a mensagem após usar
?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gestão de Stock - Armazém</title>
    <link rel="stylesheet" href="style.css" />
    <?php if (!empty($erro_login)): ?>
    <script>
        window.onload = function() {
            alert("<?php echo htmlspecialchars($erro_login, ENT_QUOTES); ?>");
        };
    </script>
    <?php endif; ?>
</head>
<body>
    <div class="header">
        <img src="Logo_empresa_.png" alt="Logo da Empresa" class="logo slide-right" />
    </div>
    
    <h2>Inserir Dados</h2>
    <form method="POST" action="validar_id.php">
        <label for="dataInput">ID:</label>
        <input type="text" id="dataInput" name="id" required>
        <label for="dataPassword">Password:</label>
        <input type="password" id="dataPassword" name="password" required>
        <button type="submit">Entrar</button>
    </form>
      <footer>
        &copy; 2025 Gestão de Stock - Projeto André Nogueira.
    </footer>
</body>
</html>
