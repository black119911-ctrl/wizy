<?php

if (!empty($_POST['authToken'])) {

    $authToken = $_POST['authToken'];
    $db_file = '../database/database.sqlite';

    try {
        $db = new PDO("sqlite:$db_file");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die("Ошибка подключения к базе данных: " . $e->getMessage());
    }

}


$stmt = $db->prepare("SELECT COUNT(*) FROM users WHERE key = :key");
$stmt->bindValue(':key', $authToken);
$stmt->execute();
$count = $stmt->fetchColumn();

$response = [
    'valid' => $count > 0
];

header('Content-Type: application/json');
echo json_encode($response);