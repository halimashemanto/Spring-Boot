import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealMaster } from './model/mealMaster.model';

@Injectable({
  providedIn: 'root'
})
export class MealMasterService {


    private apiUrl = environment.apiBaseUrl + '/api/meal-masters';

  constructor(private http: HttpClient) {}

   getAll(): Observable<MealMaster[]> {
    return this.http.get<MealMaster[]>(this.apiUrl);
  }

  // Get by ID
  getById(id: number): Observable<MealMaster> {
    return this.http.get<MealMaster>(`${this.apiUrl}/${id}`);
  }

  // Create
  create(mealMaster: MealMaster): Observable<MealMaster> {
    return this.http.post<MealMaster>(this.apiUrl, mealMaster);
  }

  // Update
  update(id: number, mealMaster: MealMaster): Observable<MealMaster> {
    return this.http.put<MealMaster>(`${this.apiUrl}/${id}`, mealMaster);
  }

  // Delete
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
