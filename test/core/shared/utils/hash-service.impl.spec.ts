import HashingServiceImpl from '@core/shared/utils/hash-service.impl';
import * as bcrypt from 'bcrypt';

// Configuração do Mock
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedValue'),
  compare: jest.fn().mockResolvedValue(true),
}));

// Testes
describe('HashingServiceImpl - hash', () => {
  let hashingService: HashingServiceImpl;

  beforeEach(() => {
    hashingService = new HashingServiceImpl(bcrypt);
  });

  it('should hash data correctly', async () => {
    const testData = 'exampleData';
    const hashedData = 'hashedExampleData';
    const saltOrRounds = 10;

    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedData);

    const result = await hashingService.hash(testData, saltOrRounds);

    expect(bcrypt.hash).toHaveBeenCalledWith(testData, saltOrRounds);
    expect(result).toBe(hashedData);
  });

  it('should handle hashing errors', async () => {
    const testData = 'exampleData';
    const saltOrRounds = 10;
    const errorMessage = 'Hashing error';

    (bcrypt.hash as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(hashingService.hash(testData, saltOrRounds)).rejects.toThrow(
      errorMessage,
    );
  });
});

describe('HashingServiceImpl - compare', () => {
  let hashingService: HashingServiceImpl;

  beforeEach(() => {
    hashingService = new HashingServiceImpl(bcrypt);
  });

  it('should return true for correct data and hash comparison', async () => {
    const testData = 'exampleData';
    const hashedData = 'hashedExampleData';

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await hashingService.compare(testData, hashedData);

    expect(bcrypt.compare).toHaveBeenCalledWith(testData, hashedData);
    expect(result).toBe(true);
  });

  it('should return false for incorrect data and hash comparison', async () => {
    const testData = 'exampleData';
    const wrongHashedData = 'wrongHashedData';

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const result = await hashingService.compare(testData, wrongHashedData);

    expect(result).toBe(false);
  });

  it('should handle comparison errors', async () => {
    const testData = 'exampleData';
    const hashedData = 'hashedExampleData';
    const errorMessage = 'Comparison error';

    (bcrypt.compare as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(hashingService.compare(testData, hashedData)).rejects.toThrow(
      errorMessage,
    );
  });
});
