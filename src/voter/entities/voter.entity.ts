import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Voter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  voter_id: string;

  @Column()
  password: string;

  @Column({ default: true, nullable: true })
  verified: boolean;

  @Column({ default: null, nullable: true })
  pwd_expired_at: Date;

  @Column({ default: null, nullable: true })
  pwd_code: number;

  @Column({ default: 'voter', nullable: true })
  role: string;

  @Column({ nullable: true })
  picture: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true, select: false })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, select: false })
  deleted_at: Date;
}
