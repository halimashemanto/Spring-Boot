import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { BedBookingDTO, BedDTO, WardDTO } from './model/bedBooking.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BedBookingService {
   private apiUrl = environment.apiBaseUrl + '/api/ward';

  constructor(private http: HttpClient) {}

  getWards(): Observable<WardDTO[]> {
    return this.http.get<WardDTO[]>(this.apiUrl);
  }

  getBeds(wardId: number): Observable<BedDTO[]> {
    return this.http.get<BedDTO[]>(`${this.apiUrl}/${wardId}/beds`);
  }

  bookBed(bedId: number, dto: BedBookingDTO): Observable<BedBookingDTO> {
    return this.http.post<BedBookingDTO>(`${this.apiUrl}/beds/${bedId}/book`, dto);
  }

  releaseBed(bedId: number): Observable<BedBookingDTO> {
    return this.http.post<BedBookingDTO>(`${this.apiUrl}/beds/${bedId}/release`, {});
  }
}
