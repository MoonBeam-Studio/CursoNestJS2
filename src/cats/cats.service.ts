import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedRepository.findOneBy({
      name: createCatDto.breed,
    });

    if (!breed) {
      throw new BadRequestException(`Breed ${createCatDto.breed} not found`);
    }

    await this.catRepository.save({
      ...createCatDto,
      breed,
    });
    return 'This action adds a new cat';
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    return await this.catRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    // await this.catRepository.update(id, updateCatDto).then(() => {
    //   return `This action updates a #${id} cat`;
    // });
  }

  async remove(id: number) {
    return await this.catRepository.softDelete(id).then(() => {
      return `This action removes a #${id} cat`;
    });
  }
}
