import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { ReportDTO } from './model/report.model';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

   
  private baseUrl = environment.apiBaseUrl + '/api/report';

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

  saveReport(report: ReportDTO): Observable<ReportDTO> {
    return this.http.post<ReportDTO>(this.baseUrl, report, { headers: this.getAuthHeaders() });
  }

  getAllReports(): Observable<ReportDTO[]> {
    return this.http.get<ReportDTO[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  getReportById(id: number): Observable<ReportDTO> {
    return this.http.get<ReportDTO>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}

