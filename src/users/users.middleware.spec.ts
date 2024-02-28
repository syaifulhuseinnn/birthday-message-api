import { UsersMiddleware } from './users.middleware';
import { UsersService } from './users.service';

describe('UsersMiddleware', () => {
  let usersService: UsersService;

  it('should be defined', () => {
    expect(new UsersMiddleware(usersService)).toBeDefined();
  });
});
