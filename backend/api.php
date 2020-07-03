<?php

class API
{
    private $db;
    private $data;

    function __construct()
    {
        $this->db = new Connect();
        $this->data = array();
    }

    function Select()
    {
        $db =  $this->db;
        $data = $this->data;
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
        $db = $this->db;
        $data = $this->data;

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