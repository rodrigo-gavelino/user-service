import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { InvalidUserNameError } from '@core/domain/entities/user.entity';
import { InvalidEmailError } from '@core/domain/value-objects/email.vo';
import { InvalidPasswordError } from '@core/domain/value-objects/password.vo';

@Catch(InvalidUserNameError, InvalidEmailError, InvalidPasswordError)
export class SignUpExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = HttpStatus.BAD_REQUEST;
    let errorMessage = exception.message;
    const errorType = 'Bad Request';

    if (exception instanceof InvalidUserNameError) {
      errorMessage = exception.message;
    } else if (exception instanceof InvalidEmailError) {
      errorMessage = exception.message;
    } else if (exception instanceof InvalidPasswordError) {
      errorMessage = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: errorMessage,
      error: errorType,
    });
  }
}
