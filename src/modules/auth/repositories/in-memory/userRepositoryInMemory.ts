import User from '../../../../database/entities/user';
import NotFoundException from '../../../../exceptions/notFoundException';
import CreateUserDto from '../../dtos/createUserDto';
import UserRepository from '../userRepository';

class UserRepositoryInMenory implements UserRepository {
  private users: User[] = [];

  async all(): Promise<User[]> {
    return this.users;
  }

  async findOrFail(id: number): Promise<User> {
    const user = this.users.find(u => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async findByEmailOrFail(email: string): Promise<User> {
    const user = this.users.find(u => u.email === email);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: this.users.length,
      name: data.name,
      email: data.email,
      password: data.password,
    });

    this.users.push(user);

    return user;
  }

  async delete(id: number): Promise<void> {
    const userIndex = this.users.findIndex(u => u.id === id);

    if (userIndex) {
      this.users.splice(userIndex, 1);
    }
  }
}

export default UserRepositoryInMenory;
