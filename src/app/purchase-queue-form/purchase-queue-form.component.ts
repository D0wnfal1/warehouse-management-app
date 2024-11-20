import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../../models/product';
import { PurchaseQueueService } from '../services/purchase-queue.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-queue-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-queue-form.component.html',
  styleUrls: ['./purchase-queue-form.component.css'],
})
export class PurchaseQueueFormComponent implements OnInit {
  productId: number | null = null;
  quantity: number | null = null;
  products: Product[] = [];
  errorMessage: string = '';

  constructor(
    private purchaseQueueService: PurchaseQueueService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products. Please try again later.';
        console.error(err);
      },
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {

      const newItem = {
        id: 0, 
        productId: this.productId!,
        quantity: this.quantity!,
      };

      this.purchaseQueueService.createPurchaseQueue(newItem).subscribe({
        next: () => {
          console.log('Purchase queue item created successfully:', newItem);
          this.router.navigate(['/purchase-queue']);
        },
        error: (err) => {
          this.errorMessage = 'Failed to create purchase queue item.';
          console.error(err);
        },
      });

      form.resetForm();
    }
  }
}
