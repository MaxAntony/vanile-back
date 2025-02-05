import { DatabaseService } from '@/common/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrder } from './dto/get-orders.dto';
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
            create: createOrderDto.items.map((i) => {
              return { quantity: i.quantity, itemId: i.id };
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
    const a = await this.db.order.findMany({ include: { items: { include: { item: true } } }, orderBy: { createdAt: 'desc' } });
    const response: GetOrder[] = a.map((e) => {
      const res: GetOrder = {
        totalAmount: e.totalAmount,
        createdAt: e.createdAt,
        items: e.items.map((f) => {
          const resitem: GetOrder['items'][number] = {
            quantity: f.quantity,
            item: { id: f.item.id, imageUrl: f.item.imageUrl, name: f.item.name, price: f.item.price },
          };
          return resitem;
        }),
      };
      return res;
    });
    return response;
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
