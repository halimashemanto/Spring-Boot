export interface TestInvoice {
  testId: number;
  testName?: string;
  price?: number;
}

export interface Invoice {
  id?: number;
  patientName: string;
  patientContact: string;
  doctorId: number;
  doctorName?: string;
  department?: string;
  testDetails: TestInvoice[];
  amount: number;
  discount: number;  // %
  totalAmount: number;
  received: number;
  due: number;
  invoiceDate: Date;
}
