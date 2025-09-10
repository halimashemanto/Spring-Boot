import { PurchaseItem } from "./purchaseItem.model";


export interface PurchaseModel {
  id?: number;
  supplierId: number;
  invoiceNo: string;
  purchaseDate: string;
  totalAmount: number;
  createdAt?: string;
  items?: PurchaseItem[];
}
