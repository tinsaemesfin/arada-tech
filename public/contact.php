<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Honeypot check
if (!empty($_POST['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

// Sanitize inputs
$name    = filter_var(trim($_POST['name'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone   = filter_var(trim($_POST['phone'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
$service = filter_var(trim($_POST['service'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
$message = filter_var(trim($_POST['message'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

// Configure recipient -- UPDATE THIS EMAIL
$to = 'qmesfin@gmail.com'; // TODO: Update with your preferred email

$subject = "New Inquiry from {$name} - Arada Tech Website";

$body = "You have received a new inquiry from your website.\n\n";
$body .= "Name: {$name}\n";
$body .= "Email: {$email}\n";
$body .= "Phone: {$phone}\n";
$body .= "Service: {$service}\n\n";
$body .= "Message:\n{$message}\n\n";
$body .= "---\n";
$body .= "Sent from: aradatech.com contact form\n";
$body .= "Time: " . date('Y-m-d H:i:s') . "\n";
$body .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

$headers = "From: noreply@aradatech.com\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Unable to send the message. Please try again or email us directly.']);
}
