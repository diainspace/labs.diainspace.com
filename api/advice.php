<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function respond(int $status, array $data): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST'); respond(405, ['error' => 'Please submit the actual dilemma.']);
}
$body = file_get_contents('php://input', false, null, 0, 4097);
if (strlen($body) > 4096) respond(413, ['error' => 'A dilemma, not your complete memoirs.']);
$data = json_decode($body, true);
if (!is_array($data) || !is_string($data['question'] ?? null)) respond(400, ['error' => 'A question would help.']);
$question = trim($data['question']);
if ($question === '' || strlen($question) > 960 || !preg_match('//u', $question)) respond(422, ['error' => 'Please provide a question of reasonable length.']);
$previous = is_string($data['previous'] ?? null) ? substr($data['previous'], 0, 80) : null;
require dirname(__DIR__) . '/backend/private/advice.php';
try { respond(200, departmentalAdvice($question, $previous)); }
catch (RuntimeException $error) { respond(503, ['error' => $error->getMessage()]); }
catch (Throwable $error) { error_log('Indecision Engine: unexpected search failure'); respond(503, ['error' => 'The department is temporarily unavailable. Try again shortly.']); }
