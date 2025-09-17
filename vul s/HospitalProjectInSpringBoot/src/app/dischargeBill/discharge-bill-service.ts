import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DischargeBillDTO } from './model/dischargeBill.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DischargeBillService {
  

   private apiUrl = 'http://localhost:8080/api/discharge';

  constructor(private http: HttpClient) {}

  dischargePatient(bedBookingId: number, dischargeDate: string): Observable<DischargeBillDTO> {
    
    return this.http.post<DischargeBillDTO>(this.apiUrl, null, {
      params: {
        bedBookingId: bedBookingId.toString(),
        dischargeDate
      }
    });
  }


}
