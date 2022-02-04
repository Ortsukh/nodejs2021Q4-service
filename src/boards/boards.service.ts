import { HttpException, Inject, forwardRef, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksService } from "../tasks/tasks.service";
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import Board from './entities/board.entity'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @Inject(forwardRef(() => TasksService))
    private tasksService: TasksService
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const board = await this.boardsRepository.save(createBoardDto);
    return board;
  }

  async findAll() {
    const boards = await this.boardsRepository.find();
    return boards;
  }

  async findOne(id: string) {
    const board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new HttpException('No board with this ID found', 404);
    }
    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new HttpException('No board with this ID found', 404);
    }
    await this.boardsRepository.update(id, updateBoardDto);
    const newBoard = await this.boardsRepository.findOne(id);
    return newBoard;
  }

  async remove(id: string) {
    const board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new HttpException('No board with this ID found', 404);
    }
    await this.tasksService.removeBoard(id)  
    await this.boardsRepository.delete(id);
    return `Board ${id} has been deleted`;
  }
}
