<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

$data = json_decode(file_get_contents("php://input"));
include_once './controllers/userController.php';
include_once './controllers/tokenController.php';

$controller = $data->controller;
switch ($controller) {
    case 'login':
        $userController = new UserController();
        $username = $data->username;
        $password = $data->password;
        echo $userController->authLogin($username, $password);
        break;

    case 'logout':
        $headers = apache_request_headers();
        $tokenController = new TokenController();
        
        if(! isset($headers['Authorization'])) {
            echo $tokenController->responeTokenInvalid();
            break;
        }
        if(! $tokenController->isTokenValid($headers['Authorization'])) {
            echo $tokenController->responeTokenInvalid();
            break;
        }
    
        $userController = new UserController();
        $username = $data->username;
        $userController->logout($username);
        echo json_encode(array (
            'status' => 'ok',
            'token' => 'ok',
        ));
        break;

    case 'signUp':
        $userController = new UserController();
        $username = $data->username;
        $password = $data->password;
        $fullname = $data->fullname;
        echo $userController->signUp($username, $password, $fullname);
        break;

    case 'token':
        $tokenController = new TokenController();
        echo $tokenController->isTokenValid('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjUwNjgxNDUsImp0aSI6ImRBV29KUUNHNnVUck56SUVxWUZFVGc9PSIsImlzcyI6ImxvY2FsaG9zdCIsImV4cCI6MTY2NTA3MTc0NSwiZGF0YSI6eyJ1c2VyTmFtZSI6InRlc3QiLCIkcGFzc3dvcmQiOiIxMkAifX0.9O_Ow4gZrasYaJqBJxUtxlR9ug85Moy-VBgw2EOGLfA');

        break;
        
    default:
        echo "Not match any path!";
}




