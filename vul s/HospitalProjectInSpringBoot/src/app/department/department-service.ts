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

  
  constructor(private http: HttpClient,
    private authService:AuthService
  ) { }

  getAllDepartment(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(this.apiUrl);
  }

  addDepartment(dep: DepartmentModel): Observable<DepartmentModel> {
    return this.http.post<DepartmentModel>(this.apiUrl, dep);
  }

  updateDepartment(dep: DepartmentModel): Observable<DepartmentModel> {
    return this.http.put<DepartmentModel>(`${this.apiUrl} ${dep.id}`, dep);
  }

  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl} ${id}`);
  }

   getDepartmentsPublic() {
    return this.http.get(`${this.apiUrl}/public`);
  }

  getDepartmentsProtected() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.apiUrl}/protected`, { headers });
  }
}
