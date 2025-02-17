import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { CashRegisterModule } from './cash-register/cash-register.module';
import { CommonModule } from './common/common.module';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    UserModule,
    CommonModule,
    ItemModule,
    OrderModule,
    AuthModule,
    CashRegisterModule,
    MailModule,
  ],
})
export class AppModule {}
