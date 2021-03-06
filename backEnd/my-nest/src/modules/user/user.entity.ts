import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column({ nullable: true })
  roles: string;

  @Column({ nullable: false })
  pass_word: string;

  @Column({ nullable: true })
  email: string;

  @Column({
    default: '',
    nullable: true,
  })
  image: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
