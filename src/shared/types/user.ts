export interface User {
  fullname?: string;
  username: string;
  password?: string;
}

export interface UserSignUp extends User {
  passwordConfirm: string
}
