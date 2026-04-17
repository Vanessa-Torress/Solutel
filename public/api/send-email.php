<?php
/**
 * PHP Native Mail Script for Solutel
 * This replaces the Node.js backend when hosted on static/shared PHP hostings like KingHost.
 */

// Allow CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Configuration
$target_email = "adm@solutel.com.br"; // The destination email
$sender_email = "adm@solutel.com.br"; // Ensure this matches your Kinghost domain to prevent spam block

// Helper function to return JSON and exit
function sendResponse($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

// Initialize variables
$type = $_POST['type'] ?? '';
$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$area = $_POST['area'] ?? '';
$vaga = $_POST['vaga'] ?? '';
$mensagem = $_POST['mensagem'] ?? '';
$assuntoBody = $_POST['assunto'] ?? '';

// Support application/json (for "Fale Conosco" budget form)
$json = file_get_contents('php://input');
if ($json) {
    $data = json_decode($json, true);
    if ($data) {
        $type = $data['type'] ?? $type;
        $nome = $data['nome'] ?? $nome;
        $email = $data['email'] ?? $email;
        $telefone = $data['telefone'] ?? $telefone;
        $area = $data['area'] ?? $area;
        $vaga = $data['vaga'] ?? $vaga;
        $mensagem = $data['mensagem'] ?? $mensagem;
        $assuntoBody = $data['assunto'] ?? $assuntoBody;
    }
}

// Validation
if (empty($nome) || empty($email)) {
    sendResponse(400, ['error' => 'Nome e e-mail são obrigatórios.']);
}

// Strict Subject Rules logic mapped from original Node.js backend
$subject = "";
if ($type === 'currículo') {
    $role = $vaga ? $vaga : $area;
    $subject = "[Currículo] - " . $role . " - " . $nome;
} elseif ($type === 'orçamento') {
    $subject = "[Orçamento] - " . $nome;
} else {
    $subject = !empty($assuntoBody) ? $assuntoBody : "Novo Contato de " . $nome;
}

// Build the Message Body
$body = "Novo formulário recebido via site:\n\n";
if ($type) $body .= "Tipo: " . strtoupper($type) . "\n";
$body .= "Nome: " . $nome . "\n";
$body .= "E-mail: " . $email . "\n";
$body .= "Telefone: " . (!empty($telefone) ? $telefone : 'N/A') . "\n";
if (!empty($vaga)) $body .= "Vaga Desejada: " . $vaga . "\n";
if (!empty($area)) $body .= "Área de Interesse: " . $area . "\n";
$body .= "\nMensagem:\n" . (!empty($mensagem) ? $mensagem : 'Sem mensagem adicional.');

// Email Headers & boundary for Mixed multipart (text + attachments)
$boundary = md5(time());

$headers = "From: " . $sender_email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Build email content structure
$message = "--" . $boundary . "\r\n";
$message .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
$message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$message .= $body . "\r\n";

// Handle Optional Curriculum File Upload
if (isset($_FILES['curriculo']) && $_FILES['curriculo']['error'] == UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['curriculo']['tmp_name'];
    $fileName = $_FILES['curriculo']['name'];
    $fileType = $_FILES['curriculo']['type'];
    
    // Read and encode file
    $fileData = file_get_contents($fileTmpPath);
    $fileData = chunk_split(base64_encode($fileData));

    $message .= "--" . $boundary . "\r\n";
    $message .= "Content-Type: " . $fileType . "; name=\"" . $fileName . "\"\r\n";
    $message .= "Content-Disposition: attachment; filename=\"" . $fileName . "\"\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $message .= $fileData . "\r\n";
}

$message .= "--" . $boundary . "--";

// Attempt to send
if (mail($target_email, $subject, $message, $headers)) {
    sendResponse(200, ['success' => true, 'message' => 'E-mail enviado com sucesso!']);
} else {
    // Return standard error to interface
    sendResponse(500, ['error' => 'Falha ao processar o e-mail no servidor da Kinghost. Verifique se o e-mail From está habilitado.']);
}
