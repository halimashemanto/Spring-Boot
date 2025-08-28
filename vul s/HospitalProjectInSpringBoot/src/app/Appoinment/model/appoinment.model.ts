import { Department } from "../../department/department/department";
import { Doctor } from "../../doctor/model/doctor.model";
import { ScheduleSlotModel } from "./scheduleSlotModel.model";


export interface Appointment {
  id?: number;
  department: Department;     
  doctor: Doctor;
  scheduleSlot: ScheduleSlotModel;

  patientName: string;
  patientContact: string;
  reason: string;


  doctorId:number;
  doctorName: string;
    departmentName: string;
    slotDate: string;
    slotStartTime: string;
    slotEndTime: string;
}