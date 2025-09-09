import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestAdmittedPatient } from './model/testAdmittedPatient.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TestsAdmittedPatientService {

    private apiUrl = environment.apiBaseUrl + '/api/testss';

  constructor(private http: HttpClient) {}

  getTestsByPatient(admittedPatientId: number): Observable<TestAdmittedPatient[]> {
    return this.http.get<TestAdmittedPatient []>(`${this.apiUrl}/bedBooking/${admittedPatientId}`);
  }

  addTest(admittedPatientId: number, test: TestAdmittedPatient): Observable<TestAdmittedPatient> {
    return this.http.post<TestAdmittedPatient>(`${this.apiUrl}/bedBooking/${admittedPatientId}`, test);
  }

  deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  
}
