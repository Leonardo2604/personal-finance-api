import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user';

@Entity('income_types')
class IncomeType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @ManyToOne(() => IncomeType, incomeType => incomeType.children)
  @JoinColumn({ name: 'parent_id' })
  parent?: IncomeType;

  @OneToMany(() => IncomeType, incomeType => incomeType.parent)
  children: IncomeType[];

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default IncomeType;
