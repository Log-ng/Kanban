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
            'status' => 'Success',
            'cards' => $cards
        ));
    }  
    public function getColumnFromBoardId($boardId) {
        $columns = $this->kanbanModel->getColumnFromBoardId($boardId);
        return json_encode(array (
            'status' => 'Success',
            'columns' => $columns
        ));
    }

    public function getBoardsFromUserId($token) {
        $boards = $this->kanbanModel->getBoardsFromUserId($token);
        return json_encode(array (
            'status' => 'Success',
            'boards' => $boards
        ));
    }  
    
    public function addNewColumn($boardId, $columnId, $order, $title) {
        $newColumn = $this->kanbanModel->addNewColumn($boardId, $columnId, $order, $title);
        return json_encode(array (
            'status' => 'Success',
            'column' => $newColumn
        ));
    }  

    public function deleteColumn($oderColDel, $boardId, $columnId) {
        $this->kanbanModel->deleteColumn($columnId);
        $this->kanbanModel->updateAfterDelCol($oderColDel, $boardId);
        return json_encode(array (
            'status' => 'Success',
        ));
    }

    public function onDropColumn($addedIndex, $removedIndex, $columnId) {
        $this->kanbanModel->onDropColumn($addedIndex, $removedIndex, $columnId);
        return json_encode(array (
            'status' => 'Success',
        ));
    }

    public function updateTitleColumn($columnId, $title) {
        $this->kanbanModel->updateTitleColumn($columnId, $title);
        return json_encode(array (
            'status' => 'Success',
        ));
    }
}