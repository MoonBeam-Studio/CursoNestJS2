import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard.ts.guard';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../enums/rol.enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Pets - Management of pets (creation, updates, and retrieval)')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new pet for the logged user' })
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'List all registered pets' })
  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  @Auth(Role.ADMIN)
  @Get(':id')
  @ApiOperation({ summary: 'List specific pet by ID' })
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific pet by ID' })
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(+id, updatePetDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Release a specific pet by ID' })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.petsService.remove(+id, request);
  }
}
