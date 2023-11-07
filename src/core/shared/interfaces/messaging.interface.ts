export interface IMessagingService {
  // O 'channel' pode ser um tópico do Kafka ou uma fila/exchange do RabbitMQ
  produce(channel: string, message: any): Promise<void>;
}
