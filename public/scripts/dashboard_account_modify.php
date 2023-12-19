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
    $new_name = $decoded['Nome'];
    $new_surname = $decoded['Cognome'];
    $new_birthdate = $decoded['Data'];
    $new_cf = $decoded['Cf'];
    $new_location = $decoded['Indirizzo'];

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

    // UPDATE TABLE CLIENTI
    $sql = "UPDATE CLIENTI SET CLIENTI.Nome = '$new_name', CLIENTI.Cognome = '$new_surname', CLIENTI.DataNascita = '$new_birthdate', CLIENTI.CodiceFiscale = '$new_cf', CLIENTI.Indirizzo = '$new_location' WHERE CLIENTI.Id = '$user_id'";
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
