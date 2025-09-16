export interface DoctorCharge {
  id?: number;
  description: string;
  amount: number;
  bedBookingId: number;
  doctorId: number;
  visitDate: string;
   doctorName?: string;
}

export interface PatientDoctorCharge {
  bedBookingId: number;
  patientName: string;
  age: number;
  phone: string;
  address: string;
  charges: DoctorCharge[];
  totalAmount: number;
}

export interface Doctor {
  id: number;
  name: string;
}
