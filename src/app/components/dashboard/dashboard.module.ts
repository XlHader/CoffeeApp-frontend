import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';

import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { SalesComponent } from './components/sales/sales.component';

@NgModule({
  declarations: [
    ProductsComponent,
    CategoriesComponent,
    NavbarComponent,
    SalesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MenubarModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    DynamicDialogModule,
    ToastModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
    , DialogService, MessageService
  ]
})
export class DashboardModule { }
