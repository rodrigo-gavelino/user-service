import UserCreatedEvent from '@core/domain/events/user/user-created.event';

describe('UserCreatedEvent', () => {
  it('should correctly initialize dataTimeOccurred and eventData', () => {
    const eventData = { userId: '123', username: 'johndoe' };
    const event = new UserCreatedEvent(eventData);

    expect(event).toBeInstanceOf(UserCreatedEvent);
    expect(event.eventData).toEqual(eventData);
    expect(event.dataTimeOccurred).toBeInstanceOf(Date);
  });

  describe('UserCreatedEvent', () => {
    it('should correctly set the current date and time in dataTimeOccurred', () => {
      const eventData = { userId: '123', username: 'johndoe' };
      const beforeCreation = new Date();
      const event = new UserCreatedEvent(eventData);
      const afterCreation = new Date();

      expect(event.dataTimeOccurred.getTime()).toBeGreaterThanOrEqual(
        beforeCreation.getTime(),
      );
      expect(event.dataTimeOccurred.getTime()).toBeLessThanOrEqual(
        afterCreation.getTime(),
      );
    });
  });
});
