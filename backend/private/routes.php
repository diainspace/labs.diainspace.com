<?php
declare(strict_types=1);

// PHP owns the public route allowlist; Apache forwards clean URLs here.
function labRoute(string $uri): array
{
    $path = parse_url($uri, PHP_URL_PATH) ?: '/';
    $path = '/' . trim($path, '/');
    $pages = [
        '/' => 'Lab',
        '/index.php' => 'Lab',
        '/experiments' => 'Experiments',
        '/whippers' => 'Whippers',
        '/about' => 'About',
        '/experiments/the-indecision-engine' => 'The Indecision Engine',
        '/experiments/the-infinite-canvas' => 'The Infinite Canvas',
        '/experiments/the-bureau-of-lost-buttons' => 'The Bureau of Lost Buttons',
        '/experiments/in-progress' => 'In Progress',
    ];
    return ['title' => $pages[$path] ?? 'Page not found', 'status' => isset($pages[$path]) ? 200 : 404];
}
