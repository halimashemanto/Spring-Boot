import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from './model/test.model';

@Injectable({
  providedIn: 'root'
})
export class TestService {

    private baseUrl = environment.apiBaseUrl + '/api/tests/';
  
    constructor(private http: HttpClient) { }
    
  
    getAllTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.baseUrl);
  }

  getTestById(id: number): Observable<Test> {
    return this.http.get<Test>(`${this.baseUrl}/${id}`);
  }

  createTest(test: Test): Observable<Test> {
    return this.http.post<Test>(this.baseUrl, test);
  }

  updateTest(test: Test): Observable<Test> {
    return this.http.put<Test>(`${this.baseUrl}${test.id}`, test);
  }

  deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }

   searchTests(name: string): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.baseUrl}?testName_like=^${name}`);
  }
   
  
  
  
}
