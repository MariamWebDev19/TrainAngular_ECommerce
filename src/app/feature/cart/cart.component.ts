import { Component, inject, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from './services/cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  //   standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);

  cartDetails: any = null;
  showForm: boolean = false;
  isLoading: boolean = false;

  // تعريف الفورم
  shippingForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    if (!this.cookieService.get('token')) {
      this.router.navigate(['/login']);
      return;
    }
    this.getLoggedUserData();
  }

  getLoggedUserData(): void {
    this.isLoading = true;
    this.cartService.getLoggedUserData().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  removeItem(id: string): void {
    this.cartService.removeCartItem(id).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error: (err) => console.log(err),
    });
  }

  updateCount(id: string, count: number): void {
    if (count < 1) return; // منع الكمية 0
    this.cartService.updateCartCount(id, count).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error: (err) => console.log(err),
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.cartDetails = null;
        }
      },
      error: (err) => console.log(err),
    });
  }

  openShippingForm(): void {
    this.showForm = true;
  }

  closeShippingForm(): void {
    this.showForm = false;
  }

  checkout(): void {
    if (this.shippingForm.valid) {
      const cartId = this.cartDetails._id;

      this.cartService.checkOutSession(cartId, this.shippingForm.value).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            window.location.href = res.session.url;
              Swal.fire({
                      title: 'Good job!',
                      text: 'successfully!',
                      icon: 'success',
                      confirmButtonColor: '#4ade80' 
                    });
          }
        },
        error: (err) => {
          console.log('Error in checkout:', err);
        },
      });
    } else {
      this.shippingForm.markAllAsTouched();
    }
  }
}
