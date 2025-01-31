import { IsNumber } from 'class-validator';

export class OpenCashRegisterDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  initialAmount: number;
}
