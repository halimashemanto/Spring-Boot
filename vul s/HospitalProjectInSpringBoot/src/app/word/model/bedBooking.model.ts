export interface BedDTO {
  id?: number;
  bedNumber: string;
  occupied?: boolean;
  pricePerDay: number;
}

export interface WardDTO {
  id?: number;
  wardName: string;
  wardType: string;
  pricePerDay: number;
  beds?: BedDTO[];
}

export interface BedBookingDTO {
  bedId: number;
  patientName: string;
  age: number;
  phone: string;
  address: string;
  broughtBy: string;
  admissionDate: Date;
  dischargeDate?: Date | null;
  totalCharge?: number;
}

