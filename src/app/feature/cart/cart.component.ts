

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
 
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);

  cartDetails = this.cartService.cartSignal;
  
 
  isLoading: boolean = false;
  showForm: boolean = false;


  shippingForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required, 
      Validators.pattern(/^01[0125][0-9]{8}$/) 
    ]),
    city: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    
    if (!this.cookieService.get('token')) {
      this.router.navigate(['/login']);
      return;
    }
    this.getCartData();
  }


  getCartData(): void {
    this.isLoading = true;
    this.cartService.getLoggedUserData();
    
    setTimeout(() => { this.isLoading = false; }, 500);
  }

  
  removeItem(id: string): void {
    this.cartService.removeCartItem(id).subscribe({
      next: (res) => {
     
        this.cartService.cartSignal.set(res.data);
        this.cartService.cartCount.set(res.numOfCartItems);
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
        });
        Toast.fire({ icon: 'success', title: 'Item removed' });
      }
    });
  }

 
  updateCount(id: string, count: number): void {
    if (count < 1) return;
    this.cartService.updateCartCount(id, count).subscribe({
      next: (res) => {
        this.cartService.cartSignal.set(res.data);
        this.cartService.cartCount.set(res.numOfCartItems);
      }
    });
  }


  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.cartService.cartSignal.set(null);
          this.cartService.cartCount.set(0);
        }
      }
    });
  }

  
  openShippingForm(): void {
    this.showForm = true;
  }

  closeShippingForm(): void {
    this.showForm = false;
  }


  checkout(): void {
    const cartId = this.cartDetails()?._id;

    if (this.shippingForm.valid && cartId) {
      this.cartService.checkOutSession(cartId, this.shippingForm.value).subscribe({
        next: (res) => {
          if (res.status === 'success') {
           
            window.location.href = res.session.url;
            
            Swal.fire({
              title: 'Redirecting...',
              text: 'Please wait to complete payment',
              icon: 'info',
              showConfirmButton: false
            });
          }
        },
        error: (err) => console.log('Checkout Error:', err)
      });
    } else {
      this.shippingForm.markAllAsTouched();
    }
  }
}