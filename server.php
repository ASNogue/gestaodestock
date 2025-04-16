<?php

// Set the host and port
$host = '127.0.0.1';
$port = 8080;

// criar a socket
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if (!$socket) {
    die("Socket creation failed: " . socket_strerror(socket_last_error()) . "\n");
}

// Bind the socket to the host and port
if (!socket_bind($socket, $host, $port)) {
    die("Socket bind failed: " . socket_strerror(socket_last_error($socket)) . "\n");
}

// Start listening for connections
if (!socket_listen($socket)) {
    die("Socket listen failed: " . socket_strerror(socket_last_error($socket)) . "\n");
}

echo "Server started on $host:$port\n";

while (true) {
    // Accept a client connection
    $client = socket_accept($socket);
    if (!$client) {
        echo "Client connection failed: " . socket_strerror(socket_last_error($socket)) . "\n";
        continue;
    }

    // Read data from the client
    $request = socket_read($client, 1024);
    echo "Received request:\n$request\n";

    // Send a response to the client
    $response = "HTTP/1.1 200 OK\r\n";
    $response .= "Content-Type: text/plain\r\n\r\n";
    $response .= "Hello, World!";
    socket_write($client, $response);

    // Close the client connection
    socket_close($client);
}

// Close the server socket
socket_close($socket);
?>