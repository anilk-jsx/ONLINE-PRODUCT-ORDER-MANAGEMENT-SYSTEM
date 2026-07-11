import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AppComponent } from './app/app.component';
const guard: CanActivateFn = () => localStorage.getItem('allmart_user') ? true : inject(Router).createUrlTree(['/login']);
bootstrapApplication(AppComponent, { providers: [provideHttpClient(), provideRouter([
  { path: 'login', loadComponent: () => import('./app/pages/login.component').then(m => m.LoginComponent) },
  { path: '', loadComponent: () => import('./app/pages/dashboard.component').then(m => m.DashboardComponent), canActivate: [guard] },
  { path: 'shop', loadComponent: () => import('./app/pages/shop.component').then(m => m.ShopComponent), canActivate: [guard] },
  { path: 'products', loadComponent: () => import('./app/pages/products.component').then(m => m.ProductsComponent), canActivate: [guard] },
  { path: 'stock', loadComponent: () => import('./app/pages/stock.component').then(m => m.StockComponent), canActivate: [guard] },
  { path: 'cart', loadComponent: () => import('./app/pages/cart.component').then(m => m.CartComponent), canActivate: [guard] },
  { path: 'orders', loadComponent: () => import('./app/pages/orders.component').then(m => m.OrdersComponent), canActivate: [guard] },
  { path: 'delivery', loadComponent: () => import('./app/pages/delivery.component').then(m => m.DeliveryComponent), canActivate: [guard] },
  { path: 'invoices', loadComponent: () => import('./app/pages/invoices.component').then(m => m.InvoicesComponent), canActivate: [guard] },
  { path: 'reports', loadComponent: () => import('./app/pages/reports.component').then(m => m.ReportsComponent), canActivate: [guard] },
  { path: 'issues', loadComponent: () => import('./app/pages/issues.component').then(m => m.IssuesComponent), canActivate: [guard] },
  { path: '**', redirectTo: '' }
])]}).catch(err => console.error(err));
