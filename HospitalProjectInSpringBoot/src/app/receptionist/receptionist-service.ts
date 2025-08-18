import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Receptionist } from './model/receptionist.model';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {
  
  private baseUrl = environment.apiBaseUrl + '/api/receptionist/';

  constructor(private http: HttpClient) { }


  registerReceptionist(user: any, receptionist: any, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('receptionist', JSON.stringify(receptionist));
    formData.append('photo', photo);

    return this.http.post(this.baseUrl, formData);
  }

  getAllReceptionist(): Observable<Receptionist[]> {
    return this.http.get<Receptionist[]>(this.baseUrl);
  }

 
}

