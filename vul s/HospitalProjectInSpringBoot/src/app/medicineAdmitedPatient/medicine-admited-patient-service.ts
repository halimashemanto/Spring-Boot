import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicineAdmitedPatient, PatientMedicineDetails } from './model/medicineAdmitedPatient.model';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PharmacyMedicineModel } from '../pharmacy/model/pharmacyMedicine.model';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class MedicineAdmitedPatientService {

  private apiUrl = environment.apiBaseUrl + '/api/medicine-admitted';
  private pharmacyUrl = environment.apiBaseUrl + '/api/medicines';

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

  
  getMedicines(): Observable<PharmacyMedicineModel[]> {
    return this.http.get<PharmacyMedicineModel[]>(this.pharmacyUrl, {
      headers: this.getAuthHeaders()
    });
  }

  
  addMedicine(med: MedicineAdmitedPatient): Observable<MedicineAdmitedPatient> {
    return this.http.post<MedicineAdmitedPatient>(this.apiUrl, med, {
      headers: this.getAuthHeaders()
    });
  }

  
  getPatientMedicines(bedBookingId: number): Observable<MedicineAdmitedPatient[]> {
    return this.http.get<MedicineAdmitedPatient[]>(`${this.apiUrl}/bed/${bedBookingId}`, {
      headers: this.getAuthHeaders()
    });
  }

 
  deleteMedicine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getTotalCost(bedBookingId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/bed/${bedBookingId}/total-cost`, {
      headers: this.getAuthHeaders()
    });
  }


  getPatientByBedBooking(bedBookingId: number): Observable<PatientMedicineDetails> {
    return this.http.get<PatientMedicineDetails>(`${this.apiUrl}/bedbooking/${bedBookingId}/patient`, {
      headers: this.getAuthHeaders()
    });
  }
}
