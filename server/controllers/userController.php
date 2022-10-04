<?php

include_once './controllers/baseController.php';

class UserController extends BaseController {
    public function __construct () {
        parent::__construct();
    }

    public function authLogin($username, $password) {
        $this->userModel->username = htmlspecialchars($username);
        $this->userModel->password = htmlspecialchars($password);

        $checkUser = $this->userModel->authLogin();
        if($checkUser) {  
            $jwt = $this->database->genToken($this->userModel->username);

            $this->tokenModel->deleteAllOldToken($this->userModel->username);

            $this->tokenModel->token = $jwt;
            $this->tokenModel->username = $this->userModel->username;
            $this->tokenModel->saveToken();

            return json_encode(array(
                'message' => 'Login successful.',
                'status' => 'Success',
                'fullname' => $checkUser,
                'token' => $jwt
            ));   
        }
        return json_encode(array(
            'message' => 'Login failed.', 
            'status' => 'Fail',
        ));
    }

    public function logout($username) {
        $username = htmlspecialchars($username);
        $this->tokenModel->deleteAllOldToken($username);  
    }

    public function validate($username, $fullname, $password) {
        $usernameContainsSpecialChars = preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $username);
        $fullnameContainsOnlyLeters = ctype_alpha($fullname);
        $passwordContainsSpecChars = preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $password);
        
        $isValidateCharacters = !$usernameContainsSpecialChars && $fullnameContainsOnlyLeters && $passwordContainsSpecChars;
        if(!$isValidateCharacters) return false;

        $validateFullname = strlen($fullname) >= 4 and strlen($fullname) <= 30;
        $validateUsername= strlen($username) >= 4 and strlen($username) <= 30;
        $validatePassword = strlen($password) >= 2 and strlen($password) <= 20;

        return ($validateFullname and $validateUsername and $validatePassword);
    }

    public function signUp($username, $password, $fullname) {

        $this->userModel->username = htmlspecialchars($username);
        $this->userModel->password = htmlspecialchars($password);
        $this->userModel->fullname = htmlspecialchars($fullname);

        $isValidNewUser = $this->userModel->checkUsername() && $this->validate($this->userModel->username, $this->userModel->fullname, $this->userModel->password);
        if($isValidNewUser) {
            $this->userModel->create();
            return json_encode(array (
                'message' => 'Sign up completed!', 
                'status' => 'Success',
            ));
        } else {
            return json_encode(array (
                'message' => 'Sign up failed.',
                'status' => 'Fail',
            ));      
        }
    }


}