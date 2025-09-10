export interface TestInfo {
  id: number;
  testName: string;
  testPrice: number;
}

export interface TestAssignedDTO {
  id?: number;
  bedBookingId: number;
  admittedPatientId?: number;
  patientName?: string;
  age?: number;
  phone?: string;
  address?: string;
  testIds: number[];
  testCost?: number;
  selectedTests?: TestInfo[];
}
