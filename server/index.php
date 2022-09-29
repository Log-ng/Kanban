<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

$data = json_decode(file_get_contents("php://input"));

$controller = $data->controller;
switch ($controller) {
    case 'login':
        $username = $data->username;
        $password = $data->password;
        header("Location: ./controllers/user/login.php?username=".$username."&password=".$password); 
        break;
    case 'logout':
        $username = $data->username;
        header("Location: ./controllers/user/logout.php?username=".$username); 
        break;
    case 'signUp':
        $username = $data->username;
        $password = $data->password;
        $fullname = $data->fullname;
        header("Location: ./controllers/user/signUp.php?username=".$username."&password=".$password."&fullname=".$fullname); 
        break;
    default:
        echo "Not match any path!";
}




