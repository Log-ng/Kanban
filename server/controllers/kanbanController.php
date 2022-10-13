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
        $increment = ($addedIndex > $removedIndex)? 1: -1;

        $times = abs($removedIndex - $addedIndex);

        for($i = 0; $i < $times; $i ++) {
            $this->kanbanModel->swapTwoColumns($removedIndex , $removedIndex + $increment, $columnId);
            $removedIndex += $increment;
        }

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

    public function addNewCard($cardId, $columnId, $boardId, $title, $description, $priority, $order) {
        $this->kanbanModel->addNewCard($cardId, $columnId, $boardId, $title, $description, $priority, $order);
        return json_encode(array (
            'status' => 'Success',
        ));
    }

    public function updateCard($boardId, $cardId, $title, $description, $priority) {
        $this->kanbanModel->updateCard($cardId, $title, $description, $priority);
        return json_encode(array (
            'status' => 'Success',
        ));
    }

    public function deleteCard($cardId, $boardId, $columnId, $oderCardDel) {
        $this->kanbanModel->deleteCard($cardId);
        $this->kanbanModel->updateAfterDelCard($oderCardDel, $columnId);

        return json_encode(array (
            'status' => 'Success',
        ));
    }

    public function getCardInformation($boardId, $cardId) {
        $card = $this->kanbanModel->getCardInformation($cardId);
        if(!$card ) return json_encode(array(
            'status' => 'Fail',
        ));

        return json_encode(array (
            'status' => 'Success',
            'card' => $card
        ));
    }

    public function dropCardOneColumn($removedIndex, $addedIndex, $cardId, $columnId) {
        $increment = ($addedIndex > $removedIndex)? 1: -1;

        $times = abs($removedIndex - $addedIndex);

        for($i = 0; $i < $times; $i ++) {
            $this->kanbanModel->swapTwoCards($removedIndex , $removedIndex + $increment, $cardId, $columnId);
            $removedIndex += $increment;
        }

        return json_encode(array (
            'status' => 'Success',
        ));
    }
    public function dropCardMulCol($oldColumnId, $newColumnId, $oldIndex, $newIndex, $cardId, $lastIndexInNewCol) {
        $this->kanbanModel->onDropCardMulCol($oldColumnId, $newColumnId, $oldIndex, $newIndex, $cardId, $lastIndexInNewCol);
        return $this->dropCardOneColumn($lastIndexInNewCol, $newIndex, $cardId, $newColumnId);
    }

    public function getUserInBoard($boardId) {
        $usersInBoard = $this->kanbanModel->getUserInBoard($boardId);

        if(!$usersInBoard) return json_encode(array (
            'status' => 'Fail'
        ));

        return json_encode(array (
            'status' => 'Success',
            'users' => $usersInBoard
        ));
    }

    public function getUserInCard($cardId) {
        $usersInCard = $this->kanbanModel->getUserInCard($cardId);

        if(!$usersInCard) return json_encode(array (
            'status' => 'Fail'
        ));

        return json_encode(array (
            'status' => 'Success',
            'users' => $usersInCard
        ));
    }

    public function addUserInCard ($userId, $cardId) {
        $this->kanbanModel->addUserInCard ($userId, $cardId);
        return json_encode(array (
            'status' => 'Success',
        ));
    }

    public function deleteUserInCard ($userId, $cardId) {
        if($this->kanbanModel->deleteUserInCard ($userId, $cardId)) return json_encode(array (
            'status' => 'Success',
        ));

        return json_encode(array (
            'status' => 'Fail',
        ));
    }
}