import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../data-source';
import { User } from '../users/entities/user.entity';
import { Role } from '../enums/rol.enum';
import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { Cat } from 'src/cats/entities/cat.entity';
import { Breed } from 'src/breeds/entities/breed.entity';
import { Pet } from 'src/pets/entities/pet.entity';

export async function manualSeed() {
  const { host, port, username, password, database } = dataSourceOptions as any;
  const adminDataSource = new DataSource({ type: 'mysql', host, port, username, password });
  
  await adminDataSource.initialize();
  await adminDataSource.query(`DROP DATABASE IF EXISTS \`${database}\`;`);
  await adminDataSource.query(`CREATE DATABASE \`${database}\`;`);
  await adminDataSource.destroy();

  const dataSource = new DataSource({ ...(dataSourceOptions as any), synchronize: true });
  await dataSource.initialize();

  const userRepository = dataSource.getRepository(User);
  const catRepository = dataSource.getRepository(Cat);
  const breedRepository = dataSource.getRepository(Breed);
  const petRepository = dataSource.getRepository(Pet);

  await userRepository.insert({
    email: 'admin@admin.es',
    password: await bcrypt.hash('password', 10),
    rol: Role.ADMIN,
    name: 'Admin User',
  });
  
  for (let i = 0; i < 10; i++) {
    const sexFlag = faker.number.int(1);
    const sex: 'male' | 'female' = sexFlag ? 'male' : 'female';
    const name = faker.person.firstName(sex);
    const email = faker.internet.email({ firstName: name });
    const password = await bcrypt.hash(faker.internet.password({ length: 10, pattern: /[a-zA-Z0-9]/ }), 10);
    await userRepository.insert({
      name,
      email,
      password,
      rol: Role.USER,
    });
  }

  for (let i = 0; i < 10; i++) {
    const name = faker.animal.cat();
    const description = faker.lorem.sentence();
    const origin = faker.location.country();
    await breedRepository.insert({
      name,
      description,
      origin,
    });
  }

  for (let i = 0; i < 30; i++) {
    const age = faker.number.int({ min: 1, max: 15 });
    const breed = await breedRepository.findOneBy({ id: faker.number.int({ min: 1, max: 10 }) });
    if (!breed) {
      throw new Error('Breed not found for cat creation');
    }
    await catRepository.insert({
      age,
      breed,
    });
  }

  // Fetch all cats and users after seeding
  const allCats = await catRepository.find();
  const allUsers = await userRepository.find();

  // Create pets by picking random cat and owner from existing ones
  // Shuffle cats to ensure uniqueness
  const shuffledCats = allCats.sort(() => Math.random() - 0.5);
  const petCount = Math.min(10, shuffledCats.length);
  for (let i = 0; i < petCount; i++) {
    const name = faker.person.firstName();
    const cat = shuffledCats[i];
    const owner = allUsers[faker.number.int({ min: 0, max: allUsers.length - 1 })];
    if (!cat || !owner) {
      throw new Error('Cat or owner not found for pet creation');
    }
    await petRepository.insert({
      name,
      cat,
      owner,
    });
  }

  await dataSource.destroy();
}

