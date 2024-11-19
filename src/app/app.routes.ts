import { Routes } from '@angular/router';
import { OrderTableComponent } from './order-table/order-table.component';
import { OrderFormComponent } from './order-form/order-form.component';

export const routes: Routes = [
    {path: '', component: OrderTableComponent},
    {path: 'createOrder', component: OrderFormComponent },
    {path: 'createOrder', redirectTo: '', pathMatch: 'full'},
];
