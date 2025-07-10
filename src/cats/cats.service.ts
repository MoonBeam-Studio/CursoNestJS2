import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Breed } from '../breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    let breed = await this.breedRepository.findOneBy({
      name: createCatDto.breed,
    });

    if (!breed) {
      breed = await this.breedRepository.save({ name: createCatDto.breed });
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

  async compare(id1: number, id2: number) {
    const cat1 = await this.catRepository.findOneBy({ id: id1 });
    const cat2 = await this.catRepository.findOneBy({ id: id2 });

    if (!cat1 || !cat2) {
      throw new BadRequestException('One or both cats not found');
    }

    return {
      cat1,
      cat2,
    };
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    let updateData: any = { ...updateCatDto };

    if (updateCatDto.breed) {
      let breed = await this.breedRepository.findOneBy({ name: updateCatDto.breed });
      if (!breed) {
        breed = await this.breedRepository.save({ name: updateCatDto.breed });
      }
      updateData.breed = breed;
    }
    const existingCat = await this.catRepository.findOneBy({ id });

    await this.catRepository.update(id, updateData);
    return { message: 'Cat updated', existingCat}
  }

  async remove(id: number) {
    const cat = await this.catRepository.findOneBy({ id });
    const remove = await this.catRepository.softDelete(id);
    return { message: 'Cat deleted', cat };
  }
}
