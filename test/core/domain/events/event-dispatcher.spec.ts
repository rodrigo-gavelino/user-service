import IEventHandler from '@core/domain/events/@shared/event-handler.interface';
import IEvent from '@core/domain/events/@shared/event.interface';
import EventDispatcher from '@core/domain/events/event-dispatcher';

class MockEvent implements IEvent {
  dataTimeOccurred: Date = new Date();
  eventData: any;
}

class MockEventHandler implements IEventHandler<MockEvent> {
  handle = jest.fn();
}

describe('EventDispatcher', () => {
  let eventDispatcher: EventDispatcher;
  let mockEventHandler: MockEventHandler;

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();
    mockEventHandler = new MockEventHandler();
  });

  describe('register method', () => {
    it('should register an event handler correctly', () => {
      eventDispatcher.register('MockEvent', mockEventHandler);
      expect(eventDispatcher.getEventHandlers['MockEvent']).toContain(
        mockEventHandler,
      );
    });
  });

  describe('unregister method', () => {
    it('should unregister an event handler correctly', () => {
      eventDispatcher.register('MockEvent', mockEventHandler);
      eventDispatcher.unregister('MockEvent', mockEventHandler);
      expect(eventDispatcher.getEventHandlers['MockEvent']).not.toContain(
        mockEventHandler,
      );
    });
  });

  describe('unregisterAll method', () => {
    it('should unregister all event handlers', () => {
      eventDispatcher.register('MockEvent', mockEventHandler);
      eventDispatcher.unregisterAll();
      expect(eventDispatcher.getEventHandlers['MockEvent']).toBeUndefined();
    });
  });

  describe('notify method', () => {
    it('should notify the appropriate event handler', () => {
      const mockEvent = new MockEvent();
      eventDispatcher.register('MockEvent', mockEventHandler);
      eventDispatcher.notify(mockEvent);
      expect(mockEventHandler.handle).toHaveBeenCalledWith(mockEvent);
    });

    it('should not notify unregistered event handlers', () => {
      const mockEvent = new MockEvent();
      eventDispatcher.register('MockEvent', mockEventHandler);
      eventDispatcher.unregister('MockEvent', mockEventHandler);
      eventDispatcher.notify(mockEvent);
      expect(mockEventHandler.handle).not.toHaveBeenCalled();
    });
  });
});
