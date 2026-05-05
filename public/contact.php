<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

if (!empty($_POST['website'] ?? '')) {
    http_response_code(204);
    exit;
}

$required = ['name', 'email', 'phone', 'subject', 'message'];
foreach ($required as $f) {
    if (empty(trim($_POST[$f] ?? ''))) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'missing_field', 'field' => $f]);
        exit;
    }
}

$name    = substr(trim($_POST['name']), 0, 200);
$email   = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
$phone   = substr(trim($_POST['phone']), 0, 50);
$company = substr(trim($_POST['company'] ?? ''), 0, 200);
$country = substr(trim($_POST['country'] ?? ''), 0, 100);
$subject = substr(trim($_POST['subject']), 0, 200);
$message = substr(trim($_POST['message']), 0, 4000);

if (!$email) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_email']);
    exit;
}

$strip = function ($s) { return str_replace(["\r", "\n", "%0a", "%0d"], '', $s); };
$name = $strip($name); $email = $strip($email); $subject = $strip($subject);

$to      = 'ahmad@kourabi.com';
$mailSubject = '[Website inquiry] ' . $subject;
$body  = "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n";
if ($company) $body .= "Company: $company\n";
if ($country) $body .= "Country: $country\n";
$body .= "Subject: $subject\n";
$body .= "----------\n";
$body .= $message . "\n";

$headers  = "From: noreply@kourabi.com\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$ok = @mail($to, $mailSubject, $body, $headers);

if ($ok) {
    http_response_code(200);
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
