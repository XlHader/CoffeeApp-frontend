import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/core/shared/services/storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { LoginResponse } from '../../interfaces/login-response';
import { errorAlert } from 'src/app/core/shared/helpers/alerts.helper';
import { validationErrorsToString } from 'src/app/core/shared/helpers/validation-errors.helper';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private storage: StorageService, private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
        .subscribe({
          next: (response: LoginResponse) => {
            this.storage.set('token', response.authorization.token);
            this.storage.set('user', response.user);
            resolve(true);
          },
          error: (error) => {
            if (error.error.errors)
              errorAlert("Login Error", validationErrorsToString(error.error.errors));
            else
              errorAlert("Login Error", error.error.message);
            reject(false);
          }
        })
    })
  }
}
