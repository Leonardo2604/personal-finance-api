import { inject, injectable } from 'tsyringe';

import User from '../../../database/entities/user';
import CreateUserDto from '../dtos/createUserDto';
import UserRepository from '../repositories/userRepository';

@injectable()
class UserService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.getAll();
    return users;
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findByIdOrFail(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmailOrFail(email);
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.userRepository.create(data);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}

export default UserService;
