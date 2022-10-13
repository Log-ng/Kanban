export interface User {
  fullname?: string;
  username: string;
  password?: string;
}

export interface UserSignUp extends User {
  passwordConfirm: string;
  fullname: string;
  password: string;
}

export interface GetUserResponse {
  data: {
    status: string;
    users: User[];
    totalUser: number
  };
}

export interface GetUserSingle {
  data: {
    status: string;
    user: User
  }
}
