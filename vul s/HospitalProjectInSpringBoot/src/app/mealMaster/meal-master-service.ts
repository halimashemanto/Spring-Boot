import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealMaster } from './model/mealMaster.model';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class MealMasterService {


  private apiUrl = environment.apiBaseUrl + '/api/meal-masters';

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


  getAll(): Observable<MealMaster[]> {
    return this.http.get<MealMaster[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }


  getById(id: number): Observable<MealMaster> {
    return this.http.get<MealMaster>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }


  create(mealMaster: MealMaster): Observable<MealMaster> {
    return this.http.post<MealMaster>(this.apiUrl, mealMaster, {
      headers: this.getAuthHeaders()
    });
  }


  update(id: number, mealMaster: MealMaster): Observable<MealMaster> {
    return this.http.put<MealMaster>(`${this.apiUrl}/${id}`, mealMaster, {
      headers: this.getAuthHeaders()
    });
  }


  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
