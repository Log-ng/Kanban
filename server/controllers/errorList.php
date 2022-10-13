<?php

class ErrorList {
    public function getErrorList() {
        return array(
            'usernameError' => 'Username must be in 4 - 30 characters and only letters and numbers are allowed.',
            'fullnameError' => 'Fullname must be in 4 - 30 characters and only letters allowed.',
            'passwordError' => 'Password must be in 2 - 20 characters and at least one special character',
            'usernameExist' => 'Username already exists !'
        );
    }
}