import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from '../cats/entities/cat.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { Breed } from '../breeds/entities/breed.entity';
import { Request } from 'express';
import { Role } from '../enums/rol.enum';

@Injectable()
export class PetsService {
  
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createPetDto: CreatePetDto) {
    
    const cat = await this.catRepository.findOneBy({
      id: createPetDto.catId,
    });
    console.log(cat);
    if (!cat) {
      throw new BadRequestException(`Cat with ID ${createPetDto.catId} not found`);
    }

    const owner = await this.userRepository.findOneBy({
      email: createPetDto.ownerEmail,
    });
    if (!owner) {
      throw new BadRequestException(`Owner with email ${createPetDto.ownerEmail} not found`);
    }
    try {
      const pet = await this.petRepository.save({
        name: createPetDto.name,
        cat,
        owner,
      });

      console.log(pet);
      return pet;
    } catch (error) {
      throw new BadRequestException('This cat is already someone\'s pet');
    }
  }

  async findAll() {
    const pets = await this.petRepository.find();
    console.log(pets);
    return pets;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  async remove(id: number, request?: Request) {

    if (!(request as any).user) {
      throw new UnauthorizedException('User not authenticated');
    }
    const userEmail = (request as any).user.email;
    const userRole = (request as any).user.rol;

    console.log(`User Email: ${userEmail}`);
    console.log(`User Role: ${userRole}`);
    if (userRole === Role.ADMIN) {
      return this.petRepository.softDelete(id);
    }

    const pet = await this.petRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!pet) {
      throw new BadRequestException(`Pet with ID ${id} not found`);
    }
    if (pet.owner.email !== userEmail) {
      throw new UnauthorizedException('You do not have permission to delete this pet');
    }
    return this.petRepository.softDelete(id);
  }
}
