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
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../enums/rol.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Breeds - Management of breeds (creation, updates, and retrieval)')
@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Auth(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Creation of a new breed'})
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedsService.create(createBreedDto);
  }

  @Auth(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'List all registered breeds'})
  findAll() {
    return this.breedsService.findAll();
  }

  @Auth(Role.ADMIN)
  @Get(':id')
  @ApiOperation({ summary: 'List specific breed by ID'})
  findOne(@Param('id') id: number) {
    return this.breedsService.findOne(id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific breed by ID'})
  update(@Param('id') id: number, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedsService.update(id, updateBreedDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific breed by ID'})
  remove(@Param('id') id: number) {
    return this.breedsService.remove(id);
  }
}
