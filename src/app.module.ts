import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ItemModule } from './item/item.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, CommonModule, ItemModule],
})
export class AppModule {}
