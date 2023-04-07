import { Injectable } from '@nestjs/common';
import { User, UserRole } from './user.model';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 'dummy-user',
      username: 'dummy-user',
      role: UserRole.User
    }
  ]

  async findOne (userId: string): Promise<User | undefined> {
    return this.users.find(user => user.id === userId);
  }
}
