import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environment/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Receptionist } from './model/receptionist.model';
import { isPlatformBrowser } from '@angular/common';
import { ReceptionistDTO } from '../profile/model/receptionistDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {
  
  private baseUrl = environment.apiBaseUrl + '/api/receptionist/';

  constructor(private http: HttpClient,
     @Inject(PLATFORM_ID) private platformId: Object

  ) { }


  registerReceptionist(user: any, receptionist: any, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('receptionist', JSON.stringify(receptionist));
    formData.append('photo', photo);

    return this.http.post(this.baseUrl, formData);
  }

  getAllReceptionist(): Observable<Receptionist[]> {
    return this.http.get<Receptionist[]>(this.baseUrl);
  }



private profileSubject = new BehaviorSubject<ReceptionistDTO | null>(null);

get profile$(): Observable<ReceptionistDTO | null> {
  return this.profileSubject.asObservable();
}

getProfile(): Observable<ReceptionistDTO> {
  let headers = new HttpHeaders();
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('authToken');
    if (token) headers = headers.set('Authorization', 'Bearer ' + token);
  }
  return this.http.get<ReceptionistDTO>(`${this.baseUrl}profile`, { headers });
}

loadProfile(): Observable<ReceptionistDTO> {
  return this.getProfile().pipe(
    tap(profile => {
     
      if (profile.photo) {
        profile.photo = `http://localhost:8080/images/receptionist/${profile.photo}`;
      } else {
        profile.photo = 'assets/default-avatar.png';
      }
      this.profileSubject.next(profile);
    })
  );
}




getCachedProfile(): ReceptionistDTO | null {
  if (isPlatformBrowser(this.platformId)) {
    const p = localStorage.getItem('viewreceptionist');
    return p ? JSON.parse(p) : null;
  }
  return null;
}




 
}

