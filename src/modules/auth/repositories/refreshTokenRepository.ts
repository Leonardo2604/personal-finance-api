import RefreshToken from '../../../database/entities/refreshToken';
import User from '../../../database/entities/user';
import CreateRefreshTokenDto from '../dtos/createRefreshTokenDto';
import UpdateRefreshTokenDto from '../dtos/updateRefreshTokenDto';

interface RefreshTokenRepository {
  createFor(user: User, data: CreateRefreshTokenDto): Promise<RefreshToken>;

  update(refreshTokenId: number, data: UpdateRefreshTokenDto): Promise<void>;

  findByUserId(userId: number): Promise<RefreshToken | null>;

  findByIdOrFail(refreshTokenId: number): Promise<RefreshToken>;

  findByTokenOrFail(token: string): Promise<RefreshToken>;

  delete(refreshTokenId: number): Promise<void>;
}

export default RefreshTokenRepository;
