import { Component, OnInit } from '@angular/core';
import { PurchaseQueueService } from '../services/purchase-queue.service';
import { PurchaseQueue } from '../../models/purchase-queue';
import { Product } from '../../models/product'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-purchase-queue-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-queue-table.component.html',
  styleUrls: ['./purchase-queue-table.component.css']
})
export class PurchaseQueueTableComponent implements OnInit {
  purchaseQueue: PurchaseQueue[] = [];
  lowStockProducts: Product[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private purchaseQueueService: PurchaseQueueService, private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadPurchaseQueue();
    this.loadLowStockProducts();  
  }

  loadPurchaseQueue(): void {
    this.isLoading = true;
    this.purchaseQueueService.getPurchaseQueue().subscribe({
      next: (data) => {
        this.purchaseQueue = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load purchase queue.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  loadLowStockProducts(): void {
    this.purchaseQueueService.getLowStockProducts().subscribe({
      next: (data) => {
        this.lowStockProducts = data;
      },
      error: (err) => {
        this.error = 'Failed to load low stock products.';
        console.error(err);
      }
    });
  }

  updateProductQueueStatus(): void {
    this.lowStockProducts.forEach((product) => {
      this.productService.checkAndUpdateProductQueueStatus(product).subscribe({
        next: () => {
          console.log(`Product ${product.name} status updated`);
        },
        error: (err) => {
          console.error(`Failed to update product status for ${product.name}`, err);
        },
      });
    });
  }

  deletePurchaseQueue(id: number): void {
    if (!confirm('Are you sure you want to delete this item?')) return;

    this.purchaseQueueService.deletePurchaseQueue(id).subscribe({
      next: () => {
        this.purchaseQueue = this.purchaseQueue.filter((item) => item.id !== id);
      },
      error: (err) => {
        this.error = 'Failed to delete the item.';
        console.error(err);
      },
    });
  }

  createPurchaseQueue(): void {
    this.router.navigate(['/create-purchase-queue']);
  }

    viewPurchaseQueueByProduct(productId: number): void {
      this.purchaseQueueService.getPurchaseQueueByProductId(productId).subscribe({
        next: (data) => {
          if (data) {
            console.log('Purchase Queue for product:', data);
            this.purchaseQueue = [data];  
          } else {
            this.router.navigate(['/create-purchase-queue']);
          }
        },
        error: (err) => {
          this.error = 'Failed to fetch purchase queue for this product.';
          console.error(err);
        }
      });
    }
}
