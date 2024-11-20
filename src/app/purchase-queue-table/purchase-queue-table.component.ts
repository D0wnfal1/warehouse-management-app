import { Component, OnInit } from '@angular/core';
import { PurchaseQueueService } from '../services/purchase-queue.service';
import { PurchaseQueue } from '../../models/purchase-queue';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase-queue-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-queue-table.component.html',
  styleUrl: './purchase-queue-table.component.css'
})
export class PurchaseQueueTableComponent implements OnInit {
  purchaseQueue: PurchaseQueue[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private purchaseQueueService: PurchaseQueueService, private router: Router) {}

  ngOnInit(): void {
    this.loadPurchaseQueue();
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
}
