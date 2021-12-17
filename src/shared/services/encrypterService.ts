interface EncrypterService {
  make(text: string): Promise<string>;

  compare(password: string, hash: string): Promise<boolean>;
}

export default EncrypterService;
