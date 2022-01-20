import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import AuthService from '../services/authService';

@injectable()
class AuthController {
  constructor(
    @inject('AuthService')
    private authService: AuthService,
  ) {
    this.authenticate = this.authenticate.bind(this);
    this.renewToken = this.renewToken.bind(this);
    this.me = this.me.bind(this);
  }

  async authenticate(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const user = await this.authService.authenticate({
      email,
      password,
    });

    const authorization = await this.authService.getAuthorizationFor(user);

    return response.json(authorization);
  }

  async renewToken(request: Request, response: Response): Promise<Response> {
    const { refreshToken } = request.body;
    const authorization = await this.authService.renewToken(refreshToken);
    return response.json(authorization);
  }

  async me(request: Request, response: Response) {
    const bearerToken = request.headers.authorization || '';
    const [, token] = bearerToken.split(' ');
    const user = await this.authService.getUserByToken(token);

    return response.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}

export default AuthController;
