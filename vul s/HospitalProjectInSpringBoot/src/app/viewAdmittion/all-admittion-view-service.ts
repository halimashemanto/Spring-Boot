import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BedBookingViewDto } from './model/allAdmittionView.model';

@Injectable({
  providedIn: 'root'
})
export class AllAdmittionViewService {
  
 private apiUrl = 'http://localhost:8080/api/ward/bed-bookings';

  constructor(private http: HttpClient) { }

  getAllBookingDetails(): Observable<BedBookingViewDto[]> {
    return this.http.get<BedBookingViewDto[]>(`${this.apiUrl}/details`);
  }

  getBookingDetailsByPhone(phone: string): Observable<BedBookingViewDto[]> {
    return this.http.get<BedBookingViewDto[]>(`${this.apiUrl}/phone/${phone}`);
  }

  getBookingDetailsByBedNumber(bedNumber: string): Observable<BedBookingViewDto[]> {
    return this.http.get<BedBookingViewDto[]>(`${this.apiUrl}/bedNumber/${bedNumber}`);
  }


}
