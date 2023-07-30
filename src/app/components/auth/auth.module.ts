import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext'
import { LoginComponent } from './login/login.component';
import { PanelModule } from 'primeng/panel'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
