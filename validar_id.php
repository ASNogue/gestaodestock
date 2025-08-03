<?php
session_start();
header('Content-Type: application/json');

// Verifica se os dados foram enviados via POST
if (!isset($_POST['id'], $_POST['password']) || empty($_POST['id']) || empty($_POST['password'])) {
    $_SESSION['erro_login'] = "Preencha todos os campos!";
    header("Location: index.php");
    exit();
}

$id = $_POST['id'];
$password = $_POST['password'];

// Conexão com a base de dados
$conn = new mysqli("localhost", "root", "pendulares", "gestao_stock");

if ($conn->connect_error) {
    $_SESSION['erro_login'] = "Erro na ligação com o servidor!";
    header("Location: index.php");
    exit();
}

// Consulta preparada
$stmt = $conn->prepare("SELECT nome, nivel_acesso FROM dados_acesso WHERE id = ? AND password = ?");
$stmt->bind_param("ss", $id, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    $_SESSION['utilizador_id'] = $id;
    $_SESSION['nome'] = $row['nome'];
    $_SESSION['nivel_acesso'] = $row['nivel_acesso'];
    header("Location: menu.php");
    exit();
} else {
    $_SESSION['erro_login'] = "ID ou password incorretos!";
    header("Location: index.php");
    exit();
}
?>
