import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {   MealAssign} from './model/meal.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private baseUrl = environment.apiBaseUrl + '/api/meals';
  private mealMasterUrl = environment.apiBaseUrl + '/api/meal-masters';

  constructor(private http: HttpClient) { }

getPatientByBed(bedBookingId: number): Observable<MealAssign> {
    return this.http.get<MealAssign>(`${this.baseUrl}/by-bed/${bedBookingId}`);
  }

  saveMealAssign(dto: MealAssign): Observable<MealAssign> {
    return this.http.post<MealAssign>(`${this.baseUrl}/assign`, dto);
  }

  // Delete a meal by id
  deleteMeal(mealId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/meals/${mealId}`);
  }
}
