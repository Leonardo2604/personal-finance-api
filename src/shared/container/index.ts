import { container } from 'tsyringe';

import AuthService from '../../modules/auth/services/authService';
import AuthServiceV1 from '../../modules/auth/services/implementations/authServiceV1';
import RefreshTokenServiceV1 from '../../modules/auth/services/implementations/refreshTokenServiceV1';
import UserServiceV1 from '../../modules/auth/services/implementations/userServiceV1';
import RefreshTokenService from '../../modules/auth/services/refreshTokenService';
import UserService from '../../modules/auth/services/userService';
import IncomeTypeServiceV1 from '../../modules/financial/services/implementations/incomeTypeServiceV1';
import IncomeTypeService from '../../modules/financial/services/incomeTypeService';
import EncrypterService from '../services/encrypterService';
import BcryptEncrypterService from '../services/implementations/bcryptEncrypterService';
import JsonwebtokenJwtService from '../services/implementations/jsonwebtokenJwtService';
import UuidUuidService from '../services/implementations/uuidUuidService';
import JwtService from '../services/jwtService';
import UuidService from '../services/uuidService';

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

    container.registerSingleton<UserService>('UserService', UserServiceV1);
    container.registerSingleton<AuthService>('AuthService', AuthServiceV1);
    container.registerSingleton<RefreshTokenService>(
      'RefreshTokenService',
      RefreshTokenServiceV1,
    );
    container.registerSingleton<IncomeTypeService>(
      'IncomeTypeService',
      IncomeTypeServiceV1,
    );
  }
}

export default AppProvider;
