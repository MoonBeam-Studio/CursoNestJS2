import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../enums/rol.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users - User related fields (register, validation, login, show all, etc)')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user, used by auth/login' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Auth(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'List all registered users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Auth(Role.ADMIN)
  @Get(':id')
  @ApiOperation({ summary: 'List specific user by ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific user by ID' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove a specific user by ID' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
