import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  alias: string;

  @Column()
  category_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true, select: false })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, select: false })
  deleted_at: Date;
}
