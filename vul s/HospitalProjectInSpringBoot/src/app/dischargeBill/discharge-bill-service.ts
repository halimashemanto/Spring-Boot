import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DischargeBillDTO } from './model/dischargeBill.model';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class DischargeBillService {
  

   private apiUrl = 'http://localhost:8080/api/discharge';

  constructor(private http: HttpClient,
    private authService:AuthService
  ) {}


  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  
  dischargePatient(bedBookingId: number, dischargeDate: string): Observable<DischargeBillDTO> {
    return this.http.post<DischargeBillDTO>(
      this.apiUrl,
      null,
      {
        params: {
          bedBookingId: bedBookingId.toString(),
          dischargeDate
        },
        headers: this.getAuthHeaders() 
      }
    );
  }

}
