import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from './model/test.model';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

    private baseUrl = environment.apiBaseUrl + '/api/tests/';
  
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

  getAllTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  getTestById(id: number): Observable<Test> {
    return this.http.get<Test>(`${this.baseUrl}${id}`, { headers: this.getAuthHeaders() });
  }

  createTest(test: Test): Observable<Test> {
    return this.http.post<Test>(this.baseUrl, test, { headers: this.getAuthHeaders() });
  }

  updateTest(test: Test): Observable<Test> {
    return this.http.put<Test>(`${this.baseUrl}${test.id}`, test, { headers: this.getAuthHeaders() });
  }

  deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`, { headers: this.getAuthHeaders() });
  }

  searchTests(name: string): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.baseUrl}?testName_like=^${name}`, { headers: this.getAuthHeaders() });
  }
   
  
  
  
}
