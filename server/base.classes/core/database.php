<?php

// require '../../../vendor/autoload.php';
require '../../vendor/autoload.php';
use Dotenv\Dotenv;
use \Firebase\JWT\JWT;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

define('DB_HOST', $_ENV['DB_HOST']);
define('DB_NAME', $_ENV['DB_NAME']);
define('DB_USERNAME', $_ENV['DB_USERNAME']);
define('DB_PASS', $_ENV['DB_PASS']);

class Database {
    
    private $host = DB_HOST;
    private $username = DB_USERNAME;
    private $password = DB_PASS;
    private $db_name = DB_NAME;
    private $conn;

    public function connect() {
        $this->conn = null;
        try {
            $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo 'Connection Error: ' . $e->getMessage();
        }

        return $this->conn;
    }
    public function genToken($username) {
        $secretKey  = $_ENV['SECRET_KEY'];
        $tokenId    = base64_encode(random_bytes(16));
        $issuedAt   = new DateTimeImmutable();
        $expire     = $issuedAt->modify('+6 minutes')->getTimestamp();
        $serverName = DB_HOST;
        $data = [
            'iat'  => $issuedAt->getTimestamp(),    
            'jti'  => $tokenId,                     
            'iss'  => $serverName,                 
            'nbf'  => $issuedAt->getTimestamp(),   
            'exp'  => $expire,                      
            'data' => [                     
                'userName' => $username,   
            ]
        ];     
        return JWT::encode(
            $data,      
            $secretKey, 
            'HS256'   
        );   
        
    }
}