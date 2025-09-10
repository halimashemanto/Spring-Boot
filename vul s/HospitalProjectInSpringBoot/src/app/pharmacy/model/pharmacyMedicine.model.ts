export interface PharmacyMedicineModel {
  id?: number;
  name: string;
  genericName: string;
  strength: string;
  unit: string;
  sku: string;
  sellingPrice: number;
  createdAt?: string;
}
