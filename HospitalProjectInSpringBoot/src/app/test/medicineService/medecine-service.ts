import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from '../medicine/medicine';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MedecineService {

 private baseUrl = environment.apiBaseUrl + '/api/medicine/';
  
    constructor(private http: HttpClient) { }
    
  
    getAllMedicine(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.baseUrl);
  }

  getMedicineById(id: number): Observable<Medicine> {
    return this.http.get<Medicine>(`${this.baseUrl}/${id}`);
  }

  createMedicine(medi: Medicine): Observable<Medicine> {
    return this.http.post<Medicine>(this.baseUrl, medi);
  }

  // updateMedicine(medi: Medicine): Observable<Medicine> {
  //   return this.http.put<Medicine>(`${this.baseUrl}${medi.id}`, medi);
  // }

  deleteMedicine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }

   searchMedicine(name: string): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${this.baseUrl}?testName_like=^${name}`);
  }
   
  
  
  
}
