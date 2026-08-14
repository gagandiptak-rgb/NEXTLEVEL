<?php
// Set header to receive JSON
header('Content-Type: application/json');

// Get the incoming JSON data from JavaScript
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $name = $data['name'];
    $email = $data['email'];
    $message = $data['message'];

    // --- DATABASE CONNECTION SETUP ---
    $servername = "localhost";
    $username = "your_db_user";
    $password = "your_db_password";
    $dbname = "your_db_name";

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        echo json_encode(["status" => "error", "message" => "Connection failed"]);
        exit();
    }

    // Insert into database safely using prepared statements
    $stmt = $conn->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Saved successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Insert failed"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "No data received"]);
}
?>