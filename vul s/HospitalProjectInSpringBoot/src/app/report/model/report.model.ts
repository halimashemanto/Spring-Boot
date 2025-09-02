export interface ReportDTO {
  id?: number;
  patientName: string;
  patientContact: string;
  gender: string;
  preparedBy: string;
  doctorId: number;
  doctorName?: string;
  testDate: Date;       
  createDate?: string;
  deliveryDate: string;
  reportResult: string;
  description?: string;
}
