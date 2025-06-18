<?php
// Inicia a sessão (mantém dados entre pedidos do utilizador)
session_start();

// Define o tipo de conteúdo da resposta como JSON
header('Content-Type: application/json');

// Parâmetros da ligação à base de dados
$host = "localhost";
$dbname = "gestao_stock";
$user = "root";
$password = "pendulares";

try {
    // Cria uma ligação PDO à base de dados MySQL
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Ativa os erros como exceções

    // Lê os dados enviados no corpo da requisição (espera JSON)
    $data = json_decode(file_get_contents("php://input"), true);

    // Extrai o termo de pesquisa, ou usa string vazia se não for fornecido
    $termo = isset($data["termo"]) ? $data["termo"] : "";

    // Prepara a query SQL com junção entre tabelas stock e equipamentos
    $stmt = $pdo->prepare("
        SELECT s.nomenclatura, e.designacao, s.quantidade, e.localizacao
        FROM stock s
        JOIN equipamentos e ON s.nomenclatura = e.nomenclatura
        WHERE s.nomenclatura LIKE :termo
    ");

    // Executa a query substituindo :termo pelo termo com wildcard para pesquisa parcial
    $stmt->execute([':termo' => "%$termo%"]);

    // Vai buscar todos os resultados como array associativo
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retorna os resultados em formato JSON
    echo json_encode($resultados);
} catch (PDOException $e) {
    // Em caso de erro na base de dados, devolve uma mensagem de erro
    echo json_encode(["error" => "Erro na base de dados: " . $e->getMessage()]);
}
?>
