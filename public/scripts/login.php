<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');
    $servername = "localhost";
    $username = "gmhncvbk_login";
    $password = "ah*dQ31ck0ig";
    $dbname = "gmhncvbk_basidati";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $email = $decoded['email'];

    mysqli_report(MYSQLI_REPORT_STRICT | MYSQLI_REPORT_ALL);

    $output = new \stdClass();
    $output->res = 0;
    $output->message = "";
    $output->id = "";
    $output->psw = "";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Query to check if the user exists in database. If exists, send the user_id to client
    $query_utenti = "SELECT U.Cliente, U.Password FROM UTENTI U WHERE U.Email = '$email'";
    try {
        $result = $conn->query($query_utenti);
        if ($result->num_rows > 0) {  // If the query returned something
            $data_retrieved = $result->fetch_array(MYSQLI_ASSOC);
            
            $output->id = $data_retrieved['Cliente'];
            $output->psw = $data_retrieved['Password']; 
            $output->message = "OK";
            $output->res = 1;
            echo JSON_encode($output);
        
        } else {
            $output->message = "Nessun utente associato all'email inserita trovato";
            $output->res = -1;
            echo JSON_encode($output);
        }
       
    } catch(mysqli_sql_exception $e) {
        $output->message = $e->getMessage();
        $output->res = -1;
        echo JSON_encode($output);
    }
?>