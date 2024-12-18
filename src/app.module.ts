import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ItemModule } from './item/item.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UserModule, CommonModule, ItemModule, OrderModule],
})
export class AppModule {}
