import { Department } from "../../department/department/department";
import { Doctor } from "../../doctor/model/doctor.model";


export interface Patient {
  id?: number;
  date: Date;
  name: string;
  age: number;
  gender: string;
  contact: string;
  address: string;
  medicalHistory: string;
  reason: string;
  status: string;

  doctor?: Doctor;           
  department?: Department; 
}  