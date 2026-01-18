
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);

  isLoading: boolean = false;
  msgErr: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submitForm(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.authService.loginForm(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        
  this.authService.saveToken(res.token);
  this.router.navigate(['/home']);

        if (res.message === 'success' && res.token) {
          
          this.cookieService.set('token', res.token);
          this.msgErr = '';
          this.router.navigate(['/home']);
        } else {
          this.msgErr = 'Login failed';
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.msgErr = err.error?.message || 'Login failed';
        this.isLoading = false;
      },
    });
  }
}