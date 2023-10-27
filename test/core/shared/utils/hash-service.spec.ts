import HashingServiceImpl from '@core/shared/utils/hash-service.impl';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('HashingServiceImpl', () => {
  let hashingService: HashingServiceImpl;

  beforeEach(async () => {
    (bcrypt.hash as jest.Mock).mockClear();

    const moduleRef = await Test.createTestingModule({
      providers: [HashingServiceImpl],
    }).compile();

    hashingService = moduleRef.get<HashingServiceImpl>(HashingServiceImpl);
  });

  it('should hash data correctly', async () => {
    const data = 'testPassword';
    const hashedValue = 'hashedPassword';

    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedValue);

    const result = await hashingService.hash(data, 10);

    expect(result).toEqual(hashedValue);
    expect(bcrypt.hash).toHaveBeenCalledWith(data, 10);
  });

  it('should compare hashed data correctly', async () => {
    const data = 'testPassword';
    const hashedValue = 'hashedPassword';

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await hashingService.compare(data, hashedValue);

    expect(result).toBe(true);
    expect(bcrypt.compare).toHaveBeenCalledWith(data, hashedValue);
  });

  it('should handle exceptions thrown during hashing', async () => {
    const data = 'testPassword';

    (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Mock error'));

    await expect(hashingService.hash(data, 10)).rejects.toThrow('Mock error');
  });

  it('should handle exceptions thrown during comparison', async () => {
    const data = 'testPassword';
    const hashedValue = 'hashedPassword';

    (bcrypt.compare as jest.Mock).mockRejectedValue(new Error('Mock error'));

    await expect(hashingService.compare(data, hashedValue)).rejects.toThrow(
      'Mock error',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
