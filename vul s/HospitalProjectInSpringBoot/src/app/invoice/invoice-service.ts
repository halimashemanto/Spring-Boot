import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {   InvoiceDTO} from './model/invoice.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
;

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


   private baseUrl = environment.apiBaseUrl + '/api/invoice';

 constructor(private http: HttpClient) {}

createInvoice(dto: InvoiceDTO): Observable<InvoiceDTO> {
    return this.http.post<InvoiceDTO>(this.baseUrl, dto);
  }

  getAllInvoices(): Observable<InvoiceDTO[]> {
    return this.http.get<InvoiceDTO[]>(this.baseUrl);
  }

  // Doctors list
  getAllDoctors(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiBaseUrl + '/api/doctor');
  }

  // Tests list
  getAllTests(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiBaseUrl + '/api/test');
  }

  // Get appointment by doctor id (latest/active)
  getAppointmentByDoctorId(doctorId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/appointment/doctor/${doctorId}`);
  }
}
