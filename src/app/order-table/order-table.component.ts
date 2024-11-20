import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../../models/order';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css'],
})
export class OrderTableComponent implements OnInit {
  orders: Order[] = [];
  isLoading = true;

  // Filters
  filterStatus: string = '';
  filterId: string = '';

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.isLoading = true;
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch orders', err);
        this.isLoading = false;
      },
    });
  }

  get filteredOrders(): Order[] {
    return this.orders.filter((order) => {
      const matchesStatus =
        this.filterStatus === ''
          ? true
          : this.filterStatus === 'completed'
          ? order.isCompleted
          : !order.isCompleted;

      const matchesId =
        this.filterId === '' || order.id.toString().includes(this.filterId);

      return matchesStatus && matchesId;
    });
  }

  completeOrder(id: number): void {
    this.orderService.completeOrder(id).subscribe({
      next: () => {
        alert('Order marked as completed!');
        this.fetchOrders();
      },
      error: (err) => {
        console.error('Failed to complete order', err);
      },
    });
  }

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id).subscribe({
        next: () => {
          alert('Order deleted!');
          this.fetchOrders();
        },
        error: (err) => {
          console.error('Failed to delete order', err);
        },
      });
    }
  }

  createOrder(): void {
    this.router.navigate(['/create-order']);
  }
}
