import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from './model/invoice.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../environment/environment';
import { AuthService } from '../Service/auth-service';
;

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


  private baseUrl = environment.apiBaseUrl + '/api/invoice';

  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  private invoices: Invoice[] = [];
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }


  saveInvoice(payload: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.baseUrl, payload, { headers });
  }

  getAllInvoices(): Observable<Invoice[]> {
    const headers = this.getHeaders();
    return this.http.get<Invoice[]>(this.baseUrl, { headers });
  }

  
  getInvoiceById(id: number): Observable<Invoice> {
    const headers = this.getHeaders();
    return this.http.get<Invoice>(`${this.baseUrl}/${id}`, { headers });
  }
}
