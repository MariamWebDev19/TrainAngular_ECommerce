
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core'; 
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
    private readonly httpClient = inject(HttpClient);
    
   
    categoriesSignal = signal<any[]>([]);

    getAllCat(): void {
      this.httpClient.get(environment.baseUrl + 'categories').subscribe({
        next: (res: any) => {
          
          this.categoriesSignal.set(res.data);
        },
        error: (err) => console.log(err)
      });
    }
}