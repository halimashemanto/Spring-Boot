import { Injectable } from '@angular/core';
import { Patient } from './model/patient.model';
import { Observable } from 'rxjs';
import { Doctor } from '../doctor/model/doctor.model';
import { Department } from '../department/department/department';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'http://localhost:8080/api/patient/';
  private doctorUrl = 'http://localhost:8080/api/doctor/';
  private departmentUrl = 'http://localhost:8080/api/department/';

  constructor(private http: HttpClient) { }

  // GET all patients (DTO mapping from backend)
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);
  }

  // GET patient by ID
  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  // POST → only success message
  createPatient(patient: Patient): Observable<string> {
    return this.http.post(`${this.baseUrl}`, patient, { responseType: 'text' });
  }

  // PUT → only success message
  updatePatient(id: number, patient: Patient): Observable<string> {
    return this.http.put(`${this.baseUrl}/${id}`, patient, { responseType: 'text' });
  }

  // DELETE → success message
  deletePatient(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  // GET all doctors
  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.doctorUrl);
  }

  // GET all departments
  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.departmentUrl);
  }
}