import { Injectable } from '@angular/core';
import { TestMaster } from './model/testMaster.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { TestInfo } from '../testAdmittedPatient/model/testAdmittedPatient.model';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class TestMasterService {
  

 private baseUrl =  environment.apiBaseUrl + '/api/test-master'; 
  constructor(private http: HttpClient,
     private authService: AuthService
  ) {}

    private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  getAllTests(): Observable<TestMaster[]> {
    return this.http.get<TestMaster[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  getTestById(id: number): Observable<TestMaster> {
    return this.http.get<TestMaster>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  addTest(test: TestMaster): Observable<TestMaster> {
    return this.http.post<TestMaster>(this.baseUrl, test, { headers: this.getAuthHeaders() });
  }

  updateTest(id: number, test: TestMaster): Observable<TestMaster> {
    return this.http.put<TestMaster>(`${this.baseUrl}/${id}`, test, { headers: this.getAuthHeaders() });
  }

  deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getAllTestss(): Observable<TestInfo[]> {
    return this.http.get<TestInfo[]>(`${this.baseUrl}/all-tests`, { headers: this.getAuthHeaders() });
  }

}
