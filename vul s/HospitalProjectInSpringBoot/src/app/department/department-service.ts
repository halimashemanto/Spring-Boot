import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { DepartmentModel } from './model/departmentModel.model';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  

  private apiUrl = environment.apiBaseUrl + '/api/department/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

 
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  getAllDepartment(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(`${this.apiUrl}`, {
      headers: this.getAuthHeaders()
    });
  }

  addDepartment(dep: DepartmentModel): Observable<DepartmentModel> {
    return this.http.post<DepartmentModel>(`${this.apiUrl}`, dep, {
      headers: this.getAuthHeaders()
    });
  }

  
  updateDepartment(dep: DepartmentModel): Observable<DepartmentModel> {
    return this.http.put<DepartmentModel>(`${this.apiUrl}/${dep.id}`, dep, {
      headers: this.getAuthHeaders()
    });
  }

 
  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  
  getDepartmentsPublic() {
    return this.http.get(`${this.apiUrl}/public`);
  }

  // Protected (tokenসহ) endpoint
  getDepartmentsProtected() {
    return this.http.get(`${this.apiUrl}/protected`, {
      headers: this.getAuthHeaders()
    });
  }
}
