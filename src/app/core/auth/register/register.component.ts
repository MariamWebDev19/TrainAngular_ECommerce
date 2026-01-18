

import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
// import { setTimeout } from 'node:timers/promises';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
    private readonly authService =inject(AuthService)
    private readonly router = inject(Router)
     msgErr:string ="";
     isLoading:boolean = false;
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),

      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),

      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/),
      ]),

      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/),
      ]),

      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.passwordMatch }
  );

  passwordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;

    if (password && rePassword && password !== rePassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

submitForm(): void {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;

  this.authService.registerForm(this.registerForm.value).subscribe({
    next: (res) => {
      console.log(res);

      if (res.message === 'success') {
        this.msgErr='';
       setTimeout(() => {
         this.router.navigate(['/login']);
       }, 1000); 
      }

      this.isLoading = false;
    },
    error: (err) => {
      console.log(err);
      this.isLoading = false;
    }
  });
}

}

