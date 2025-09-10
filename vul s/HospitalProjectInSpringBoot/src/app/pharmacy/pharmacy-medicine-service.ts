import { Injectable } from '@angular/core';
import { SaleModel } from './model/sale.model';
import { Observable } from 'rxjs';
import { PurchaseModel } from './model/purchase.model';
import { SupplierModel } from './model/supplier.model';
import { MedicineStockModel } from './model/medicineStock.model';
import {  PharmacyMedicineModel } from './model/pharmacyMedicine.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PharmacyMedicineService {


   private baseUrl = environment.apiBaseUrl + '/api';

  constructor(private http: HttpClient) { }

  // ===== Medicine =====
  getMedicines(): Observable<PharmacyMedicineModel[]> {
    return this.http.get<PharmacyMedicineModel[]>(`${this.baseUrl}/medicines`);
  }
  getMedicine(id: number): Observable<PharmacyMedicineModel> {
    return this.http.get<PharmacyMedicineModel>(`${this.baseUrl}/medicines/${id}`);
  }
  createMedicine(med: PharmacyMedicineModel): Observable<PharmacyMedicineModel> {
    return this.http.post<PharmacyMedicineModel>(`${this.baseUrl}/medicines`, med);
  }
  updateMedicine(id: number, med: PharmacyMedicineModel): Observable<PharmacyMedicineModel> {
    return this.http.put<PharmacyMedicineModel>(`${this.baseUrl}/medicines/${id}`, med);
  }
  deleteMedicine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/medicines/${id}`);
  }

  // ===== Medicine Stock =====
  getStocks(): Observable<MedicineStockModel[]> {
    return this.http.get<MedicineStockModel[]>(`${this.baseUrl}/stocks`);
  }
  createStock(stock: MedicineStockModel): Observable<MedicineStockModel> {
    return this.http.post<MedicineStockModel>(`${this.baseUrl}/stocks`, stock);
  }
  updateStock(id: number, stock: MedicineStockModel): Observable<MedicineStockModel> {
    return this.http.put<MedicineStockModel>(`${this.baseUrl}/stocks/${id}`, stock);
  }
  deleteStock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/stocks/${id}`);
  }

  // ===== Supplier =====
  getSuppliers(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(`${this.baseUrl}/suppliers`);
  }
  createSupplier(sup: SupplierModel): Observable<SupplierModel> {
    return this.http.post<SupplierModel>(`${this.baseUrl}/suppliers`, sup);
  }
  updateSupplier(id: number, sup: SupplierModel): Observable<SupplierModel> {
    return this.http.put<SupplierModel>(`${this.baseUrl}/suppliers/${id}`, sup);
  }
  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/suppliers/${id}`);
  }

  // ===== Purchase =====
  getPurchases(): Observable<PurchaseModel[]> {
    return this.http.get<PurchaseModel[]>(`${this.baseUrl}/purchases`);
  }
  createPurchase(pur: PurchaseModel): Observable<PurchaseModel> {
    return this.http.post<PurchaseModel>(`${this.baseUrl}/purchases`, pur);
  }
  updatePurchase(id: number, pur: PurchaseModel): Observable<PurchaseModel> {
    return this.http.put<PurchaseModel>(`${this.baseUrl}/purchases/${id}`, pur);
  }
  deletePurchase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/purchases/${id}`);
  }

  // ===== Sale =====
  getSales(): Observable<SaleModel[]> {
    return this.http.get<SaleModel[]>(`${this.baseUrl}/sales`);
  }
  createSale(sale: SaleModel): Observable<SaleModel> {
    return this.http.post<SaleModel>(`${this.baseUrl}/sales`, sale);
  }
  updateSale(id: number, sale: SaleModel): Observable<SaleModel> {
    return this.http.put<SaleModel>(`${this.baseUrl}/sales/${id}`, sale);
  }
  deleteSale(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/sales/${id}`);
  }
  
}
