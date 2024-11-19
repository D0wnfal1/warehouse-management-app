import { OrderItem } from "./orderItem";

export interface Order {
    id: string;
    orderDate: string;
    items: OrderItem[];
    isCompleted: boolean;
}