import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [
   
  ],
  exports:  [
    
  ]
})
export class FileModule {}