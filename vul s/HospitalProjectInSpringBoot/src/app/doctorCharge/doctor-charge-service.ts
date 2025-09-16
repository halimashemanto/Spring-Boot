import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Doctor, DoctorCharge, PatientDoctorCharge } from './model/doctorCharge.model';


@Injectable({
  providedIn: 'root'
})
export class DoctorChargeService {
  
  private apiUrl =  environment.apiBaseUrl +'/api/doctor-charges';

  constructor(private http: HttpClient) {}

 getDoctors(): Observable<Doctor[]> {
  return this.http.get<Doctor[]>(environment.apiBaseUrl + '/api/doctor/');

}

  addCharge(charge: DoctorCharge): Observable<DoctorCharge> {
    return this.http.post<DoctorCharge>(this.apiUrl, charge);
  }

  getPatientCharges(bedBookingId: number): Observable<PatientDoctorCharge> {
    return this.http.get<PatientDoctorCharge>(`${this.apiUrl}/bed/${bedBookingId}`);
  }

  deleteCharge(chargeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${chargeId}`);
  }

}
