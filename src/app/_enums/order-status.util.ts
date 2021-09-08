import { OrderStatus } from "./order-status.enum";
export class OrderStatusUtil{
    public static toString(status:OrderStatus): string {
        return OrderStatus[status];
      }
    
      public static parse(status: string): OrderStatus {
        return OrderStatus[status];
      }
}