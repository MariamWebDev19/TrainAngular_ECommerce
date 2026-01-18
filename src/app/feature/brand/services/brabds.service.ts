


import { inject, Injectable, signal } from '@angular/core'; // ضيفي signal
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BrabdsService {
    private readonly httpClient = inject(HttpClient);
    

    brandsSignal = signal<any[]>([]);

    getAllBrands(): void {
      this.httpClient.get(environment.baseUrl + 'brands').subscribe({
        next: (res: any) => {
         
          this.brandsSignal.set(res.data);
        },
        error: (err) => console.log(err)
      });
    }
}