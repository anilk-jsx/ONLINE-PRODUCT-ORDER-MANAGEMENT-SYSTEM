import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from '../store.service';

@Component({ standalone:true, imports:[CommonModule,FormsModule], template:`
<div class="toolbar">
  <div>
    <div class="eyebrow">Customer Cart</div>
    <h1 class="page-title">My Cart</h1>
    <p class="subtle mb-0">Review products, adjust quantities and place order.</p>
  </div>
  <button class="btn btn-primary" [disabled]="rows.length===0" (click)="checkout()">Place Order</button>
</div>

<div class="panel table-responsive" *ngIf="rows.length; else empty">
  <table class="table align-middle">
    <thead><tr><th>Product</th><th>Price</th><th>GST</th><th>Qty</th><th>Total</th><th></th></tr></thead>
    <tbody>
      <tr *ngFor="let row of rows; trackBy: trackByProduct">
        <td><strong>{{row.product.name}}</strong><div class="small subtle">{{row.product.category}}</div></td>
        <td>{{store.format(row.product.price)}}</td>
        <td>{{row.product.gst}}%</td>
        <td style="max-width:110px"><input class="form-control" type="number" min="1" [(ngModel)]="row.qty" (change)="update(row.productId,row.qty)"></td>
        <td class="price">{{store.format(row.product.price*row.qty*(1+row.product.gst/100))}}</td>
        <td><button class="btn btn-sm btn-outline-danger" (click)="remove(row.productId)">Remove</button></td>
      </tr>
    </tbody>
  </table>
  <div class="text-end"><h3>Total: {{store.format(total())}}</h3></div>
</div>

<ng-template #empty>
  <div class="panel"><h2 class="h5">Cart is empty</h2><p class="subtle mb-0">Go to Products and add items to cart.</p></div>
</ng-template>

<div class="alert alert-success mt-3" *ngIf="msg">{{msg}}</div>
<div class="alert alert-danger mt-3" *ngIf="err">{{err}}</div>
` })
export class CartComponent implements OnInit {
  rows:any[]=[]; msg=''; err='';
  constructor(public store:StoreService, private router:Router){}
  ngOnInit(){ this.refresh(); }
  refresh(){ this.rows=this.store.cartItems().map((x:any)=>({ ...x })); }
  trackByProduct(_:number,row:any){ return row.productId; }
  total(){ return this.rows.reduce((s:number,row:any)=>s + row.product.price*row.qty*(1+row.product.gst/100),0); }
  update(id:number, qty:number){ this.store.updateCart(id, Number(qty)||1); this.refresh(); }
  remove(id:number){ this.store.removeFromCart(id); this.refresh(); }
  checkout(){
    this.err=''; const order=this.store.checkoutCart();
    if(order){ this.msg='Order placed successfully: '+order.orderNo+'. Invoice updated.'; this.refresh(); setTimeout(()=>this.router.navigateByUrl('/invoices'),700); }
    else { this.err='Order could not be placed. Please check stock and quantity.'; this.refresh(); }
  }
}
