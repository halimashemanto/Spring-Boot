

export interface ItemizedBillDTO {
  category: string;
  itemName: string;
  amount: number;
}

export interface DischargeBillDTO {
  patientName: string;
  age: number;
  phone: string;
  address: string;
  admissionDate: string; 
  dischargeDate: string;
  billItems: ItemizedBillDTO[];
  totalAmount: number;
}
