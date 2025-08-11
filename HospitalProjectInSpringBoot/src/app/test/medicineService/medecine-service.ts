import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from '../medicine/medicine';
import { environment } from '../../../environment/environment';
import { MedicineModel } from '../model/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedecineService {

  private baseUrl = environment.apiBaseUrl + '/api/medicine/';

  constructor(private http: HttpClient) { }


  getAllMedicine(): Observable<MedicineModel[]> {
    return this.http.get<MedicineModel[]>(this.baseUrl);
  }

  getMedicineById(id: number): Observable<MedicineModel> {
    return this.http.get<MedicineModel>(`${this.baseUrl}/${id}`);
  }

  createMedicine(medi: MedicineModel): Observable<MedicineModel> {
    return this.http.post<MedicineModel>(this.baseUrl, medi);
  }

  updateMedicine(medi: MedicineModel, id: number): Observable<MedicineModel> {
    return this.http.put<MedicineModel>(`${this.baseUrl}${id}`, medi);
  }

  deleteMedicine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }

  searchMedicine(name: string): Observable<MedicineModel[]> {
    return this.http.get<MedicineModel[]>(`${this.baseUrl}?testName_like=^${name}`);
  }




}
