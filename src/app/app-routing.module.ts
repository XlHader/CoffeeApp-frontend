import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './core/shared/guards/no-auth.guard';
import { AuthGuard } from './core/shared/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard/categories', pathMatch: 'full'},
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule), canActivate: [NoAuthGuard]},
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
