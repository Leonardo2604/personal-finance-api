import { container } from 'tsyringe';

import AuthService from '../../modules/auth/services/authService';
import UserService from '../../modules/auth/services/userService';
import RefreshTokenService from '../../modules/auth/services/refreshTokenService';
import IncomeTypeService from '../../modules/financial/services/incomeTypeService';
import EncrypterService from '../services/encrypterService';
import BcryptEncrypterService from '../services/implementations/bcryptEncrypterService';
import JsonwebtokenJwtService from '../services/implementations/jsonwebtokenJwtService';
import UuidUuidService from '../services/implementations/uuidUuidService';
import JwtService from '../services/jwtService';
import UuidService from '../services/uuidService';
import UserRepository from '../../modules/auth/repositories/userRepository';
import UserRepositoryTypeOrm from '../../modules/auth/repositories/typeorm/userRepositoryTypeOrm';

class AppProvider {
  static register() {
    container.registerSingleton<EncrypterService>(
      'EncrypterService',
      BcryptEncrypterService,
    );

    container.registerSingleton<JwtService>(
      'JwtService',
      JsonwebtokenJwtService,
    );

    container.registerSingleton<UuidService>('UuidService', UuidUuidService);

    container.registerSingleton<UserService>('UserService', UserService);
    container.registerSingleton<UserRepository>(
      'UserRepository',
      UserRepositoryTypeOrm,
    );
    container.registerSingleton<AuthService>('AuthService', AuthService);
    container.registerSingleton<RefreshTokenService>(
      'RefreshTokenService',
      RefreshTokenService,
    );
    container.registerSingleton<IncomeTypeService>(
      'IncomeTypeService',
      IncomeTypeService,
    );
  }
}

export default AppProvider;
