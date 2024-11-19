import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/Order`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<Order>{
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(this.apiUrl, order);
  }

  completeOrder(id: number): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}/complete`, id);
  }
  
  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.apiUrl}/${id}`);
  }  
}
