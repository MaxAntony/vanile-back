import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

export class RegisterTransactionDto {
  userId: number;

  @ApiProperty({ enum: TransactionType })
  type: TransactionType;

  amount: number;

  description: string;
}
