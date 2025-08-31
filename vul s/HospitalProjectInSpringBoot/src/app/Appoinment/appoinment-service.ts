import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointment } from './model/appoinment.model';
import { Observable } from 'rxjs';
import { AppoinmentDTO } from './model/appoinmentDTO';


@Injectable({
  providedIn: 'root'
})
export class AppoinmentService {



  private baseUrl = environment.apiBaseUrl + '/api/appoinment';

  constructor(private http: HttpClient) { }


  //  saveAppoinment(appoinment: any): Observable<any> {
  //       return this.http.post(`${this.baseUrl}`, appoinment);
  //   }

  saveAppoinment(appoinment: any): Observable<any> {
  return this.http.post(`${this.baseUrl}`, appoinment, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}


  cancelAppointment(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }


  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/${id}`);
  }

  findByContact(contact: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}?contact=${contact}`);
  }




  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/api/department/");
  }

  getDoctorsByDepartment(deptId: number) {
    return this.http.get<any[]>("http://localhost:8080/api/doctor/by-department/"+deptId);
  }

  getScheduleSlotByDoctor(doctorId: number): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/api/slot/doctor/"+doctorId);
  }

  getAppointmentByDoctorId(doctorId: number): Observable<any > {
    return this.http.get<any []>(`${this.baseUrl}/doctor/${doctorId}`);
  }


   getAppoinmentById(id: number): Observable<AppoinmentDTO> {
    return this.http.get<AppoinmentDTO>(`${this.baseUrl}/${id}`);
  }

  



}
