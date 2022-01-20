import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import User from '../../../../database/entities/user';
import NotFoundException from '../../../../exceptions/notFoundException';
import CreateUserDto from '../../dtos/createUserDto';
import UserRepository from '../userRepository';

@injectable()
class UserRepositoryTypeOrm implements UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async getAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  async findByIdOrFail(id: number): Promise<User> {
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async findByEmailOrFail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { email },
      relations: ['refreshToken'],
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete({
      id,
    });
  }
}

export default UserRepositoryTypeOrm;
