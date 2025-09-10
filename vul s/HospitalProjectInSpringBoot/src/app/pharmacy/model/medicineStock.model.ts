export interface MedicineStockModel {
  id?: number;
  medicineId: number;
  batchNo: string;
  expiryDate: string;
  quantity: number;
  purchasePrice: number;
  createdAt?: string;
}