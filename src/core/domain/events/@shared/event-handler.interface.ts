import IEvent from './event.interface';

interface IEventHandler<T extends IEvent = IEvent> {
  handle(event: T): void;
}

export default IEventHandler;
