import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Sale } from '../interfaces/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  public create(product_id: number, amount: number) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/sale`, { product_id, amount })
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

  public all(): Promise<Sale[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/sale`)
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

  public findByProduct(product_id: number): Promise<Sale[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/sale/product/${product_id}`)
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
