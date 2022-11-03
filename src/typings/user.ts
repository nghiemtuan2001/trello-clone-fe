export interface UserType {
  id?: string | number;
  email?: string;
  username?: string;
  password: string;
}

export interface GetUserRequest {
  id?: string | number;
}
