interface IHashingService {
  hash(data: string, saltOrRounds: number): Promise<string>;
  compare(data: string, hash: string): Promise<boolean>;
}

export default IHashingService;
