import { v4 } from 'uuid';
import UuidService from '../uuidService';

class UuidUuidService implements UuidService {
  createV4(): string {
    return v4();
  }
}

export default UuidUuidService;
