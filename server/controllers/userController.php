<?php

include_once('../baseController.php');

class UserController extends BaseController {
    public function __construct () {
        parent::__construct();
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

    public function logout($username) {
        $username = htmlspecialchars($username);
        $this->tokenModel->deleteAllOldToken($username);  
    }

    public function signUp($username, $password, $fullname) {

        $this->userModel->username = htmlspecialchars($username);
        $this->userModel->password = htmlspecialchars($password);
        $this->userModel->fullname = htmlspecialchars($fullname);

        if($this->userModel->checkUsername() and $this->userModel->validate()) {
            $this->userModel->create();
            return array (
                'message' => 'Sign up completed!', 
                'status' => 'Success',
            );
        }
        else {
            return array (
                'message' => 'Sign up failed.', 
                'status' => 'Fail',
            );      
        }

    }
}