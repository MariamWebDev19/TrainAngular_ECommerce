


import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'; 
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  
  wishlistSignal = signal<any[]>([]);
  
  wishlistIds = signal<string[]>([]);

  private getHeaders() {
    return { headers: new HttpHeaders({ token: this.cookieService.get('token') }) };
  }

 
  getWishlist(): void {
    this.http.get(environment.baseUrl + 'wishlist', this.getHeaders()).subscribe({
      next: (res: any) => {
        this.wishlistSignal.set(res.data);
        this.wishlistIds.set(res.data.map((item: any) => item._id));
      }
    });
  }

  addToWishlist(id: string) {
    return this.http.post(environment.baseUrl + 'wishlist', { "productId": id }, this.getHeaders());
  }

  removeFromWishlist(id: string) {
    return this.http.delete(environment.baseUrl + `wishlist/${id}`, this.getHeaders());
  }
}