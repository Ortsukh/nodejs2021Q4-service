import { Inject, forwardRef, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { TasksService } from "../tasks/tasks.service";
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => TasksService))
    private tasksService: TasksService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 3);
    createUserDto.password = hashPassword
    const user = await this.usersRepository.save(createUserDto);
    return user;
  }

  async findAll() {
    const users =await this.usersRepository.find({ where: {} });
    return users;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    return user;
  }

  async getUserByLogin  (loginNane: string) {
    
    const resultUser = await this.usersRepository.findOne({
      login: loginNane,
    });
    return resultUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const newUserData = updateUserDto;
    const hashPassword = await bcrypt.hash(
      newUserData.password,
      3 
    );
    newUserData.password = hashPassword
    await this.usersRepository.update(id, newUserData);
    const user = await this.usersRepository.findOne(id);
    return user;
  }

  async remove(id: string) {
    await this.tasksService.updateTaskUserId(id, null)
    await this.usersRepository.delete(id);
    return `User ${id} has been deleted`;
  }
}
