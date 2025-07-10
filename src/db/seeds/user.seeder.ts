// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/enums/rol.enum';
import { Breed } from 'src/breeds/entities/breed.entity';
import * as bcrypt from 'bcryptjs';
import { Cat } from 'src/cats/entities/cat.entity';


export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE TABLE `user`;');
    await dataSource.query('TRUNCATE TABLE `breed`;');
    await dataSource.query('TRUNCATE TABLE `cat`;');
    await dataSource.query('TRUNCATE TABLE `pet`;');
    await dataSource.query('TRUNCATE TABLE `validation`;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');

    const repository = dataSource.getRepository(User);
    await repository.insert({
        name: 'John Doe',
        email: 'admin@mail.es',
        password: await bcrypt.hash('123456', 10),
        rol: Role.ADMIN,
    });

    const userFactory = factoryManager.get(User);
    await userFactory.save();
    await userFactory.saveMany(15);

    const breedFactory = factoryManager.get(Breed);
    await breedFactory.save();
    await breedFactory.saveMany(15);

    const catsFactory = factoryManager.get(Cat);
    await catsFactory.save();
    await catsFactory.saveMany(15);
  }
}
