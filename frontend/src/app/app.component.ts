import { Component } from '@angular/core'; import { CommonModule } from '@angular/common'; import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'; import { StoreService } from './store.service';
@Component({ selector:'app-root', standalone:true, imports:[CommonModule,RouterOutlet,RouterLink,RouterLinkActive], template:`
<router-outlet *ngIf="router.url === '/login'; else authed" />
<ng-template #authed>
  <div *ngIf="store.isAdmin(); else customerShell" class="shell">
    <aside class="sidebar"><div class="brand"><span class="brand-mark">QM</span><span>QuickMart<small>Admin Console</small></span></div>
      <nav class="nav flex-column">
        <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Dashboard</a>
        <a class="nav-link" routerLink="/products" routerLinkActive="active">Manage Products</a>
        <a class="nav-link" routerLink="/stock" routerLinkActive="active">Stock</a>
        <a class="nav-link" routerLink="/orders" routerLinkActive="active">Orders</a>
        <a class="nav-link" routerLink="/delivery" routerLinkActive="active">Delivery</a>
        <a class="nav-link" routerLink="/invoices" routerLinkActive="active">Invoices</a>
        <a class="nav-link" routerLink="/reports" routerLinkActive="active">Reports</a>
        <a class="nav-link" routerLink="/issues" routerLinkActive="active">Support</a>
      </nav>
      <div class="sidebar-footer"><div class="fw-bold">{{store.currentUser()?.name}}</div><div>{{store.currentUser()?.role}}</div></div>
    </aside>
    <main class="content"><div class="topbar"><span class="topbar-user">{{store.currentUser()?.name}} · ADMIN</span><button class="btn btn-outline-danger btn-sm" (click)="logout()">Logout</button></div><router-outlet /></main>
  </div>
</ng-template>
<ng-template #customerShell>
  <div class="customer-app">
    <header class="allmart-header">
      <button class="menu-button" (click)="drawer=true">☰</button>
      <a class="allmart-logo" routerLink="/shop">QUICK<span>mart</span></a>
      <div class="allmart-search"><select><option>All</option></select><input placeholder="Search products in QuickMart" (keyup.enter)="router.navigateByUrl('/shop')"><button routerLink="/shop">⌕</button></div>
      <a class="header-pill account" routerLink="/shop"><small>Welcome</small>{{store.currentUser()?.name}}</a>
      <a class="header-pill" routerLink="/orders"><small>Your</small>Orders</a>
      <a class="cart-pill" routerLink="/cart">Cart · {{store.cartCount()}}</a>
    </header>
    <main class="customer-content"><router-outlet /></main>
    <div class="drawer-backdrop" *ngIf="drawer" (click)="drawer=false"><aside class="drawer" (click)="$event.stopPropagation()"><div class="drawer-head"><span>QuickMart Menu</span><button class="drawer-close" (click)="drawer=false">×</button></div>
      <section class="drawer-section"><h3>Shop</h3><a routerLink="/shop" (click)="drawer=false">All Products <span>›</span></a><a routerLink="/cart" (click)="drawer=false">Cart <span>›</span></a><a routerLink="/orders" (click)="drawer=false">My Orders <span>›</span></a></section>
      <section class="drawer-section"><h3>Categories</h3><a routerLink="/shop" (click)="drawer=false">Mobiles and Laptops <span>›</span></a><a routerLink="/shop" (click)="drawer=false">Audio and Watches <span>›</span></a><a routerLink="/shop" (click)="drawer=false">Men's Fashion <span>›</span></a></section>
      <section class="drawer-section"><h3>Account</h3><a routerLink="/invoices" (click)="drawer=false">Invoices <span>›</span></a><a routerLink="/issues" (click)="drawer=false">Support Tickets <span>›</span></a><button (click)="logout()">Logout <span>›</span></button></section>
    </aside></div>
  </div>
</ng-template>` })
export class AppComponent { drawer=false; constructor(public router:Router, public store:StoreService){} logout(){this.drawer=false; this.store.logout(); this.router.navigateByUrl('/login');} }
