import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  

     private baseUrl = environment.apiBaseUrl+'/nurse/';

  constructor(private http:HttpClient) { }



  registerNurse(user: any, nurse: any, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('nurse', JSON.stringify(nurse));
    formData.append('photo', photo);

    return this.http.post(this.baseUrl, formData);
  }

}
