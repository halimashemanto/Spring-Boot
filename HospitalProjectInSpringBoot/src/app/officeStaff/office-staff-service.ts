import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfficeStaff } from './model/officeStaff.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OfficeStaffService {

  private baseUrl = environment.apiBaseUrl + '/api/officeStaff/';

  constructor(private http: HttpClient) { }


  registerOfficeStaff(user: any, officeStaff: any, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('officeStaff', JSON.stringify(officeStaff));
    formData.append('photo', photo);

    return this.http.post(this.baseUrl, formData);
  }

  getAllOfficeStaff(): Observable<OfficeStaff[]> {
    return this.http.get<OfficeStaff[]>(this.baseUrl);
  }


}

