<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');
    $servername = "REDACTED_FOR_SECURITY_REASONS";
    $username = "REDACTED_FOR_SECURITY_REASONS";
    $password = "REDACTED_FOR_SECURITY_REASONS";
    $dbname = "REDACTED_FOR_SECURITY_REASONS";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $user_id = $decoded['user_id'];
    $targa = $decoded['targa'];
    $model = $decoded['model'];
    $device = $decoded['device'];

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    $output = new \stdClass();
    $output->res = 0;
    $output->message = "";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "";

    if ($device == "-1") {
        $sql = "CALL procedure_associazione_auto('$user_id','$targa','$model','$device', 0)"
    } else {
        $sql = "CALL procedure_associazione_auto('$user_id','$targa','$model','$device', 1)";
    }
    // UPDATE TABLE CLIENTI
    try {
        $res = $conn->query($sql);
        $output->message = "OK";
        $output->res = 1;
        echo JSON_encode($output);
    } catch(mysqli_sql_exception $e) {
        $output->message = $e->getMessage();
        $output->res = -1;
        echo JSON_encode($output);
    }
?>
