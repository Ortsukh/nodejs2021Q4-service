import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from "../tasks/tasks.module";
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { LoginModule } from "../login/login.module";

import Board from './entities/board.entity'


@Module({
  imports: [
    forwardRef(() => TasksModule),
    TypeOrmModule.forFeature([Board]),
    LoginModule,
  ],
  exports: [
    TypeOrmModule,
    BoardsService
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
