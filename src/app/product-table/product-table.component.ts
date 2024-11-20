import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent {
  products: Product[] = [];
  filter = {
    name: '',
    isInPurchaseQueue: null as boolean | null,
  };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  filteredProducts(): Product[] {
    return this.products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(this.filter.name.toLowerCase());
      const matchesQueue =
        this.filter.isInPurchaseQueue === null ||
        product.isInPurchaseQueue === this.filter.isInPurchaseQueue;
      return matchesName && matchesQueue;
    });
  }

  resetFilter(): void {
    this.filter = { name: '', isInPurchaseQueue: null };
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter((product) => product.id !== id);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/edit-product', id]);
  }

  createProduct(): void {
    this.router.navigate(['/create-product']);
  }
}
