import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BedBookingDTO, BedDTO, WardDTO } from './model/bedBooking.model';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class BedBookingService {
   private apiUrl = environment.apiBaseUrl + '/api/ward';

  constructor(private http: HttpClient,
     private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  getWards(): Observable<WardDTO[]> {
    return this.http.get<WardDTO[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getBeds(wardId: number): Observable<BedDTO[]> {
    return this.http.get<BedDTO[]>(`${this.apiUrl}/${wardId}/beds`, { headers: this.getAuthHeaders() });
  }

  bookBed(bedId: number, dto: BedBookingDTO): Observable<BedBookingDTO> {
    return this.http.post<BedBookingDTO>(`${this.apiUrl}/beds/${bedId}/book`, dto, { headers: this.getAuthHeaders() });
  }

  releaseBed(bedId: number): Observable<BedBookingDTO> {
    return this.http.post<BedBookingDTO>(`${this.apiUrl}/beds/${bedId}/release`, {}, { headers: this.getAuthHeaders() });
  }
}
