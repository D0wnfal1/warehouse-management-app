import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../../models/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.css'
})
export class OrderTableComponent {
  orders: Order[] = [];
  isLoading = true; 

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        console.log(orders);
        this.orders = orders;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch orders', err);
        this.isLoading = false;
      },
    });
  }
  
}
