import { IMessagingService } from '@core/shared/interfaces/messaging.interface';
import {
  connect,
  ChannelWrapper,
  AmqpConnectionManager,
} from 'amqp-connection-manager';

class RabbitMQMessagingService implements IMessagingService {
  private client: AmqpConnectionManager;
  private channel: ChannelWrapper;

  constructor(
    private urls: string[],
    private exchange: string,
  ) {
    this.client = connect(urls, {
      reconnectTimeInSeconds: 5,
      connectionOptions: {
        // Configurações de autenticação e outras configurações.
      },
    });

    this.channel = this.client.createChannel({
      json: true,
      setup: (channel) => this.setupChannel(channel),
    });
  }

  private async setupChannel(channel) {
    await channel.assertExchange(this.exchange, 'direct', { durable: true });

    await channel.assertQueue('UserCreatedEvent', { durable: true });

    await channel.bindQueue(
      'UserCreatedEvent',
      this.exchange,
      'UserCreatedEvent',
    );
  }

  // ...
  async produce(channel: string, message: any): Promise<void> {
    try {
      await this.channel.publish(this.exchange, channel, message);
    } catch (error) {
      console.error('Error publishing message:', error);
    }
  }
  // ...

  // Outros métodos poderiam ser implementados aqui.
}

export { RabbitMQMessagingService };
