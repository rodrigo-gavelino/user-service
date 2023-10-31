// src/core/infrastructure/messaging/messaging.interface.ts

export interface IMessagingService {
  produce(topic: string, message: any): Promise<void>;
}
