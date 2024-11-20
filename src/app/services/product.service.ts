import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Product } from '../../models/product';
import { PurchaseQueueService } from './purchase-queue.service';
import { PurchaseQueue } from '../../models/purchase-queue';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/Product`;

  constructor(private http: HttpClient, private purchaseQueueService: PurchaseQueueService) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<Product>{
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }
  checkAndUpdateProductQueueStatus(product: Product): Observable<Product> {
    return this.purchaseQueueService.getPurchaseQueueByProductId(product.id).pipe(
      switchMap((queue: PurchaseQueue | null) => {
        product.isInPurchaseQueue = queue !== null;
        return this.updateProduct(product);
      })
    );
  }
}
