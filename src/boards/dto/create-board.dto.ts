import { IsString } from "class-validator";
import BoardColumn from '../entities/column.entity';

export class CreateBoardDto {
    @IsString({message: 'could be a string'})
    title: string;

    columns: BoardColumn[];
}
