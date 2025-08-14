
import { Doctor } from "../../doctor/model/doctor.model";

export interface ScheduleSlotModel {

    id?: number;
    doctor: { id: number };
    isBooked: boolean;
    date: string;     // YYYY-MM-DD
    startTime: string; // HH:MM
    endTime: string;   // HH:MM

}