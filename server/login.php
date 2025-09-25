<?php

$db_file = '../database/database.sqlite';

try {
    $db = new PDO("sqlite:$db_file");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Ошибка подключения к базе данных: " . $e->getMessage());
}

$mail = $_GET['login'] ?? '';
$password = $_GET['password'] ?? '';
$stmt = $db->prepare("SELECT * FROM users WHERE mail = :mail AND password = :password");

// Привязываем значения параметров
$stmt->bindValue(':mail', $mail);
$stmt->bindValue(':password', $password);
$stmt->execute();

// Получаем пользователя
$user = $stmt->fetch(PDO::FETCH_ASSOC);



if ($user) {
    echo json_encode([
        'result' => true,
        'token' => [
            'userID' => $user['userID'],
            'key' => $user['key'],
            'expirationDate' => $user['expirationDate'],
            'isValid' => true
        ]
    ]);
} else {
    echo json_encode([
        'result' => false,
        'token' => [
            'isValid' => false
        ],
        'status' => 'error',
        'message' => 'Логин или пароль неверны.'
    ]);
}