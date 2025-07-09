import { Injectable } from '@nestjs/common';
import { Validation } from './entities/validation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class ValidationsService {
  constructor(
    @InjectRepository(Validation)
    private readonly validationRepository: Repository<Validation>,
    private readonly usersService: UsersService,
  ) {}

  
  async create(registerDto: RegisterDto) {
    return await this.validationRepository.save(registerDto);
  }

  async findAll() {
    return await this.validationRepository.find();
  }

  findOneByEmail(email: string) {
    return this.validationRepository.findOneBy({ email });
  }

  findOne(id: number) {
    return `This action returns a #${id} validation`;
  }

  async validateUser(id: number) {
    const user = await this.validationRepository.findOneBy({ id });
    if (!user) {
      return `User with id #${id} not found`;
    }
    await this.validationRepository.softDelete(id);
    return await this.usersService.create({
      name: user.name,
      email: user.email,
      password: user.password,
    } as CreateUserDto);
  }

  async remove(id: number) {
    return await this.validationRepository.softDelete(id);
  }
}
