import { OrderItem } from "./orderItem";

export interface Order {
    id: number;
    orderDate: string;
    items: OrderItem[];
    isCompleted: boolean;
}