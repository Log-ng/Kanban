<?php

require './vendor/autoload.php';
use Dotenv\Dotenv;
use \Firebase\JWT\JWT;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

define('DB_HOST', $_ENV['DB_HOST']);
define('DB_NAME', $_ENV['DB_NAME']);
define('DB_USERNAME', $_ENV['DB_USERNAME']);
define('DB_PASS', $_ENV['DB_PASS']);
define('EXPIRED_ACCESS_TOKEN', 60);
define('EXPIRED_REFRESH_TOKEN', 3600);

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
    public function genToken($username, $password, $isRefreshToken) {
        $secretKey  = $_ENV['SECRET_KEY'];
        $now = strtotime("now");
        $tokenId    = base64_encode(random_bytes(16));
        $expire     = $now + ($isRefreshToken)? EXPIRED_REFRESH_TOKEN: EXPIRED_ACCESS_TOKEN;    
        $serverName = DB_HOST;
        $data = [
            'iat'  => $now,    
            'jti'  => $tokenId,                     
            'iss'  => $serverName,                 
            'exp'  => $expire,                      
            'data' => [                     
                'userName' => $username, 
                '$password' => $password  
            ]
        ];     
        return JWT::encode(
            $data,      
            $secretKey, 
            'HS256'   
        );   
    }


}