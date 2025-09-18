export interface BedBookingViewDto {
  id: number;
  patientName: string;
  age:number;
  phone: string;
  address:string;
  bedNumber: string;
  admissionDate: string;
  dischargeDate?: string;
 bedBookingId:number;
}
