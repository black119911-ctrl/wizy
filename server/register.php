<?php

$name = trim(strip_tags(htmlspecialchars($_GET['name'])));
$email = trim(strip_tags(htmlspecialchars($_GET['mail'])));
$phone = trim(strip_tags(htmlspecialchars($_GET['telephone'])));
$password = trim(strip_tags(htmlspecialchars($_GET['password'])));

$db_file = '../database/database.sqlite';

try {
    $db = new PDO("sqlite:$db_file");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Ошибка подключения к базе данных: " . $e->getMessage());
}

// Готовим SQL-запрос с подготовленными выражениями для защиты от инъекций
$stmt = $db->prepare(
    "INSERT INTO users (name, mail, telephone, password, key, expirationDate, isValid)
        VALUES (:name, :email, :phone, :password, :key, :expirationDate, true)"
);

$uuid = generateUuidV4();
$expirationDate = addThreeDaysToCurrentTime();
// Привязываем данные к параметрам
$stmt->bindParam(':name', $name, PDO::PARAM_STR);
$stmt->bindParam(':email', $email, PDO::PARAM_STR);
$stmt->bindParam(':phone', $phone, PDO::PARAM_STR);
$stmt->bindParam(':password', $password, PDO::PARAM_STR);
$stmt->bindParam(':key', $uuid, PDO::PARAM_STR);
$stmt->bindParam(':expirationDate', $expirationDate, PDO::PARAM_STR);

// Выполняем запрос
try {
    $stmt->execute();
    $lastID = $db->lastInsertId();
    // echo "Данные успешно записаны!";
} catch (PDOException $e) {
    die("Ошибка записи в базу данных: " . $e->getMessage());
}


function generateUuidV4(): string {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
                   random_int(0, 0xffff),          // Первые 4 байта
                   random_int(0, 0xffff),          // Следующие 4 байта
                   random_int(0, 0xffff),          // Следующие 4 байта
                   random_int(0, 0x0fff) | 0x4000, // Верхняя половина - фиксированная версия (4)
                   random_int(0, 0x3fff) | 0x8000, // Нижний бит должен быть равен 1
                   random_int(0, 0xffff),          // Оставшиеся 6 байтов
                   random_int(0, 0xffff),
                   random_int(0, 0xffff));
}


function addThreeDaysToCurrentTime() {
    return date('Y-m-d\TH:i:s.vO', strtotime('+30 days'));
}


$result = [
    'result' => true,
    'token' => [
        'userID' => $lastID,
        'key' => $uuid,
        'expirationDate' => $expirationDate,
        'isValid' => true,
    ]
];

echo json_encode($result);