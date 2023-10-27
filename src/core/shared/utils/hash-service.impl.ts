import * as bcrypt from 'bcrypt';
import HashingService from '../interfaces/hash-service.interface';

class HashingServiceImpl implements HashingService {
  async hash(data: string, saltOrRounds: number): Promise<string> {
    return bcrypt.hash(data, saltOrRounds);
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}

export default HashingServiceImpl;
