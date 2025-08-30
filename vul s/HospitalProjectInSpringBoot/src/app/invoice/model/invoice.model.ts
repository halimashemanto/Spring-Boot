import { Doctor } from "../../doctor/model/doctor.model";
import { Test } from "../../test/model/test.model";

export interface Invoice {
  id?: number;
  patientName: string;
  patientContact: string;
  doctor:Doctor;
  testDetails: Test[];
  amount: number;
  discount: number; 
  totalAmount: number;
  received: number;
  due: number;
  invoiceDate: Date;
}
