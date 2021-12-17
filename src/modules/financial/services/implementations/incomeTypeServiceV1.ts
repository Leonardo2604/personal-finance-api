import { inject, injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import IncomeType from '../../../../database/entities/incomeType';
import UserService from '../../../auth/services/userService';
import CreateIncomeTypeData from '../../interfaces/incomeTypeService/createIncomeTypeData';
import UpdateIncomeTypeData from '../../interfaces/incomeTypeService/updateIncomeTypeData';
import IncomeTypeService from '../incomeTypeService';

@injectable()
class IncomeTypeServiceV1 implements IncomeTypeService {
  private incomeTypeRepository: Repository<IncomeType>;

  constructor(
    @inject('UserService')
    private userService: UserService,
  ) {
    this.incomeTypeRepository = getRepository(IncomeType);
  }

  async getAllFrom(userId: number): Promise<IncomeType[]> {
    const incomeTypes = await this.incomeTypeRepository.find({
      where: { user: userId },
    });
    return incomeTypes;
  }

  async createFor(
    userId: number,
    { name }: CreateIncomeTypeData,
  ): Promise<IncomeType> {
    const incomeType = this.incomeTypeRepository.create({
      user: {
        id: userId,
      },
      name,
    });

    return this.incomeTypeRepository.save(incomeType);
  }

  async updateFor(
    userId: number,
    id: number,
    data: UpdateIncomeTypeData,
  ): Promise<void> {
    const where = {
      id,
      user: {
        id: userId,
      },
    };
    await this.incomeTypeRepository.update(where, data);
  }
}

export default IncomeTypeServiceV1;
