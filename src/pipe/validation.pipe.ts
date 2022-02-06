import {HttpException,  ArgumentMetadata, Injectable, PipeTransform  } from '@nestjs/common';
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        const errors  = await validate(obj);

        if(errors.length) {
            throw new HttpException('invalid parameters', 400)
        }

        return value;
    }

}