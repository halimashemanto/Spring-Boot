import { Injectable } from '@angular/core';
import { OthersCharge, PatientOthersCharge } from './model/othersCharge.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OthersChargeService {
  

 private apiUrl = environment.apiBaseUrl + '/api/others-charges';

  constructor(private http: HttpClient) { }

  addCharge(charge: OthersCharge): Observable<OthersCharge> {
    return this.http.post<OthersCharge>(this.apiUrl, charge);
  }

  getPatientCharges(bedBookingId: number): Observable<PatientOthersCharge> {
    return this.http.get<PatientOthersCharge>(`${this.apiUrl}/bed/${bedBookingId}`);
  }

  deleteCharge(chargeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${chargeId}`);
  }
}
