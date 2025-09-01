import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Report } from './model/report.model';
import { Doctor } from '../doctor/model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

   
  private baseUrl = environment.apiBaseUrl + '/api/report';

  constructor(private http: HttpClient) {}

  getAllReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.baseUrl);
  }

  saveReport(report: Report, doctorId: number): Observable<Report> {
    return this.http.post<Report>(`${this.baseUrl}?doctor_id=${doctorId}`, report);
  }

  deleteReport(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getReportById(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.baseUrl}/${id}`);
  }
}

