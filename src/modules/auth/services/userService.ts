import User from '../../../database/entities/user';
import CreateUserData from '../interfaces/createUserData';

interface UserService {
  getAll(): Promise<User[]>;

  findById(userId: number): Promise<User>;

  findByEmail(email: string): Promise<User>;

  create(data: CreateUserData): Promise<User>;

  delete(userId: number): Promise<void>;
}

export default UserService;
