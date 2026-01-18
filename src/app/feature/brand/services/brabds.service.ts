import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BrabdsService {
    private readonly httpClient = inject(HttpClient)
    getAllBrands():Observable<any>{
      return this.httpClient.get(  environment.baseUrl+ 'brands')
    }
}
