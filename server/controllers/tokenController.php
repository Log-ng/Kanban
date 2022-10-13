<?php

include_once './controllers/baseController.php';
require './vendor/autoload.php';
use Dotenv\Dotenv;
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

class TokenController extends BaseController {
    public function __construct () {
        parent::__construct();
    }

    public function isTokenValid($token) {
        
        $secretKey  = $_ENV['SECRET_KEY'];
        try {
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            $payload = json_decode(json_encode($decoded), true);
    
            return true;
        }
        catch(Exception $e) {
            return false;
        }
    }

    public function responeTokenInvalid() {
        return json_encode(array (
            'status' => 403,
            'token' => 'Token invalid or expired',
        ));
    }  
    
    public function genNewAccessToken($refreshToken) {
        $secretKey  = $_ENV['SECRET_KEY'];

        $decoded = JWT::decode($refreshToken, new Key($secretKey, 'HS256'));
        $payload = json_decode(json_encode($decoded), true);

        $jwt = $this->database->genToken($payload['data']['userId'], isRefreshToken: false);
        return json_encode(array (
            'status' => 200,
            'token' => $jwt,
        ));
    }

    public function getUserIdFromToken($token) {
        $secretKey  = $_ENV['SECRET_KEY'];

        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
        $payload = json_decode(json_encode($decoded), true);

        return $payload['data']['userId'];
    }
}