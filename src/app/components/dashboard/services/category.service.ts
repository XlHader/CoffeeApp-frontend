import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  async all(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/category`)
        .subscribe({
          next: (data: any) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          }
        })
    });
  }

  async find(id: number): Promise<Category> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/category/${id}`)
        .subscribe({
          next: (data: any) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          }
        })
    });
  }
  
  async create(name: string): Promise<Category> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/category`, { name })
        .subscribe({
          next: (data: any) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          }
        })
    });
  }

  async update(id: number, name: string): Promise<Category> {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.apiUrl}/category/${id}`, { name })
        .subscribe({
          next: (data: any) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          }
        })
    });
  }

  async delete(id: number): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${environment.apiUrl}/category/${id}`)
        .subscribe({
          next: (data: any) => {
            resolve(true);
          },
          error: (error) => {
            reject(error);
          }
        })
    });
  }
}
