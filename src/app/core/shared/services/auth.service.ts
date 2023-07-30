import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private http: HttpClient, private storage: StorageService, private router: Router) { }

  logout() {
    this.http.post(`${environment.apiUrl}/auth/logout`, {}, {
      headers: {
        authorization: `Bearer ${this.storage.get('token')}`
      }
    }).subscribe(() => {
      this.storage.clear();
      this.router.navigate(['/login']);
    });
  }

  async me(): Promise<Boolean> {
    return new Promise((resolve, _) => {
      this.http.get(`${environment.apiUrl}/auth/me`, {
        headers: {
          authorization: `Bearer ${this.storage.get('token')}`
        }
      })
        .subscribe({
          next: (data: any) => {  
            const { user } = data;
            this.storage.set('user', JSON.stringify(user));
            resolve(true);
          },
          error: () => {
            this.storage.remove('token');
            this.router.navigate(['/login']);
            resolve(false);
          }
        })
    });
  }
}
