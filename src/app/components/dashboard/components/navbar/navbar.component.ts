import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/core/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService) { }

  items!: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Categories',
        icon: 'pi pi-fw pi-bookmark',
        routerLink: '/dashboard/categories'
      },
      {
        label: 'Products',
        icon : 'pi pi-fw pi-box',
        routerLink: '/dashboard/products'
      },
      {
        label: 'Sign out',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.auth.logout();
        }
      }
    ];
  }
}
