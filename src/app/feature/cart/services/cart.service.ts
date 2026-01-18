

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  private getHeaders(): { headers: HttpHeaders } {
    const token = this.cookieService.get('token'); 
    return { headers: new HttpHeaders({ token: token }) };
  }

  getLoggedUserData(): Observable<any> {
    return this.http.get(environment.baseUrl + 'cart', this.getHeaders());
  }

  updateCartCount(id: string, count: number): Observable<any> {
    return this.http.put(environment.baseUrl + `cart/${id}`, { count }, this.getHeaders());
  }

  removeCartItem(id: string): Observable<any> {
    return this.http.delete(environment.baseUrl + `cart/${id}`, this.getHeaders());
  }

  clearCart(): Observable<any> {
    return this.http.delete(environment.baseUrl + 'cart', this.getHeaders());
  }
    addToCart(id: string): Observable<any> {
    return this.http.post(
      environment.baseUrl + 'cart',
      { productId: id },
      this.getHeaders()
    );
  }
  checkOutSession(cartId: string, shippingAddress: any): Observable<any> {
   
    return this.http.post(
      environment.baseUrl + `orders/checkout-session/${cartId}?url=http://localhost:4200`, 
      { shippingAddress: shippingAddress }, 
      this.getHeaders()
    );
  }
}