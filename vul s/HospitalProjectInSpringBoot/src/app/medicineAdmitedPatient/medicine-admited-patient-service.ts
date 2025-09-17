import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicineAdmitedPatient, PatientMedicineDetails } from './model/medicineAdmitedPatient.model';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { PharmacyMedicineModel } from '../pharmacy/model/pharmacyMedicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineAdmitedPatientService {

  private apiUrl = environment.apiBaseUrl + '/api/medicine-admitted';
  private pharmacyUrl = environment.apiBaseUrl + '/api/medicines';

  constructor(private http: HttpClient) { }

  getMedicines(): Observable<PharmacyMedicineModel[]> {
    return this.http.get<PharmacyMedicineModel[]>(this.pharmacyUrl);
  }

  addMedicine(med: MedicineAdmitedPatient): Observable<MedicineAdmitedPatient> {
    return this.http.post<MedicineAdmitedPatient>(this.apiUrl, med);
  }


  getPatientMedicines(bedBookingId: number): Observable<MedicineAdmitedPatient[]> {
    return this.http.get<MedicineAdmitedPatient[]>(`${this.apiUrl}/bed/${bedBookingId}`);
  }


  deleteMedicine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  getTotalCost(bedBookingId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/bed/${bedBookingId}/total-cost`);
  }


  // getPatientByBedBooking(id: number): Observable<any> {
  //   return this.http.get<any>(`${environment.apiBaseUrl}/api/bedbooking/${id}/patient`);
  // }



 // Get patient info + medicines (auto load)
  getPatientByBedBooking(bedBookingId: number): Observable<PatientMedicineDetails> {
    return this.http.get<PatientMedicineDetails>(`${this.apiUrl}/bedbooking/${bedBookingId}/patient`);
  }

}
