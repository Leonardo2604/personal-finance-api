import User from '../../../database/entities/user';
import Authorization from '../interfaces/authorization';
import Credentials from '../interfaces/credentials';

interface AuthService {
  authenticate(credentials: Credentials): Promise<Authorization>;
  renewToken(refreshToken: string): Promise<Authorization>;
  isAuthenticated(token: string): boolean;
  getUserByToken(jwtToken: string): Promise<User>;
}

export default AuthService;
