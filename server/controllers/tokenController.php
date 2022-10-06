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

    public function isAccessTokenValid($token) {
        
        $secretKey  = $_ENV['SECRET_KEY'];
        try {
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            $payload = json_decode(json_encode($decoded), true);
    
            return json_encode(array (
                'paload' => $payload['data'],
            ));  
        }
        catch(Exception $e) {
            return json_encode(array (
                'token' => 'Token invalid or expired',
            )); 
        }
    }

    
}