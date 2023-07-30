import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) { }

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  async onSubmit() {
    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    const successLogin = await this.loginService.login(email ?? '', password ?? '');

    if (successLogin) {
      this.router.navigate(['/dashboard/categories']);
    } else {
      this.loginForm.reset();
    }
      
  }
}