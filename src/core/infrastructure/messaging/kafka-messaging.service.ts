import { IMessagingService } from '@core/shared/interfaces/messaging.interface';
import { Kafka } from 'kafkajs';

class KafkaMessagingService implements IMessagingService {
  private kafka: Kafka;

  constructor(brokers: string[]) {
    this.kafka = new Kafka({
      clientId: 'user-service',
      brokers: brokers,
    });
  }

  async produce(topic: string, message: any): Promise<void> {
    const producer = this.kafka.producer();

    await producer.connect();

    await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });

    await producer.disconnect();
  }
}

export { KafkaMessagingService };
