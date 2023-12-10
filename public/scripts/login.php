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
    $clearPassword = $decoded['password'];

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
        $result_utenti = $conn->query($query_utenti);
        if ($result_utenti->num_rows > 0) {  // If the query returned something
            $data_retrieved = $result_utenti->fetch_array(MYSQLI_ASSOC);
            if (password_verify($clearPassword, $data_retrieved['Password']))
            {
                $clientId = $data_retrieved['Cliente'];
                $query_clienti = "SELECT C.Nome, C.Cognome FROM CLIENTI C WHERE C.Id ='$clientId'";
                $result_clienti = $conn->query($query_clienti);
                $client_info = $result_clienti-> fetch_array(MYSQLI_ASSOC);
                $output->id = $data_retrieved['Cliente'];
                $output->nome = $client_info['Nome'];
                $output->cognome = $client_info['Cognome'];
                $output->message = "OK";
                $output->res = 1;
                echo JSON_encode($output);
            }
            else
            {
                $output->message = "Password errata";
                $output->res = 0;
                echo JSON_encode($output);
            }
        
        } else {
            $output->message = "Nessun utente associato all'email inserita trovato";
            $output->res = -1;
            echo JSON_encode($output);
        }
       
    } catch(mysqli_sql_exception $e) {
        $output->message = $e->getMessage();
        $output->res = -2;
        echo JSON_encode($output);
    }
?>