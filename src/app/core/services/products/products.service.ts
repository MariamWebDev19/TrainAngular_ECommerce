
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
    private readonly httpClient = inject(HttpClient);
    productsSignal = signal<any[]>([]); 

    constructor() {
      this.getAllPrd();
    }

    getAllPrd(): void {
      this.httpClient.get(environment.baseUrl + `products`).subscribe({
        next: (res: any) => {
          console.log('APi', res); 
          
         
          if (res && res.data) {
            this.productsSignal.set(res.data);
            console.log('ـ Signal ', this.productsSignal());
          }
        },
        error: (err) => {
          console.error('API:', err);
        }
      });
    }
}