/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';
import { IsNumber } from 'class-validator';

export class UpdateCatDto extends PartialType(CreateCatDto) {

    @IsNumber()
    weight?: number;
    @IsNumber()
    height?: number;
    @IsNumber()
    length?: number;
    @IsNumber()
    age?: number;
}
