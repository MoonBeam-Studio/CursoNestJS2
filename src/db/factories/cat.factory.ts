
import { Cat } from 'src/cats/entities/cat.entity';
import { setSeederFactory } from 'typeorm-extension';


export default setSeederFactory(Cat, (faker) => {
    const cat = new Cat();

    cat.age = faker.number.int({ min: 1, max: 20 });
    cat.weight = faker.number.int({ min: 1, max: 20 });
    cat.height = faker.number.int({ min: 1, max: 20 });
    cat.length = faker.number.int({ min: 1, max: 20 });
    cat.breed = { id: faker.number.int({ min: 1, max: 10 }) } as any;
    return cat;
});
