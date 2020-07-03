<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/api.php';

$API = new API();
header('Content-Type: application/json');

if ($_SERVER[REQUEST_METHOD] == "GET") {
    echo $API->Select();
} else if ($_SERVER[REQUEST_METHOD] == "POST") {
    $receivedData = json_decode(file_get_contents('php://input'));

    $filterColumn = $receivedData->{'filterColumn'};
    $filterCondition = $receivedData->{'filterCondition'};
    $filterParameter = $receivedData->{'filterParameter'};

    $sortingColumn = $receivedData->{'sortingColumn'};
    $sortingOrder = $receivedData->{'sortingOrder'};

    echo $API->SelectWithParameters($filterColumn, $filterCondition, $filterParameter, $sortingColumn, $sortingOrder);
} else {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}