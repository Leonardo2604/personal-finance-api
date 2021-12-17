import { inject, injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import RefreshToken from '../../../../database/entities/refreshToken';
import User from '../../../../database/entities/user';
import NotFoundException from '../../../../exceptions/notFoundException';
import UuidService from '../../../../shared/services/uuidService';
import RefreshTokenService from '../refreshTokenService';

@injectable()
class RefreshTokenServiceV1 implements RefreshTokenService {
  private refreshTokenRepository: Repository<RefreshToken>;

  constructor(
    @inject('UuidService')
    private uuidService: UuidService,
  ) {
    this.refreshTokenRepository = getRepository(RefreshToken);
  }

  async createFor(user: User): Promise<RefreshToken> {
    let refreshToken = await this.refreshTokenRepository.findOne({
      where: { user },
    });

    const token = this.uuidService.createV4();

    if (!refreshToken) {
      refreshToken = this.refreshTokenRepository.create({
        user,
        token,
      });
    } else {
      refreshToken.token = token;
    }

    return this.refreshTokenRepository.save(refreshToken);
  }

  async findById(refreshTokenId: number): Promise<RefreshToken> {
    const refreshToken = await this.refreshTokenRepository.findOne(
      refreshTokenId,
    );

    if (!refreshToken) {
      throw new NotFoundException('Refresh token not found.');
    }

    return refreshToken;
  }

  async findByToken(token: string): Promise<RefreshToken> {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!refreshToken) {
      throw new NotFoundException('Refresh token not found.');
    }

    return refreshToken;
  }

  async delete(refreshTokenId: number): Promise<void> {
    await this.refreshTokenRepository.delete(refreshTokenId);
  }
}

export default RefreshTokenServiceV1;
