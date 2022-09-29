<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../userController.php';

$controllersUser = new UserController();

$username = $_REQUEST['username'];
$password = $_REQUEST['password'];
$fullname = $_REQUEST['fullname'];

echo json_encode($controllersUser->signUp($username, $password, $fullname));

