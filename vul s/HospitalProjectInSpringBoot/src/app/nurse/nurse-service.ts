import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Nurse } from './model/nurse.model';
import { NurseDTO } from '../profile/model/nurseDTO.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NurseService {


  private baseUrl = environment.apiBaseUrl + '/api/nurse/';

  constructor(private http: HttpClient,
     @Inject(PLATFORM_ID) private platformId: Object


  ) { }



  registerNurse(user: any, nurse: any, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('nurse', JSON.stringify(nurse));
    formData.append('photo', photo);

    return this.http.post(this.baseUrl, formData);
  }

  getAllNurse(): Observable<Nurse[]> {
    return this.http.get<Nurse[]>(this.baseUrl);
  }

private profileSubject = new BehaviorSubject<NurseDTO | null>(null);

get profile$(): Observable<NurseDTO | null> {
  return this.profileSubject.asObservable();
}

getProfile(): Observable<NurseDTO> {
  let headers = new HttpHeaders();
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('authToken');
    if (token) headers = headers.set('Authorization', 'Bearer ' + token);
  }
  return this.http.get<NurseDTO>(`${this.baseUrl}profile`, { headers });
}

loadProfile(): Observable<NurseDTO> {
  return this.getProfile().pipe(
    tap(profile => {
     
      if (profile.photo) {
        console.log(profile.photo);
       
      } else {
        profile.photo = 'assets/default-avatar.png';
      }
      this.profileSubject.next(profile);
    })
  );
}




getCachedProfile(): NurseDTO | null {
  if (isPlatformBrowser(this.platformId)) {
    const p = localStorage.getItem('viewnurse');
    return p ? JSON.parse(p) : null;
  }
  return null;
}





}
