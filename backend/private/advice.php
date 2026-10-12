<?php
declare(strict_types=1);

function departmentalAdvice(string $question, ?string $previous): array
{
    $catalog = require __DIR__ . '/advice-catalog.php';
    $best = null; $bestScore = 0;
    foreach ($catalog as $topic => $entry) {
        $score = 0;
        foreach ($entry['keywords'] as $keyword) {
            if (preg_match('/(?<![\p{L}\p{N}])' . preg_quote($keyword, '/') . '(?![\p{L}\p{N}])/iu', $question)) $score++;
        }
        if ($score > $bestScore) { $best = $topic; $bestScore = $score; }
    }
    if ($best === null) return ['id' => 'unclassified', 'results' => [], 'message' => 'What is this about—work, food, shopping, housing, relationships, travel, creativity, or putting something off? Be specific.'];
    $entries = $catalog[$best]['advice'];
    $candidates = array_keys($entries);
    $candidates = array_values(array_filter($candidates, static fn ($index): bool => 'local:' . $best . ':' . $index !== $previous));
    $index = $candidates[random_int(0, count($candidates) - 1)];
    $id = 'local:' . $best . ':' . $index;
    return ['id' => $id, 'results' => [['id' => $id, 'advice' => $entries[$index]]]];
}
