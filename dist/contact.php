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

// ── Resend API Configuration ──
$RESEND_API_KEY = 'YOUR_RESEND_API_KEY'; // Replace with your Resend API key (starts with re_)
$TO_EMAIL       = 'qmesfin@gmail.com';
$FROM_EMAIL     = 'Arada Tech <noreply@aradatech.com>';

$subject = "New Inquiry from {$name} - Arada Tech Website";

$html  = "<h2>New Contact Form Submission</h2>";
$html .= "<table style='border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;'>";
$html .= "<tr><td style='padding:8px 12px;border-bottom:1px solid #eee;color:#666;width:120px;'><strong>Name</strong></td><td style='padding:8px 12px;border-bottom:1px solid #eee;'>{$name}</td></tr>";
$html .= "<tr><td style='padding:8px 12px;border-bottom:1px solid #eee;color:#666;'><strong>Email</strong></td><td style='padding:8px 12px;border-bottom:1px solid #eee;'><a href='mailto:{$email}'>{$email}</a></td></tr>";
$html .= "<tr><td style='padding:8px 12px;border-bottom:1px solid #eee;color:#666;'><strong>Phone</strong></td><td style='padding:8px 12px;border-bottom:1px solid #eee;'>{$phone}</td></tr>";
$html .= "<tr><td style='padding:8px 12px;border-bottom:1px solid #eee;color:#666;'><strong>Service</strong></td><td style='padding:8px 12px;border-bottom:1px solid #eee;'>{$service}</td></tr>";
$html .= "</table>";
$html .= "<div style='margin-top:16px;padding:16px;background:#f9f9f9;border-radius:8px;font-family:sans-serif;'>";
$html .= "<strong style='color:#666;'>Message:</strong><br><br>{$message}";
$html .= "</div>";
$html .= "<hr style='margin-top:24px;border:none;border-top:1px solid #eee;'>";
$html .= "<p style='font-size:12px;color:#999;font-family:sans-serif;'>Sent from aradatech.com contact form &bull; " . date('Y-m-d H:i:s') . "</p>";

$payload = json_encode([
    'from'     => $FROM_EMAIL,
    'to'       => [$TO_EMAIL],
    'subject'  => $subject,
    'html'     => $html,
    'reply_to' => $email,
]);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $RESEND_API_KEY,
        'Content-Type: application/json',
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Unable to send the message. Please try again or email us directly.']);
    exit;
}

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Unable to send the message. Please try again or email us directly.']);
}
