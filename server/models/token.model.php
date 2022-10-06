<?php
class Token {
    private $conn;
    public $table = 'token';

    public $username;
    public $token;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function saveToken() {
        $query = "INSERT INTO $this->table (username, token) VALUES (?, ?)";
        $this->username = $this->username;
        $this->token = $this->token;

        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(1, $this->username);
        $stmt->bindParam(2, $this->token);

        return $stmt->execute();
    }

    public function deleteAllOldToken($usernameDelete) {
        $query = "DELETE FROM $this->table WHERE username='$usernameDelete'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
    }
}
