import { inject, injectable } from 'tsyringe';
import RefreshToken from '../../../database/entities/refreshToken';
import User from '../../../database/entities/user';
import UuidService from '../../../shared/services/uuidService';
import RefreshTokenRepository from '../repositories/refreshTokenRepository';

@injectable()
class RefreshTokenService {
  constructor(
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: RefreshTokenRepository,
    @inject('UuidService')
    private uuidService: UuidService,
  ) {}

  async createOrUpdate(user: User): Promise<RefreshToken> {
    const refreshToken = await this.refreshTokenRepository.findByUserId(
      user.id,
    );

    const token = this.uuidService.createV4();

    if (!refreshToken) {
      return this.refreshTokenRepository.createFor(user, {
        token,
      });
    }

    await this.refreshTokenRepository.update(refreshToken.id, { token });

    return this.refreshTokenRepository.findByIdOrFail(refreshToken.id);
  }

  async findById(refreshTokenId: number): Promise<RefreshToken> {
    return this.refreshTokenRepository.findByIdOrFail(refreshTokenId);
  }

  async findByToken(token: string): Promise<RefreshToken> {
    return this.refreshTokenRepository.findByTokenOrFail(token);
  }

  async delete(refreshTokenId: number): Promise<void> {
    await this.refreshTokenRepository.delete(refreshTokenId);
  }
}

export default RefreshTokenService;
