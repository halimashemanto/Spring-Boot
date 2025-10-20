import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../AllModel/user.model';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class AdmiProfileService {
  private baseUrl = environment.apiBaseUrl + '/auth/';

  private profileSubject = new BehaviorSubject<User | null>(null);
  profile$ = this.profileSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

 private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = this.authService.getToken(); // AuthService থেকে token নাও
      console.log('Token in AdmiProfileService:', token); // debug
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return headers;
  }

  // ===============================
  // Load profile from backend
  // ===============================
  loadProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}user/profile`, { headers: this.getHeaders() }).pipe(
      tap(profile => {
        // Photo path backend অনুযায়ী adjust করা
        if (profile.photo) {
          profile.photo = `http://localhost:8080/images/users/${profile.photo}`;
        } else {
          profile.photo = 'assets/default-avatar.png';
        }

        this.profileSubject.next(profile);

        // Optional: cache in localStorage
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('admi', JSON.stringify(profile));
        }
      })
    );
  }

  // ===============================
  // Get cached profile from localStorage
  // ===============================
  getCachedProfile(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const p = localStorage.getItem('admi');
      return p ? JSON.parse(p) : null;
    }
    return null;
  }
}
