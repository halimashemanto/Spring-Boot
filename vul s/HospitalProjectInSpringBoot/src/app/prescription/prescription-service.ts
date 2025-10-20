import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PrescriptionDTO } from './model/prescription.model';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/auth-service';




@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private baseUrl = environment.apiBaseUrl + '/api/prescription';



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

  create(dto: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, dto, { headers: this.getAuthHeaders() });
  }

  update(id: number, dto: PrescriptionDTO): Observable<PrescriptionDTO> {
    return this.http.put<PrescriptionDTO>(`${this.baseUrl}/${id}`, dto, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getAll(): Observable<PrescriptionDTO[]> {
    return this.http.get<PrescriptionDTO[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  getById(id: number): Observable<PrescriptionDTO> {
    return this.http.get<PrescriptionDTO>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}