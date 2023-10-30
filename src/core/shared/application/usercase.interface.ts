interface IUsecase<Input, Output> {
  execute(input: Input): Promise<Output>;
}

export default IUsecase;
