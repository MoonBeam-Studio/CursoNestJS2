import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, async (faker) => {
    const user = new User();

    const sexFlag = faker.number.int(1);
    const sex: 'male' | 'female' = sexFlag ? 'male' : 'female';

    user.name = faker.person.firstName(sex);
    user.email = faker.internet.email();
    user.password = await bcrypt.hash(faker.internet.password(6, false), 10);

    return user;
});
