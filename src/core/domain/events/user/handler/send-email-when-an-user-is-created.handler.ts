import IEventHandler from '../../@shared/event-handler.interface';
import IEvent from '../../@shared/event.interface';
import UserCreatedEvent from '../user-created.event';

class SendEmailWhenAnUserIsCreatedHandler
  implements IEventHandler<UserCreatedEvent>
{
  handle(event: IEvent): void {
    console.log(`Sending email to ${event.eventData.email}`);
  }
}

export default SendEmailWhenAnUserIsCreatedHandler;
