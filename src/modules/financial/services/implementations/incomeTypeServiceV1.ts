import { injectable } from 'tsyringe';
import { getRepository, IsNull, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import IncomeType from '../../../../database/entities/incomeType';
import CreateIncomeTypeData from '../../interfaces/incomeTypeService/createIncomeTypeData';
import UpdateIncomeTypeData from '../../interfaces/incomeTypeService/updateIncomeTypeData';
import IncomeTypeService from '../incomeTypeService';

@injectable()
class IncomeTypeServiceV1 implements IncomeTypeService {
  private incomeTypeRepository: Repository<IncomeType>;

  constructor() {
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
    { name, parentId }: CreateIncomeTypeData,
  ): Promise<IncomeType> {
    const incomeType = this.incomeTypeRepository.create({
      user: {
        id: userId,
      },
      parent: {
        id: parentId,
      },
      name,
    });

    return this.incomeTypeRepository.save(incomeType);
  }

  async updateFor(
    userId: number,
    id: number,
    { name, parentId }: UpdateIncomeTypeData,
  ): Promise<void> {
    const where = {
      id,
      user: {
        id: userId,
      },
    };

    const data: QueryDeepPartialEntity<IncomeType> = {
      name,
    };

    if (parentId && parentId !== -1) {
      data.parent = {
        id: parentId,
      };
    } else if (parentId === -1) {
      data.parent = {
        id: undefined,
      };
    }

    await this.incomeTypeRepository.update(where, data);
  }

  async deleteFor(userId: number, id: number): Promise<void> {
    const where = {
      id,
      user: {
        id: userId,
      },
    };

    await this.incomeTypeRepository.softDelete(where);
  }
}

export default IncomeTypeServiceV1;
