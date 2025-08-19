import { Doctor } from "../../doctor/model/doctor.model";


export interface ScheduleSlotModel {
  id?: number;       
  date: Date;       
  startTime: string;  
  endTime: string;    
  booked: boolean;   
  doctor?: Doctor;
   
}