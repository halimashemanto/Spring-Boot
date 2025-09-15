import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { OfficeStaff } from './model/officeStaff.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { isPlatformBrowser } from '@angular/common';
import { OfficeStaffDTO } from '../profile/model/officestaffDTO.model';

@Injectable({
  providedIn: 'root'
})
export class OfficeStaffService {

  private baseUrl = environment.apiBaseUrl + '/api/officeStaff/';

  constructor(private http: HttpClient,
     @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  registerOfficeStaff(user: any, officeStaff: any, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('officeStaff', JSON.stringify(officeStaff));
    formData.append('photo', photo);

    return this.http.post(this.baseUrl, formData);
  }

  getAllOfficeStaff(): Observable<OfficeStaff[]> {
    return this.http.get<OfficeStaff[]>(this.baseUrl);
  }




private profileSubject = new BehaviorSubject<OfficeStaffDTO | null>(null);

get profile$(): Observable<OfficeStaffDTO | null> {
  return this.profileSubject.asObservable();
}

getProfile(): Observable<OfficeStaffDTO> {
  let headers = new HttpHeaders();
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('authToken');
    if (token) headers = headers.set('Authorization', 'Bearer ' + token);
  }
  return this.http.get<OfficeStaffDTO>(`${this.baseUrl}profile`, { headers });
}

loadProfile(): Observable<OfficeStaffDTO> {
  return this.getProfile().pipe(
    tap(profile => {
     
      if (profile.photo) {
        profile.photo = `http://localhost:8080/imagesofficeStaff/${profile.photo}`;
      } else {
        profile.photo = 'assets/default-avatar.png';
      }
      this.profileSubject.next(profile);
    })
  );
}




getCachedProfile(): OfficeStaffDTO | null {
  if (isPlatformBrowser(this.platformId)) {
    const p = localStorage.getItem('viewnurse');
    return p ? JSON.parse(p) : null;
  }
  return null;
}



}

