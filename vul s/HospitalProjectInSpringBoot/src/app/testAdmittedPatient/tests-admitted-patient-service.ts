import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestAssignedDTO, TestInfo } from './model/testAdmittedPatient.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TestsAdmittedPatientService {

    private baseUrl = environment.apiBaseUrl + '/api/patient-tests';

 



constructor(private http: HttpClient) { }
 getTestsByBed(bedBookingId: number): Observable<TestAssignedDTO> {
    return this.http.get<TestAssignedDTO>(`${this.baseUrl}/by-bed/${bedBookingId}`);
  }

  getAllMasterTests(): Observable<TestInfo[]> {
    return this.http.get<TestInfo[]>(`${this.baseUrl}/master-tests`);
  }

  assignTests(dto: TestAssignedDTO): Observable<TestAssignedDTO> {
    return this.http.post<TestAssignedDTO>(`${this.baseUrl}/assign`, dto);
  }
  
}
