import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ScheduleSlotModel } from './model/scheduleSlotModel.model';
import { Doctor } from '../doctor/model/doctor.model';
import { AuthService } from '../Service/auth-service';


@Injectable({
  providedIn: 'root'
})
export class ScheduleSlotService {

  private baseUrl = environment.apiBaseUrl + '/api/slot';




  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  //  Helper method to add Authorization header
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  //  Get all slots
  getAllSlots(): Observable<ScheduleSlotModel[]> {
    return this.http.get<ScheduleSlotModel[]>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }

  //  Get all doctors
  getAllDoctor(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(environment.apiBaseUrl + '/api/doctor/', {
      headers: this.getAuthHeaders()
    });
  }

  //  Create slot (doctor_id + body)
  createSlot(slot: ScheduleSlotModel, doctorId: number): Observable<ScheduleSlotModel> {
    return this.http.post<ScheduleSlotModel>(
      `${this.baseUrl}?doctor_id=${doctorId}`,
      slot,
      { headers: this.getAuthHeaders() }
    );
  }

  //  Delete slot
  deleteSlot(slotId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${slotId}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

}
