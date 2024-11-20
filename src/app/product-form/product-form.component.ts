import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  product: Product = {
    id: 0,
    name: '',
    stock: 0,
    price: 0,
    isInPurchaseQueue: false,
  };

  errorMessage: string = "";
  isEditing: boolean = false;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');
      if(id){
        this.isEditing = true;
        console.log("Editing product with id: ", id);
        this.productService.getProductById(Number(id)).subscribe({
          next: (product) => {
            this.product = product;
          },
          error: (error) => {
            console.error(error);
            this.errorMessage = error.message;
          }
        });
      }
      else {
        this.isEditing = false;
        console.log("Creating new product");}
    });
  }

  onSubmit() : void {
  console.log(this.product);
    if(this.isEditing){
      this.productService.updateProduct(this.product).subscribe({
        next: (product) => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = error.message;
        }
      });
      return;
    }
    else{
    this.productService.createProduct(this.product).subscribe({
      next: (product) => {
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error.message;
      }
    });
  }
  }
}
