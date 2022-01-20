import User from '../../database/entities/user';

declare global {
  namespace Express {
    interface Request {
      auth: {
        user?: User;
      };
    }
  }
}
