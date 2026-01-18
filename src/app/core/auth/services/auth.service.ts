
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  registerForm(data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'auth/signup',
      data
    );
  }

  loginForm(data: object): Observable<any> {
    return this.httpClient.post<any>(
      environment.baseUrl + 'auth/signin',
      data
    );
  }

 saveToken(token: string): void {
  
  this.cookieService.set('token', token, undefined, '/');
}

getToken(): string {
  return this.cookieService.get('token');
}

  logOut(): void {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
}