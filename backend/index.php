<?php
require_once __DIR__ . '/config.php';

class API
{
    function Select()
    {
        $db = new Connect;
        $data = array();
        $dataFromMysql = $db->prepare('SELECT * FROM data ORDER BY id ASC');
        $dataFromMysql->execute();
        while ($OutputData = $dataFromMysql->fetch(PDO::FETCH_ASSOC)) {
            array_push($data, array(
                'id' => $OutputData['id'],
                'date' => $OutputData['date'],
                'name' => $OutputData['name'],
                'quantity' => $OutputData['quantity'],
                'distance' => $OutputData['distance']
            ));
        }
        return json_encode($data);
    }

    function SelectWithParameters($filterColumn, $filterCondition, $filterParameter, $sortingColumn, $sortingOrder)
    {
        $db = new Connect;
        $data = array();

        if ($sortingColumn != 'date' &&
            $sortingColumn != 'name' &&
            $sortingColumn != 'quantity' &&
            $sortingColumn != 'distance') {
            $sortingColumn = 'id';
        }

        if ($sortingOrder == 'descending') {
            $sortingOrder = 'DESC';
        } else {
            $sortingOrder = "ASC";
        }

        if ($filterColumn != 'date' &&
            $filterColumn != 'name' &&
            $filterColumn != 'quantity' &&
            $filterColumn != 'distance') {

            $filterColumn = '';
        }

        if ($filterCondition == 'equals') {
            if ($filterColumn) {
                $filterCondition = ' WHERE ' . $filterColumn . ' = \'' . $filterParameter . '\' ';
            }
        } else if ($filterCondition == 'contains') {
            if ($filterColumn) {
                $filterCondition = 'WHERE ' . $filterColumn . ' LIKE \'%' . $filterParameter . '%\' ';
            }
        } else if ($filterCondition == 'moreThen') {
            if ($filterColumn) {
                $filterCondition = 'WHERE ' . $filterColumn . ' > ' . $filterParameter . ' ';
            }
        } else if ($filterCondition == 'lessThen') {
            if ($filterColumn) {
                $filterCondition = 'WHERE ' . $filterColumn . ' < ' . $filterParameter . ' ';
            }
        }

        $statement = 'SELECT * FROM data ' . $filterCondition . 'ORDER BY ' . $sortingColumn . ' ' . $sortingOrder . ';';

        $dataFromMysql = $db->prepare($statement);
        $dataFromMysql->execute();
        while ($OutputData = $dataFromMysql->fetch(PDO::FETCH_ASSOC)) {
            array_push($data, array(
                'id' => $OutputData['id'],
                'date' => $OutputData['date'],
                'name' => $OutputData['name'],
                'quantity' => $OutputData['quantity'],
                'distance' => $OutputData['distance']
            ));
        }
        return json_encode($data);
    }
}


$API = new API;
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