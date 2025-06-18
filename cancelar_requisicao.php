<?php
session_start(); // Inicia ou continua a sessão



// Verifica se o utilizador está autenticado
if (!isset($_SESSION['utilizador_id'], $_SESSION['nivel_acesso'])) {
    file_put_contents("debug_cancelar.txt", "Utilizador não autenticado\n", FILE_APPEND);
    echo json_encode(["success" => false, "erro" => "Não autenticado"]);
    exit();
}

// Lê os dados JSON recebidos na requisição
$data = json_decode(file_get_contents("php://input"), true);
file_put_contents("debug_cancelar.txt", "Dados recebidos: " . print_r($data, true), FILE_APPEND);

// Extrai a nomenclatura e a data/hora da requisição a cancelar
$nomenclatura = $data['nomenclatura'] ?? null;
$dataHora = $data['dataHora'] ?? null;
file_put_contents("debug_cancelar.txt", "Nomenclatura: $nomenclatura | DataHora: $dataHora\n", FILE_APPEND);

// Verifica se os dados obrigatórios foram fornecidos
if (!$nomenclatura || !$dataHora) {
    file_put_contents("debug_cancelar.txt", "Dados em falta\n", FILE_APPEND);
    echo json_encode(["success" => false, "erro" => "Dados em falta"]);
    exit();
}

// Conecta à base de dados
$conn = new mysqli("localhost", "root", "pendulares", "gestao_stock");
if ($conn->connect_error) {
    file_put_contents("debug_cancelar.txt", "Erro na ligação à base de dados\n", FILE_APPEND);
    echo json_encode(["success" => false, "erro" => "Erro na ligação à base de dados"]);
    exit();
}

$nivel = $_SESSION['nivel_acesso'];
$idSessao = $_SESSION['utilizador_id'];

// Busca a quantidade da requisição a cancelar
if ($nivel == 1) {
    file_put_contents("debug_cancelar.txt", "Utilizador nível 1\n", FILE_APPEND);
    $stmt = $conn->prepare("SELECT quantidade FROM requisicoes_gerais WHERE nomenclatura = ? AND dataHora = ? AND id_utilizador = ?");
    $stmt->bind_param("ssi", $nomenclatura, $dataHora, $idSessao);
} else {
    file_put_contents("debug_cancelar.txt", "Utilizador nível 2+\n", FILE_APPEND);
    $stmt = $conn->prepare("SELECT quantidade FROM requisicoes_gerais WHERE nomenclatura = ? AND dataHora = ?");
    $stmt->bind_param("ss", $nomenclatura, $dataHora);
}

$stmt->execute();
$result = $stmt->get_result();

// Verifica se a requisição foi encontrada
if (!$row = $result->fetch_assoc()) {
    echo json_encode(["success" => false, "erro" => "Requisição não encontrada"]);
    exit();
}

$quantidade = (int) $row['quantidade'];
file_put_contents("debug_cancelar.txt", "Quantidade a repor: $quantidade\n", FILE_APPEND);

// Repõe a quantidade no stock
$stmt_update = $conn->prepare("UPDATE stock SET quantidade = quantidade + ? WHERE nomenclatura = ?");
$stmt_update->bind_param("is", $quantidade, $nomenclatura);
$stmt_update->execute();

// Apaga a requisição da tabela
$stmt_delete = $conn->prepare("DELETE FROM requisicoes_gerais WHERE nomenclatura = ? AND dataHora = ?");
$stmt_delete->bind_param("ss", $nomenclatura, $dataHora);
$stmt_delete->execute();

file_put_contents("debug_cancelar.txt", "Requisição cancelada com sucesso\n", FILE_APPEND);
echo json_encode(["success" => true]);
exit();
