import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from './model/doctor.model';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = environment.apiBaseUrl + '/api/doctor/';

 constructor(
  private http: HttpClient,
   @Inject(PLATFORM_ID) private platformId: Object
) { }


 registerDoctor(user: any, doctor: any, photo: File): Observable<any> {
    const formData = new FormData();

    // Convert objects to JSON strings
    formData.append('user', JSON.stringify(user));
    formData.append('doctor', JSON.stringify(doctor));

    // Append photo file
    if (photo) {
      formData.append('photo', photo, photo.name);
    }

    return this.http.post(`${this.baseUrl}`, formData);
  }



getDoctorsByDepartment(departmentId: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}by-department${departmentId}`);
  }


  getAllDoctor(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(environment.apiBaseUrl + '/api/doctor/all');
  }


//    getAllDoctor(): Observable<Doctor[]> {
//   let token = '';
//   if (typeof window !== 'undefined') {
//     token = localStorage.getItem('token') || '';
//   }

//   return this.http.get<Doctor[]>(
//     `${this.baseUrl}all`,  // baseUrl already ends with '/'
//     {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Accept': 'application/json'
//       }
//     }
//   );
// }


}
