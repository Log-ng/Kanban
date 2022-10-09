<?php

include_once './controllers/baseController.php';
require './vendor/autoload.php';
use Dotenv\Dotenv;
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

class KanbanController extends BaseController {
    public function __construct () {
        parent::__construct();
    }

    public function getCardFromColumnId($columnId) {
        $cards = $this->kanbanModel->getCardFromColumnId($columnId);
        return json_encode(array (
            'status' => 'Sucess',
            'cards' => $cards
        ));
    }  
    public function getColumnFromBoardId($boardId) {
        $columns = $this->kanbanModel->getColumnFromBoardId($boardId);
        return json_encode(array (
            'status' => 'Sucess',
            'columns' => $columns
        ));
    }  
    

}