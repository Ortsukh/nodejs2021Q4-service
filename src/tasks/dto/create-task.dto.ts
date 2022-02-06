import { IsString, IsNumber } from "class-validator";

export class CreateTaskDto {
    @IsString({message: 'could be a string'})
    title: string;

    @IsString({message: 'could be a string'})
    description: string;

    userId: string | null;

    boardId: string | null;

    columnId: string | null;

    @IsNumber({}, {message: "could be a number"})
    order: number;
}
