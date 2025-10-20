import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestAdmittedPatient, TestInfo } from './model/testAdmittedPatient.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class TestsAdmittedPatientService {

  private baseUrl = environment.apiBaseUrl + '/api/patient-tests';

  constructor(private http: HttpClient,
     private authService: AuthService) { }

    private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  getPatientByBed(bedBookingId: number): Observable<TestAdmittedPatient> {
    return this.http.get<TestAdmittedPatient>(`${this.baseUrl}/by-bed/${bedBookingId}`, { headers: this.getAuthHeaders() });
  }

  savePatientTests(dto: TestAdmittedPatient): Observable<TestAdmittedPatient> {
    return this.http.post<TestAdmittedPatient>(`${this.baseUrl}/assign`, dto, { headers: this.getAuthHeaders() });
  }

  getAllTests(): Observable<TestInfo[]> {
    return this.http.get<TestInfo[]>(`${this.baseUrl}/all-tests`, { headers: this.getAuthHeaders() });
  }


}
