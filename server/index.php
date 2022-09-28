<?php

if (!empty($_GET)) {
    $controller = $_GET['controller'];
    switch ($controller) {
        case 'user':
            $data = json_decode(file_get_contents("php://input"));
            $username = $data->username;
            if($_GET['action'] == 'login') {
                $password = $data->password;

                header("Location: ./controllers/user/login.php?username=".$username."&password=".$password); 
            }
            else {
                header("Location: ./controllers/user/logout.php?username=".$username); 
            }
            break;

        default:
            echo "long";
    }
}



