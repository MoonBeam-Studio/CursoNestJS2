import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ValidationsService } from './validations.service';
import { CreateValidationDto } from './dto/create-validation.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../enums/rol.enum';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@Auth(Role.ADMIN)
@ApiTags('Users - User related fields (register, validation, login, show all, etc)')
@Controller('validations')
export class ValidationsController {
  constructor(private readonly validationsService: ValidationsService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new validation request' })
  create(@Body() createValidationDto: CreateValidationDto) {
    return this.validationsService.create(createValidationDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all validation requests' })
  findAll() {
    return this.validationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'List specific validation request by ID' })
  findOne(@Param('id') id: number) {
    return this.validationsService.findOne(id);
  }

  @Get('validate/:id')
  @ApiOperation({ summary: 'Validate a user by ID' })
  validateUser(@Param('id') id: number) {
    return this.validationsService.validateUser(id);
  }

  @Get('denegate/:id')
  @ApiOperation({ summary: 'Deny a validation request by ID' })
  denegateUser(@Param('id') id: number) {
    return this.validationsService.remove(id);
  }
}