import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicineAdmitedPatient } from './model/medicineAdmitedPatient.model';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { PharmacyMedicineModel } from '../pharmacy/model/pharmacyMedicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineAdmitedPatientService {

 private apiUrl = environment.apiBaseUrl + '/api/medicine-admitted';
  private pharmacyUrl = environment.apiBaseUrl + '/api/medicines'; // ✅ Pharmacy API

  constructor(private http: HttpClient) { }

  // Get all pharmacy medicines
  getMedicines(): Observable<PharmacyMedicineModel[]> {
    return this.http.get<PharmacyMedicineModel[]>(this.pharmacyUrl);
  }

  // Add a new medicine to admitted patient
  addMedicine(med: MedicineAdmitedPatient): Observable<MedicineAdmitedPatient> {
    return this.http.post<MedicineAdmitedPatient>(this.apiUrl, med);
  }

  // Get all medicines for a bed booking
  getPatientMedicines(bedBookingId: number): Observable<MedicineAdmitedPatient[]> {
    return this.http.get<MedicineAdmitedPatient[]>(`${this.apiUrl}/bed/${bedBookingId}`);
  }

  // Delete a medicine entry
  deleteMedicine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get total cost for a bed booking
  getTotalCost(bedBookingId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/bed/${bedBookingId}/total-cost`);
  }

getPatientByBedBooking(id: number): Observable<any> {
  return this.http.get<any>(`http://localhost:8080/api/bedbooking/${id}/patient`);
}

}
