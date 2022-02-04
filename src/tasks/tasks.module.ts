import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { BoardsModule } from "../boards/boards.module";
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
// import { AuthModule } from "../auth/auth.module";
import Task from './entities/task.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    // AuthModule,
    // forwardRef(() => BoardsModule),
  ],
  exports: [
    TypeOrmModule,
    TasksService
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
