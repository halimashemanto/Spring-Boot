export interface PrescriptionDTO {
  id?: number;
  patientName: string;
  patientAge: number;
  patientContact: string;
  doctorId: number;
  note: string;
  advice: string;
  height: string;
  weight: string;
  bp: string;
  applyWay: string;
  medicineIds: number[];
  testIds: number[];
}