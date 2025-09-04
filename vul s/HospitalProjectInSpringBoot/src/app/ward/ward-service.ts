import { Injectable } from '@angular/core';
import { Bed, Facility, Ward } from './model/ward.model';
import { BedBooking } from './model/bedBooking.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WardService {


   private baseUrl =  environment.apiBaseUrl + '/api/ward';

  constructor(private http: HttpClient) {}

  getAllWards(): Observable<Ward[]> {
    return this.http.get<Ward[]>(this.baseUrl);
  }

  getBeds(wardId: number) {
    return this.http.get<Bed[]>(`${this.baseUrl}/${wardId}/beds`);
  }

  getFacilities(wardId: number) {
    return this.http.get<Facility[]>(`${this.baseUrl}/${wardId}/facilities`);
  }

  bookBed(bedId: number, booking: BedBooking) {
    return this.http.post<BedBooking>(`${this.baseUrl}/beds/${bedId}/book`, booking);
  }

  releaseBed(bedId: number) {
    return this.http.post<BedBooking>(`${this.baseUrl}/beds/${bedId}/release`, {});
  }
  
}
