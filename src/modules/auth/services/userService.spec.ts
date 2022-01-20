import 'reflect-metadata';
import User from '../../../database/entities/user';
import NotFoundException from '../../../exceptions/notFoundException';
import AppProvider from '../../../shared/container';
import CreateUserDto from '../dtos/createUserDto';
import UserRepositoryInMenory from '../repositories/in-memory/userRepositoryInMemory';
import UserService from './userService';

let userRepository: UserRepositoryInMenory;
let userService: UserService;

describe('User Service', () => {
  beforeAll(() => {
    AppProvider.register();
  });

  beforeEach(() => {
    userRepository = new UserRepositoryInMenory();
    userService = new UserService(userRepository);
  });

  it('Should be able to create a user', async () => {
    const data: CreateUserDto = {
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '@123',
    };

    const user = await userService.create(data);

    expect(user).toHaveProperty('id');
  });

  it('Should be able to list all users', async () => {
    const data: CreateUserDto = {
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '@123',
    };

    await userService.create(data);

    const users = await userService.getAll();

    expect(users.length).toBe(1);
  });

  it('Should be able to find a user by id', async () => {
    const data: CreateUserDto = {
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '@123',
    };

    const userCreated = await userService.create(data);
    const user = await userService.findById(userCreated.id);

    expect(user).toBeInstanceOf(User);
  });

  it('Should be not able to find a non-existent user by id', () => {
    expect(async () => {
      await userService.findById(123456);
    }).rejects.toThrow(NotFoundException);
  });

  it('Should be able to find a user by email', async () => {
    const data: CreateUserDto = {
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '@123',
    };

    const userCreated = await userService.create(data);
    const user = await userService.findByEmail(userCreated.email);

    expect(user).toBeInstanceOf(User);
  });

  it('Should be not able to find a non-existent user by email', () => {
    expect(async () => {
      await userService.findByEmail('leonardo@gmail.com');
    }).rejects.toThrow(NotFoundException);
  });

  it('Should be able to delete a user by id', async () => {
    const data: CreateUserDto = {
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '@123',
    };

    const user = await userService.create(data);
    await userService.delete(user.id);
    const users = await userService.getAll();

    expect(users.length).toBe(0);
  });
});
