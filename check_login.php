<?php
$email = $_POST['email'];
$password = $_POST['password'];

// Database connection
$conn = new mysqli('localhost','root','','test');
if($conn->connect_error){
    die("Connection Failed : ". $conn->connect_error);
}

$stmt = $conn->prepare("SELECT * FROM registration WHERE email = ? AND password = ?");
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$stmt->close();
$conn->close();
?>
