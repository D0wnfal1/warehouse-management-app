import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PurchaseQueue } from '../../models/purchase-queue';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class PurchaseQueueService {
  private apiUrl = `${environment.apiUrl}/PurchaseQueue`;

  constructor(private http: HttpClient) {}

  getPurchaseQueue(): Observable<PurchaseQueue[]> {
    return this.http.get<PurchaseQueue[]>(this.apiUrl);
  }

  getLowStockProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/low-stock-products`);
  }

  getPurchaseQueueByProductId(productId: number): Observable<PurchaseQueue> {
    return this.http.get<PurchaseQueue>(`${this.apiUrl}/purchase-queue/${productId}`);
  }

  createPurchaseQueue(purchaseQueue: PurchaseQueue): Observable<PurchaseQueue> {
    return this.http.post<PurchaseQueue>(this.apiUrl, purchaseQueue);
  }

  deletePurchaseQueue(id: number): Observable<PurchaseQueue> {
    return this.http.delete<PurchaseQueue>(`${this.apiUrl}/${id}`);
  }
}
