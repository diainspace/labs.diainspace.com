<?php
declare(strict_types=1);
require __DIR__ . '/backend/private/routes.php';
$route = labRoute($_SERVER['REQUEST_URI'] ?? '/');
http_response_code($route['status']);
$entry = null;
$manifestPath = __DIR__ . '/assets/build/.vite/manifest.json';
if (is_file($manifestPath)) {
    $manifest = json_decode(file_get_contents($manifestPath), true);
    $entry = $manifest['src/main.tsx'] ?? null;
}
if (!$entry) {
    http_response_code(503);
    header('Retry-After: 60');
}
function escape(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="rebel-permissions" content="index, render">
    <meta name="rebel-storage" content="full">
    <title><?= escape($route['title']) ?> — labs.diainspace.com</title>
    <meta name="description" content="A playground for curious ideas, questionable solutions, and delightfully serious engineering.">
    <meta name="theme-color" content="#1237ff">
    <?php foreach ($entry['css'] ?? [] as $css): ?>
    <link rel="stylesheet" href="/assets/build/<?= escape($css) ?>">
    <?php endforeach; ?>
</head>
<body>
<?php if ($entry): ?>
    <div id="root"></div>
    <noscript><h1>LAB</h1><p>This React learning laboratory needs JavaScript enabled to display its experiments.</p></noscript>
    <script type="module" src="/assets/build/<?= escape($entry['file']) ?>"></script>
<?php else: ?>
    <main><h1>The lab is getting ready.</h1><p>Please check back shortly.</p></main>
<?php endif; ?>
</body>
</html>
