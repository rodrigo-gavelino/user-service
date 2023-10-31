import { IMessagingService } from '@core/shared/interfaces/messaging.interface';
import IEventHandler from '../../@shared/event-handler.interface';
import IEvent from '../../@shared/event.interface';
import UserCreatedEvent from '../user-created.event';

class SendEmailWhenAnUserIsCreatedHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor(private readonly messagingService: IMessagingService) {}

  handle(event: IEvent): void {
    this.messagingService.produce('user-created', event.eventData);
  }
}

export default SendEmailWhenAnUserIsCreatedHandler;
