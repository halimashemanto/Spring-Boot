export interface InvoiceDTO {
  id?: number;
  doctorId: number;
  doctorName?: string;
  appoinmentId?: number;
  patientName?: string;
  patientContact?: string;
  testIds?: number[];
  testNames?: string[];
  discount?: number;
  invoiceDate?: Date;
  deliveryDate?: Date;
  deliveryTime?: number;
  totalAmount?: number;
  totalDiscount?: number;
  payable?: number;
  received?: number;
  due?: number;
  preparedBy?: string;
}
