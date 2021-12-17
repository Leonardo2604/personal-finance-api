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
  }

  async authenticate(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authorization = await this.authService.authenticate({
      email,
      password,
    });

    return response.json(authorization);
  }

  async renewToken(request: Request, response: Response): Promise<Response> {
    const { refreshToken } = request.body;
    const authorization = await this.authService.renewToken(refreshToken);
    return response.json(authorization);
  }
}

export default AuthController;
