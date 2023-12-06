<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');
    $servername = "localhost";
    $username = "gmhncvbk_registration";
    $password = "TIk^n-1wbdAN";
    $dbname = "gmhncvbk_basidati";

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

    $sql = "CALL REGISTRA_UTENTE ('$firstName', '$lastName', '$dateOfBirth', '$cfId', '$address', '$email', '$pass')";
    $res = $conn->query($sql);

    $output->res = 0;
    //$output->email_got = $decoded['email'];  
    //$output->password_got = $decoded['password'];

    if ($res === TRUE) {
        $output->res = 1;
    } else {
        $output->res = -1;
    }
        
    echo JSON_encode($output);
?>