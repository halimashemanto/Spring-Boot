import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {   MealAdmittedPatient, MealDTO} from './model/meal.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MealService {
 private baseUrl = environment.apiBaseUrl + '/api/meals';
  private mealMasterUrl = environment.apiBaseUrl + '/api/meal-masters';

  constructor(private http: HttpClient) { }

  // Assign meals to patient
  assignMeals(dto: { bedBookingId: number; mealIds: number[] }): Observable<MealDTO> {
    return this.http.post<MealDTO>(this.baseUrl, dto);
  }

  // Get patient by bedBookingId
  getPatientByBed(bedBookingId: number): Observable<MealDTO> {
    return this.http.get<MealDTO>(`${this.baseUrl}/bedbooking/${bedBookingId}`);
  }

  // Delete a meal by id
  deleteMeal(mealId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${mealId}`);
  }
}
