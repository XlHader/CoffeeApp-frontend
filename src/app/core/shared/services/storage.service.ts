import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set(key: string, value: any): void {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    
    localStorage.setItem(key, value);
  }

  get(key: string): any {
    const value = localStorage.getItem(key) ?? '{}';

    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
