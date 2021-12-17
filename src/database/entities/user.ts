import { container } from 'tsyringe';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import EncrypterService from '../../shared/services/encrypterService';
import RefreshToken from './refreshToken';

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp without time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp without time zone',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp without time zone',
  })
  deletedAt?: Date;

  @OneToOne(() => RefreshToken, refreshToken => refreshToken.user)
  refreshToken?: RefreshToken;

  private tempPassword: string;

  @AfterLoad()
  loadPassword() {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.tempPassword !== this.password) {
      const encrypter = container.resolve<EncrypterService>('EncrypterService');
      this.password = await encrypter.make(this.password);
    }
  }
}

export default User;
