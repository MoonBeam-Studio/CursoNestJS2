import { Breed } from 'src/breeds/entities/breed.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Breed, (faker) => {
    const breed = new Breed();

    breed.name = faker.animal.cat();
    breed.description = faker.lorem.sentence();
    breed.origin = faker.location.country();
    breed.childFriendly = faker.datatype.boolean();
    breed.dogFriendly = faker.datatype.boolean();
    breed.energyLevel = faker.number.int({ min: 1, max: 10 });

    return breed;
});
