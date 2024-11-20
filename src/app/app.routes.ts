import { Routes } from '@angular/router';
import { OrderTableComponent } from './order-table/order-table.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { PurchaseQueueTableComponent } from './purchase-queue-table/purchase-queue-table.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { PurchaseQueueFormComponent } from './purchase-queue-form/purchase-queue-form.component';

export const routes: Routes = [
    {path: '', component: OrderTableComponent},
    {path: 'create-order', component: OrderFormComponent },
    {path: 'create-order', redirectTo: '', pathMatch: 'full'},
    {path: 'products', component: ProductTableComponent},
    {path: 'create-product', component: ProductFormComponent},
    {path: 'edit-product/:id', component: ProductFormComponent},
    {path: 'purchase-queue', component: PurchaseQueueTableComponent},
    {path: 'create-purchase-queue', component: PurchaseQueueFormComponent},
];
