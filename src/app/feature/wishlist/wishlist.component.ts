

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; // استيراد SweetAlert
import { WishlistService } from './wishlist.service';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);

  products: any[] = [];

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist() {
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => console.log(err)
    });
  }

 
  removeFav(id: string) {
    this._WishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
       
        this.getWishlist();
        
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: 'success',
          title: 'Removed from wishlist'
        });
      }
    });
  }

 
  addCart(id: string) {
    this._CartService.addToCart(id).subscribe({ 
      next: (res) => {
        Swal.fire({
          title: 'Good job!',
          text: 'Product added to cart successfully!',
          icon: 'success',
          confirmButtonColor: '#4ade80' 
        });
      }
    });
  }
}