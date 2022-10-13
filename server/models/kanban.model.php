<?php
class Kanban {
    private $conn;
    public $tableBoard = 'board';
    public $tableBoardUser = 'boarduser';
    public $tableColumn = 'column';
    public $tableCard = 'card';
    public $tableCardUser = 'carduser';

    public function findBoardIdByColumnId ($columnId) {
      $query = "SELECT boardId FROM `$this->tableColumn` WHERE columnId=?";
      $stmt = $this->conn->prepare($query);

      $stmt->execute([$columnId]);
      $column = $stmt->fetch(PDO::FETCH_ASSOC);
      if(!$column) return 0;
      return $column['boardId'];
    }

    public function __construct($db) {
        $this->conn = $db;
    }

    public function saveToken() {
        $query = "INSERT INTO $this->table (username, token) VALUES (?, ?)";
        $this->username = $this->username;
        $this->token = $this->token;

        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(1, $this->username);
        $stmt->bindParam(2, $this->token);

        return $stmt->execute();
    }

    public function getCardFromColumnId($column) {
        $query = "SELECT $this->tableBoard.boardId, `$this->tableColumn`.columnId, $this->tableCard.title, $this->tableCard.cardId"
        . ", $this->tableCard.priority, $this->tableCard.`order`, $this->tableCard.description, $this->tableCard.cardId FROM "
        . "$this->tableBoard, `$this->tableColumn`, $this->tableCard "
        . "WHERE $this->tableBoard.boardId=`$this->tableColumn`.boardId AND $this->tableCard.`columnId` = `$this->tableColumn`.columnId AND" 
        . "`$this->tableColumn`.columnId = '$column'" 
        . " ORDER BY $this->tableCard.`order`";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $num = $stmt->rowCount();

        if($num <= 0) return [];
        
        $cards = array();
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
          extract($row);
          $card = array(
            'id' => $cardId,
            'boardId' => $boardId, 
            'columnId' => $columnId,
            'title' => $title,
            'description' => $description,
            'priority' => $priority,
          );

          array_push($cards, $card);
        };
        return $cards;
    }  
    
    public function getColumnFromBoardId($boardId) {
        $query = "SELECT columnId, boardId, title FROM `$this->tableColumn` WHERE "
        . " `$this->tableColumn`.`boardId`='$boardId' " 
        . "ORDER BY `$this->tableColumn`.`order`";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $num = $stmt->rowCount();

        if($num <= 0) return [];
        
        $columns = array();
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
          extract($row);
          $column = array(
            'boardId' => $boardId, 
            'id' => $columnId,
            'title' => $title,
            'cardOrder' => [],
            'cards' => [],
          );

          array_push($columns, $column);
        };
        return $columns;
    }
    
    public function getBoardsFromUserId ($userId) {
      $query = "SELECT $this->tableBoard.boardId, $this->tableBoard.boardName FROM $this->tableBoard, $this->tableBoardUser "
      . "WHERE $this->tableBoardUser.boardId=$this->tableBoard.boardId AND $this->tableBoardUser.userId = $userId";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $num = $stmt->rowCount();

        if($num <= 0) return [];
        
        $boards = array();
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
          extract($row);
          $board = array(
            'id' => $boardId, 
            'boardName' => $boardName,
            'columnOrder' => [],
            'columns' => [],
          );

          array_push($boards, $board);
        };
        return $boards;
    }

    public function addNewColumn ($boardId, $columnId, $order, $title) {
      $query = "INSERT INTO `$this->tableColumn` (boardId, columnId, `order`, title) VALUES (?, ?, ?, ?)";

      $stmt = $this->conn->prepare($query);
      
      $stmt->bindParam(1, $boardId);
      $stmt->bindParam(2, $columnId);
      $stmt->bindParam(3, $order);
      $stmt->bindParam(4, $title);
      return $stmt->execute();
    }

    public function deleteColumn ($columnId) {
      $query = "DELETE FROM `$this->tableColumn` WHERE columnId = ". "'$columnId'";

      $stmt = $this->conn->prepare($query);
      $stmt->execute();
    } 

    public function updateAfterDelCol($oderColDel, $boardId) {
      $query = "UPDATE `$this->tableColumn` SET `order` = `order` - 1 WHERE boardId = '$boardId' AND `order`> $oderColDel";

      $stmt = $this->conn->prepare($query);
      $stmt->execute();
    }

    public function swapTwoColumns($from, $to, $columnId) {
      $boardId = $this->findBoardIdByColumnId ($columnId);
      $query = "UPDATE `$this->tableColumn` SET `order` = $from WHERE  `order` = $to AND boardId= '$boardId';"
      . " UPDATE `$this->tableColumn` SET `order` = $to WHERE  columnId  = '$columnId'";
      echo $query;
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
    }

    public function updateTitleColumn($columnId, $title) {
      $query = "UPDATE `$this->tableColumn` SET title = '$title' WHERE  columnId = '$columnId'";

      $stmt = $this->conn->prepare($query);
      $stmt->execute();
    }

    public function addNewCard($cardId, $columnId, $boardId, $title, $description, $priority, $order) {
      $query = "INSERT INTO `$this->tableCard` (cardId, boardId, columnId, title, `description`, `priority`, `order`) VALUES (?, ?, ?, ?, ?, ?, ?)";

      $stmt = $this->conn->prepare($query);
      
      $stmt->bindParam(1, $cardId);
      $stmt->bindParam(2, $boardId);
      $stmt->bindParam(3, $columnId);
      $stmt->bindParam(4, $title);
      $stmt->bindParam(5, $description);
      $stmt->bindParam(6, $priority);
      $stmt->bindParam(7, $order);
      return $stmt->execute();
    }

    public function updateCard($cardId, $title, $description, $priority)  {
      $query = "UPDATE `$this->tableCard` SET title = '$title', `description` = '$description', priority = '$priority' WHERE  cardId = '$cardId'";
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
    }

    public function deleteCard($cardId) {
      $query = "DELETE FROM $this->tableCardUser WHERE cardId = '$cardId';"
      ." DELETE FROM `$this->tableCard` WHERE cardId = ". "'$cardId'";

      $stmt = $this->conn->prepare($query);
      $stmt->execute();
    }

    public function updateAfterDelCard($oderCardDel, $columnId) {
      $query = "UPDATE `$this->tableCard` SET `order` = `order` - 1 WHERE columnId = '$columnId' AND `order`> $oderCardDel";

      $stmt = $this->conn->prepare($query);
      $stmt->execute();
    }

    public function getCardInformation($cardId) {
        $query = "SELECT * FROM `$this->tableCard` WHERE cardId = '$cardId' LIMIT 1"; 

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if(!$row) return [];  
        $card = array(
          'id' => $row['cardId'], 
          'boardId' => $row['boardId'],
          'columnId' => $row['columnId'],
          'title' => $row['title'],
          'description' => $row['description'],
          'priority' => $row['priority'],
        );

        return $card;
    }

    public function swapTwoCards($from, $to, $cardId, $columnId) {
      $query = "UPDATE `$this->tableCard` SET `order` = $from WHERE  `order` = $to AND `columnId` ='$columnId';"
      . " UPDATE `$this->tableCard` SET `order` = $to WHERE  cardId  = '$cardId'";

      $stmt = $this->conn->prepare($query);
      $stmt->execute();
    }

    public function onDropCardMulCol($oldColumnId, $newColumnId, $oldIndex, $newIndex, $cardId, $lastIndexInNewCol) {
      $this->updateAfterDelCard($oldIndex, $oldColumnId);
      $query = "UPDATE `$this->tableCard` SET `columnId` = '$newColumnId', `order` = $lastIndexInNewCol WHERE  cardId = '$cardId'";
      echo $query;
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
    }

    public function getUserInBoard($boardId) {
      $query = "SELECT `user`.`userId`, `user`.`fullname` FROM `user`,  `$this->tableBoardUser` WHERE boarduser.userId = `user`.`userId` AND `boarduser`.`boardId` =  '$boardId'";

      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      $num = $stmt->rowCount();
      echo " ";
      if($num <= 0) return [];
      
      $usersInBoard = array();
      while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        extract($row);
        $user = array(
          'text' => $fullname,
          'id' => strval($userId), 
        );

        array_push($usersInBoard, $user);
      };

      return $usersInBoard;
    }

    public function getUserInCard($cardId) {
      $query = "SELECT `user`.`userId`, `user`.`fullname` FROM `user`,  `$this->tableCardUser` WHERE carduser.userId = `user`.`userId` AND `carduser`.`cardId` =  '$cardId'";

      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      $num = $stmt->rowCount();
      echo " ";
      if($num <= 0) return [];
      
      $usersInCard = array();
      while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        extract($row);
        $user = array(
          'text' => $fullname,
          'id' => strval($userId), 
        );

        array_push($usersInCard, $user);
      };

      return $usersInCard;
    }

    public function addUserInCard ($userId, $cardId) {
      $query = "INSERT INTO `$this->tableCardUser` (userId, cardId) VALUES (?, ?)";

      $stmt = $this->conn->prepare($query);
      
      $stmt->bindParam(1, $userId);
      $stmt->bindParam(2, $cardId);
      return $stmt->execute();
    }

    public function deleteUserInCard ($userId, $cardId) {
      $query = "DELETE FROM `$this->tableCardUser` WHERE cardId = '$cardId' AND `userId` = $userId";

      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      return $stmt->rowCount();
    }
}
