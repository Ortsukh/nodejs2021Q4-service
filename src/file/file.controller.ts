import { Controller, Post, Get} from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  upload() {
    return this.fileService.upload();
  }

  @Get()
  dawnload() {
    return this.fileService.dawnload();
  }

}