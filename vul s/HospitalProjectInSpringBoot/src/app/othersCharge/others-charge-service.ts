import { Injectable } from '@angular/core';
import { OthersCharge, PatientOthersCharge } from './model/othersCharge.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class OthersChargeService {
  

 private apiUrl = environment.apiBaseUrl + '/api/others-charges';

  constructor(private http: HttpClient,
     private authService: AuthService
  ) { }

   private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  
  addCharge(charge: OthersCharge): Observable<OthersCharge> {
    return this.http.post<OthersCharge>(this.apiUrl, charge, {
      headers: this.getAuthHeaders()
    });
  }

 
  getPatientCharges(bedBookingId: number): Observable<PatientOthersCharge> {
    return this.http.get<PatientOthersCharge>(`${this.apiUrl}/bed/${bedBookingId}`, {
      headers: this.getAuthHeaders()
    });
  }

  
  deleteCharge(chargeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${chargeId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
