import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { DoctorChargeDTO, DoctorDTO } from './model/doctorCharge.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorChargeService {
  
  private baseUrl =  environment.apiBaseUrl +'/api/doctor-charges';

  constructor(private http: HttpClient) {}

   getDoctors(): Observable<DoctorDTO[]> {
    return this.http.get<DoctorDTO[]>(`/api/doctors`);
  }

 getChargesByBed(bedBookingId: number): Observable<DoctorChargeDTO[]> {
    return this.http.get<DoctorChargeDTO[]>(`${this.baseUrl}/by-bed/${bedBookingId}`);
  }

  saveCharge(charge: DoctorChargeDTO): Observable<DoctorChargeDTO> {
    return this.http.post<DoctorChargeDTO>(`${this.baseUrl}/save`, charge);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


}
