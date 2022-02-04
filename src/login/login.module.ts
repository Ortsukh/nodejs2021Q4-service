import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'secret-key',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports:  [
    LoginService,
    JwtModule
  ]
})
export class LoginModule {}
