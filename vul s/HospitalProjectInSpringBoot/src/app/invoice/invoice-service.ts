import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {   Invoice} from './model/invoice.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../environment/environment';
;

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


   private baseUrl = environment.apiBaseUrl + '/api/invoice';

 constructor(private http: HttpClient) {}

 private invoices: Invoice[] = [];


  saveInvoice(payload: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseUrl, payload, { headers });
  }

  getAllInvoices(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getInvoiceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
