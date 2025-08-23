export interface Invoice {
  id?: number;
  doctorId?: number;
  doctorName?: string;
  appoinmentId?: number;
  patientName?: string;
  patientContact?: string;
  testIds?: number[];
  testNames?: string[];
  discount?: number;
  amount?: number;
  totalAmount?: number;
  totalDiscount?: number;
  payable?: number;
  received?: number;
  due?: number;
  status?: boolean;
  preparedBy?: string;
  invoiceDate?: Date;
  deliveryDate?: Date;
  deliveryTime?: number;
}