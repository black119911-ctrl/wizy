<?php

$db_file = '../database/database.sqlite';

try {
    $db = new PDO("sqlite:$db_file");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Ошибка подключения к базе данных: " . $e->getMessage());
}


// UUID, который мы хотим проверить
$userKey = 'ab0a5957-6db3-4151-b401-245759f8f4a2';


// Подготовьте SQL-запрос с проверкой существования указанного UUID
$stmt = $db->prepare("SELECT userID FROM users WHERE key = :uuidKey");
$stmt->bindValue(':uuidKey', $userKey, PDO::PARAM_STR);
$stmt->execute();

// Проверяем количество записей
$userID = $stmt->fetchColumn();


if ($userID !== false) {
    $stmtCabinets = $db->prepare("SELECT cabinetNames, cabinetTimeLefts FROM cabinets WHERE userID = :userID");
    $stmtCabinets->bindValue(':userID', $userID, PDO::PARAM_INT);
    $stmtCabinets->execute();
    $resultCabinets = $stmtCabinets->fetchAll(PDO::FETCH_ASSOC);

    echo "<pre>";
    var_dump($resultCabinets);
    echo "</pre>";
}




die;


if ($resultCount > 0) {
    // echo "UUID существует в таблице.";

    if ($resultCabinets > 0) {
        

    } else {
        echo json_encode([
            "names" => [],
            "timeLefts" => []
        ]);
    }


} else {
    // echo "UUID отсутствует в таблице.";
}

// Закрываем соединение с базой данных
unset($db);
?>