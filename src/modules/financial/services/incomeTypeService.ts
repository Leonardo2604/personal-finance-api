import IncomeType from '../../../database/entities/incomeType';
import CreateIncomeTypeData from '../interfaces/incomeTypeService/createIncomeTypeData';
import UpdateIncomeTypeData from '../interfaces/incomeTypeService/updateIncomeTypeData';

interface IncomeTypeService {
  getAllFrom(userId: number): Promise<IncomeType[]>;
  createFor(userId: number, data: CreateIncomeTypeData): Promise<IncomeType>;
  updateFor(
    userId: number,
    incomeTypeId: number,
    data: UpdateIncomeTypeData,
  ): Promise<void>;
  deleteFor(userId: number, incomeTypeId: number): Promise<void>;
}

export default IncomeTypeService;
