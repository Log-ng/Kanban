<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once './controllers/userController.php';
include_once './controllers/tokenController.php';
include_once './controllers/kanbanController.php';

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $headers = apache_request_headers();
    $tokenController = new TokenController();
    
    if(! isset($headers['Authorization'])) {
        header("HTTP/1.1 403");
        echo $tokenController->responeTokenInvalid();
        return;
    }
    if(! $tokenController->isTokenValid($headers['Authorization'])) {
        header("HTTP/1.1 403");
        echo $tokenController->responeTokenInvalid();
        return;
    }
    
    $controller = $_GET['controller'];
    switch ($controller) {
        case 'getUser':
            $currentPage = $_GET['currentPage'];
            $recordPerPage = $_GET['recordPerPage'];
            $userController = new UserController();
            header("HTTP/1.1 200 OK");
            echo $userController->getUserByIndex($currentPage, $recordPerPage);
            break;
        case 'cards':
            $columnId = $_GET['columnId'];
            $kanbanController = new KanbanController();
            echo $kanbanController->getCardFromColumnId($columnId);
            break;
        case 'columns':
            $boardId = $_GET['boardId'];
            $kanbanController = new KanbanController();
            echo $kanbanController->getColumnFromBoardId($boardId);
            break;
        case 'boards':
            $userId = $tokenController->getUserIdFromToken($headers['Authorization']);
            $kanbanController = new KanbanController();
            echo $kanbanController->getBoardsFromUserId($userId);
            break;

        case 'card':
            $userId = $tokenController->getUserIdFromToken($headers['Authorization']);
            $boardId = $_GET['boardId'];
            $cardId = $_GET['cardId'];
            $kanbanController = new KanbanController();
            echo $kanbanController->getCardInformation($boardId, $cardId);
            break;

        case 'user':
            $userId = $tokenController->getUserIdFromToken($headers['Authorization']);
            $userController = new UserController();
            echo $userController->getUserInformation($userId);
            break;

        case 'usersInBoard':
            $boardId = $_GET['boardId'];
            $kanbanController = new KanbanController();
            echo $kanbanController->getUserInBoard($boardId);
            break;

        case 'usersInCard':
            $cardId = $_GET['cardId'];
            $kanbanController = new KanbanController();
            echo $kanbanController->getUserInCard($cardId);
            break;
        default:
            echo "GET method: Not match any path!";
    }
    return;
}

$data = json_decode(file_get_contents("php://input"));
$controller = $data->controller;

if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $headers = apache_request_headers();
    $tokenController = new TokenController();
    
    if(! isset($headers['Authorization'])) {
        header("HTTP/1.1 403");
        echo $tokenController->responeTokenInvalid();
        return;
    }
    if(! $tokenController->isTokenValid($headers['Authorization'])) {
        header("HTTP/1.1 403");
        echo $tokenController->responeTokenInvalid();
        return;
    }
    
    switch ($controller) {
        case 'deleteColumn':
            $oderColDel = $data->order;
            $boardId = $data->boardId;
            $columnId = $data->columnId;
            $kanbanController = new KanbanController();
            echo $kanbanController->deleteColumn($oderColDel, $boardId, $columnId);
            break;

        case 'deleteCard':
            $cardId = $data->cardId;
            $boardId = $data->boardId;
            $columnId = $data->columnId;
            $order = $data->order;
            $kanbanController = new KanbanController();
            echo $kanbanController->deleteCard($cardId, $boardId, $columnId, $order);
            break;

        case 'deleteUserInCard':
            $cardId = $data->cardId;
            $userId = $data->userId;
            $kanbanController = new KanbanController();
            echo $kanbanController->deleteUserInCard($userId, $cardId);
            break;
        default:
            echo "DELETE method: Not match any path!";
    }
    return;
}

