import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import User from '../../../database/entities/user';
import IncomeTypeService from '../services/incomeTypeService';

@injectable()
class IncomeTypeController {
  constructor(
    @inject('IncomeTypeService')
    private incomeTypeService: IncomeTypeService,
  ) {
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const incomeTypes = await this.incomeTypeService.getAllFrom(Number(userId));

    return response.json(incomeTypes);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const { name } = request.body;

    const incomeType = await this.incomeTypeService.createFor(Number(userId), {
      name,
    });

    return response.status(201).json(incomeType);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { userId, incomeTypeId } = request.params;

    await this.incomeTypeService.updateFor(
      Number(userId),
      Number(incomeTypeId),
      {
        name,
      },
    );

    return response.status(204).json();
  }
}

export default IncomeTypeController;
