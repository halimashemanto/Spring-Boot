export interface Report {
  id?: number;
  reportResult: string;
  description: string;
  sampleId: string;
  interpretation: string;
  patientName: string;
  testDate: string | Date;    // <-- string thakle pipe | Date
  createDate: string | Date;
  deliveryDate: string | Date;
  doctorId?: number;
  doctorName?: string;
}
