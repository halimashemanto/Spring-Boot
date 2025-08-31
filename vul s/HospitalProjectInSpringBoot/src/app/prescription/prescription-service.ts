import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import {  PrescriptionDTO } from './model/prescription.model';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  
 private baseUrl = environment.apiBaseUrl + '/api/prescription';

    

 constructor(private http: HttpClient) {}

  create(dto: PrescriptionDTO): Observable<PrescriptionDTO> {
    return this.http.post<PrescriptionDTO>(this.baseUrl, dto);
  }

  update(id: number, dto: PrescriptionDTO): Observable<PrescriptionDTO> {
    return this.http.put<PrescriptionDTO>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAll(): Observable<PrescriptionDTO[]> {
    return this.http.get<PrescriptionDTO[]>(this.baseUrl);
  }

  getById(id: number): Observable<PrescriptionDTO> {
    return this.http.get<PrescriptionDTO>(`${this.baseUrl}/${id}`);
  }
}