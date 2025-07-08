import { Cat } from 'src/cats/entities/cat.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Breed {
  @Column({ primary: true, generated: true })
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  origin: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @OneToMany(() => Cat, (cat) => cat.breed)
  cats: Cat[];
}
