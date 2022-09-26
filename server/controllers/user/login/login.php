<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../../base.classes/core/database.php';
include_once '../../../models/user.model.php';
include_once '../../../models/token.model.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);
$token = new Token($db);

$data = json_decode(file_get_contents("php://input"));

$user->username = $data->username;
$user->password = $data->password;
$user->username = htmlspecialchars($user->username);
$user->password = htmlspecialchars($user->password);

$checkUser = $user->authLogin();
if($checkUser) {  
  $jwt = $database->genToken($user->username);

  $token->deleteAllOldToken($user->username);

  $token->token = $jwt;
  $token->username = $user->username;
  $token->saveToken();

  echo json_encode(
    array(
      'message' => 'Login successful.',
      'status' => 'Success',
      'fullname' => $checkUser,
      'token' => $jwt
    )
  );
  
  return;
}
echo json_encode(
  array(
    'message' => 'Login failed.', 
    'status' => 'Fail',
    )
);


