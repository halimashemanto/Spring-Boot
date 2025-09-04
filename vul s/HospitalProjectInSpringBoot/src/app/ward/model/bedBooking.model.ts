export interface BedBooking {
  bedId: number;
  patientName: string;
  admissionDate: string; // yyyy-MM-dd
  dischargeDate?: string;
  totalCharge?: number;
}
