import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'https://accomplished-empathy-production-3a5e.up.railway.app/api';
  constructor(private http: HttpClient) {}
  login(data: any): Observable<any> { return this.http.post(this.base + '/auth/login', data); }
  products(q = ''): Observable<any[]> { return this.http.get<any[]>(this.base + '/products?search=' + encodeURIComponent(q)); }
  orders(): Observable<any[]> { return this.http.get<any[]>(this.base + '/orders'); }
  categories(): Observable<any[]> { return this.http.get<any[]>(this.base + '/categories'); }
  createOrder(data: any): Observable<any> { return this.http.post(this.base + '/orders', data); }
  report(): Observable<any> { return this.http.get(this.base + '/reports/sales?from=2026-07-01&to=2026-07-31'); }
  issues(): Observable<any[]> { return this.http.get<any[]>(this.base + '/issues'); }
}
