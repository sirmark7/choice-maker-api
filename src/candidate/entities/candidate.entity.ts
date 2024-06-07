import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Voter } from 'src/voter/entities/voter.entity';
import { Category } from 'src/category/entities/category.entity';
@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @OneToOne(() => Voter, (voter) => voter.id)
  @JoinColumn()
  userId: number;

  @Column()
  @OneToOne(() => Category, (category) => category.id)
  @JoinColumn()
  categoryId: number;

  @Column({ default: 0 })
  votes: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true, select: false })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, select: false })
  deleted_at: Date;
}
