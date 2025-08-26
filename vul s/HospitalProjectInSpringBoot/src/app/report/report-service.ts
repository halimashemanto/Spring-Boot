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


 
  getAllReport(): Observable<Report[]> {
    return this.http.get<Report[]>(this.baseUrl);
  }

  getAllDoctor(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(environment.apiBaseUrl + '/api/doctor/');
  }

 
  createReport(report: Report, doctorId: number): Observable<Report> {
    const params = new HttpParams().set('doctor_id', doctorId.toString());
    return this.http.post<Report>(this.baseUrl, report, { params });
  }
}

