import { UseGuards, Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from "../login/auth.guard";




@Controller('boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Param('boardId') boardId: string) {
    return this.tasksService.create(createTaskDto, boardId);
  }

  @Get()
  findAll(@Param('boardId') boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Param('boardId') boardId: string) {
    return this.tasksService.findOne(id, boardId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Param('boardId') boardId: string) {
    return this.tasksService.update(id, updateTaskDto, boardId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Param('boardId') boardId: string) {
    return this.tasksService.remove(id, boardId);
  }
}
