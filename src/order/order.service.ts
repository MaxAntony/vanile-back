import { DatabaseService } from '@/common/database/database.service';
import { MailService } from '@/mail/mail.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrder } from './dto/get-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  private culqiSecretKey = 'sk_test_9c03a8efb19fd128';

  constructor(
    private readonly db: DatabaseService,
    private mail: MailService,
  ) {}

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
    this.mail.sendMail(createOrderDto.totalAmount.toString(), order.createdAt.toString()).catch((e) => console.error(e));
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

  async createCharge(tokenId: string, amount: number, currency: string) {
    const url = 'https://api.culqi.com/v2/charges';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.culqiSecretKey}`,
    };
    const body = {
      amount,
      currency_code: currency,
      source_id: tokenId,
      description: 'Pago de prueba',
      email: 'maxpacami@gmail.com',
    };

    console.log(body);
    try {
      const response = await axios.post(url, body, { headers });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response);
      throw new HttpException(error.response.data, error.response.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
