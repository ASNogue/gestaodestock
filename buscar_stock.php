<?php
session_start();
header('Content-Type: application/json');

// Conexão com a base de dados
$conn = new mysqli("localhost", "root", "pendulares", "gestao_stock");

if ($conn->connect_error) {
    echo json_encode(["error" => "Erro na ligação com o servidor!"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$termo = isset($data["termo"]) ? $data["termo"] : "";

// Adiciona wildcards para pesquisa parcial
$likeTermo = "%" . $termo . "%";

$stmt = $conn->prepare("
    SELECT nomenclatura, designacao, quantidade, localizacao
    FROM stock 
    WHERE nomenclatura LIKE ?
");

if (!$stmt) {
    echo json_encode(["error" => "Erro na preparação da query!"]);
    $conn->close();
    exit();
}

$stmt->bind_param("s", $likeTermo);

if (!$stmt->execute()) {
    echo json_encode(["error" => "Erro na execução da query!"]);
    $stmt->close();
    $conn->close();
    exit();
}

$resultados = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
echo json_encode($resultados);

$stmt->close();
$conn->close();
?>
