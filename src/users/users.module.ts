import { forwardRef, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import User from './entities/user.entity'



@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // forwardRef(() => AuthModule),
    // forwardRef(() => TasksModule),
  ],
  exports: [
    TypeOrmModule, 
    UsersService,
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
