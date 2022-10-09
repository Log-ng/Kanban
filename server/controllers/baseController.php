<?php

include_once './models/user.model.php';
include_once './models/token.model.php';
include_once './models/kanban.model.php';
include_once './base.classes/core/database.php';

class BaseController {

    public $database;
    public $userModel;
    public $tokenModel;
    public $kanbanModel;

    public function __construct(){
        $this->database = new Database();
        $db = $this->database->connect();
        $this->userModel = new User($db);
        $this->tokenModel = new Token($db);
        $this->kanbanModel = new Kanban($db);
    }
} 