import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../AllModel/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private baseUrl = environment.apiBaseUrl+'/auth/all';

  constructor(private http:HttpClient) { }


  // getAllEmp():Observable<User[]>{

  //   return this.http.get<User[]>(this.baseUrl);
  // }

   getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
  

}
