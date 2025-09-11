import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestAdmittedPatient, TestInfo } from './model/testAdmittedPatient.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TestsAdmittedPatientService {

  private baseUrl = environment.apiBaseUrl + '/api/patient-tests';

  constructor(private http: HttpClient) { }

   getPatientByBed(bedBookingId: number): Observable<TestAdmittedPatient> {
    return this.http.get<TestAdmittedPatient>(`${this.baseUrl}/by-bed/${bedBookingId}`);
  }

  savePatientTests(dto: TestAdmittedPatient): Observable<TestAdmittedPatient> {
    return this.http.post<TestAdmittedPatient>(`${this.baseUrl}/assign`, dto);
  }

  getAllTests(): Observable<TestInfo[]> {
    return this.http.get<TestInfo[]>(`${this.baseUrl}/all-tests`);
  }

}
