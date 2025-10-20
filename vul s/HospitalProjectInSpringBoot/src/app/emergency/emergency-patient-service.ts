import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmergencyPatient } from './model/emergencyPatient.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class EmergencyPatientService {


  private baseUrl = environment.apiBaseUrl + '/api/emergency';

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


  getAll(): Observable<EmergencyPatient[]> {
    return this.http.get<EmergencyPatient[]>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }


  getById(id: number): Observable<EmergencyPatient> {
    return this.http.get<EmergencyPatient>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }


  create(ep: EmergencyPatient): Observable<EmergencyPatient> {
    return this.http.post<EmergencyPatient>(this.baseUrl, ep, {
      headers: this.getAuthHeaders()
    });
  }


  update(id: number, ep: EmergencyPatient): Observable<EmergencyPatient> {
    return this.http.put<EmergencyPatient>(`${this.baseUrl}/${id}`, ep, {
      headers: this.getAuthHeaders()
    });
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

}
