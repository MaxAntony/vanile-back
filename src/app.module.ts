import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, CommonModule, ItemModule, OrderModule, AuthModule],
})
export class AppModule {}
