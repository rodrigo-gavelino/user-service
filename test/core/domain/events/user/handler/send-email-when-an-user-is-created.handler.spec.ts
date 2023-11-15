import SendEmailWhenAnUserIsCreatedHandler from '@core/domain/events/user/handler/send-email-when-an-user-is-created.handler';
import UserCreatedEvent from '@core/domain/events/user/user-created.event';
import { IMessagingService } from '@core/shared/interfaces/messaging.interface';

describe('SendEmailWhenAnUserIsCreatedHandler', () => {
  let handler: SendEmailWhenAnUserIsCreatedHandler;
  let mockMessagingService: IMessagingService;
  let mockEvent: UserCreatedEvent;

  beforeEach(() => {
    // Criar um mock para IMessagingService
    mockMessagingService = {
      produce: jest.fn(),
    };

    // Instanciar o handler com o serviço de mensagens mockado
    handler = new SendEmailWhenAnUserIsCreatedHandler(mockMessagingService);

    // Criar um mock para UserCreatedEvent
    mockEvent = new UserCreatedEvent({
      /* dados do evento */
    });
  });

  it('should call the messaging service produce method with correct parameters', () => {
    handler.handle(mockEvent);

    // Verificar se o método produce foi chamado com os parâmetros corretos
    expect(mockMessagingService.produce).toHaveBeenCalledWith(
      'UserCreatedEvent',
      mockEvent.eventData,
    );
  });

  it('should call the messaging service produce method only once', () => {
    handler.handle(mockEvent);

    // Verificar se o método produce foi chamado apenas uma vez
    expect(mockMessagingService.produce).toHaveBeenCalledTimes(1);
  });

  it('should call the messaging service produce method with correct event type', () => {
    handler.handle(mockEvent);

    // Verificar se o método produce foi chamado com o tipo de evento correto
    expect(mockMessagingService.produce).toHaveBeenCalledWith(
      'UserCreatedEvent',
      expect.anything(),
    );
  });

  it('should call the messaging service produce method with correct event data', () => {
    handler.handle(mockEvent);

    // Verificar se o método produce foi chamado com os dados do evento corretos
    expect(mockMessagingService.produce).toHaveBeenCalledWith(
      expect.anything(),
      mockEvent.eventData,
    );
  });
});
