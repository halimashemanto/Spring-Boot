import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal, MealDTO } from './model/meal.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MealService {

    private baseUrl = environment.apiBaseUrl + '/api/meals';

  constructor(private http: HttpClient) {}

  addMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.baseUrl, meal);
  }

  getMealsByBedBooking(bedBookingId: number): Observable<MealDTO> {
    return this.http.get<MealDTO>(`${this.baseUrl}/bedbooking/${bedBookingId}`);
  }

  deleteMeal(mealId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${mealId}`);
  }
  
}
