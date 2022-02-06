import { UseGuards,UsePipes, Controller, Get, Post, Body, Param, Delete , Put } from '@nestjs/common';
import { UsersService } from './users.service';
import  CreateUserDto  from './dto/create-user.dto';
import { AuthGuard } from "../login/auth.guard";
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from '../pipe/validation.pipe';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
