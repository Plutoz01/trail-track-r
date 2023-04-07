import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from '../user/user.module';
import { UserAuthGuard } from './user-auth.guard';

@Module({
  imports: [
    UserModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserAuthGuard
    }
  ]
})
export class AuthModule {}
