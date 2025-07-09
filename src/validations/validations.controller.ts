import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ValidationsService } from './validations.service';
import { CreateValidationDto } from './dto/create-validation.dto';
import { UpdateValidationDto } from './dto/update-validation.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../enums/rol.enum';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users - User related fields (register, validation, login, show all, etc)')
@Controller('validations')
export class ValidationsController {
  constructor(private readonly validationsService: ValidationsService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new validation request' })
  create(@Body() createValidationDto: CreateValidationDto) {
    return this.validationsService.create(createValidationDto);
  }

  @Auth(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'List all validation requests' })
  findAll() {
    return this.validationsService.findAll();
  }

  @Auth(Role.ADMIN)
  @Get(':id')
  @ApiOperation({ summary: 'List specific validation request by ID' })
  findOne(@Param('id') id: number) {
    return this.validationsService.findOne(id);
  }

  @Auth(Role.ADMIN)
  @Get('validate/:id')
  @ApiOperation({ summary: 'Validate a user by ID' })
  validateUser(@Param('id') id: number) {
    return this.validationsService.validateUser(id);
  }

  @Auth(Role.ADMIN)
  @Delete('denegate/:id')
  @ApiOperation({ summary: 'Denegate a user by ID' })
  remove(@Param('id') id: number) {
    return this.validationsService.remove(id);
  }
}
