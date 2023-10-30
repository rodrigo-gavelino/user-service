interface ICommandHandler<TCommand, TResult> {
  handle(command: TCommand): Promise<TResult>;
}

export default ICommandHandler;
