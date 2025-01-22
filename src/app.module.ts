import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ItemModule } from './item/item.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, CommonModule, ItemModule, OrderModule, AuthModule],
})
export class AppModule {}
