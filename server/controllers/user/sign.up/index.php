<?php

include_once '../../../base.classes/core/database.php';
include_once '../../../models/user.model.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user->username = htmlspecialchars($_POST['username']);
    $user->password = password_hash(htmlspecialchars($_POST['password']), PASSWORD_DEFAULT);
    $user->fullname = htmlspecialchars($_POST['fullname']);
}
