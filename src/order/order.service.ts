import { DatabaseService } from '@/common/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly db: DatabaseService) {}
  async create(createOrderDto: CreateOrderDto) {
    const order = await this.db.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          totalAmount: createOrderDto.totalAmount,
          items: {
            create: createOrderDto.itemIds.map((i) => {
              return { itemId: i };
            }),
          },
        },
        include: {
          items: { include: { item: true } },
        },
      });
      return newOrder;
    });
    console.log(order);
    return order;
  }

  async findAll() {
    return await this.db.order.findMany({ include: { items: { include: { item: true } } }, orderBy: { createdAt: 'desc' } });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    console.log(updateOrderDto);
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
