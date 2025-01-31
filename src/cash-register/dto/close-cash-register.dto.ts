import { IsNumber } from 'class-validator';

export class CloseCashRegisterDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  finalAmount: number;
}
