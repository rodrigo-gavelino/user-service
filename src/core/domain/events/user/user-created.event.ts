import IEvent from '../@shared/event.interface';

class UserCreatedEvent implements IEvent {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}

export default UserCreatedEvent;
