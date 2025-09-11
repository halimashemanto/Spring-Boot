import { Injectable } from '@angular/core';
import { TestMaster } from './model/testMaster.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { TestInfo } from '../testAdmittedPatient/model/testAdmittedPatient.model';

@Injectable({
  providedIn: 'root'
})
export class TestMasterService {
  

 private baseUrl =  environment.apiBaseUrl + '/api/test-master'; 
  constructor(private http: HttpClient) {}

  getAllTests(): Observable<TestMaster[]> {
    return this.http.get<TestMaster[]>(this.baseUrl);
  }

  getTestById(id: number): Observable<TestMaster> {
    return this.http.get<TestMaster>(`${this.baseUrl}/${id}`);
  }

  addTest(test: TestMaster): Observable<TestMaster> {
    return this.http.post<TestMaster>(this.baseUrl, test);
  }

  updateTest(id: number, test: TestMaster): Observable<TestMaster> {
    return this.http.put<TestMaster>(`${this.baseUrl}/${id}`, test);
  }

  deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllTestss(): Observable<TestInfo[]> {
    return this.http.get<TestInfo[]>('/api/test-master');
  }

}
