import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse } from '../AllModel/authResponse.model';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../AllModel/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiBaseUrl + '/auth/';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public userRole$: Observable<string | null> = this.userRoleSubject.asObservable();




  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    const storedRole = this.isBrowser() ? localStorage.getItem('userRole') : null;
    this.userRoleSubject = new BehaviorSubject<string | null>(storedRole);
    this.userRole$ = this.userRoleSubject.asObservable();

  }


  login(email: string, password: string): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(this.baseUrl + 'login', { email, password }, { headers: this.headers }).pipe(

      map(
        (response: AuthResponse) => {
          if (this.isBrowser() && response.token) {
            localStorage.setItem('authToken', response.token);
            const decodeToken = this.decodeToken(response.token);
            localStorage.setItem('userRole', decodeToken.role);
            this.userRoleSubject.next(decodeToken.role);
          }
          return response;

        }

      )
    );
  }


  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }


  decodeToken(token: string) {

    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));

  }

  getToken(): string | null {

    if (this.isBrowser()) {
      return localStorage.getItem('authToken');
    }
    return null;

  }


  getUserRole(): string | null {

    if (this.isBrowser()) {
      return localStorage.getItem('userRole');
    }
    return null;

  }

  isTokenExpired(token: string): boolean {
    const docodeToken = this.decodeToken(token);

    const expiry = docodeToken.exp * 1000;
    return Date.now() > expiry;
  }

  isLoggIn(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    }
    this.logout();
    return false;

  }





  // ✅ Admin Registration with Photo
  registerAdmin(user: User, imageFile?: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }

    return this.http.post(`${this.baseUrl}register/admin`, formData);
  }















  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('userRole');
      localStorage.removeItem('authToken');
      this.userRoleSubject.next(null);
    }
    this.router.navigate(['/']);
  }


  hasRole(roles: string[]): boolean {

    const userRole = this.getUserRole();
    return userRole ? roles.includes(userRole) : false;

  }

  isDoctor(): boolean {
    return this.getUserRole() === 'Doctor';
  }

  isNurse(): boolean {
    return this.getUserRole() === 'Nurse';
  }

  isReceptionist(): boolean {
    return this.getUserRole() === 'Receptionist';
  }

  isOfficeStaff(): boolean {
    return this.getUserRole() === 'OfficeStaff';
  }

isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }
}
