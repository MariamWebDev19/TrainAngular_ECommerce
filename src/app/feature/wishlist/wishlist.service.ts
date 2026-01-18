

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'; // لو بتستخدمي الكوكيز
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

 
  private getHeaders() {
    return {
      headers: new HttpHeaders({
        token: this.cookieService.get('token') 
      })
    };
  }

  addToWishlist(id: string): Observable<any> {
    return this.http.post(environment.baseUrl + 'wishlist', { "productId": id }, this.getHeaders());
  }

  removeFromWishlist(id: string): Observable<any> {
    return this.http.delete(environment.baseUrl + `wishlist/${id}`, this.getHeaders());
  }

  getWishlist(): Observable<any> {
    return this.http.get(environment.baseUrl + 'wishlist', this.getHeaders());
  }
}