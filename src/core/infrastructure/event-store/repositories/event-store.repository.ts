import { Model } from 'mongoose';
import { EventStoreDocument } from '../schemas/event-store.schema';
import IEvent from '@core/domain/events/@shared/event.interface';

class EventStoreRepository {
  constructor(private readonly eventStoreModel: Model<EventStoreDocument>) {}

  async saveEvent(event: IEvent): Promise<void> {
    const eventName = event.constructor.name;
    await this.eventStoreModel.create({
      eventType: eventName,
      payload: event.eventData,
    });
  }
}

export { EventStoreRepository };
