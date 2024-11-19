import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { OrderTableComponent } from './order-table/order-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderTableComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'warehouse-management-app';
}
