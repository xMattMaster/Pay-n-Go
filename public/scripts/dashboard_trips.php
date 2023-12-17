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

    $Id = $decoded['user_id'];

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

    $sql = "SELECT CONCAT(T.NumTragitto, '.', T.Dispositivo) AS Id, T.NumTragitto,
                T.Dispositivo,
                CONCAT(C1.Codice, ', ', C1.Numero) AS CasIngresso,
                T.DataOraIngresso,
                CONCAT(C2.Codice, ', ', C2.Numero) AS CasUscita,
                T.DataOraUscita
            FROM (TRAGITTI T JOIN CASELLI C1 ON T.Casello_Ingresso=C1.Id) JOIN CASELLI C2 ON T.Casello_Uscita=C2.Id
            WHERE T.Dispositivo IN (
                SELECT ADA.Dispositivo
                FROM (APPARTENENZE_AUTO AA JOIN AUTOMOBILI A ON AA.Automobile = A.Targa) JOIN ASSOCIAZIONI_DISP_AUTO ADA ON A.Targa = ADA.Automobile
                WHERE AA.Cliente = $Id
            )
            ORDER BY T.DataOraUscita DESC";
    try {
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);
        echo JSON_encode($data);
    } catch(mysqli_sql_exception $e) {
        $output->message = $e->getMessage();
        $output->res = -1;
        echo JSON_encode($output);
    }
?>