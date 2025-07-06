/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createBreedDto: CreateBreedDto) {
    return await this.breedRepository.save(createBreedDto);
  }

  async findAll() {
    return await this.breedRepository.find();
  }

  async findOne(id: number) {
    return await this.breedRepository.findOneBy({ id });
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    return await this.breedRepository.update(id, updateBreedDto).then(() => {
      return `This action updates a #${id} breed`;
    });
  }

  async remove(id: number) {
    return await this.breedRepository.softDelete(id).then(() => {
      return `This action removes a #${id} breed`;
    });
  }
}
