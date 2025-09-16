export interface MedicineAdmitedPatient {
  id?: number;
  bedBookingId: number;
  pharmacyMedicineId: number;
  medicineName?: string;
  sellingPrice?: number;
  quantity: number;
  applyWay: string;
  date: Date;
  totalCost?: number;
}

export interface PatientMedicineDetails {
  bedBookingId: number;
  patientName: string;
  age: number;
  phone: string;
  address: string;
  medicines: MedicineAdmitedPatient[];
  totalAmount: number;
}
