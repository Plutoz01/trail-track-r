import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class UserAuthGuard implements CanActivate {

  constructor (private readonly userService: UserService) {
  }

  async canActivate (context: ExecutionContext): Promise<boolean> {
    if (context.getType<GqlContextType>() === 'graphql') {
      return this.handleGraphqlRequest(GqlExecutionContext.create(context))
    }

    return false;
  }

  private async handleGraphqlRequest (context: GqlExecutionContext): Promise<boolean> {
    const ctx = context.getContext();
    const token = ctx.req.headers.authorization || '';
    const user = await this.tryGetUser(token);
    if (!user) {
      throw new UnauthorizedException();
    }

    ctx.user = user;

    return true;
  }

  private async tryGetUser (token: string): Promise<User | undefined> {
    if (!token) {
      throw new UnauthorizedException();
    }
    // TODO: switch to JWT token
    return this.userService.findOne(token);
  }
}
