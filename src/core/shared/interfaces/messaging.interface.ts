export interface IMessagingService {
  produce(topic: string, message: any): Promise<void>;
}
