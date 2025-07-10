import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('Creating user:', createUserDto);
    return await this.userRepository.save(createUserDto)
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const update =  await this.userRepository.update(id, updateUserDto)
    const user = await this.userRepository.findOneBy({ id });
    return { message: 'User updated', user };
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    const process = await this.userRepository.softDelete(id);
    return { message: 'User deleted', user };
  }
}
