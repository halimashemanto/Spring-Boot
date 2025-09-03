export interface EmergencyPatient {
  id?: number;
  admissionDate: string; // yyyy-MM-dd
  conditionLevel: string;
  broughtBy: string;
  incidentDetails: string;
  immediateTreatment: string;
  admittedToWard: boolean;
  status: string;

  patientName: string;
  patientAge: number;
  patientGender: string;
  patientContact: string;
  patientAddress: string;
  medicalHistory: string;
}
