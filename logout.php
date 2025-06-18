<?php
// Inicia ou continua a sessão atual
session_start();

// Remove todas as variáveis de sessão
session_unset();

// Destrói completamente a sessão ativa (termina a sessão do utilizador)
session_destroy();

// Redireciona o utilizador para a página inicial (login)
header("Location: index.php");
exit();
