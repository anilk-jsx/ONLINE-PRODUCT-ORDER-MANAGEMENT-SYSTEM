import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../store.service';

@Component({ standalone:true, imports:[CommonModule,FormsModule], template:`
<section class="shop-intro">
  <div>
    <div class="eyebrow" style="color:#fbbf24">QuickMart Store</div>
    <h1>Shop Original Products</h1>
    <p>Add items to cart, place order, and download invoices from your account.</p>
  </div>
  <input class="shop-search" [(ngModel)]="q" (ngModelChange)="resetList()" placeholder="Search in QuickMart">
</section>

<div class="category-strip compact">
  <button class="category-tab" *ngFor="let c of categoryTabs" [class.active]="category===c.value" (click)="selectCategory(c.value)">
    <div class="cat-icon">{{c.icon}}</div>{{c.label}}
  </button>
</div>

<section class="sale-band">
  <div class="sale-band-copy">
    <h2>{{slides[slideIndex].title}}</h2>
    <p>{{slides[slideIndex].text}}</p>
  </div>
  <div class="sale-band-art">{{slides[slideIndex].icon}}</div>
  <div class="sale-dots"><span *ngFor="let s of slides; let i=index" [class.active]="i===slideIndex"></span></div>
</section>

<section class="grid">
  <article class="panel product-card" *ngFor="let p of visibleProducts()" (click)="selected=p">
    <div class="product-img">
      <img loading="lazy" [src]="imageFor(p)" [alt]="p.name" (error)="useFallback($event,p)">
    </div>
    <h2 class="h5 mt-3">{{p.name}}</h2>
    <p class="subtle product-meta">{{p.description}}</p>
    <div class="mt-auto">
      <div class="d-flex justify-content-between"><span class="price">{{store.format(p.price)}}</span><span>GST {{p.gst}}%</span></div>
      <div class="small subtle">In stock: {{p.stock}}</div>
      <div class="input-group mt-3" (click)="$event.stopPropagation()">
        <input class="form-control" type="number" min="1" [(ngModel)]="qty[p.id]">
        <button class="btn btn-warning" (click)="add(p.id)">Add to Cart</button>
      </div>
    </div>
  </article>
</section>

<div class="load-more-row" *ngIf="visibleProducts().length < filtered().length">
  <button class="btn btn-outline-primary" (click)="limit=limit+24">Load more products</button>
</div>

<div class="alert alert-success mt-3" *ngIf="msg">{{msg}}</div>

<div class="detail-backdrop" *ngIf="selected" (click)="selected=null">
  <div class="detail-modal" (click)="$event.stopPropagation()">
    <div class="detail-hero"><img [src]="imageFor(selected)" [alt]="selected.name" (error)="useFallback($event,selected)"></div>
    <h2>{{selected.name}}</h2>
    <p class="subtle">{{selected.description}}</p>
    <p><strong>SKU:</strong> {{selected.sku}} &nbsp; <strong>GST:</strong> {{selected.gst}}% &nbsp; <strong>Stock:</strong> {{selected.stock}}</p>
    <h3 class="price">{{store.format(selected.price)}}</h3>
    <div class="d-flex gap-2 mt-3">
      <button class="btn btn-warning" (click)="add(selected.id); selected=null">Add to Cart</button>
      <button class="btn btn-outline-secondary" (click)="selected=null">Close</button>
    </div>
  </div>
</div>
` })
export class ShopComponent implements OnInit, OnDestroy {
  q=''; category=''; msg=''; qty:Record<number,number>={}; slideIndex=0; timer:any; selected:any=null; limit=24;
  slides=[
    {title:'Smart deals for everyday shopping',text:'Phones, laptops, audio and fashion products with GST invoice.',icon:'QM'},
    {title:'Electronics that feel premium',text:'Choose flagship devices and accessories without a crowded page.',icon:'⌁'},
    {title:'Fresh men\'s fashion picks',text:'Shirts, jeans, sneakers and jackets in a clean catalogue.',icon:'★'}
  ];
  categoryTabs=[
    {label:'For You',value:'',icon:'◎'},{label:'Fashion',value:'fashion',icon:'T'},{label:'Mobiles',value:'Flagship Smartphones',icon:'M'},
    {label:'Laptops',value:'Laptops',icon:'L'},{label:'Monitors',value:'Monitors',icon:'D'},{label:'Audio',value:'audio',icon:'H'},
    {label:'Watches',value:'Smartwatches',icon:'W'},{label:'Jackets',value:'Jackets',icon:'J'}
  ];
  constructor(public store:StoreService){}
  ngOnInit(){ this.timer=setInterval(()=>this.slideIndex=(this.slideIndex+1)%this.slides.length,3500); }
  ngOnDestroy(){ clearInterval(this.timer); }
  selectCategory(value:string){ this.category=value; this.resetList(); }
  resetList(){ this.limit=24; }
  visibleProducts(){ return this.filtered().slice(0,this.limit); }
  filtered(){ const query=this.q.trim().toLowerCase(); return this.store.state.products.filter((p:any)=>this.matchesCategory(p) && (!query || (p.name+p.category+p.description).toLowerCase().includes(query))); }
  matchesCategory(p:any){ if(!this.category) return true; if(this.category==='fashion') return p.category.includes('Men') || ['T-Shirts','Sneakers','Jackets'].includes(p.category); if(this.category==='audio') return ['Headphones','Bluetooth Earbuds'].includes(p.category); return p.category===this.category; }
  add(id:number){ this.store.addToCart(id, Number(this.qty[id]||1)); this.msg='Added to cart. Open Cart to place order.'; setTimeout(()=>this.msg='',1800); }
  imageFor(p:any){ return 'assets/products/' + this.photoName(p); }
  useFallback(event:Event,p:any){ const img=event.target as HTMLImageElement; img.onerror=null; img.src=this.fallbackSvg(p); img.parentElement?.classList.add('fallback'); }
  slug(name:string){ return name.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
  photoName(p:any){
    const name=(p.name || '').toLowerCase();
    const category=(p.category || '').toLowerCase();
    if(name.includes('iphone')) return '16pro.jpeg';
    if(name.includes('samsung galaxy s25')) return 's25.jpeg';
    if(name.includes('galaxy watch')) return 'samsungwatch.jpeg';
    if(name.includes('apple watch')) return 'applewatchultra.jpeg';
    if(name.includes('galaxy buds') || name.includes('airpods') || category.includes('earbuds')) return 'budspro.jpeg';
    if(name.includes('sony') || category.includes('headphone')) return 'sonyheadphone.jpeg';
    if(name.includes('macbook')) return 'macbookpro.jpeg';
    if(name.includes('hp')) return 'hplaptop.jpeg';
    if(name.includes('lenovo')) return 'lenovolaptop.jpeg';
    if(name.includes('lg')) return 'lgmonitor.jpeg';
    if(name.includes('samsung') && category.includes('monitor')) return 'samsungmonitor1.jpeg';
    if(category.includes('monitor')) return 'lgmonitor.jpeg';
    if(category.includes('laptop')) return 'macbookpro.jpeg';
    if(category.includes('smartphone')) return '16pro.jpeg';
    if(category.includes('watch')) return 'applewatchultra.jpeg';
    if(category.includes('shirt') || category.includes('jeans') || category.includes('fashion')) return 'jacket.jpeg';
    if(category.includes('jacket')) return 'jacket.jpeg';
    if(category.includes('sneaker') || name.includes('nike')) return 'nike1.jpeg';
    if(name.includes('puma')) return 'puma.jpeg';
    return 'mouse.jpeg';
  }
  fallbackSvg(p:any){
    const label=encodeURIComponent(p.name);
    const cat=encodeURIComponent(p.category);
    return 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="700" height="500" viewBox="0 0 700 500"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#ecfeff"/><stop offset="1" stop-color="#dcfce7"/></linearGradient></defs><rect width="700" height="500" rx="28" fill="url(#g)"/><rect x="86" y="70" width="528" height="260" rx="30" fill="#fff" opacity=".82"/><text x="350" y="205" text-anchor="middle" font-family="Arial" font-size="34" font-weight="800" fill="#123047">'+decodeURIComponent(label)+'</text><text x="350" y="266" text-anchor="middle" font-family="Arial" font-size="22" fill="#0f766e">'+decodeURIComponent(cat)+'</text><text x="350" y="405" text-anchor="middle" font-family="Arial" font-size="20" fill="#64748b">Add real photo in src/assets/products</text></svg>');
  }
}
