<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');
    $servername = "localhost";
    $username = "basidati";
    $password = "";
    $dbname = "my_basidati";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $email = $decoded['email'];
    $pass = $decoded['password'];
    $firstName = $decoded['firstName'];
    $lastName = $decoded['lastName'];
    $cfId = $decoded['cfId'];
    $dateOfBirth = $decoded['dateOfBirth'];
    $address = $decoded['address'];

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // TODO: Implementare tramite procedure
    // TODO: Adattare alla nuova configurazione della base dati

    $sql1 = "INSERT INTO my_basidati.CLIENTI (Nome,Cognome,DataNascita,CodiceFiscale,Indirizzo) VALUES ('$firstName', '$lastName', '$dateOfBirth', '$cfId', '$address')";
    $sql2 = "INSERT INTO my_basidati.UTENTI (Email,Password,Cliente) VALUES ('$email', '$pass', '$cfId')";
    $res1 = $conn->query($sql1);
    $res2 = $conn->query($sql2);

    $output->res = 0;
    //$output->email_got = $decoded['email'];  
    //$output->password_got = $decoded['password'];

    if ($res1 === TRUE && $res2 === TRUE) {
        $output->res = 1;
    } else {
        $sql1_undo = "DELETE FROM UTENTI WHERE UTENTI.Email = '$email'";
        $sql2_undo = "DELETE FROM CLIENTI WHERE CLIENTI.CodiceFiscale = '$cfId'";
        $conn->query($sql1_undo);
        $conn->query($sql2_undo);
        $output->res = -1;
    }
        
    echo JSON_encode($output);
?>