import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import CreateUserDto from '../users/dto/create-user.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly authService: LoginService) {}

  @Post()
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

}