<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../../base.classes/core/database.php';
include_once '../common/user.controller.php';


$database = new Database();
$db = $database->connect();

$controllersUser = new UserController($db);

$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = $data->password;

echo json_encode($controllersUser->authLogin($username, $password));



