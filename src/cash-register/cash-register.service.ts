import { DatabaseService } from '@/common/database/database.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CashRegisterStatus, TransactionType } from '@prisma/client';

@Injectable()
export class CashRegisterService {
  constructor(private db: DatabaseService) {}

  async getOpenCashRegister(userId: number) {
    const cashRegister = await this.db.cashRegister.findFirst({ where: { userId, status: CashRegisterStatus.OPEN } });

    if (!cashRegister) {
      throw new NotFoundException('No se encontraron cajas abiertas');
    }

    return cashRegister;
  }

  async openCashRegister(userId: number, initialAmount: number) {
    const existingCashRegister = await this.db.cashRegister.findFirst({ where: { userId, status: CashRegisterStatus.OPEN } });

    if (existingCashRegister) {
      throw new BadRequestException('el usuario ya tiene un registro caja abierta');
    }

    return this.db.cashRegister.create({
      data: {
        userId,
        initialAmount,
        status: CashRegisterStatus.OPEN,
        openDate: new Date(),
      },
    });
  }

  async closeCashRegister(userId: number, finalAmount: number) {
    const cashRegister = await this.db.cashRegister.findFirst({ where: { userId, status: CashRegisterStatus.OPEN } });

    if (!cashRegister) throw new BadRequestException('sin cajas abiertas encontradas para este usuario');

    return this.db.cashRegister.update({
      where: { id: cashRegister.id },
      data: {
        finalAmount,
        status: CashRegisterStatus.CLOSE,
        closeDate: new Date(),
      },
    });
  }

  async registerTransaction(userId: number, type: TransactionType, amount: number, description: string) {
    const cashRegister = await this.db.cashRegister.findFirst({
      where: { userId, status: CashRegisterStatus.OPEN },
    });

    if (!cashRegister) throw new BadRequestException('no se encontraron cajas abiertas para este usuario');

    return this.db.transaction.create({
      data: {
        cashRegisteredId: cashRegister.id,
        type,
        amount,
        description,
      },
    });
  }

  async cashRegisterResumen(userId: number) {}
}
