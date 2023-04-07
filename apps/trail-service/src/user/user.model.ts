export enum UserRole {
  User = 'user',
  Admin = 'admin'
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
}
