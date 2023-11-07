import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

type EventStoreDocument = EventStore & Document;

@Schema({
  collection: 'event_store',
  timestamps: true,
})
class EventStore {
  @Prop({ required: true, type: String })
  eventType: string;

  @Prop({ required: true, type: Object })
  payload: any;
}

const EventStoreSchema = SchemaFactory.createForClass(EventStore);

export { EventStoreDocument, EventStoreSchema, EventStore };
