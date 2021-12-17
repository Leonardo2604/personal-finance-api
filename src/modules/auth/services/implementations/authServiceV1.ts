import { inject, injectable } from 'tsyringe';
import User from '../../../../database/entities/user';
import NotFoundException from '../../../../exceptions/notFoundException';
import UnauthorizedException from '../../../../exceptions/unauthorizedException';
import EncrypterService from '../../../../shared/services/encrypterService';
import JwtService from '../../../../shared/services/jwtService';
import Authorization from '../../interfaces/authorization';
import Credentials from '../../interfaces/credentials';
import AuthService from '../authService';
import RefreshTokenService from '../refreshTokenService';
import UserService from '../userService';

@injectable()
class AuthServiceV1 implements AuthService {
  constructor(
    @inject('UserService')
    private userService: UserService,
    @inject('EncrypterService')
    private encrypterService: EncrypterService,
    @inject('JwtService')
    private jwtService: JwtService,
    @inject('RefreshTokenService')
    private refreshTokenService: RefreshTokenService,
  ) {}

  async authenticate(credentials: Credentials): Promise<Authorization> {
    try {
      const user = await this.userService.findByEmail(credentials.email);

      const passwordIsCorrect = this.encrypterService.compare(
        credentials.password,
        user.password,
      );

      if (!passwordIsCorrect) {
        throw new UnauthorizedException('User or password incorrect.');
      }

      const authorization = this.getAuthorizationFor(user);
      return authorization;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException('User or password incorrect.');
      }

      throw error;
    }
  }

  async renewToken(token: string): Promise<Authorization> {
    try {
      const refreshToken = await this.refreshTokenService.findByToken(token);
      return this.getAuthorizationFor(refreshToken.user, false);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException('Invalid refresh token provided.');
      }

      throw error;
    }
  }

  isAuthenticated(token: string): boolean {
    return this.jwtService.check(token);
  }

  getUserByToken(jwtToken: string): Promise<User> {
    const userId = this.jwtService.getUserId(jwtToken);
    return this.userService.findById(userId);
  }

  private async getAuthorizationFor(
    user: User,
    needRefreshToken = true,
  ): Promise<Authorization> {
    const token = this.jwtService.create(user.id);
    const authorization: Authorization = {
      token,
      tokenExpiresIn: Number(process.env.TOKEN_EXPIRES_AFTER_SECONDS),
    };

    if (needRefreshToken) {
      const refreshToken = await this.refreshTokenService.createFor(user);
      authorization.refreshToken = refreshToken.token;
    }

    return authorization;
  }
}

export default AuthServiceV1;
