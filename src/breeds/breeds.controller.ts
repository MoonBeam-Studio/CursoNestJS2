import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../enums/rol.enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Auth(Role.ADMIN)
@ApiTags('Breeds - Management of breeds (creation, updates, and retrieval)')
@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Post()
  @ApiOperation({ summary: 'Creation of a new breed'})
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedsService.create(createBreedDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all registered breeds'})
  findAll() {
    return this.breedsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'List specific breed by ID'})
  findOne(@Param('id') id: number) {
    return this.breedsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific breed by ID'})
  remove(@Param('id') id: number) {
    return this.breedsService.remove(id);
  }
}
