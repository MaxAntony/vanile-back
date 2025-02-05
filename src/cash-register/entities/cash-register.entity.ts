import { ApiProperty } from '@nestjs/swagger';
import { CashRegisterStatus } from '@prisma/client';

export class CashRegister {
  id: number;
  userId: number;
  openDate: Date;
  closeDate?: Date;
  initialAmount: number;
  finalAmount?: number;
  @ApiProperty({ enum: CashRegisterStatus })
  status: CashRegisterStatus;
}
