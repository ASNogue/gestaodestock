<?php
session_start(); 
header('Content-Type: application/json');

// Verifica se o utilizador está autenticado
if (!isset($_SESSION['utilizador_id'])) {
    echo json_encode(["success" => false, "erro" => "Sessão não iniciada"]);
    exit();
}

// Lê os dados recebidos em formato JSON (via fetch POST)
$data = json_decode(file_get_contents("php://input"), true);

// Verifica se todos os dados necessários foram fornecidos
if (!isset($data['nomenclatura'], $data['quantidade'], $data['comboio'], $data['inspecao'])) {
    echo json_encode(["success" => false, "erro" => "Dados em falta"]);
    exit();
}

// Atribui os dados recebidos a variáveis
$id = $_SESSION['utilizador_id'];
$nomenclatura = $data['nomenclatura'];
$quantidade = (int) $data['quantidade'];
$comboio = $data['comboio'];
$inspecao = $data['inspecao'];

// Liga à base de dados
$conn = new mysqli("localhost", "root", "pendulares", "gestao_stock");

// Verifica se a ligação falhou
if ($conn->connect_error) {
    echo json_encode(["success" => false, "erro" => "Erro na ligação à base de dados"]);
    exit();
}

// Verifica se a nomenclatura existe e tem stock disponível
$stmt_check = $conn->prepare("
    SELECT designacao, quantidade 
    FROM stock 
    WHERE nomenclatura = ?
");
$stmt_check->bind_param("s", $nomenclatura);
$stmt_check->execute();
$result = $stmt_check->get_result();

// Se a nomenclatura não existir no stock
if (!$row = $result->fetch_assoc()) {
    echo json_encode(["success" => false, "erro" => "Nomenclatura não encontrada no stock"]);
    exit();
}

$designacao = $row['designacao'];
$stockAtual = (int) $row['quantidade'];

// Verifica se existe stock suficiente
if ($stockAtual < $quantidade) {
    echo json_encode(["success" => false, "erro" => "Stock insuficiente. Apenas $stockAtual unidades disponíveis."]);
    exit();
}

// Regista a requisição na base de dados
$stmt_insert = $conn->prepare("
    INSERT INTO requisicoes_gerais 
    (id_utilizador, nomenclatura, designacao, quantidade, comboio, inspecao, dataHora) 
    VALUES (?, ?, ?, ?, ?, ?, NOW())
");
$stmt_insert->bind_param("sssiss", $id, $nomenclatura, $designacao, $quantidade, $comboio, $inspecao);

if ($stmt_insert->execute()) {
    // Atualiza o stock, subtraindo a quantidade requisitada
    $stmt_update = $conn->prepare("UPDATE stock SET quantidade = quantidade - ? WHERE nomenclatura = ?");
    $stmt_update->bind_param("is", $quantidade, $nomenclatura);
    $stmt_update->execute();

    echo json_encode(["success" => true]); // Sucesso na requisição
} else {
    echo json_encode(["success" => false, "erro" => "Erro ao guardar a requisição"]); // Falha na inserção
}
?>
