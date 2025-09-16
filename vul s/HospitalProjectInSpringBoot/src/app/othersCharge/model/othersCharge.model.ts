export interface OthersCharge {
  id?: number;
  description: string;
  amount: number;
  bedBookingId: number;
  
}

export interface PatientOthersCharge {
  bedBookingId: number;
  patientName: string;
  age: number;
  phone: string;
  address: string;
  charges: OthersCharge[];
  totalAmount: number;
}
