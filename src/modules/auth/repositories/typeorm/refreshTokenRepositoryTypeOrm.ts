import { getRepository, Repository } from 'typeorm';
import RefreshToken from '../../../../database/entities/refreshToken';
import User from '../../../../database/entities/user';
import NotFoundException from '../../../../exceptions/notFoundException';
import CreateRefreshTokenDto from '../../dtos/createRefreshTokenDto';
import UpdateRefreshTokenDto from '../../dtos/updateRefreshTokenDto';
import RefreshTokenRepository from '../refreshTokenRepository';

class RefreshTokenRepositoryTypeOrm implements RefreshTokenRepository {
  private repository: Repository<RefreshToken>;

  constructor() {
    this.repository = getRepository(RefreshToken);
  }

  async createFor(
    user: User,
    { token }: CreateRefreshTokenDto,
  ): Promise<RefreshToken> {
    let refreshToken = await this.repository.findOne({
      where: { user },
    });

    if (!refreshToken) {
      refreshToken = this.repository.create({
        user,
        token,
      });
    } else {
      refreshToken.token = token;
    }

    return this.repository.save(refreshToken);
  }

  async update(
    refreshTokenId: number,
    { token }: UpdateRefreshTokenDto,
  ): Promise<void> {
    await this.repository.update(refreshTokenId, { token });
  }

  async findByIdOrFail(refreshTokenId: number): Promise<RefreshToken> {
    const refreshToken = await this.repository.findOne(refreshTokenId);

    if (!refreshToken) {
      throw new NotFoundException('Refresh token not found.');
    }

    return refreshToken;
  }

  async findByTokenOrFail(token: string): Promise<RefreshToken> {
    const refreshToken = await this.repository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!refreshToken) {
      throw new NotFoundException('Refresh token not found.');
    }

    return refreshToken;
  }

  async findByUserId(userId: number): Promise<RefreshToken | null> {
    const refreshToken = await this.repository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return refreshToken || null;
  }

  async delete(refreshTokenId: number): Promise<void> {
    await this.repository.delete(refreshTokenId);
  }
}

export default RefreshTokenRepositoryTypeOrm;
