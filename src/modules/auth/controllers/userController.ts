import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import UserService from '../services/userService';

@injectable()
class UserController {
  constructor(
    @inject('UserService')
    private userService: UserService,
  ) {
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const users = await this.userService.getAll();
    return response.json(users);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const user = await this.userService.create({ name, email, password });
    return response.status(201).json(user);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    await this.userService.delete(Number(userId));
    return response.status(204).json();
  }
}

export default UserController;
