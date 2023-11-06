import { IMessagingService } from '@core/shared/interfaces/messaging.interface';
import {
  connect,
  ChannelWrapper,
  AmqpConnectionManager,
} from 'amqp-connection-manager';

class RabbitMQMessagingService implements IMessagingService {
  private client: AmqpConnectionManager;
  private channel: ChannelWrapper;

  constructor(private urls: string[]) {
    this.client = connect(urls, {
      reconnectTimeInSeconds: 5,
      connectionOptions: {},
    });

    this.channel = this.client.createChannel({
      json: true,
      setup: (channel) => this.setupChannel(channel),
    });
  }

  private async setupChannel(channel) {
    await channel.assertExchange('my-direct-exchange', 'direct', {
      durable: true,
    });

    await channel.assertQueue('my-queue', { durable: true });

    await channel.bindQueue('my-queue', 'my-direct-exchange', 'my-routing-key');
  }

  async produce(queueName: string, message: any): Promise<void> {
    try {
      await this.channel.sendToQueue(queueName, JSON.stringify(message));
    } catch (error) {
      console.error('Error publishing message:', error);
    }
  }
}

export { RabbitMQMessagingService };
