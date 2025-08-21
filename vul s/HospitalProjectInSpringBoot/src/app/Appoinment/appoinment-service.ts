import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Appointment } from './model/appoinment.model';
import { Observable } from 'rxjs';
import { Doctor } from '../doctor/model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class AppoinmentService {
  


 private baseUrl = environment.apiBaseUrl + '/api/appoinment';

  constructor(private http: HttpClient) { }


  bookAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.baseUrl, appointment);
  }


  cancelAppointment(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }
getDoctorsByDepartment(deptId: number) {
  return this.http.get<Doctor[]>(`${this.baseUrl}/doctor/by-department/${deptId}`);
}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/${id}`);
  }

}
