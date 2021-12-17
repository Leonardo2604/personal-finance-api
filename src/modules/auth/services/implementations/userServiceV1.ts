import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';

import User from '../../../../database/entities/user';
import NotFoundException from '../../../../exceptions/notFoundException';
import CreateUserData from '../../interfaces/createUserData';
import UserService from '../userService';

@injectable()
class UserServiceV1 implements UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['refreshToken'],
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async create(data: CreateUserData): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.softDelete({
      id,
    });
  }
}

export default UserServiceV1;
