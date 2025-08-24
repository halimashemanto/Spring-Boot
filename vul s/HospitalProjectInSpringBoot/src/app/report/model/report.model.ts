import { Doctor } from "../../doctor/model/doctor.model";

export interface Report{

     id: number;

 
    reportResult: string;

    description: string;
    sampleId: string;
    interpretation: string;
    patientName: string;

    testDate: Date;
    createDate: Date;
    deliveryDate: Date;

    doctor: Doctor;


}