import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  stuff_id: string;

  @Column()
  password: string;

  @Column({ default: true, nullable: true })
  verified: boolean;

  @Column({ default: null, nullable: true })
  pwd_expired_at: Date;

  @Column({ default: null, nullable: true })
  pwd_code: number;

  @Column({ default: 'admin', nullable: true })
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true, select: false })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, select: false })
  deleted_at: Date;
}
