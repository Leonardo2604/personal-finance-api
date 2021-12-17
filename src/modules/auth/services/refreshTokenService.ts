import RefreshToken from '../../../database/entities/refreshToken';
import User from '../../../database/entities/user';

interface RefreshTokenService {
  createFor(user: User): Promise<RefreshToken>;

  findById(refreshTokenId: number): Promise<RefreshToken>;

  findByToken(token: string): Promise<RefreshToken>;

  delete(refreshTokenId: number): Promise<void>;
}

export default RefreshTokenService;
