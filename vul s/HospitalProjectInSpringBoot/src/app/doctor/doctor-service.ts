import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = environment.apiBaseUrl + '/api/doctor/';

 constructor(
  private http: HttpClient,
   @Inject(PLATFORM_ID) private platformId: Object
) { }

  registerDoctor(user: any, doctor: any, photo: File, departmentId: number): Observable<any> {
  const formData = new FormData();

  // stringify JSON parts
  formData.append("user", JSON.stringify(user));
  formData.append("doctor", JSON.stringify(doctor));

  if (departmentId) {
    formData.append("departmentId", departmentId.toString());
  }


  formData.append("photo", photo);

  return this.http.post("", formData);
}




  getAllDoctor(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiBaseUrl + '/api/doctor/all');
  }

 
}
