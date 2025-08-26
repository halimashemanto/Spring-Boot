import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from './model/doctor.model';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = environment.apiBaseUrl + '/api/doctor/';

 constructor(
  private http: HttpClient,
   @Inject(PLATFORM_ID) private platformId: Object
) { }


 registerDoctor(user: any, doctor: any, photo: File): Observable<any> {
    const formData = new FormData();

  
    formData.append('user', JSON.stringify(user));
    formData.append('doctor', JSON.stringify(doctor));

    
    if (photo) {
      formData.append('photo', photo, photo.name);
    }

    return this.http.post(`${this.baseUrl}`, formData);
  }



getDoctorsByDepartment(departmentId: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}by-department${departmentId}`);
  }


  getAllDoctor(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(environment.apiBaseUrl + '/api/doctor/');
  }


  getProfile(): Observable<Doctor> {
  let headers = new HttpHeaders();
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
  }

  return this.http.get<Doctor>(`${this.baseUrl}profile`, { headers });
}


}
