import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Invoice} from './model/invoice.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Doctor } from '../doctor/model/doctor.model';
import { Appointment } from '../Appoinment/model/appoinment.model';
import { Test } from '../test/model/test.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


 baseUrl = 'http://localhost:8080/api/invoice';

  constructor(private http: HttpClient) { }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.baseUrl);
  }
  getAllPatients(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl);
  }

  saveInvoice(bill: Test): Observable<any> {
    return this.http.post(this.baseUrl, bill);
  }

  // getAllBills(): Observable<any> {
  //   return this.http.get<Invoice(`${this.apiUrl}/`);
  // }

  // createBill(bill: Test): Observable<any> {
  //   return this.http.post<Test>(this.apiUrl, bill);
  // }

 loadBill(bill:Test): Observable<any> {
    return this.http.get(this.baseUrl+'/'+bill);
  }



  
// baseUrl = 'http://localhost:8080/api/invoice';
//   doctorUrl = 'http://localhost:8080/api/doctor/';
//   appointmentUrl = 'http://localhost:8080/api/appointment/';
//   testUrl = 'http://localhost:8080/api/test/';

//   constructor(private http: HttpClient) {}

//   saveInvoice(invoice: InvoiceDTO): Observable<InvoiceDTO> {
//     return this.http.post<InvoiceDTO>(this.baseUrl, invoice);
//   }

//   getDoctors(): Observable<Doctor[]> {
//     return this.http.get<Doctor[]>(this.doctorUrl);
//   }

//   getAppointments(): Observable<Appointment[]> {
//     return this.http.get<Appointment[]>(this.appointmentUrl);
//   }

//   getTests(): Observable<Test[]> {
//     return this.http.get<Test[]>(this.testUrl);
//   }
}
