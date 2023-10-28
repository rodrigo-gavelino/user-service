import * as bcrypt from 'bcrypt';
import IHashingService from '../interfaces/hash-service.interface';

class HashingServiceImpl implements IHashingService {
  constructor(private readonly crypt: typeof bcrypt) {}

  async hash(data: string, saltOrRounds: number): Promise<string> {
    return this.crypt.hash(data, saltOrRounds);
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return this.crypt.compare(data, hash);
  }
}

export default HashingServiceImpl;
