import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScheduleSlotModel } from './model/scheduleSlotModel.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class ScheduleSlotService {
  
  private apiUrl = environment.apiBaseUrl + '/api/slot/';

   constructor(private http: HttpClient) { }

  // Create a new slot
  createSlot(slot: ScheduleSlotModel): Observable<ScheduleSlotModel> {
    return this.http.post<ScheduleSlotModel>(this.apiUrl, slot);
  }

  // Get all slots for a specific doctor
  getSlotsByDoctor(doctorId: number): Observable<ScheduleSlotModel[]> {
    return this.http.get<ScheduleSlotModel[]>(`${this.apiUrl}/doctor/${doctorId}`);
  }

  // Update a slot
  updateSlot(slot: ScheduleSlotModel): Observable<ScheduleSlotModel> {
    return this.http.put<ScheduleSlotModel>(`${this.apiUrl}/${slot.id}`, slot);
  }

  // Delete a slot
  deleteSlot(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get first available slot for a doctor
  getAvailableSlot(doctorId: number): Observable<ScheduleSlotModel> {
    return this.http.get<ScheduleSlotModel>(`${this.apiUrl}/available/${doctorId}`);
  }

  // Get all slots
  getAllSlots(): Observable<ScheduleSlotModel[]> {
    return this.http.get<ScheduleSlotModel[]>(this.apiUrl);
  }
}
