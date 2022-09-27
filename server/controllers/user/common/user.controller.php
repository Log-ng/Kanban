<?php

include_once '../../../models/user.model.php';
include_once '../../../models/token.model.php';
include_once '../../../base.classes/core/database.php';

class UserController {

    public function __construct($db) {
        $this->conn = $db;
        $this->userModel = new User($db);
        $this->tokenModel = new Token($db);
        $this->database = new Database();
    }

    public function authLogin($username, $password) {
        $this->userModel->username = $username;
        $this->userModel->password = $password;
        $this->userModel->username = htmlspecialchars($this->userModel->username);
        $this->userModel->password = htmlspecialchars($this->userModel->password);

        $checkUser = $this->userModel->authLogin();
        if($checkUser) {  
            $jwt = $this->database->genToken($this->userModel->username);

            $this->tokenModel->deleteAllOldToken($this->userModel->username);

            $this->tokenModel->token = $jwt;
            $this->tokenModel->username = $this->userModel->username;
            $this->tokenModel->saveToken();

            return array(
                'message' => 'Login successful.',
                'status' => 'Success',
                'fullname' => $checkUser,
                'token' => $jwt
                );
            
        }

        return array(
            'message' => 'Login failed.', 
            'status' => 'Fail',
            )
        ;
    }

                
}


