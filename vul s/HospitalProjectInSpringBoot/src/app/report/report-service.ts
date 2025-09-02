import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { ReportDTO } from './model/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

   
  private baseUrl = environment.apiBaseUrl + '/api/report';

  constructor(private http: HttpClient) {}

   saveReport(report: ReportDTO): Observable<ReportDTO> {
    return this.http.post<ReportDTO>(this.baseUrl, report);
  }

  getAllReports(): Observable<ReportDTO[]> {
    return this.http.get<ReportDTO[]>(this.baseUrl);
  }

  getReportById(id: number) {
    return this.http.get<ReportDTO>(`${this.baseUrl}/${id}`);
  }
}

