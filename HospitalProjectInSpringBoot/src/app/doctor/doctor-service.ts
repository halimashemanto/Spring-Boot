import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  
     private baseUrl = environment.apiBaseUrl+'/doctor/';

  constructor(private http:HttpClient) { }



  registerDoctor(user: any, doctor: any, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('doctor', JSON.stringify(doctor));
    formData.append('photo', photo);

    return this.http.post(this.baseUrl, formData);
  }

}
