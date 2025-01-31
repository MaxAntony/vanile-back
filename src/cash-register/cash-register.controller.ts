import { Body, Controller, Post } from '@nestjs/common';
import { CashRegisterService } from './cash-register.service';
import { CloseCashRegisterDto } from './dto/close-cash-register.dto';
import { OpenCashRegisterDto } from './dto/open-cash-register.dto';
import { RegisterTransactionDto } from './dto/register-transaction.dto';

@Controller('cash-register')
export class CashRegisterController {
  constructor(private readonly cashRegisterService: CashRegisterService) {}

  @Post('open')
  async open(@Body() data: OpenCashRegisterDto) {
    return this.cashRegisterService.openCashRegister(data.userId, data.initialAmount);
  }

  @Post('close')
  async close(@Body() data: CloseCashRegisterDto) {
    return this.cashRegisterService.closeCashRegister(data.userId, data.finalAmount);
  }

  @Post('transaction')
  async registerTransaction(@Body() data: RegisterTransactionDto) {
    return this.cashRegisterService.registerTransaction(data.userId, data.type, data.amount, data.description);
  }
}
