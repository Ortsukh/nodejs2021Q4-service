import { forwardRef, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoginModule } from "../login/login.module";
import { TasksModule } from "../tasks/tasks.module";

import User from './entities/user.entity'



@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => LoginModule),
    forwardRef(() => TasksModule),
  ],
  exports: [
    TypeOrmModule, 
    UsersService,
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
