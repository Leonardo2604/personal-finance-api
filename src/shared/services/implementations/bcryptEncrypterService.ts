import bcrypt from 'bcrypt';
import EncrypterService from '../encrypterService';

class BcryptEncrypterService implements EncrypterService {
  private readonly SALT = Number(process.env.ENCRYPTATION_SALT);

  async make(text: string) {
    const salt = await bcrypt.genSalt(this.SALT);
    return bcrypt.hash(text, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export default BcryptEncrypterService;
