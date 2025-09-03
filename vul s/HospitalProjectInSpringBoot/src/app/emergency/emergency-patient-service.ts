import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmergencyPatient } from './model/emergencyPatient.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmergencyPatientService {


    private baseUrl = environment.apiBaseUrl + '/api/emergency';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EmergencyPatient[]> {
    return this.http.get<EmergencyPatient[]>(this.baseUrl);
  }

  getById(id: number): Observable<EmergencyPatient> {
    return this.http.get<EmergencyPatient>(`${this.baseUrl}/${id}`);
  }

  create(ep: EmergencyPatient): Observable<EmergencyPatient> {
    return this.http.post<EmergencyPatient>(this.baseUrl, ep);
  }

  update(id: number, ep: EmergencyPatient): Observable<EmergencyPatient> {
    return this.http.put<EmergencyPatient>(`${this.baseUrl}/${id}`, ep);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
}