if($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $headers = apache_request_headers();
    $tokenController = new TokenController();
    
    if(! isset($headers['Authorization'])) {
        header("HTTP/1.1 403");
        echo $tokenController->responeTokenInvalid();
        return;
    }
    if(! $tokenController->isTokenValid($headers['Authorization'])) {
        header("HTTP/1.1 403");
        echo $tokenController->responeTokenInvalid();
        return;
    }
    
    switch ($controller) {
        case 'dropColumn':
            $kanbanController = new KanbanController();
            $addedIndex = $data->addedIndex;
            $removedIndex = $data->removedIndex;
            $columnId = $data->columnId;
            echo $kanbanController->onDropColumn($addedIndex, $removedIndex, $columnId);
            break;

        case 'titleColumn':
            $kanbanController = new KanbanController();
            $columnId = $data->columnId;
            $title = $data->title;
            echo $kanbanController->updateTitleColumn($columnId, $title);
            break;

        case 'updateCard':
            $kanbanController = new KanbanController();
            $boardId = $data->boardId;
            $cardId = $data->cardId;
            $title = $data->title;
            $description = $data->description;
            $priority = $data->priority;
            echo $kanbanController->updateCard($boardId, $cardId, $title, $description, $priority);
            break;
        case 'dropCardOneColumn':
            $kanbanController = new KanbanController();
            $cardId = $data->cardId;
            $addedIndex = $data->addedIndex;
            $removedIndex = $data->removedIndex;
            $columnId = $data->columnId;
            echo $kanbanController->dropCardOneColumn($removedIndex, $addedIndex, $cardId, $columnId);
            break;

        case 'dropCardMulCol':
            $kanbanController = new KanbanController();

            $oldColumnId = $data->oldColumnId;
            $newColumnId = $data->newColumnId;
            $oldIndex = $data->oldIndex;
            $newIndex = $data->newIndex;
            $cardId = $data->cardId;
            $lastIndexInNewCol = $data->lastIndexInNewCol;
            echo $kanbanController->dropCardMulCol($oldColumnId, $newColumnId, $oldIndex, $newIndex, $cardId, $lastIndexInNewCol);
            break;

        default:
            echo "DELETE method: Not match any path!";
    }
    return;
}

switch ($controller) {
    case 'login':
        $userController = new UserController();
        $username = $data->username;
        $password = $data->password;
        echo $userController->authLogin($username, $password);
        break;

    case 'logout':
        $headers = apache_request_headers();
        $tokenController = new TokenController();
        
        if(! isset($headers['Authorization'])) {
            header("HTTP/1.1 403");
            echo $tokenController->responeTokenInvalid();
            return;
        }
        if(! $tokenController->isTokenValid($headers['Authorization'])) {
            header("HTTP/1.1 403");
            echo $tokenController->responeTokenInvalid();
            return;
        }
    
        $userController = new UserController();
        $username = $data->username;
        $userController->logout($username);
        echo json_encode(array (
            'status' => 'ok',
            'token' => 'ok',
        ));
        break;

    case 'signUp':
        $userController = new UserController();
        $username = $data->username;
        $password = $data->password;
        $fullname = $data->fullname;
        echo $userController->signUp($username, $password, $fullname);
        break;

    case 'accessToken':
        $headers = apache_request_headers();
        $tokenController = new TokenController();
        
        if(! isset($headers['Authorization'])) {
            echo $tokenController->responeTokenInvalid();
            break;
        }
        if(! $tokenController->isTokenValid($headers['Authorization'])) {
            echo $tokenController->responeTokenInvalid();
            break;
        }
    
        echo $tokenController->genNewAccessToken($headers['Authorization']);
        break;

    case 'addNewColumn':
        $headers = apache_request_headers();
        $tokenController = new TokenController();
        
        if(! isset($headers['Authorization'])) {
            header("HTTP/1.1 403");
            echo $tokenController->responeTokenInvalid();
            break;
        }
        if(! $tokenController->isTokenValid($headers['Authorization'])) {
            header("HTTP/1.1 403");
            echo $tokenController->responeTokenInvalid();
            break;
        }
        $boardId = $data->boardId;
        $columnId = $data->columnId;
        $order = $data->order;
        $title = $data->title;
        $kanbanController = new KanbanController();
        echo $kanbanController->addNewColumn($boardId, $columnId, $order, $title);
        break;

    case 'addNewCard':
        $headers = apache_request_headers();
        $tokenController = new TokenController();
        
        if(! isset($headers['Authorization'])) {
            header("HTTP/1.1 403");
            echo $tokenController->responeTokenInvalid();
            break;
        }
        if(! $tokenController->isTokenValid($headers['Authorization'])) {
            header("HTTP/1.1 403");
            echo $tokenController->responeTokenInvalid();
            break;
        }
        $cardId = $data->cardId;
        $columnId = $data->columnId;
        $boardId = $data->boardId;
        $title = $data->title;
        $description = $data->description;
        $priority = $data->priority;
        $order = $data->order;
        
        $kanbanController = new KanbanController();
        echo $kanbanController->addNewCard($cardId, $columnId, $boardId, $title, $description, $priority, $order);
        break;

    case 'addUserInCard':
        $headers = apache_request_headers();
        $tokenController = new TokenController();
        
        if(! isset($headers['Authorization'])) {
            header("HTTP/1.1 403");
            echo $tokenController->responeTokenInvalid();
            break;
        }
        if(! $tokenController->isTokenValid($headers['Authorization'])) {
            header("HTTP/1.1 403");
            echo $tokenController->responeTokenInvalid();
            break;
        }
        $cardId = $data->cardId;
        $userId = $data->userId;
        
        $kanbanController = new KanbanController();
        echo $kanbanController->addUserInCard ($userId, $cardId);
        break;
    default:
        echo "POST method: Not match any path!";
}




