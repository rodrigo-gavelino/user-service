import EventDispatcher from '@core/domain/events/event-dispatcher';
import SendEmailWhenAnUserIsCreatedHandler from '@core/domain/events/user/handler/send-email-when-an-user-is-created.handler';
import UserCreatedEvent from '@core/domain/events/user/user-created.event';

describe('Domain Event Dispatcher', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenAnUserIsCreatedHandler();

    eventDispatcher.register('UserCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['UserCreatedEvent']).toBeDefined();

    expect(eventDispatcher.getEventHandlers['UserCreatedEvent'].length).toBe(1);

    expect(
      eventDispatcher.getEventHandlers['UserCreatedEvent'][0],
    ).toMatchObject(eventHandler);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenAnUserIsCreatedHandler();

    eventDispatcher.register('UserCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['UserCreatedEvent']).toBeDefined();

    expect(eventDispatcher.getEventHandlers['UserCreatedEvent'].length).toBe(1);

    expect(
      eventDispatcher.getEventHandlers['UserCreatedEvent'][0],
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister('UserCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['UserCreatedEvent'].length).toBe(0);
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenAnUserIsCreatedHandler();

    eventDispatcher.register('UserCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['UserCreatedEvent']).toBeDefined();

    expect(eventDispatcher.getEventHandlers['UserCreatedEvent'].length).toBe(1);

    expect(
      eventDispatcher.getEventHandlers['UserCreatedEvent'][0],
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers['UserCreatedEvent'],
    ).toBeUndefined();
  });

  it('should notify an event', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenAnUserIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('UserCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['UserCreatedEvent'][0],
    ).toMatchObject(eventHandler);

    const userCreatedEvent = new UserCreatedEvent({
      name: '',
      email: '',
    });
    eventDispatcher.notify(userCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
