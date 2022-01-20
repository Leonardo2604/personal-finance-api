import User from '../../../database/entities/user';
import CreateUserDto from '../dtos/createUserDto';

interface UserRepository {
  all(): Promise<User[]>;

  findOrFail(id: number): Promise<User>;

  findByEmailOrFail(email: string): Promise<User>;

  create(data: CreateUserDto): Promise<User>;

  delete(id: number): Promise<void>;
}

export default UserRepository;
