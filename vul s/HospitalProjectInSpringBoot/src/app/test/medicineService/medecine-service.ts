import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from '../medicine/medicine';
import { environment } from '../../../environment/environment';
import { MedicineModel } from '../model/medicine.model';
import { AuthService } from '../../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class MedecineService {

  private baseUrl = environment.apiBaseUrl + '/api/medicine/';

  constructor(private http: HttpClient,
     private authService: AuthService
  ) { }

 private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  getAllMedicine(): Observable<MedicineModel[]> {
    return this.http.get<MedicineModel[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  getMedicineById(id: number): Observable<MedicineModel> {
    return this.http.get<MedicineModel>(`${this.baseUrl}${id}`, { headers: this.getAuthHeaders() });
  }

  createMedicine(medi: MedicineModel): Observable<MedicineModel> {
    return this.http.post<MedicineModel>(this.baseUrl, medi, { headers: this.getAuthHeaders() });
  }

  updateMedicine(medi: MedicineModel, id: number): Observable<MedicineModel> {
    return this.http.put<MedicineModel>(`${this.baseUrl}${id}`, medi, { headers: this.getAuthHeaders() });
  }

  deleteMedicine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`, { headers: this.getAuthHeaders() });
  }

  searchMedicine(name: string): Observable<MedicineModel[]> {
    return this.http.get<MedicineModel[]>(`${this.baseUrl}?testName_like=^${name}`, { headers: this.getAuthHeaders() });
  }



}
