import jwt from 'jsonwebtoken';
import BusinessException from '../../../exceptions/businessException';
import JwtService from '../jwtService';

class JsonwebtokenJwtService implements JwtService {
  private readonly APP_KEY = String(process.env.APP_KEY);

  private readonly TOKEN_EXPIRES_AFTER_SECONDS = Number(
    process.env.TOKEN_EXPIRES_AFTER_SECONDS,
  );

  create(userId: number, payload: object = {}): string {
    return jwt.sign(payload, this.APP_KEY, {
      subject: userId.toString(),
      expiresIn: this.TOKEN_EXPIRES_AFTER_SECONDS,
    });
  }

  check(token: string): boolean {
    try {
      jwt.verify(token, this.APP_KEY);
    } catch (error) {
      return false;
    }

    return true;
  }

  getUserId(token: string): number {
    const data = jwt.decode(token);

    if (data && data.sub) {
      return Number(data.sub);
    }

    throw new BusinessException('Jwt sub is missing');
  }
}

export default JsonwebtokenJwtService;
