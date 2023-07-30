import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService, private storage: StorageService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.storage.get('token');

    if (!token) {
      this.router.navigate(['/login']);
      this.storage.clear();
      return false; 
    }

    const userFromServer = await this.auth.me();

    if (!userFromServer) {
      this.router.navigate(['/login']);
      this.storage.clear();
      return false;
    }

    return true;
  }
}