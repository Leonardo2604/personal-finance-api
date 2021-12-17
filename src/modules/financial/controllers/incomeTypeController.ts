import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
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
    this.delete = this.delete.bind(this);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const incomeTypes = await this.incomeTypeService.getAllFrom(Number(userId));

    return response.json(incomeTypes);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const { name, parentId } = request.body;

    const incomeType = await this.incomeTypeService.createFor(Number(userId), {
      name,
      parentId,
    });

    return response.status(201).json(incomeType);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { userId, incomeTypeId } = request.params;
    const { name, parentId } = request.body;

    await this.incomeTypeService.updateFor(
      Number(userId),
      Number(incomeTypeId),
      {
        name,
        parentId,
      },
    );

    return response.status(204).json();
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { userId, incomeTypeId } = request.params;

    await this.incomeTypeService.deleteFor(
      Number(userId),
      Number(incomeTypeId),
    );

    return response.status(204).json();
  }
}

export default IncomeTypeController;
