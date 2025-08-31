export interface AppoinmentDTO {
  id: number;
  patientName: string;
  patientContact: string;
  reason: string;

  doctorId?: number;
  doctorName?: string;

  departmentId?: number;
  departmentName?: string;

  scheduleSlotId?: number;
  slotDate?: string;       // ISO string
  slotStartTime?: string;
  slotEndTime?: string;
}
