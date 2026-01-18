

import { Component, Input, OnInit, inject } from '@angular/core';

import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common'; 
import { WishlistService } from '../../../feature/wishlist/wishlist.service';
import { CartService } from '../../../feature/cart/services/cart.service';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.interface';

@Component({
 selector: 'app-card',
//  standalone:true,
  imports: [CommonModule, RouterLink ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input({required:true}) product:Product ={} as Product;
 private readonly cartService = inject(CartService)
  _WishlistService = inject(WishlistService);



  wishlistData: string[] = []; 

  ngOnInit(): void {
 

    
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
       
        const newData = res.data.map((item: any) => item._id);
        this.wishlistData = newData;
      }
    });
  }


  addToCart(id: string) {
    this.cartService.addToCart(id).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'center', 
          icon: 'success',
          title: 'Added to Cart Successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

 
  toggleWishlist(id: string): void {
    if (this.wishlistData.includes(id)) {
     
      this._WishlistService.removeFromWishlist(id).subscribe({
        next: (res) => {
          this._WishlistService.getWishlist().subscribe({
             next: (response) => {
                 this.wishlistData = response.data.map((item: any) => item._id);
             }
          });
          
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info', 
            title: 'Removed from Wishlist',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    } else {
      
      this._WishlistService.addToWishlist(id).subscribe({
        next: (res) => {
          this.wishlistData = res.data; 
          
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Added to Wishlist ❤️',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  }

  addItems(id:string):void{
  this.cartService.addToCart(id).subscribe({
    next:(res)=>{
    console.log(res)
    },
    error:(err)=>{
      console.log(err)
    }
    })
}
}

