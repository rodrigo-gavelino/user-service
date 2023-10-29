import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongooseModel } from '@core/infrastructure/database/schemas/user.schema';
import { AUTH_PROVIDERS } from './auth.providers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserMongooseModel }]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ...Object.values(AUTH_PROVIDERS.REPOSITORIES),
    ...Object.values(AUTH_PROVIDERS.USECASES),
    ...Object.values(AUTH_PROVIDERS.HANDLERS),
    ...Object.values(AUTH_PROVIDERS.SERVICES),
  ],
})
export class AuthModule {}
