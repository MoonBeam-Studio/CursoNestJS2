// src/db/factories/user.factory.ts
import { User } from 'src/users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/enums/rol.enum';

export default setSeederFactory(User, async (faker) => {
  const user = new User();

  const sexFlag = faker.number.int(1);
  const sex: 'male' | 'female' = sexFlag ? 'male' : 'female';

  user.name = faker.person.firstName(sex);
  user.email = faker.internet.email({ firstName: user.name });
  user.password = await bcrypt.hash(faker.internet.password({ length: 10, pattern: /[a-zA-Z0-9]/ }), 10);
  user.rol = Role.USER;

  return user;
});
