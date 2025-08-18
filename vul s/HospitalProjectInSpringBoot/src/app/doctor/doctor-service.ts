import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from './model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = environment.apiBaseUrl + '/api/doctor/';

 constructor(private http: HttpClient) { }

  registerDoctor(user: any, doctor: any, photo: File, departmentId: number): Observable<any> {
    const formData = new FormData();

    // Append JSON as Blob
    formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));
    formData.append('doctor', new Blob([JSON.stringify(doctor)], { type: 'application/json' }));

    // Append photo file
    if (photo) {
      formData.append('imageFile', photo);
    }

    // Append departmentId
    if (departmentId) {
      formData.append('departmentId', departmentId.toString());
    }

    return this.http.post(this.baseUrl, formData);
  }

  getAllDoctor(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiBaseUrl + '/api/doctor/all');
  }

 
}
