import Password, {
  InvalidPasswordError,
} from '@core/domain/value-objects/password.vo';
import HashingService from '@core/shared/interfaces/hash-service.interface';

// Criando o mock usando jest.fn()
const mockHash = jest.fn();
const mockCompare = jest.fn();

const mockHashingService: HashingService = {
  hash: mockHash,
  compare: mockCompare,
};

describe('Password ValueObject', () => {
  // Restabelece os mocks após cada teste
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create()', () => {
    it('should successfully create a valid password', () => {
      const value = 'Test@1234';
      const password = Password.create(value);
      expect(password.value).toBe(value);
    });

    it('should throw an error for a short password', () => {
      expect(() => {
        Password.create('T@1a');
      }).toThrow(InvalidPasswordError);
    });

    it('should throw an error for a password without a number', () => {
      expect(() => {
        Password.create('Test@Word');
      }).toThrow(InvalidPasswordError);
    });

    it('should throw an error for a password without an uppercase letter', () => {
      expect(() => {
        Password.create('test@123');
      }).toThrow(InvalidPasswordError);
    });

    it('should throw an error for a password without a special character', () => {
      expect(() => {
        Password.create('Test1234');
      }).toThrow(InvalidPasswordError);
    });
  });

  describe('fromPlainText()', () => {
    it('should return hashed password for valid input', async () => {
      const rawPassword = 'Valid@123';
      const hashedPassword = 'hashed-Valid@123'; // De acordo com a implementação mockada

      mockHash.mockResolvedValueOnce(hashedPassword);

      const password = await Password.fromPlainText(
        rawPassword,
        mockHashingService,
      );

      expect(password.value).toBe(hashedPassword);
    });

    it('should throw an error for invalid plain text password', async () => {
      await expect(
        Password.fromPlainText('Inv@1', mockHashingService),
      ).rejects.toThrow(InvalidPasswordError);
    });
  });

  describe('matches()', () => {
    it('should return true for matching password', async () => {
      const rawPassword = 'Match@123';
      const hashedPassword = 'hashed-Match@123'; // De acordo com a implementação mockada

      mockCompare.mockResolvedValueOnce(true);

      const password = Password.create(hashedPassword);
      const matches = await password.matches(rawPassword, mockHashingService);

      expect(matches).toBe(true);
    });
  });

  describe('equals()', () => {
    it('should return true for matching passwords', () => {
      const password1 = Password.create('Test@123');
      const password2 = Password.create('Test@123');
      expect(password1.equals(password2)).toBe(true);
    });

    it('should return false for different passwords', () => {
      const password1 = Password.create('Test@123');
      const password2 = Password.create('Test@1234');
      expect(password1.equals(password2)).toBe(false);
    });
  });
});
