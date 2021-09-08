import { User } from "./user";
import { OrderItem } from "./order-item";
export class Order{
    id?:number;
    user?:User;
    date?: Date;
    cost?:number;
    certificates?:OrderItem[];

}