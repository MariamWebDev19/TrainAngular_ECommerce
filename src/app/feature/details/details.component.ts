

import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { CartService } from '../cart/services/cart.service'; 
import { Product } from '../../core/models/product.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductDetailsService = inject(ProductDetailsService);
  private readonly _CartService = inject(CartService); // حقن سيرفس الكارت

  prdDetails = signal<Product | null>(null);

  ngOnInit(): void {
    const productId = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (productId) {
      this.getProductData(productId);
    }
  }

  getProductData(id: string): void {
    this._ProductDetailsService.getProductDetails(id).subscribe({
      next: (res) => {
        this.prdDetails.set(res.data);
      },
      error: (err) => console.log(err)
    });
  }

  
  addToCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        
        this._CartService.cartCount.set(res.numOfCartItems);
        
     
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart Successfully',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          position: 'top-end'
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}