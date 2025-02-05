import { ApiProperty } from '@nestjs/swagger';

class ItemResponse {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

class OrderItemResponse {
  quantity: number;
  @ApiProperty({ type: ItemResponse })
  item: ItemResponse;
}
export class GetOrder {
  totalAmount: number;
  createdAt: Date;
  items: OrderItemResponse[];
}
