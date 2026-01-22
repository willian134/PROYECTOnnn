<?php
header('Content-Type: application/json');

// Tu API Key de OpenAI (manténla secreta)
$api_key = "TU_API_KEY_AQUI";

// Obtener el mensaje del usuario
$data = json_decode(file_get_contents('php://input'), true);
$message = $data['message'] ?? '';

if (!$message) {
    echo json_encode(['reply' => 'No se recibió mensaje']);
    exit;
}

// Llamada a OpenAI
$ch = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer $api_key"
]);

$post_fields = json_encode([
    'model' => 'gpt-3.5-turbo',
    'messages' => [
        ['role' => 'user', 'content' => $message]
    ],
    'max_tokens' => 150
]);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);

$response = curl_exec($ch);

if(curl_errno($ch)){
    echo json_encode(['reply' => 'Error en la conexión']);
    curl_close($ch);
    exit;
}

curl_close($ch);
$responseData = json_decode($response, true);
$reply = $responseData['choices'][0]['message']['content'] ?? 'No se obtuvo respuesta';

echo json_encode(['reply' => $reply]);
