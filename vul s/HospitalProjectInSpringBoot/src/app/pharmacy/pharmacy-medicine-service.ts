import { Injectable } from '@angular/core';
import { SaleModel } from './model/sale.model';
import { Observable } from 'rxjs';
import { PurchaseModel } from './model/purchase.model';
import { SupplierModel } from './model/supplier.model';
import { MedicineStockModel } from './model/medicineStock.model';
import { PharmacyMedicineModel } from './model/pharmacyMedicine.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class PharmacyMedicineService {


  private baseUrl = environment.apiBaseUrl + '/api';

  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }


  // ===== Medicine =====

  getMedicine(id: number): Observable<PharmacyMedicineModel> {
    return this.http.get<PharmacyMedicineModel>(`${this.baseUrl}/medicines/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
  
  getMedicines(): Observable<PharmacyMedicineModel[]> {

    // HTTP GET request with token in headers
    return this.http.get<PharmacyMedicineModel[]>(
      `${this.baseUrl}/medicines`,
      { headers: this.getAuthHeaders() }
    );


  }

  createMedicine(med: PharmacyMedicineModel): Observable<PharmacyMedicineModel> {
    // HTTP POST request with token in headers
    return this.http.post<PharmacyMedicineModel>(
      `${this.baseUrl}/medicines`,
      med,
      { headers: this.getAuthHeaders() }
    );
  }

  updateMedicine(id: number, med: PharmacyMedicineModel): Observable<PharmacyMedicineModel> {
    return this.http.put<PharmacyMedicineModel>(`${this.baseUrl}/medicines/${id}`, med, {
      headers: this.getAuthHeaders()
    });
  }
  deleteMedicine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/medicines/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // ===== Medicine Stock =====
  getStocks(): Observable<MedicineStockModel[]> {
    return this.http.get<MedicineStockModel[]>(`${this.baseUrl}/stocks`, { headers: this.getAuthHeaders() });
  }
  createStock(stock: MedicineStockModel): Observable<MedicineStockModel> {
    return this.http.post<MedicineStockModel>(`${this.baseUrl}/stocks`, stock, { headers: this.getAuthHeaders() });
  }
  updateStock(id: number, stock: MedicineStockModel): Observable<MedicineStockModel> {
    return this.http.put<MedicineStockModel>(`${this.baseUrl}/stocks/${id}`, stock, { headers: this.getAuthHeaders() });
  }
  deleteStock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/stocks/${id}`, { headers: this.getAuthHeaders() });
  }

  // ===== Supplier =====
  getSuppliers(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(`${this.baseUrl}/suppliers`, { headers: this.getAuthHeaders() });
  }
  createSupplier(sup: SupplierModel): Observable<SupplierModel> {
    return this.http.post<SupplierModel>(`${this.baseUrl}/suppliers`, sup, { headers: this.getAuthHeaders() });
  }
  updateSupplier(id: number, sup: SupplierModel): Observable<SupplierModel> {
    return this.http.put<SupplierModel>(`${this.baseUrl}/suppliers/${id}`, sup, { headers: this.getAuthHeaders() });
  }
  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/suppliers/${id}`, { headers: this.getAuthHeaders() });
  }

  // ===== Purchase =====
  getPurchases(): Observable<PurchaseModel[]> {
    return this.http.get<PurchaseModel[]>(`${this.baseUrl}/purchases`, { headers: this.getAuthHeaders() });
  }
  createPurchase(pur: PurchaseModel): Observable<PurchaseModel> {
    return this.http.post<PurchaseModel>(`${this.baseUrl}/purchases`, pur, { headers: this.getAuthHeaders() });
  }
  updatePurchase(id: number, pur: PurchaseModel): Observable<PurchaseModel> {
    return this.http.put<PurchaseModel>(`${this.baseUrl}/purchases/${id}`, pur, { headers: this.getAuthHeaders() });
  }
  deletePurchase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/purchases/${id}`, { headers: this.getAuthHeaders() });
  }

  // ===== Sale =====
  getSales(): Observable<SaleModel[]> {
    return this.http.get<SaleModel[]>(`${this.baseUrl}/sales`, { headers: this.getAuthHeaders() });
  }
  createSale(sale: SaleModel): Observable<SaleModel> {
    return this.http.post<SaleModel>(`${this.baseUrl}/sales`, sale, { headers: this.getAuthHeaders() });
  }
  updateSale(id: number, sale: SaleModel): Observable<SaleModel> {
    return this.http.put<SaleModel>(`${this.baseUrl}/sales/${id}`, sale, { headers: this.getAuthHeaders() });
  }
  deleteSale(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/sales/${id}`, { headers: this.getAuthHeaders() });
  }
}
