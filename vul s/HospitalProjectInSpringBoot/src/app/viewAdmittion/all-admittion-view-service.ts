import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BedBookingViewDto } from './model/allAdmittionView.model';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class AllAdmittionViewService {
  
 private apiUrl = 'http://localhost:8080/api/ward/bed-bookings';

  constructor(private http: HttpClient,
     private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  getAllBookingDetails(): Observable<BedBookingViewDto[]> {
    return this.http.get<BedBookingViewDto[]>(`${this.apiUrl}/details`, { headers: this.getAuthHeaders() });
  }

  getBookingDetailsByPhone(phone: string): Observable<BedBookingViewDto[]> {
    return this.http.get<BedBookingViewDto[]>(`${this.apiUrl}/phone/${phone}`, { headers: this.getAuthHeaders() });
  }

  getBookingDetailsByBedNumber(bedNumber: string): Observable<BedBookingViewDto[]> {
    return this.http.get<BedBookingViewDto[]>(`${this.apiUrl}/bedNumber/${bedNumber}`, { headers: this.getAuthHeaders() });
  }


}
