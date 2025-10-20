import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {   MealAdmittedPatient, MealDTO} from './model/meal.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class MealService {
 private baseUrl = environment.apiBaseUrl + '/api/meals';
  // private mealMasterUrl = environment.apiBaseUrl + '/api/meal-masters';

  constructor(private http: HttpClient,
     private authService: AuthService
  ) { }

  
 private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

 
  assignMeals(dto: { bedBookingId: number; mealIds: number[] }): Observable<MealDTO> {
    return this.http.post<MealDTO>(this.baseUrl, dto, {
      headers: this.getAuthHeaders()
    });
  }


  getPatientByBed(bedBookingId: number): Observable<MealDTO> {
    return this.http.get<MealDTO>(`${this.baseUrl}/bedbooking/${bedBookingId}`, {
      headers: this.getAuthHeaders()
    });
  }

  
  deleteMeal(mealId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${mealId}`, {
      headers: this.getAuthHeaders()
    });
  }


}
