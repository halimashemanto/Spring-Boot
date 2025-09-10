import { Injectable } from '@angular/core';
import { Patient } from './model/patient.model';
import { Observable } from 'rxjs';
import { Doctor } from '../doctor/model/doctor.model';
import { Department } from '../department/department/department';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {


  private apiUrl = environment.apiBaseUrl + '/api/patient/'; 

  constructor(private http: HttpClient) { }

  
  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}${id}`);
  }

  create(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
  }

  update(id: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}${id}`, patient);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
getDepartments(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/api/department/");
  }

  getDoctorsByDepartment(deptId: number) {
    return this.http.get<any[]>("http://localhost:8080/api/doctor/by-department/"+deptId);
  }

}