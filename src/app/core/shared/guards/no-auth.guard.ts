import { CanActivateFn } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  return true;
};

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: 'root'
})

export class NoAuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService, private storage: StorageService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.storage.get('token');

    if (token && await this.auth.me()) {
      this.router.navigate(['/dashboard/categories']);
      return false; 
    }

    this.storage.clear();
    
    return true;
  }
}