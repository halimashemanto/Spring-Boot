import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScheduleSlotModel } from './model/scheduleSlotModel.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ScheduleSlot } from './schedule-slot/schedule-slot';

@Injectable({
  providedIn: 'root'
})
export class ScheduleSlotService {
  
  private apiUrl = environment.apiBaseUrl + '/api/slot/';

   constructor(private http: HttpClient) { }

  createSlot(slot: ScheduleSlotModel): Observable<ScheduleSlotModel> {
    return this.http.post<ScheduleSlotModel>(this.apiUrl, slot);
  }

  getSlotsByDoctor(doctorId: number): Observable<ScheduleSlotModel[]> {

    return this.http.get<ScheduleSlotModel[]>(`${this.apiUrl}?doctorId=${doctorId}`);
  }


  updateSlot(slot: ScheduleSlotModel): Observable<ScheduleSlotModel> {

    return this.http.put<ScheduleSlotModel>(`${this.apiUrl} ${slot.id}`, slot);
  }


  deleteSlot(id: number): Observable<void> {

    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }


  getAvailableSlots(doctorId: number): Observable<ScheduleSlotModel[]> {

    return this.http.get<ScheduleSlotModel[]>(`${this.apiUrl}?doctorId=${doctorId}&isBooked=false`);
  }
}
