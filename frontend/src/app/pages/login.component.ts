import { Component } from '@angular/core'; import { CommonModule } from '@angular/common'; import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'; import { Router } from '@angular/router'; import { StoreService } from '../store.service';
@Component({ standalone:true, imports:[CommonModule,ReactiveFormsModule], template:`
<section class="login-page">
  <div class="login-visual"><div class="warehouse-art"></div><div class="login-copy"><span class="brand-mark">QM</span><h1>QuickMart</h1><p>Professional order, stock, invoice and delivery management for Indian sellers.</p></div></div>
  <div class="login-card-wrap">
    <form class="panel login-card" [formGroup]="form" (ngSubmit)="submit()">
      <div class="segmented"><button type="button" [class.active]="mode==='login'" (click)="mode='login'">Login</button><button type="button" [class.active]="mode==='register'" (click)="mode='register'">Register</button></div>
      <div *ngIf="mode==='register'"><label class="form-label fw-bold">Name</label><input class="form-control form-control-lg mb-3" formControlName="name"></div>
      <label class="form-label fw-bold">Email</label><input class="form-control form-control-lg mb-3" formControlName="email">
      <label class="form-label fw-bold">Password</label><input class="form-control form-control-lg mb-3" type="password" formControlName="password">
      <button class="btn btn-primary btn-lg w-100">{{mode==='login' ? 'Login' : 'Create Account'}}</button>
      <p class="text-danger small mt-3 mb-0" *ngIf="error">{{error}}</p>
      <p class="text-muted small mt-3 mb-0">Admin: admin&#64;quickmart.com / admin123<br>Customer: customer&#64;quickmart.com / customer123</p>
    </form>
  </div>
</section>` })
export class LoginComponent {
  mode:'login'|'register'='login'; error='';
  form=this.fb.group({name:[''],email:['admin@quickmart.com',[Validators.required,Validators.email]],password:['admin123',Validators.required]});
  constructor(private fb:FormBuilder, private store:StoreService, private router:Router){}
  submit(){ this.error=''; const v=this.form.value; const user=this.mode==='login' ? this.store.login(v.email || '', v.password || '') : this.store.register({name:v.name || 'New Customer', email:v.email || '', password:v.password || 'customer123'}); if(!user){this.error='Invalid email or password'; return;} this.router.navigateByUrl('/'); }
}
