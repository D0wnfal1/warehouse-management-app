import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { OrderService } from '../services/order.service';
import { Order } from '../../models/order';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  order: Order = {
    id: 0,
    orderDate: '',
    items: [],
    isCompleted: false,
  };
  products: Product[] = [];
  errorMessage: string = "";
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addItem(): void {
    this.order.items.push({
      id: 0, productId: 0, quantity: 1,
      orderId: 0
    });
  }
  

  removeItem(index: number): void {
    this.order.items.splice(index, 1);
  }

  createOrder(): void {
    const formattedOrder = {
      ...this.order,
      orderDate: new Date(this.order.orderDate).toISOString(),
    };
  
    this.orderService.createOrder(formattedOrder).subscribe({
      next: () => {
        alert('Order created successfully!');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }
  

  resetForm(): void {
    this.order = {
      id: 0,
      orderDate: '',
      items: [],
      isCompleted: false,
    };
  }
}
