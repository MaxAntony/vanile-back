import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [UserModule, CommonModule, ItemModule],
})
export class AppModule {}
