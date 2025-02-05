import { AuthGuard } from '@/auth/auth.guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CashRegisterService } from './cash-register.service';
import { CloseCashRegisterDto } from './dto/close-cash-register.dto';
import { OpenCashRegisterDto } from './dto/open-cash-register.dto';
import { RegisterTransactionDto } from './dto/register-transaction.dto';
import { CashRegister } from './entities/cash-register.entity';

@Controller('cash-register')
export class CashRegisterController {
  constructor(private readonly cashRegisterService: CashRegisterService) {}

  @Get('open/:userId')
  @UseGuards(AuthGuard)
  async getOpenCashRegister(@Param('userId') userId: number): Promise<CashRegister> {
    return await this.cashRegisterService.getOpenCashRegister(Number(userId));
  }

  @Post('open')
  async open(@Body() data: OpenCashRegisterDto) {
    return await this.cashRegisterService.openCashRegister(data.userId, data.initialAmount);
  }

  @Post('close')
  async close(@Body() data: CloseCashRegisterDto) {
    return await this.cashRegisterService.closeCashRegister(data.userId, data.finalAmount);
  }

  @Post('transaction')
  async registerTransaction(@Body() data: RegisterTransactionDto) {
    return await this.cashRegisterService.registerTransaction(data.userId, data.type, data.amount, data.description);
  }
}
