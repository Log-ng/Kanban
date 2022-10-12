<?php

include_once './controllers/baseController.php';
include './controllers/errorList.php';

class UserController extends BaseController {
    public function __construct () {
        parent::__construct();
    }

    public function authLogin($username, $password) {
        $this->userModel->username = $username;
        $this->userModel->password = $password;

        $isUserValid = $this->userModel->authLogin();
        if($isUserValid) {  
            $userId = $this->userModel->getIdFromUsername();
            $jwt = $this->database->genToken($userId, isRefreshToken: false);
            $refreshToken = $this->database->genToken($userId, isRefreshToken: true);

            $this->tokenModel->deleteAllOldToken($this->userModel->username);

            $this->tokenModel->token = $refreshToken;
            $this->tokenModel->username = $this->userModel->username;
            $this->tokenModel->saveToken();

            return json_encode(array(
                'message' => 'Login successful.',
                'status' => 'Success',
                'fullname' => $isUserValid,
                'accessToken' => $jwt,
                'refreshToken' => $refreshToken,
            ));   
        }
        return json_encode(array(
            'message' => 'Login failed.', 
            'status' => 'Fail',
        ));
    }

    public function logout($username) {
        $username = $username;
        $this->tokenModel->deleteAllOldToken($username);  
    }

    public function validate($username, $fullname, $password) {
        $errorList = new ErrorList();

        $usernameContainsSpecialChars = preg_match('/[\'^£$%&!*()}{@#~?><>,|=_+¬-]/', $username);
        if($usernameContainsSpecialChars) return [false, $errorList->getErrorList()['usernameError'], 'username'];

        $fullnameContainsOnlyLetters = preg_match('~^[\p{L}\s]+$~uD', $fullname);
        if(!$fullnameContainsOnlyLetters) return [false, $errorList->getErrorList()['fullnameError'], 'fullname'];

        $passwordContainsSpecChars = preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $password);
        if(!$passwordContainsSpecChars) return [false, $errorList->getErrorList()['passwordError'], 'password'];
           
        $validateFullname = strlen($fullname) >= 4 and strlen($fullname) <= 30;
        if(!$validateFullname) return [false, $errorList->getErrorList()['fullnameError'], 'fullname'];
        
        $validateUsername= strlen($username) >= 4 and strlen($username) <= 30;
        if(!$validateUsername) return [false, $errorList->getErrorList()['usernameError'], 'username'];

        $validatePassword = strlen($password) >= 2 and strlen($password) <= 20;
        if(!$validatePassword) return [false, $errorList->getErrorList()['passwordError'], 'password'];

        return [true];
    }

    public function signUp($username, $password, $fullname) {

        $this->userModel->username = $username;
        $this->userModel->password = $password;
        $this->userModel->fullname = $fullname;

        $errorList = new ErrorList();

        if($this->userModel->isUserExist()) 
            return json_encode(array (
                'status' => 'Sign up failed.',
                'message' => $errorList->getErrorList()['usernameExist'],
				'field' => 'exist',
            ));  

        $isValidFiled = $this->validate($this->userModel->username, $this->userModel->fullname, $this->userModel->password);
        if(!$isValidFiled[0])
            return json_encode(array (
                'status' => 'Sign up failed.',
                'message' =>  $isValidFiled[1],
				'field' => $isValidFiled[2]
            )); 
				
		$this->userModel->create();
		return json_encode(array (
			'status' => 'Success',
			'message' => 'Sign up completed!', 
		));
    }

    public function getUserByIndex($currentPage, $recordPerPage) {
        $users =$this->userModel->getUser($currentPage, $recordPerPage);
        $totalUser = $this->userModel->totalUser();
        
        if(count($users) === 0) return json_encode(array(
            'status' => 'Empty',
            'totalUser'=> $totalUser 
        ));

        return json_encode(array(
            'status' => 'Success',
            'users' => $users,
            'totalUser'=> $totalUser 
        ));
    }

    public function getUserInformation($userId) {
        $user = $this->userModel->getUserInformation($userId);
        if(!$user ) return json_encode(array(
            'status' => 'Fail',
        ));

        return json_encode(array (
            'status' => 'Success',
            'user' => $user
        ));
    }

}