import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class WardService {


   private api =  environment.apiBaseUrl + '/api/ward';

  constructor(private http: HttpClient) {}

 getAllWards(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  createWard(data: any): Observable<any> {
    return this.http.post<any>(this.api, data);
  }

  createBed(wardId: number, bed: any): Observable<any> {
    return this.http.post<any>(`${this.api}/${wardId}/beds`, bed);
  }

  bookBed(bedId: number, booking: any): Observable<any> {
    return this.http.post<any>(`${this.api}/beds/${bedId}/book`, booking);
  }

  releaseBed(bedId: number): Observable<any> {
    return this.http.post<any>(`${this.api}/beds/${bedId}/release`, {});
  }
}
  

