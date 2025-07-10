import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../enums/rol.enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Cats - Management of cats (creation, updates, and retrieval)')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Auth(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new cat' })
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all regustered cats' })
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'List specific cat by ID' })
  findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }
  @Get(':id1/:id2')
  @ApiOperation({ summary: 'Compare two cats by id' })
  compare(@Param('id1') id1: number, @Param('id2') id2: number) {
    return this.catsService.compare(id1, id2);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific cat by ID' })
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific cat by ID' })
  remove(@Param('id') id: number) {
    return this.catsService.remove(id);
  }
}
