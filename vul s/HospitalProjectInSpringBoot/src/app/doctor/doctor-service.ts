import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Doctor } from './model/doctor.model';
import { isPlatformBrowser } from '@angular/common';
import { DoctorDTO } from '../profile/model/doctorInduvisualProfile.model';


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


private profileSubject = new BehaviorSubject<DoctorDTO | null>(null);

get profile$(): Observable<DoctorDTO | null> {
  return this.profileSubject.asObservable();
}

getProfile(): Observable<DoctorDTO> {
  let headers = new HttpHeaders();
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('authToken');
    if (token) headers = headers.set('Authorization', 'Bearer ' + token);
  }
  return this.http.get<DoctorDTO>(`${this.baseUrl}profile`, { headers });
}

loadProfile(): Observable<DoctorDTO> {
  return this.getProfile().pipe(
    tap(profile => {
      // Photo path ঠিক করা backend অনুযায়ী
      if (profile.photo) {
        profile.photo = `http://localhost:8080/images/doctor/${profile.photo}`;
      } else {
        profile.photo = 'assets/default-avatar.png'; // default
      }
      this.profileSubject.next(profile);
    })
  );
}




getCachedProfile(): DoctorDTO | null {
  if (isPlatformBrowser(this.platformId)) {
    const p = localStorage.getItem('doctorProfile');
    return p ? JSON.parse(p) : null;
  }
  return null;
}


}
