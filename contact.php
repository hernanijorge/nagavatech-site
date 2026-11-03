<?php
/**
 * NagavaTech — contact form handler for real Apache/PHP hosting (e.g. Hostinger
 * shared hosting public_html). NOT active on the current production deployment,
 * which is a static nginx container with no PHP — the live form falls back to a
 * mailto: link (see js/main.js). Kept here so the site is portable to PHP hosting
 * exactly as originally specced. See README.md.
 */

header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Method not allowed"]);
    exit;
}

// Honeypot: real users never fill this hidden field.
if (!empty($_POST["company_website"])) {
    echo json_encode(["ok" => true]); // silently accept, do nothing
    exit;
}

$name    = trim($_POST["name"] ?? "");
$email   = trim($_POST["email"] ?? "");
$subject = trim($_POST["subject"] ?? "NagavaTech contact form");
$message = trim($_POST["message"] ?? "");

$errors = [];
if ($name === "") $errors[] = "name";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "email";
if ($message === "") $errors[] = "message";

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(["ok" => false, "error" => "invalid_fields", "fields" => $errors]);
    exit;
}

$to = "nagatech@gmail.com";
$mailSubject = "[NagavaTech contact] " . $subject;

$body = "New message from the nagavatech.tech contact form\n\n";
$body .= "Name: {$name}\n";
$body .= "Email: {$email}\n\n";
$body .= "{$message}\n";

$headers = [];
$headers[] = "From: NagavaTech Site <no-reply@nagavatech.tech>";
$headers[] = "Reply-To: " . $name . " <" . $email . ">";
$headers[] = "Content-Type: text/plain; charset=utf-8";

$sent = mail($to, $mailSubject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(["ok" => true]);
} else {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "mail_failed"]);
}
