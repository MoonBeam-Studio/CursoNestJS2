import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../users/entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const adminExists = await userRepository.findOneBy({ email: 'admin@admin.com' });
    if (!adminExists) {
      const adminUser = userRepository.create({
        email: 'admin@admin.com',
        password: 'admin123', // You should hash this in production
        name: 'Administrator',
        rol: 'admin',
      });
      await userRepository.save(adminUser);
    }
  }
}
