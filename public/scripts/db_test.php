<?php
	header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');
	$servername = "localhost";
	$username = "basidati";
	$password = "";
    $dbname = "my_basidati";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	// Check connection
	if ($conn->connect_error) {
  		die("Connection failed: " . $conn->connect_error);
	}
	$query_text = "SELECT t1, t2 FROM my_basidati.TEST";
    $res = $conn->query($query_text);
    $result = $res->fetch_all(MYSQLI_ASSOC);
    echo JSON_encode($result);
?>