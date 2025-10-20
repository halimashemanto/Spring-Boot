import { Injectable } from '@angular/core';
import { Patient } from './model/patient.model';
import { Observable } from 'rxjs';
import { Doctor } from '../doctor/model/doctor.model';
import { Department } from '../department/department/department';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {


  private apiUrl = environment.apiBaseUrl + '/api/patient/'; 

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

  
  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}${id}`, { headers: this.getAuthHeaders() });
  }

  create(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient, { headers: this.getAuthHeaders() });
  }

  update(id: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}${id}`, patient, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`, { headers: this.getAuthHeaders() });
  }

  // Department and doctor fetching
  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/department/`, { headers: this.getAuthHeaders() });
  }

  getDoctorsByDepartment(deptId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/doctor/by-department/${deptId}`, { headers: this.getAuthHeaders() });
  }

}