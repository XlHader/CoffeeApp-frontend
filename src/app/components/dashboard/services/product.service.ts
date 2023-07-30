import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  async all(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/product`)
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

  async find(id: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/product/${id}`)
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

  async create(name: string, price: number, category_id: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/product`, { name, price, category_id })
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

  async update(id: number, name: string, price: number, category_id: number, stock: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.apiUrl}/product/${id}`, { name, price, category_id, stock })
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

  async delete(id: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${environment.apiUrl}/product/${id}`)
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
}
