import { Department } from "../../department/department/department";
import { Doctor } from "../../doctor/model/doctor.model";
import { ScheduleSlot } from "../schedule-slot/schedule-slot";

export interface Appointment {
  id: number;             
  departmentId: Department;      
  doctorId: Doctor;
  scheduleSlotId: ScheduleSlot;
      
  patientName: string;
  patientContact: string;
  reason: string;
}