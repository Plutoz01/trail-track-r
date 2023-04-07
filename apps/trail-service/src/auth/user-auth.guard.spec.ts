import { UserAuthGuard } from './user-auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new UserAuthGuard()).toBeDefined();
  });
});
