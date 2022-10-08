<?php
class User {
    private $conn;
    public $table = 'user';

    public $username;
    public $password;
    public $fullname;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO $this->table (username, password, fullname) VALUES (?, ?, ?)";
        $this->username = $this->username;
        $this->password = $this->password;
        $this->fullname = $this->fullname;
        $this->password = password_hash($this->password, PASSWORD_DEFAULT);

        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(1, $this->username);
        $stmt->bindParam(2, $this->password);
        $stmt->bindParam(3, $this->fullname);

        $stmt->execute();
    }
    
    public function read() {
        $query = 'SELECT * FROM ' . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function isUserExist() {

        $query = 'SELECT username FROM ' . $this->table . ' WHERE username=?';
        $stmt = $this->conn->prepare($query);

        $stmt->execute([$this->username]);
        $user = $stmt->fetch();
        
        return $user;
    }

    public function totalUser() {
        $query = 'SELECT count(*) as userCount FROM ' . $this->table;
        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        $count = $stmt->fetchColumn();
        return $count;
    }

    public function authLogin() {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE username=?';
        $stmt = $this->conn->prepare($query);

        $stmt->execute([$this->username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if(!$user) return false;
        if(password_verify($this->password, $user['password'])) return $user['fullname'];
        return false;
    }

    public function getUser($currentPage, $recordPerPage) {
        $totalUser = $this->totalUser();
        $totalPage = ceil($totalUser/ $recordPerPage);
        $offset = ($currentPage - 1)* $recordPerPage;
        $limit = "LIMIT $offset, " . strval($recordPerPage);
        $query = "SELECT * FROM " . $this->table . " " . $limit; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $num = $stmt->rowCount();

        if($num <= 0) return [];
        
        $users = array();
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
          extract($row);
          $user = array(
            'username' => $username, 
            'fullname' => $fullname,
          );

          array_push($users, $user);
        };
        return $users;
    }
}
