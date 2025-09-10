import { SaleItem } from "./saleItem.model";

export interface SaleModel {
  id?: number;
  invoiceNo: string;
  saleDate: string;
  patientName: string;
  totalAmount: number;
  createdAt?: string;
  items?: SaleItem[];
}
