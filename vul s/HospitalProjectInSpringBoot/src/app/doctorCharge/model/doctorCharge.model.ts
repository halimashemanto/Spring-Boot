export interface DoctorDTO {
  id: number;
  name: string;
}

export interface DoctorChargeDTO {
  id?: number;
  description: string;
  amount: number;
  doctorId: number;
  bedBookingId: number;
}
