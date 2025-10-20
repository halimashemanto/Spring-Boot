import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Doctor, DoctorCharge, PatientDoctorCharge } from './model/doctorCharge.model';
import { AuthService } from '../Service/auth-service';


@Injectable({
  providedIn: 'root'
})
export class DoctorChargeService {

  private apiUrl = environment.apiBaseUrl + '/api/doctor-charges';

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


  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${environment.apiBaseUrl}/api/doctor/`, {
      headers: this.getAuthHeaders()
    });
  }


  addCharge(charge: DoctorCharge): Observable<DoctorCharge> {
    return this.http.post<DoctorCharge>(this.apiUrl, charge, {
      headers: this.getAuthHeaders()
    });
  }


  getPatientCharges(bedBookingId: number): Observable<PatientDoctorCharge> {
    return this.http.get<PatientDoctorCharge>(`${this.apiUrl}/bed/${bedBookingId}`, {
      headers: this.getAuthHeaders()
    });
  }


  deleteCharge(chargeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${chargeId}`, {
      headers: this.getAuthHeaders()
    });
  }

}
