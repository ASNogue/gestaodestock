<?php
// Inicia a sessão ou mantém a sessão existente
session_start();

// Verifica se o utilizador tem sessão válida com ID e nível de acesso definidos
if (!isset($_SESSION['utilizador_id'], $_SESSION['nivel_acesso'])) {
    http_response_code(401); // Código de resposta HTTP 401 - Não autorizado
    echo json_encode(["erro" => "Sessão inválida"]); // Retorna erro em JSON
    exit(); // Interrompe a execução do script
}

// Guarda os dados da sessão em variáveis para uso posterior
$id = $_SESSION['utilizador_id'];
$nivel = $_SESSION['nivel_acesso'];

// Estabelece ligação à base de dados MySQL
$conn = new mysqli("localhost", "root", "pendulares", "gestao_stock");

// Verifica se houve erro na ligação
if ($conn->connect_error) {
    http_response_code(500); // Código de erro do servidor
    echo json_encode(["erro" => "Erro na ligação à base de dados"]);
    exit();
}

// Verifica o nível de acesso do utilizador
if ($nivel == 1) {
    // Se o utilizador for de nível 1, só vê as suas próprias requisições
    $stmt = $conn->prepare("SELECT * FROM requisicoes_gerais WHERE id_utilizador = ?");
    $stmt->bind_param("i", $id); // Associa o ID do utilizador à query
} else {
    // Se for nível 2 ou superior, vê todas as requisições
    $stmt = $conn->prepare("SELECT * FROM requisicoes_gerais");
}

// Executa a query preparada
$stmt->execute();

// Obtém o resultado da query
$result = $stmt->get_result();

// Inicializa um array para guardar as requisições
$requisicoes = [];

// Percorre os resultados e adiciona ao array
while ($row = $result->fetch_assoc()) {
    $requisicoes[] = $row;
}

// Devolve os dados em formato JSON
echo json_encode($requisicoes);
?>
