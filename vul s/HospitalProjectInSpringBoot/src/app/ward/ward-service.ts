import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { BedDTO, FacilityDTO, WardDTO } from './model/bedBooking.model';
import { BedBookingDTO } from '../word/model/bedBooking.model';
import { AuthService } from '../Service/auth-service';


@Injectable({
  providedIn: 'root'
})
export class WardService {


   private apiUrl =  environment.apiBaseUrl + '/api/ward';

  constructor(private http: HttpClient, 
    private authService: AuthService) {}


 private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  addFacility(wardId: number, facility: FacilityDTO): Observable<FacilityDTO> {
    return this.http.post<FacilityDTO>(`${this.apiUrl}/${wardId}/facilities`, facility, { headers: this.getAuthHeaders() });
  }

  getFacilities(wardId: number): Observable<FacilityDTO[]> {
    return this.http.get<FacilityDTO[]>(`${this.apiUrl}/${wardId}/facilities`, { headers: this.getAuthHeaders() });
  }

  createWard(ward: WardDTO): Observable<WardDTO> {
    return this.http.post<WardDTO>(this.apiUrl, ward, { headers: this.getAuthHeaders() });
  }

  getWards(): Observable<WardDTO[]> {
    return this.http.get<WardDTO[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createBed(wardId: number, bed: BedDTO): Observable<BedDTO> {
    return this.http.post<BedDTO>(`${this.apiUrl}/${wardId}/beds`, bed, { headers: this.getAuthHeaders() });
  }

  getBeds(wardId: number): Observable<BedDTO[]> {
    return this.http.get<BedDTO[]>(`${this.apiUrl}/${wardId}/beds`, { headers: this.getAuthHeaders() });
  }

  bookBed(dto: BedBookingDTO): Observable<BedBookingDTO> {
    return this.http.post<BedBookingDTO>(`${this.apiUrl}/beds/${dto.bedId}/book`, dto, { headers: this.getAuthHeaders() });
  }

  releaseBed(bedId: number): Observable<BedBookingDTO> {
    return this.http.post<BedBookingDTO>(`${this.apiUrl}/beds/${bedId}/release`, {}, { headers: this.getAuthHeaders() });
  }
}




















// // Add facility to a ward
//   addFacility(wardId: number, facility: FacilityDTO): Observable<FacilityDTO> {
//     return this.http.post<FacilityDTO>(`${this.apiUrl}/${wardId}/facilities`, facility);
//   }

//   // Get all facilities of a ward
//   getFacilities(wardId: number): Observable<FacilityDTO[]> {
//     return this.http.get<FacilityDTO[]>(`${this.apiUrl}/${wardId}/facilities`);
//   }


//   //  // Ward
//   // getWards(): Observable<WardDTO[]> {
//   //   return this.http.get<WardDTO[]>(this.apiUrl);
//   // }

//   createWard(ward: WardDTO): Observable<WardDTO> {
//     return this.http.post<WardDTO>(this.apiUrl, ward);
//   }

//   // // Bed
//   // getBeds(wardId: number): Observable<BedDTO[]> {
//   //   return this.http.get<BedDTO[]>(`${this.apiUrl}/${wardId}/beds`);
//   // }

//   createBed(wardId: number, bed: BedDTO): Observable<BedDTO> {
//     return this.http.post<BedDTO>(`${this.apiUrl}/${wardId}/beds`, bed);
//   }


//   getWards(): Observable<WardDTO[]> {
//     return this.http.get<WardDTO[]>(this.apiUrl);
//   }

//   getBeds(wardId: number): Observable<BedDTO[]> {
//     return this.http.get<BedDTO[]>(`${this.apiUrl}/${wardId}/beds`);
//   } 

//   bookBed(dto: BedBookingDTO): Observable<BedBookingDTO> {
//     return this.http.post<BedBookingDTO>(`${this.apiUrl}/beds/${dto.bedId}/book`, dto);
//   }

//   releaseBed(bedId: number): Observable<BedBookingDTO> {
//     return this.http.post<BedBookingDTO>(`${this.apiUrl}/beds/${bedId}/release`, {});
//   }
// }
  

