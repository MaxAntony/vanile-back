class OrderItem {
  id: number;
  quantity: number;
}

export class CreateOrderDto {
  totalAmount: number;

  items: OrderItem[];
}
